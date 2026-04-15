import { Injectable } from '@angular/core';

declare const NativeStorage: any;

/**
 * StorageService — Abstraction layer for persistent storage.
 *
 * Uses NativeStorage (Cordova plugin) when available in native context,
 * with automatic fallback to localStorage for web development.
 *
 * On native devices, NativeStorage uses SharedPreferences (Android)
 * and UserDefaults (iOS), which are protected against cache clearing.
 *
 * @providedIn 'root' — Singleton service available application-wide.
 *
 * @example
 * ```typescript
 * // Save data
 * await this.storageService.set('my_key', { name: 'value' });
 *
 * // Retrieve data
 * const data = await this.storageService.get<MyType>('my_key');
 *
 * // Remove data
 * await this.storageService.remove('my_key');
 * ```
 */
@Injectable({ providedIn: 'root' })
export class StorageService {
  /**
   * Detects if NativeStorage (Cordova) is available.
   */
  private get isNative(): boolean {
    return typeof NativeStorage !== 'undefined';
  }

  /**
   * Retrieves a value from storage by key.
   * Returns null if the key does not exist or the value cannot be parsed.
   *
   * @template T - The expected type of the stored value.
   * @param key - The storage key to look up.
   * @returns A promise resolving to the parsed value or null.
   */
  async get<T>(key: string): Promise<T | null> {
    try {
      if (this.isNative) {
        const value = await new Promise<string>((resolve, reject) => {
          NativeStorage.getItem(key, resolve, reject);
        });
        return JSON.parse(value) as T;
      } else {
        const value = localStorage.getItem(key);
        if (value === null) return null;
        return JSON.parse(value) as T;
      }
    } catch {
      return null;
    }
  }

  /**
   * Stores a value in storage, serialized as JSON.
   *
   * @template T - The type of the value to store.
   * @param key - The storage key.
   * @param value - The value to serialize and store.
   */
  async set<T>(key: string, value: T): Promise<void> {
    const serialized = JSON.stringify(value);
    if (this.isNative) {
      await new Promise<void>((resolve, reject) => {
        NativeStorage.setItem(key, serialized, resolve, reject);
      });
    } else {
      localStorage.setItem(key, serialized);
    }
  }

  /**
   * Removes a single key-value pair from storage.
   *
   * @param key - The storage key to remove.
   */
  async remove(key: string): Promise<void> {
    if (this.isNative) {
      await new Promise<void>((resolve, reject) => {
        NativeStorage.remove(key, resolve, reject);
      });
    } else {
      localStorage.removeItem(key);
    }
  }

  /**
   * Clears all data from storage.
   * Use with caution — this removes ALL stored data for the app.
   */
  async clear(): Promise<void> {
    if (this.isNative) {
      await new Promise<void>((resolve, reject) => {
        NativeStorage.clear(resolve, reject);
      });
    } else {
      localStorage.clear();
    }
  }
}
