// Simple in-memory storage (simulates persistence for the session)
// In production you'd use AsyncStorage or expo-secure-store

export const USERS_KEY = 'vpl_users';

const store: Record<string, unknown> = {};

export function saveData(key: string, value: unknown): void {
  store[key] = value;
}

export function loadData<T>(key: string): T | null {
  return (store[key] as T) ?? null;
}

export function removeData(key: string): void {
  delete store[key];
}
