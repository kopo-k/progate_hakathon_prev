import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Volume2, VolumeX, X, GripVertical, Youtube, Twitch } from 'lucide-react';
import type { Stream } from '../../types';
import {
  getYouTubeVideoId,
  getTwitchChannel,
  getYouTubeEmbedUrl,
  getTwitchEmbedUrl,
} from '../../utils/urlParser';

interface StreamTileProps {
  stream: Stream;
  onToggleMute: (id: string) => void;
  onRemove: (id: string) => void;
}

export function StreamTile({ stream, onToggleMute, onRemove }: StreamTileProps) {
  const [isHovered, setIsHovered] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: stream.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const renderPlayer = () => {
    if (stream.platform === 'youtube') {
      const videoId = getYouTubeVideoId(stream.url);
      if (!videoId) {
        return <ErrorState message="無効なYouTube URL" />;
      }
      return (
        <iframe
          src={getYouTubeEmbedUrl(videoId, stream.isMuted)}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
    }

    if (stream.platform === 'twitch') {
      const channel = getTwitchChannel(stream.url);
      if (!channel) {
        return <ErrorState message="無効なTwitch URL" />;
      }
      return (
        <iframe
          src={getTwitchEmbedUrl(channel, stream.isMuted)}
          className="absolute inset-0 w-full h-full"
          allowFullScreen
        />
      );
    }

    return <ErrorState message="対応していない形式" />;
  };

  const PlatformIcon = stream.platform === 'youtube' ? Youtube : Twitch;
  const platformColor = stream.platform === 'youtube' ? '#ff0000' : '#9147ff';

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative bg-black rounded-lg overflow-hidden h-full ${
        isDragging ? 'dragging' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 動画プレイヤー */}
      <div className="absolute inset-0">
        {renderPlayer()}
      </div>

      {/* ミュート状態インジケーター（常に表示） */}
      <div className="absolute bottom-2 right-2 z-10">
        <div className={`p-1.5 rounded ${stream.isMuted ? 'bg-black/70' : 'bg-[var(--color-primary)]'}`}>
          {stream.isMuted ? (
            <VolumeX size={14} className="text-white/80" />
          ) : (
            <Volume2 size={14} className="text-white" />
          )}
        </div>
      </div>

      {/* オーバーレイコントロール */}
      <div
        className={`absolute inset-0 transition-opacity duration-150 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* 上部グラデーション */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/80 to-transparent" />

        {/* コントロールバー */}
        <div className="absolute top-0 inset-x-0 p-3 flex items-center justify-between">
          {/* ドラッグハンドル */}
          <button
            {...attributes}
            {...listeners}
            className="p-1.5 bg-black/60 hover:bg-black/80 rounded cursor-grab active:cursor-grabbing transition-colors"
          >
            <GripVertical size={16} className="text-white" />
          </button>

          {/* プラットフォームバッジ */}
          <div className="flex items-center gap-1.5 bg-black/60 px-2 py-1 rounded">
            <PlatformIcon size={14} style={{ color: platformColor }} />
            <span className="text-xs text-white/90">
              {stream.platform === 'youtube' ? 'YouTube' : 'Twitch'}
            </span>
          </div>

          {/* 右側ボタン */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => onToggleMute(stream.id)}
              className={`p-1.5 rounded transition-colors ${
                stream.isMuted
                  ? 'bg-black/60 hover:bg-black/80'
                  : 'bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]'
              }`}
            >
              {stream.isMuted ? (
                <VolumeX size={16} className="text-white" />
              ) : (
                <Volume2 size={16} className="text-white" />
              )}
            </button>
            <button
              onClick={() => onRemove(stream.id)}
              className="p-1.5 bg-black/60 hover:bg-red-600 rounded transition-colors"
            >
              <X size={16} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-surface)]">
      <span className="text-[var(--color-text-muted)] text-sm">{message}</span>
    </div>
  );
}
