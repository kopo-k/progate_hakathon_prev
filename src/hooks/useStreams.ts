import { useState, useCallback } from 'react';
import type { Stream } from '../types';
import { detectPlatform, isValidStreamUrl } from '../utils/urlParser';

export function useStreams() {
  const [streams, setStreams] = useState<Stream[]>([]);

  const addStream = useCallback((url: string): { success: boolean; error?: string } => {
    if (!url.trim()) {
      return { success: false, error: 'URLを入力してください' };
    }

    if (!isValidStreamUrl(url)) {
      return { success: false, error: 'YouTubeまたはTwitchのURLを入力してください' };
    }

    // 重複チェック
    if (streams.some((s) => s.url === url)) {
      return { success: false, error: 'この配信は既に追加されています' };
    }

    const newStream: Stream = {
      id: Date.now().toString(),
      url,
      platform: detectPlatform(url),
      isMuted: streams.length > 0, // 最初の配信以外はミュート
    };

    setStreams((prev) => [...prev, newStream]);
    return { success: true };
  }, [streams]);

  const removeStream = useCallback((id: string) => {
    setStreams((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const toggleMute = useCallback((id: string) => {
    setStreams((prev) =>
      prev.map((s) => ({
        ...s,
        // クリックした配信のミュートを切り替え、他は全てミュート
        isMuted: s.id === id ? !s.isMuted : true,
      }))
    );
  }, []);

  const reorderStreams = useCallback((activeId: string, overId: string) => {
    setStreams((prev) => {
      const oldIndex = prev.findIndex((s) => s.id === activeId);
      const newIndex = prev.findIndex((s) => s.id === overId);

      if (oldIndex === -1 || newIndex === -1) return prev;

      const newStreams = [...prev];
      const [removed] = newStreams.splice(oldIndex, 1);
      newStreams.splice(newIndex, 0, removed);
      return newStreams;
    });
  }, []);

  const setAllStreams = useCallback((newStreams: Stream[]) => {
    setStreams(newStreams);
  }, []);

  return {
    streams,
    addStream,
    removeStream,
    toggleMute,
    reorderStreams,
    setAllStreams,
  };
}
