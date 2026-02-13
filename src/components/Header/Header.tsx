import { Menu, Grid3X3 } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
  children?: React.ReactNode;
}

export function Header({ onMenuClick, children }: HeaderProps) {
  return (
    <header className="h-12 bg-[var(--color-surface)] border-b border-[var(--color-border)] flex items-center px-2 gap-2 shrink-0">
      {/* メニューボタン */}
      <button
        onClick={onMenuClick}
        className="p-2 rounded-md hover:bg-[var(--color-surface-hover)] text-[var(--color-text-muted)] transition-colors"
      >
        <Menu size={20} />
      </button>

      {/* ロゴ */}
      <div className="flex items-center gap-2 shrink-0">
        <div className="w-7 h-7 bg-[var(--color-primary)] rounded-md flex items-center justify-center">
          <Grid3X3 size={16} className="text-white" />
        </div>
        <span className="font-semibold text-[var(--color-text)] hidden sm:block">
          MultiView
        </span>
      </div>

      {/* URL入力など */}
      <div className="flex-1 flex justify-end">
        {children}
      </div>
    </header>
  );
}
