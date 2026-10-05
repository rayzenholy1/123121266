import * as SQLite from 'expo-sqlite';
import { NewUser, UserRecord } from '../types';

let dbPromise: Promise<SQLite.SQLiteDatabase> | null = null;

export function getDb(): Promise<SQLite.SQLiteDatabase> {
  if (!dbPromise) {
    dbPromise = (async () => {
      const db = await SQLite.openDatabaseAsync('registration.db');
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          first_name TEXT NOT NULL,
          last_name TEXT NOT NULL,
          birth_date TEXT NOT NULL,
          phone TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE,
          city TEXT NOT NULL,
          password_hash TEXT NOT NULL,
          gender TEXT NOT NULL,
          goal TEXT NOT NULL,
          consent INTEGER NOT NULL,
          photo TEXT,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
      `);
      return db;
    })();
  }
  return dbPromise;
}

export async function insertUser(user: NewUser): Promise<number> {
  const db = await getDb();
  const result = await db.runAsync(
    `INSERT INTO users
      (first_name, last_name, birth_date, phone, email, city, password_hash, gender, goal, consent, photo)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    user.firstName,
    user.lastName,
    user.birthDate,
    user.phone,
    user.email,
    user.city,
    user.passwordHash,
    user.gender,
    user.goal,
    user.consent,
    user.photo
  );
  return result.lastInsertRowId;
}

export async function getUsers(): Promise<UserRecord[]> {
  const db = await getDb();
  return db.getAllAsync<UserRecord>(
    `SELECT
      id,
      first_name AS firstName,
      last_name AS lastName,
      birth_date AS birthDate,
      phone,
      email,
      city,
      password_hash AS passwordHash,
      gender,
      goal,
      consent,
      photo,
      created_at AS createdAt
     FROM users
     ORDER BY id DESC`
  );
}

export async function deleteUser(id: number): Promise<void> {
  const db = await getDb();
  await db.runAsync('DELETE FROM users WHERE id = ?', id);
}
