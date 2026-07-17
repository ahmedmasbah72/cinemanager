import { Cinema, Hall } from '@/types/models';

export const cinemas: Cinema[] = [
  {
    id: 'c1',
    name: 'Mégarama Casablanca',
    address: 'Boulevard Sidi Abderrahmane',
    city: 'Casablanca',
    distance: 1.8,
    rating: 4.6,
    services: ['IMAX', '3D', 'VIP', 'Dolby Atmos', 'Snack Bar', 'Parking'],
    imageUrl: require('../assets/images/megarama.jpg'),
    phone: '+212 5 22 79 00 00',
    coordinates: { latitude: 33.5945, longitude: -7.6200 },
  },
  {
    id: 'c2',
    name: 'Mégarama Rabat',
    address: 'Avenue Annakhil, Hay Riad',
    city: 'Rabat',
    distance: 3.4,
    rating: 4.7,
    services: ['IMAX', '4DX', 'Dolby Atmos', 'Snack Bar', 'Parking'],
    imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=600&fit=crop',
    phone: '+212 5 37 56 78 90',
    coordinates: { latitude: 33.9583, longitude: -6.8688 },
  },
  {
    id: 'c3',
    name: 'Cinéma Rif',
    address: 'Place du 9 Avril 1947',
    city: 'Tanger',
    distance: 0.9,
    rating: 4.4,
    services: ['3D', 'Snack Bar'],
    imageUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&h=600&fit=crop',
    phone: '+212 5 39 93 00 21',
    coordinates: { latitude: 35.7840, longitude: -5.8125 },
  },
  {
    id: 'c4',
    name: 'CinéAtlas Marrakech',
    address: 'Avenue Mohammed VI',
    city: 'Marrakech',
    distance: 4.2,
    rating: 4.5,
    services: ['IMAX', '3D', 'VIP', 'Snack Bar', 'Parking'],
    imageUrl: 'https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=800&h=600&fit=crop',
    phone: '+212 5 24 43 21 10',
    coordinates: { latitude: 31.6295, longitude: -7.9811 },
  },
];

export const halls: Hall[] = [
  { id: 'h1', cinemaId: 'c1', name: 'Salle 1 - IMAX', type: 'IMAX', capacity: 320, rows: 16, seatsPerRow: 20 },
  { id: 'h2', cinemaId: 'c1', name: 'Salle 2 - VIP', type: 'VIP', capacity: 60, rows: 6, seatsPerRow: 10 },
  { id: 'h3', cinemaId: 'c1', name: 'Salle 3 - Standard', type: 'Standard', capacity: 180, rows: 12, seatsPerRow: 15 },

  { id: 'h4', cinemaId: 'c2', name: 'Salle 1 - IMAX', type: 'IMAX', capacity: 380, rows: 19, seatsPerRow: 20 },
  { id: 'h5', cinemaId: 'c2', name: 'Salle 2 - 4DX', type: '4DX', capacity: 130, rows: 9, seatsPerRow: 15 },
  { id: 'h6', cinemaId: 'c2', name: 'Salle 3 - Standard', type: 'Standard', capacity: 170, rows: 11, seatsPerRow: 15 },

  { id: 'h7', cinemaId: 'c3', name: 'Salle 1 - Standard', type: 'Standard', capacity: 200, rows: 13, seatsPerRow: 15 },
  { id: 'h8', cinemaId: 'c3', name: 'Salle 2 - VIP', type: 'VIP', capacity: 50, rows: 5, seatsPerRow: 10 },

  { id: 'h9', cinemaId: 'c4', name: 'Salle 1 - IMAX', type: 'IMAX', capacity: 340, rows: 17, seatsPerRow: 20 },
  { id: 'h10', cinemaId: 'c4', name: 'Salle 2 - Standard', type: 'Standard', capacity: 160, rows: 10, seatsPerRow: 16 },
];
