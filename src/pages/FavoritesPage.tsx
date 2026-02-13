import { Heart, Plus } from 'lucide-react';

export function FavoritesPage() {
  return (
    <div className="flex flex-col h-full">
      {/* サブヘッダー */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <span className="text-sm text-[var(--color-text-muted)]">保存した配信</span>
        <button className="btn btn-primary text-xs">
          <Plus size={14} />
          追加
        </button>
      </div>

      {/* 空の状態 */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-16 h-16 bg-[var(--color-surface-elevated)] rounded-2xl flex items-center justify-center mb-4">
          <Heart size={28} className="text-[var(--color-text-subtle)]" />
        </div>
        <h2 className="text-base font-medium text-[var(--color-text)] mb-1">
          お気に入りがありません
        </h2>
        <p className="text-sm text-[var(--color-text-muted)] text-center max-w-xs">
          配信をお気に入りに登録すると、ここからすぐにアクセスできます
        </p>
      </div>
    </div>
  );
}
