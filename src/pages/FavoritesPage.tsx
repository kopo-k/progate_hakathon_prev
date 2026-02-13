import { useOutletContext } from 'react-router-dom';
import { Menu, Grid3X3, Heart, X } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';
import type { LayoutContext } from '../components/Layout/AppLayout';

export function FavoritesPage() {
  const { openSidebar } = useOutletContext<LayoutContext>();
  const { favorites, removeFavorite } = useFavorites();

  return (
    <div className="flex flex-col h-full min-h-0 flex-1">
      {/* ヘッダー */}
      <header className="h-16 bg-[var(--color-surface)] border-b border-[var(--color-border)] flex items-center px-4 shrink-0">
        {/* 左: メニューボタン + ロゴ */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={openSidebar}
            className="p-2.5 rounded-md hover:bg-[var(--color-surface-hover)] text-[var(--color-text-muted)] transition-colors"
          >
            <Menu size={24} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[var(--color-primary)] rounded-lg flex items-center justify-center">
              <Grid3X3 size={22} className="text-white" />
            </div>
            <span className="font-semibold text-lg text-[var(--color-text)] hidden sm:block">
              MultiView
            </span>
          </div>
        </div>

        {/* 中央: ページタイトル */}
        <div className="flex-1 flex justify-center">
          <span className="text-base text-[var(--color-text)]">お気に入り</span>
        </div>

        {/* 右: スペーサー */}
        <div className="w-[140px] shrink-0" />
      </header>

      {/* コンテンツ */}
      {favorites.length === 0 ? (
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
      ) : (
        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-2xl mx-auto space-y-2">
            {favorites.map((fav) => (
              <div
                key={fav.id}
                className="flex items-center gap-3 p-3 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)]"
              >
                <div className="flex-1">
                  <div className="text-sm font-medium text-[var(--color-text)]">{fav.name}</div>
                  <div className="text-xs text-[var(--color-text-muted)] capitalize">{fav.platform}</div>
                </div>
                <button
                  onClick={() => removeFavorite(fav.id)}
                  className="p-2 text-[var(--color-text-muted)] hover:text-red-400 hover:bg-[var(--color-surface-hover)] rounded-md transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
