import createContextHook from '@nkzw/create-context-hook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import db from '@/store/db';
import { useEffect, useState, useCallback } from 'react';
import { Movie, Booking, Ticket, Seat, ShowTime, Cinema, Hall } from '@/types/models';
import { movies as moviesData } from '@/data/movies';
import { cinemas as cinemasData, halls as hallsData } from '@/data/cinemas';
import { showtimes as showtimesData } from '@/data/showtimes';

interface AppState {
  favorites: string[];
  bookings: Booking[];
  tickets: Ticket[];
  addFavorite: (movieId: string) => void;
  removeFavorite: (movieId: string) => void;
  isFavorite: (movieId: string) => boolean;
  createBooking: (
    showTime: ShowTime,
    movie: Movie,
    cinema: Cinema,
    hall: Hall,
    seats: Seat[]
  ) => Promise<string>;
  cancelBooking: (bookingId: string) => void;
  getTicketById: (ticketId: string) => Ticket | undefined;
  getMovies: () => Movie[];
  getCinemas: () => Cinema[];
  getHalls: (cinemaId: string) => Hall[];
  getShowTimes: (movieId?: string, cinemaId?: string) => ShowTime[];
  getMovieById: (id: string) => Movie | undefined;
  getCinemaById: (id: string) => Cinema | undefined;
  getHallById: (id: string) => Hall | undefined;
  isLoading: boolean;
}

export const [AppProvider, useApp] = createContextHook<AppState>(() => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      await db.initDB();

      const [favoritesData, bookingsData] = await Promise.all([
        AsyncStorage.getItem('favorites'),
        AsyncStorage.getItem('bookings'),
      ]);

      if (favoritesData) setFavorites(JSON.parse(favoritesData));

      // Load bookings from SQLite DB. If none but AsyncStorage has bookings, migrate them.
      const storedBookings = await db.getBookings();
      if (storedBookings && storedBookings.length) {
        setBookings(storedBookings);
      } else if (bookingsData) {
        try {
          const parsed = JSON.parse(bookingsData) as Booking[];
          await Promise.all(parsed.map((b) => db.addBooking(b)));
          // remove legacy storage
          await AsyncStorage.removeItem('bookings');
          setBookings(parsed);
        } catch (e) {
          console.error('Failed migrating bookings to SQLite:', e);
        }
      }

      // Load tickets from SQLite DB
      const storedTickets = await db.getTickets();
      if (storedTickets && storedTickets.length) setTickets(storedTickets);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveFavorites = async (newFavorites: string[]) => {
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  const saveBookings = async (newBookings: Booking[]) => {
    try {
      // Persist each booking into SQLite (insert or replace)
      await Promise.all(newBookings.map((b) => db.addBooking(b)));
      setBookings(newBookings);
    } catch (error) {
      console.error('Error saving bookings:', error);
    }
  };

  const saveTickets = async (newTickets: Ticket[]) => {
    try {
      // Persist each ticket into SQLite (insert or replace)
      await Promise.all(newTickets.map((t) => db.addTicket(t)));
      setTickets(newTickets);
    } catch (error) {
      console.error('Error saving tickets:', error);
    }
  };

  const addFavorite = useCallback((movieId: string) => {
    const newFavorites = [...favorites, movieId];
    saveFavorites(newFavorites);
  }, [favorites]);

  const removeFavorite = useCallback((movieId: string) => {
    const newFavorites = favorites.filter(id => id !== movieId);
    saveFavorites(newFavorites);
  }, [favorites]);

  const isFavorite = useCallback((movieId: string) => {
    return favorites.includes(movieId);
  }, [favorites]);

  const createBooking = useCallback(async (
    showTime: ShowTime,
    movie: Movie,
    cinema: Cinema,
    hall: Hall,
    seats: Seat[]
  ): Promise<string> => {
    const bookingId = `b-${Date.now()}`;
    const totalPrice = seats.reduce((sum, seat) => sum + seat.price, 0);
    const qrCode = `TICKET-${bookingId}`;

    const newBooking: Booking = {
      id: bookingId,
      userId: 'user1',
      showTimeId: showTime.id,
      movieId: movie.id,
      cinemaId: cinema.id,
      hallId: hall.id,
      seats,
      totalPrice,
      status: 'confirmed',
      bookingDate: new Date().toISOString(),
      qrCode,
    };

    const newTicket: Ticket = {
      id: `t-${Date.now()}`,
      bookingId,
      movie,
      cinema,
      hall,
      showTime,
      seats,
      totalPrice,
      qrCode,
      status: 'confirmed',
      bookingDate: new Date().toISOString(),
    };

    await saveBookings([...bookings, newBooking]);
    await saveTickets([...tickets, newTicket]);

    return bookingId;
  }, [bookings, tickets]);

  const cancelBooking = useCallback((bookingId: string) => {
    const updatedBookings = bookings.map(b =>
      b.id === bookingId ? { ...b, status: 'cancelled' as const } : b
    );
    const updatedTickets = tickets.map(t =>
      t.bookingId === bookingId ? { ...t, status: 'cancelled' as const } : t
    );
    saveBookings(updatedBookings);
    saveTickets(updatedTickets);
  }, [bookings, tickets]);

  const getTicketById = useCallback((ticketId: string) => {
    return tickets.find(t => t.id === ticketId);
  }, [tickets]);

  const getMovies = useCallback(() => moviesData, []);
  const getCinemas = useCallback(() => cinemasData, []);
  const getHalls = useCallback((cinemaId: string) => hallsData.filter(h => h.cinemaId === cinemaId), []);
  const getShowTimes = useCallback((movieId?: string, cinemaId?: string) => {
    return showtimesData.filter(st =>
      (!movieId || st.movieId === movieId) &&
      (!cinemaId || st.cinemaId === cinemaId)
    );
  }, []);

  const getMovieById = useCallback((id: string) => moviesData.find(m => m.id === id), []);
  const getCinemaById = useCallback((id: string) => cinemasData.find(c => c.id === id), []);
  const getHallById = useCallback((id: string) => hallsData.find(h => h.id === id), []);

  return {
    favorites,
    bookings,
    tickets,
    addFavorite,
    removeFavorite,
    isFavorite,
    createBooking,
    cancelBooking,
    getTicketById,
    getMovies,
    getCinemas,
    getHalls,
    getShowTimes,
    getMovieById,
    getCinemaById,
    getHallById,
    isLoading,
  };
});
