import { useState, useCallback, useEffect } from 'react';
import type { Stream } from '../types';

export interface SavedLayout {
  id: string;
  name: string;
  streams: Pick<Stream, 'url' | 'platform'>[];
  createdAt: number;
}

const STORAGE_KEY = 'multiview_layouts';

export function useLayouts() {
  const [layouts, setLayouts] = useState<SavedLayout[]>([]);

  // 初回読み込み
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setLayouts(JSON.parse(saved));
      } catch {
        console.error('Failed to parse saved layouts');
      }
    }
  }, []);

  // 保存時にlocalStorageに書き込み
  const saveToStorage = useCallback((newLayouts: SavedLayout[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newLayouts));
    setLayouts(newLayouts);
  }, []);

  const saveLayout = useCallback((name: string, streams: Stream[]): SavedLayout => {
    const newLayout: SavedLayout = {
      id: Date.now().toString(),
      name,
      streams: streams.map((s) => ({ url: s.url, platform: s.platform })),
      createdAt: Date.now(),
    };

    const newLayouts = [...layouts, newLayout];
    saveToStorage(newLayouts);
    return newLayout;
  }, [layouts, saveToStorage]);

  const deleteLayout = useCallback((id: string) => {
    const newLayouts = layouts.filter((l) => l.id !== id);
    saveToStorage(newLayouts);
  }, [layouts, saveToStorage]);

  const updateLayoutName = useCallback((id: string, name: string) => {
    const newLayouts = layouts.map((l) =>
      l.id === id ? { ...l, name } : l
    );
    saveToStorage(newLayouts);
  }, [layouts, saveToStorage]);

  return {
    layouts,
    saveLayout,
    deleteLayout,
    updateLayoutName,
  };
}
