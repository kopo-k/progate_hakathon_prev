import { useOutletContext } from 'react-router-dom';
import { Menu, Grid3X3 } from 'lucide-react';
import { UrlInput } from '../components/UrlInput/UrlInput';
import { StreamGrid } from '../components/StreamGrid/StreamGrid';
import { EmptyState } from '../components/EmptyState/EmptyState';
import { useStreams } from '../hooks/useStreams';
import type { LayoutContext } from '../components/Layout/AppLayout';

export function MainPage() {
  const { openSidebar } = useOutletContext<LayoutContext>();
  const { streams, addStream, removeStream, toggleMute, reorderStreams, canAddMore } =
    useStreams();

  return (
    <div className="flex flex-col h-full">
      {/* 統合ヘッダー: ハンバーガー + ロゴ + URL入力 */}
      <header className="h-12 bg-[var(--color-surface)] border-b border-[var(--color-border)] flex items-center px-2 gap-3 shrink-0">
        {/* メニューボタン */}
        <button
          onClick={openSidebar}
          className="p-2 rounded-md hover:bg-[var(--color-surface-hover)] text-[var(--color-text-muted)] transition-colors shrink-0"
        >
          <Menu size={20} />
        </button>

        {/* ロゴ */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 bg-[var(--color-primary)] rounded-md flex items-center justify-center">
            <Grid3X3 size={18} className="text-white" />
          </div>
          <span className="font-semibold text-base text-[var(--color-text)] hidden sm:block">
            MultiView
          </span>
        </div>

        {/* URL入力 */}
        <div className="flex-1 flex items-center gap-3">
          <UrlInput onAdd={addStream} disabled={!canAddMore} />
          <span className="text-sm text-[var(--color-text-muted)] shrink-0">
            {streams.length}/4
          </span>
        </div>
      </header>

      {/* メインコンテンツ */}
      <div className="flex-1 min-h-0 p-2">
        {streams.length === 0 ? (
          <EmptyState />
        ) : (
          <StreamGrid
            streams={streams}
            onReorder={reorderStreams}
            onToggleMute={toggleMute}
            onRemove={removeStream}
          />
        )}
      </div>
    </div>
  );
}
