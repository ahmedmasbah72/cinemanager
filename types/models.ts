import type { ImageSourcePropType } from 'react-native';

export type Genre =
  | 'Action'
  | 'Aventure'
  | 'Comédie'
  | 'Drame'
  | 'Science-Fiction'
  | 'Horreur'
  | 'Thriller'
  | 'Animation'
  | 'Romance'
  | 'Fantastique';

export type MovieStatus = 'now-playing' | 'coming-soon';
export type AgeRating = 'Tous' | '10+' | '12+' | '16+' | '18+';

export type MediaSource = string | ImageSourcePropType;

export interface Movie {
  id: string;
  title: string;
  originalTitle?: string;

  // ✅ URL (string) OU require(...)
  poster: MediaSource;
  backdrop: MediaSource;

  genres: Genre[];
  duration: number;
  rating: number;
  releaseDate: string;
  status: MovieStatus;
  synopsis: string;
  director: string;
  cast: string[];
  ageRating: AgeRating;
  trailerUrl?: string;
}

export type CinemaService =
  | 'IMAX'
  | '3D'
  | '4DX'
  | 'VIP'
  | 'Dolby Atmos'
  | 'Snack Bar'
  | 'Parking';

export interface Cinema {
  id: string;
  name: string;
  address: string;
  city: string;
  distance: number;
  rating: number;
  services: CinemaService[];

  // ✅ URL (string) OU require(...)
  imageUrl: MediaSource;

  phone: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export type HallType = 'Standard' | 'VIP' | 'IMAX' | '4DX';

export interface Hall {
  id: string;
  cinemaId: string;
  name: string;
  type: HallType;
  capacity: number;
  rows: number;
  seatsPerRow: number;
}

export type SeatType = 'standard' | 'vip' | 'pmr';
export type SeatStatus = 'available' | 'occupied' | 'selected' | 'reserved';

export interface Seat {
  id: string;
  row: number;
  number: number;
  type: SeatType;
  status: SeatStatus;
  price: number;
}

export interface ShowTime {
  id: string;
  movieId: string;
  cinemaId: string;
  hallId: string;
  date: string;
  time: string;
  language: string;
  subtitles?: string;
  format: '2D' | '3D' | 'IMAX';
  basePrice: number;
  availableSeats: number;
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'used';

export interface Booking {
  id: string;
  userId: string;
  showTimeId: string;
  movieId: string;
  cinemaId: string;
  hallId: string;
  seats: Seat[];
  totalPrice: number;
  status: BookingStatus;
  bookingDate: string;
  qrCode: string;
}

export interface Ticket {
  id: string;
  bookingId: string;
  movie: Movie;
  cinema: Cinema;
  hall: Hall;
  showTime: ShowTime;
  seats: Seat[];
  totalPrice: number;
  qrCode: string;
  status: BookingStatus;
  bookingDate: string;
}

export interface UserSettings {
  notifications: boolean;
  language: 'fr' | 'en';
  theme: 'dark' | 'light';
  favoriteGenres: Genre[];
}

export interface Stats {
  totalBookings: number;
  totalSpent: number;
  monthlyBookings: number;
  favoriteGenre: Genre;
  mostVisitedCinema: string;
}
