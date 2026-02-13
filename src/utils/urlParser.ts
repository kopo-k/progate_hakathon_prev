import type { Platform } from '../types';

/**
 * URLからプラットフォームを判定
 */
export function detectPlatform(url: string): Platform {
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    return 'youtube';
  }
  if (url.includes('twitch.tv')) {
    return 'twitch';
  }
  return 'unknown';
}

/**
 * YouTubeのURLからVideo IDを抽出
 */
export function getYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([^&]+)/,
    /(?:youtube\.com\/embed\/)([^?]+)/,
    /(?:youtu\.be\/)([^?]+)/,
    /(?:youtube\.com\/live\/)([^?]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

/**
 * TwitchのURLからChannel名を抽出
 */
export function getTwitchChannel(url: string): string | null {
  const pattern = /twitch\.tv\/([^/?]+)/;
  const match = url.match(pattern);
  return match ? match[1] : null;
}

/**
 * URLがYouTubeまたはTwitchの有効なURLかチェック
 */
export function isValidStreamUrl(url: string): boolean {
  const platform = detectPlatform(url);

  if (platform === 'youtube') {
    return getYouTubeVideoId(url) !== null;
  }

  if (platform === 'twitch') {
    return getTwitchChannel(url) !== null;
  }

  return false;
}

/**
 * YouTube埋め込みURLを生成
 */
export function getYouTubeEmbedUrl(videoId: string, muted: boolean): string {
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${muted ? 1 : 0}&rel=0`;
}

/**
 * Twitch埋め込みURLを生成
 */
export function getTwitchEmbedUrl(channel: string, muted: boolean): string {
  const parent = window.location.hostname || 'localhost';
  return `https://player.twitch.tv/?channel=${channel}&parent=${parent}&muted=${muted}`;
}
