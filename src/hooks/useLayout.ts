import { useState, useCallback } from 'react';
import type { SavedLayout, Stream } from '../types';

export function useLayout() {
  const [savedLayouts, setSavedLayouts] = useState<SavedLayout[]>([]);

  const saveLayout = useCallback((name: string, streams: Stream[]) => {
    const newLayout: SavedLayout = {
      id: Date.now().toString(),
      name,
      streams,
      createdAt: Date.now(),
    };

    setSavedLayouts((prev) => [...prev, newLayout]);
    return newLayout;
  }, []);

  const deleteLayout = useCallback((id: string) => {
    setSavedLayouts((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const getLayout = useCallback(
    (id: string): SavedLayout | undefined => {
      return savedLayouts.find((l) => l.id === id);
    },
    [savedLayouts]
  );

  return {
    savedLayouts,
    saveLayout,
    deleteLayout,
    getLayout,
  };
}
