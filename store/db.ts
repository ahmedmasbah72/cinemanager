// store/db.ts
import { Platform } from "react-native";
import * as SQLite from "expo-sqlite";
import type { Booking, Ticket, BookingStatus } from "@/types/models";

type SqlParams = (string | number | null)[];

type Db = {
  execAsync: (sql: string) => Promise<void>;
  runAsync: (
    sql: string,
    params?: SqlParams
  ) => Promise<{ changes: number; lastInsertRowId?: number }>;
  getAllAsync: <T = any>(sql: string, params?: SqlParams) => Promise<T[]>;
  getFirstAsync: <T = any>(sql: string, params?: SqlParams) => Promise<T | null>;
};

// ---------- safe JSON ----------
function jparse<T>(value: any, fallback: T): T {
  try {
    if (value == null || value === "") return fallback;
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function jstringify(value: any) {
  try {
    return JSON.stringify(value ?? null);
  } catch {
    return JSON.stringify(null);
  }
}

// ---------- Web fallback (avoid crash on RN Web) ----------
const WebDB: Db = {
  async execAsync() {},
  async runAsync() {
    return { changes: 0 };
  },
  async getAllAsync() {
    return [];
  },
  async getFirstAsync() {
    return null;
  },
};

let dbOnce: Promise<Db> | null = null;

async function getDB(): Promise<Db> {
  if (Platform.OS === "web") return WebDB;

  if (!dbOnce) {
    dbOnce = (async () => {
      // ✅ expo-sqlite v16+
      const db = (await SQLite.openDatabaseAsync("cinema.db")) as unknown as Db;

      // Optionnel (bonne pratique)
      await db.execAsync("PRAGMA journal_mode = WAL;");
      await db.execAsync("PRAGMA foreign_keys = ON;");

      return db;
    })();
  }

  return dbOnce;
}

// ---------- init ----------
export async function initDB() {
  const db = await getDB();

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS bookings (
      id TEXT PRIMARY KEY,
      userId TEXT,
      showTimeId TEXT,
      movieId TEXT,
      cinemaId TEXT,
      hallId TEXT,
      seats TEXT,
      totalPrice REAL,
      status TEXT,
      bookingDate TEXT,
      qrCode TEXT
    );
  `);

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS tickets (
      id TEXT PRIMARY KEY,
      bookingId TEXT,
      movie TEXT,
      cinema TEXT,
      hall TEXT,
      showTimeId TEXT,
      showDate TEXT,
      showTime TEXT,
      seats TEXT,
      totalPrice REAL,
      qrCode TEXT,
      status TEXT,
      bookingDate TEXT
    );
  `);
}

// ---------- bookings ----------
export async function addBooking(booking: Booking) {
  const db = await getDB();

  await db.runAsync(
    `INSERT OR REPLACE INTO bookings
      (id, userId, showTimeId, movieId, cinemaId, hallId, seats, totalPrice, status, bookingDate, qrCode)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
    [
      booking.id,
      booking.userId ?? null,
      booking.showTimeId ?? null,
      booking.movieId ?? null,
      booking.cinemaId ?? null,
      booking.hallId ?? null,
      jstringify(booking.seats ?? []),
      booking.totalPrice ?? 0,
      (booking.status ?? "pending") as BookingStatus,
      booking.bookingDate ?? new Date().toISOString(),
      booking.qrCode ?? null,
    ]
  );
}

function rowToBooking(row: any): Booking {
  return {
    id: row.id,
    userId: row.userId,
    showTimeId: row.showTimeId,
    movieId: row.movieId,
    cinemaId: row.cinemaId,
    hallId: row.hallId,
    seats: jparse(row.seats, []),
    totalPrice: row.totalPrice ?? 0,
    status: row.status,
    bookingDate: row.bookingDate,
    qrCode: row.qrCode,
  } as Booking;
}

export async function getBookings(status?: BookingStatus): Promise<Booking[]> {
  const db = await getDB();

  const rows = status
    ? await db.getAllAsync<any>(
        "SELECT * FROM bookings WHERE status = ? ORDER BY bookingDate DESC;",
        [status]
      )
    : await db.getAllAsync<any>("SELECT * FROM bookings ORDER BY bookingDate DESC;");

  return rows.map(rowToBooking);
}

export async function getBookingById(id: string): Promise<Booking | undefined> {
  const db = await getDB();
  const row = await db.getFirstAsync<any>("SELECT * FROM bookings WHERE id = ?;", [id]);
  return row ? rowToBooking(row) : undefined;
}

export async function updateBookingStatus(id: string, status: BookingStatus) {
  const db = await getDB();
  await db.runAsync("UPDATE bookings SET status = ? WHERE id = ?;", [status, id]);
}

// ---------- tickets ----------
export async function addTicket(ticket: Ticket) {
  const db = await getDB();

  await db.runAsync(
    `INSERT OR REPLACE INTO tickets
      (id, bookingId, movie, cinema, hall, showTimeId, showDate, showTime, seats, totalPrice, qrCode, status, bookingDate)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
    [
      ticket.id,
      ticket.bookingId ?? null,
      jstringify(ticket.movie),
      jstringify(ticket.cinema),
      jstringify(ticket.hall),
      ticket.showTime?.id ?? null,
      ticket.showTime?.date ?? null,
      ticket.showTime?.time ?? null,
      jstringify(ticket.seats ?? []),
      ticket.totalPrice ?? 0,
      ticket.qrCode ?? null,
      ticket.status ?? "confirmed",
      ticket.bookingDate ?? new Date().toISOString(),
    ]
  );
}

function rowToTicket(row: any): Ticket {
  return {
    id: row.id,
    bookingId: row.bookingId,
    movie: jparse(row.movie, null),
    cinema: jparse(row.cinema, null),
    hall: jparse(row.hall, null),
    showTime: {
      id: row.showTimeId,
      date: row.showDate,
      time: row.showTime,
    } as any,
    seats: jparse(row.seats, []),
    totalPrice: row.totalPrice ?? 0,
    qrCode: row.qrCode ?? "",
    status: row.status,
    bookingDate: row.bookingDate,
  } as Ticket;
}

export async function getTickets(status?: string): Promise<Ticket[]> {
  const db = await getDB();

  const rows = status
    ? await db.getAllAsync<any>(
        "SELECT * FROM tickets WHERE status = ? ORDER BY bookingDate DESC;",
        [status]
      )
    : await db.getAllAsync<any>("SELECT * FROM tickets ORDER BY bookingDate DESC;");

  return rows.map(rowToTicket);
}

export async function getTicketById(id: string): Promise<Ticket | undefined> {
  const db = await getDB();
  const row = await db.getFirstAsync<any>("SELECT * FROM tickets WHERE id = ?;", [id]);
  return row ? rowToTicket(row) : undefined;
}

export async function updateTicketStatus(id: string, status: string) {
  const db = await getDB();
  await db.runAsync("UPDATE tickets SET status = ? WHERE id = ?;", [status, id]);
}

export default {
  initDB,
  // bookings
  addBooking,
  getBookings,
  getBookingById,
  updateBookingStatus,
  // tickets
  addTicket,
  getTickets,
  getTicketById,
  updateTicketStatus,
};
