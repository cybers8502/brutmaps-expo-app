import {Persister} from '@tanstack/react-query-persist-client';
import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

export function createMMKVPersister(key: string = 'react-query'): Persister {
  return {
    persistClient: async (client) => {
      storage.set(key, JSON.stringify(client));
    },
    restoreClient: async () => {
      const cached = storage.getString(key);
      return cached ? JSON.parse(cached) : undefined;
    },
    removeClient: async () => {
      storage.delete(key);
    },
  };
}
