import { ShowTime } from '@/types/models';

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const dayAfter = new Date(today);
dayAfter.setDate(dayAfter.getDate() + 2);

const formatDate = (date: Date) => date.toISOString().split('T')[0];

export const showtimes: ShowTime[] = [
  { id: 'st1', movieId: 'm1', cinemaId: 'c1', hallId: 'h1', date: formatDate(today), time: '14:00', language: 'VF', format: 'IMAX', basePrice: 95, availableSeats: 120 },
  { id: 'st2', movieId: 'm1', cinemaId: 'c1', hallId: 'h1', date: formatDate(today), time: '17:30', language: 'VF', format: 'IMAX', basePrice: 95, availableSeats: 85 },
  { id: 'st3', movieId: 'm1', cinemaId: 'c1', hallId: 'h3', date: formatDate(today), time: '20:00', language: 'VO', subtitles: 'FR', format: '2D', basePrice: 65, availableSeats: 45 },
  { id: 'st4', movieId: 'm1', cinemaId: 'c2', hallId: 'h4', date: formatDate(today), time: '19:00', language: 'VF', format: 'IMAX', basePrice: 100, availableSeats: 200 },
  { id: 'st5', movieId: 'm1', cinemaId: 'c2', hallId: 'h6', date: formatDate(tomorrow), time: '15:00', language: 'VF', format: '3D', basePrice: 80, availableSeats: 90 },

  { id: 'st6', movieId: 'm2', cinemaId: 'c1', hallId: 'h2', date: formatDate(today), time: '16:00', language: 'VF', format: '2D', basePrice: 120, availableSeats: 15 },
  { id: 'st7', movieId: 'm2', cinemaId: 'c3', hallId: 'h7', date: formatDate(today), time: '18:30', language: 'VO', subtitles: 'FR', format: '2D', basePrice: 55, availableSeats: 78 },
  { id: 'st8', movieId: 'm2', cinemaId: 'c3', hallId: 'h7', date: formatDate(tomorrow), time: '20:30', language: 'VF', format: '2D', basePrice: 55, availableSeats: 120 },

  { id: 'st9', movieId: 'm3', cinemaId: 'c1', hallId: 'h1', date: formatDate(today), time: '21:00', language: 'VO', subtitles: 'FR', format: 'IMAX', basePrice: 95, availableSeats: 35 },
  { id: 'st10', movieId: 'm3', cinemaId: 'c2', hallId: 'h4', date: formatDate(today), time: '14:30', language: 'VF', format: 'IMAX', basePrice: 100, availableSeats: 150 },
  { id: 'st11', movieId: 'm3', cinemaId: 'c4', hallId: 'h9', date: formatDate(today), time: '19:30', language: 'VO', subtitles: 'FR', format: 'IMAX', basePrice: 90, availableSeats: 95 },
  { id: 'st12', movieId: 'm3', cinemaId: 'c4', hallId: 'h10', date: formatDate(tomorrow), time: '16:00', language: 'VF', format: '3D', basePrice: 75, availableSeats: 70 },

  { id: 'st13', movieId: 'm4', cinemaId: 'c2', hallId: 'h6', date: formatDate(today), time: '21:30', language: 'VO', subtitles: 'FR', format: '2D', basePrice: 60, availableSeats: 55 },
  { id: 'st14', movieId: 'm4', cinemaId: 'c3', hallId: 'h7', date: formatDate(today), time: '22:00', language: 'VF', format: '2D', basePrice: 55, availableSeats: 42 },
  { id: 'st15', movieId: 'm4', cinemaId: 'c4', hallId: 'h10', date: formatDate(tomorrow), time: '19:00', language: 'VO', subtitles: 'FR', format: '2D', basePrice: 65, availableSeats: 80 },

  { id: 'st16', movieId: 'm7', cinemaId: 'c1', hallId: 'h2', date: formatDate(today), time: '14:30', language: 'VF', format: '2D', basePrice: 120, availableSeats: 25 },
  { id: 'st17', movieId: 'm7', cinemaId: 'c1', hallId: 'h3', date: formatDate(today), time: '18:00', language: 'VO', subtitles: 'FR', format: '2D', basePrice: 65, availableSeats: 65 },
  { id: 'st18', movieId: 'm7', cinemaId: 'c3', hallId: 'h8', date: formatDate(tomorrow), time: '17:00', language: 'VF', format: '2D', basePrice: 110, availableSeats: 30 },
  { id: 'st19', movieId: 'm7', cinemaId: 'c4', hallId: 'h10', date: formatDate(dayAfter), time: '15:30', language: 'VO', subtitles: 'FR', format: '2D', basePrice: 65, availableSeats: 90 },
];
