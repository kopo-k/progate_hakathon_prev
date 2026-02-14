import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid3X3, Save, FolderOpen, X, LogOut } from 'lucide-react';
import { UrlInput } from '../components/UrlInput/UrlInput';
import { StreamGrid } from '../components/StreamGrid/StreamGrid';
import { EmptyState } from '../components/EmptyState/EmptyState';
import { useStreams } from '../hooks/useStreams';
import { useLayouts } from '../hooks/useLayouts';
import type { Stream } from '../types';

interface User {
  id: string;
  name: string;
  email: string;
}

interface MainPageProps {
  user: User | null;
  onLogout: () => void;
}

export function MainPage({ user, onLogout }: MainPageProps) {
  const { streams, addStream, removeStream, toggleMute, reorderStreams, setAllStreams, canAddMore } = useStreams();
  const { layouts, saveLayout, deleteLayout } = useLayouts();

  const [showLayoutMenu, setShowLayoutMenu] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [layoutName, setLayoutName] = useState('');

  const handleSaveClick = () => {
    if (streams.length === 0) return;
    setLayoutName('');
    setShowSaveModal(true);
  };

  const handleSaveLayout = () => {
    if (!layoutName.trim() || streams.length === 0) return;
    saveLayout(layoutName.trim(), streams);
    setShowSaveModal(false);
    setLayoutName('');
  };

  const handleLoadLayout = (layoutStreams: Pick<Stream, 'url' | 'platform'>[]) => {
    const newStreams: Stream[] = layoutStreams.map((s, index) => ({
      id: Date.now().toString() + index,
      url: s.url,
      platform: s.platform,
      isMuted: index > 0,
    }));
    setAllStreams(newStreams);
    setShowLayoutMenu(false);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* ヘッダー */}
      <header className="h-16 bg-[var(--color-surface)] border-b border-[var(--color-border)] flex items-center px-4 shrink-0">
        {/* 左: ロゴ */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-10 h-10 bg-[var(--color-primary)] rounded-lg flex items-center justify-center">
            <Grid3X3 size={22} className="text-white" />
          </div>
          <span className="font-semibold text-lg text-[var(--color-text)] hidden sm:block">
            StreamBoard
          </span>
        </div>

        {/* 中央: URL入力 */}
        <div className="flex-1 flex justify-center px-4">
          <UrlInput onAdd={addStream} disabled={!canAddMore} />
        </div>

        {/* 右: レイアウト読み込み + 保存 + カウント */}
        <div className="flex items-center gap-2 shrink-0">
          {/* レイアウト読み込み */}
          <div className="relative">
            <button
              onClick={() => setShowLayoutMenu(!showLayoutMenu)}
              className="p-2.5 rounded-md hover:bg-[var(--color-surface-hover)] text-[var(--color-text-muted)] transition-colors"
              title="保存したレイアウト"
            >
              <FolderOpen size={20} />
            </button>

            {showLayoutMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowLayoutMenu(false)} />
                <div className="absolute right-0 top-full mt-2 w-72 bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-lg shadow-lg z-50 overflow-hidden">
                  <div className="px-3 py-2 border-b border-[var(--color-border)] text-sm font-medium text-[var(--color-text)]">
                    保存したレイアウト
                  </div>
                  {layouts.length === 0 ? (
                    <div className="px-3 py-4 text-sm text-[var(--color-text-muted)] text-center">
                      保存されたレイアウトはありません
                    </div>
                  ) : (
                    <div className="max-h-64 overflow-y-auto">
                      {layouts.map((layout) => (
                        <div key={layout.id} className="flex items-center gap-2 px-3 py-2 hover:bg-[var(--color-surface-hover)]">
                          <button
                            onClick={() => handleLoadLayout(layout.streams)}
                            className="flex-1 text-left"
                          >
                            <div className="text-sm text-[var(--color-text)]">{layout.name}</div>
                            <div className="text-xs text-[var(--color-text-muted)]">
                              {layout.streams.length}つの配信
                            </div>
                          </button>
                          <button
                            onClick={() => deleteLayout(layout.id)}
                            className="p-1 text-[var(--color-text-muted)] hover:text-red-400"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* 保存ボタン */}
          <button
            onClick={handleSaveClick}
            disabled={streams.length === 0}
            className={`p-2.5 rounded-md transition-colors ${
              streams.length === 0
                ? 'text-[var(--color-text-subtle)] cursor-not-allowed'
                : 'hover:bg-[var(--color-surface-hover)] text-[var(--color-text-muted)]'
            }`}
            title="レイアウトを保存"
          >
            <Save size={20} />
          </button>

          {/* 認証ボタン */}
          {user ? (
            <button
              onClick={onLogout}
              className="p-2.5 rounded-md hover:bg-[var(--color-surface-hover)] text-[var(--color-text-muted)] transition-colors"
              title="ログアウト"
            >
              <LogOut size={20} />
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-3 py-1.5 text-sm border border-[var(--color-border)] text-[var(--color-text-muted)] rounded-md hover:border-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
              >
                ログイン
              </Link>
              <Link
                to="/signup"
                className="px-3 py-1.5 text-sm border border-[var(--color-border)] text-[var(--color-text-muted)] rounded-md hover:border-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
              >
                新規登録
              </Link>
            </div>
          )}

        </div>
      </header>

      {/* メインコンテンツ */}
      <div className="flex-1 min-h-0 p-2 flex flex-col">
        {streams.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <EmptyState />
          </div>
        ) : (
          <div className="flex-1">
            <StreamGrid
              streams={streams}
              onReorder={reorderStreams}
              onToggleMute={toggleMute}
              onRemove={removeStream}
            />
          </div>
        )}
      </div>

      {/* レイアウト保存モーダル */}
      {showSaveModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowSaveModal(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-lg shadow-lg z-50 p-4">
            <h3 className="text-lg font-semibold text-[var(--color-text)] mb-4">レイアウトを保存</h3>
            <input
              type="text"
              value={layoutName}
              onChange={(e) => setLayoutName(e.target.value)}
              placeholder="レイアウト名を入力"
              className="input w-full mb-4"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSaveLayout();
                if (e.key === 'Escape') setShowSaveModal(false);
              }}
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowSaveModal(false)}
                className="btn px-4 py-2 text-sm"
              >
                キャンセル
              </button>
              <button
                onClick={handleSaveLayout}
                disabled={!layoutName.trim()}
                className="btn btn-primary px-4 py-2 text-sm disabled:opacity-50"
              >
                保存
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
