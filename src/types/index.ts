// ユーザー情報
export interface User {
  id: string;
  email: string;
  name?: string;
}

// 配信プラットフォーム
export type Platform = 'youtube' | 'twitch' | 'unknown';

// 配信の情報
export interface Stream {
  id: string;
  url: string;
  platform: Platform;
  isMuted: boolean;
  title?: string;
}

// レイアウトアイテム
export interface LayoutItem {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

// 保存用レイアウト
export interface SavedLayout {
  id: string;
  name: string;
  streams: Stream[];
  createdAt: number;
}

// お気に入り配信
export interface Favorite {
  id: string;
  url: string;
  platform: Platform;
  name: string;
}
