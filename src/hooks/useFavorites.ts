import { useState, useCallback, useEffect } from 'react';
import type { Favorite } from '../types';

const STORAGE_KEY = 'multiview_favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  // 初回読み込み
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch {
        console.error('Failed to parse saved favorites');
      }
    }
  }, []);

  // 保存時にlocalStorageに書き込み
  const saveToStorage = useCallback((newFavorites: Favorite[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  }, []);

  const addFavorite = useCallback((url: string, platform: Favorite['platform'], name: string): Favorite => {
    const newFavorite: Favorite = {
      id: Date.now().toString(),
      url,
      platform,
      name,
    };

    const newFavorites = [...favorites, newFavorite];
    saveToStorage(newFavorites);
    return newFavorite;
  }, [favorites, saveToStorage]);

  const removeFavorite = useCallback((id: string) => {
    const newFavorites = favorites.filter((f) => f.id !== id);
    saveToStorage(newFavorites);
  }, [favorites, saveToStorage]);

  const isFavorite = useCallback((url: string) => {
    return favorites.some((f) => f.url === url);
  }, [favorites]);

  const getFavoriteByUrl = useCallback((url: string) => {
    return favorites.find((f) => f.url === url);
  }, [favorites]);

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    getFavoriteByUrl,
  };
}
