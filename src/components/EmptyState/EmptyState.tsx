import { Tv, Youtube, Twitch } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center px-4">
      {/* アイコン */}
      <div className="w-20 h-20 bg-[var(--color-surface-elevated)] rounded-2xl flex items-center justify-center mb-6">
        <Tv size={36} className="text-[var(--color-text-subtle)]" />
      </div>

      <h2 className="text-xl font-semibold text-[var(--color-text)] mb-2">
        配信を追加
      </h2>

      <p className="text-[var(--color-text-muted)] text-center max-w-sm mb-8 text-sm leading-relaxed">
        上の入力欄にYouTubeやTwitchのURLを貼り付けて、最大4つの配信を同時視聴できます
      </p>

      {/* 対応プラットフォーム */}
      <div className="flex gap-6">
        <div className="flex items-center gap-2 text-[var(--color-text-subtle)]">
          <Youtube size={20} className="text-[#ff0000]" />
          <span className="text-sm">YouTube</span>
        </div>
        <div className="flex items-center gap-2 text-[var(--color-text-subtle)]">
          <Twitch size={20} className="text-[#9147ff]" />
          <span className="text-sm">Twitch</span>
        </div>
      </div>
    </div>
  );
}
