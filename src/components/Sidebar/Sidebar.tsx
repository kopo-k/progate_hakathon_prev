import { NavLink } from 'react-router-dom';
import { X, Tv, Heart, Settings, LogOut, User } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
  onLogout: () => void;
}

export function Sidebar({ isOpen, onClose, userName, onLogout }: SidebarProps) {
  return (
    <>
      {/* オーバーレイ */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}

      {/* サイドバー */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[var(--color-surface)] border-r border-[var(--color-border)] z-50 transform transition-transform duration-200 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* ヘッダー */}
        <div className="h-12 flex items-center justify-between px-4 border-b border-[var(--color-border)]">
          <span className="font-semibold text-[var(--color-text)]">メニュー</span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-[var(--color-surface-hover)] text-[var(--color-text-muted)]"
          >
            <X size={18} />
          </button>
        </div>

        {/* ナビゲーション */}
        <nav className="p-3 space-y-1">
          <NavItem to="/" icon={<Tv size={18} />} label="視聴" onClick={onClose} />
          <NavItem to="/favorites" icon={<Heart size={18} />} label="お気に入り" onClick={onClose} />
          <NavItem to="/settings" icon={<Settings size={18} />} label="設定" onClick={onClose} />
        </nav>

        {/* ユーザー */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-[var(--color-border)]">
          {userName && (
            <div className="flex items-center gap-3 px-3 py-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-[var(--color-surface-elevated)] flex items-center justify-center">
                <User size={16} className="text-[var(--color-text-muted)]" />
              </div>
              <span className="text-sm text-[var(--color-text-muted)] truncate">
                {userName}
              </span>
            </div>
          )}
          <button
            onClick={() => {
              onClose();
              onLogout();
            }}
            className="w-full flex items-center gap-3 px-3 py-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] rounded-md transition-colors"
          >
            <LogOut size={18} />
            <span className="text-sm">ログアウト</span>
          </button>
        </div>
      </aside>
    </>
  );
}

function NavItem({ to, icon, label, onClick }: { to: string; icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors ${
          isActive
            ? 'bg-[var(--color-surface-hover)] text-[var(--color-text)]'
            : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]'
        }`
      }
    >
      {icon}
      <span className="text-sm">{label}</span>
    </NavLink>
  );
}
