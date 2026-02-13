import { useOutletContext } from 'react-router-dom';
import { Menu, Grid3X3, User, Bell, Monitor, HelpCircle, ExternalLink } from 'lucide-react';
import type { LayoutContext } from '../components/Layout/AppLayout';

export function SettingsPage() {
  const { openSidebar } = useOutletContext<LayoutContext>();

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
          <span className="text-base text-[var(--color-text)]">設定</span>
        </div>

        {/* 右: スペーサー */}
        <div className="w-[140px] shrink-0" />
      </header>

      {/* コンテンツ */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-xl mx-auto space-y-4">
          <SettingsSection icon={<User size={18} />} title="アカウント">
            <SettingsItem label="メールアドレス" value="user@example.com" />
            <SettingsItem label="ユーザー名" value="ユーザー" />
            <button className="text-sm text-[var(--color-primary)] hover:underline mt-2">
              パスワードを変更
            </button>
          </SettingsSection>

          <SettingsSection icon={<Bell size={18} />} title="通知">
            <SettingsToggle label="配信開始通知" defaultChecked />
            <SettingsToggle label="アプリ内通知" defaultChecked />
          </SettingsSection>

          <SettingsSection icon={<Monitor size={18} />} title="表示">
            <SettingsToggle label="ダークモード" defaultChecked />
          </SettingsSection>

          <SettingsSection icon={<HelpCircle size={18} />} title="その他">
            <a href="#" className="flex items-center justify-between py-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)]">
              利用規約
              <ExternalLink size={14} />
            </a>
            <a href="#" className="flex items-center justify-between py-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)]">
              プライバシーポリシー
              <ExternalLink size={14} />
            </a>
            <div className="pt-4 border-t border-[var(--color-border)] mt-2">
              <p className="text-xs text-[var(--color-text-subtle)]">MultiView v1.0.0</p>
            </div>
          </SettingsSection>
        </div>
      </div>
    </div>
  );
}

function SettingsSection({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="card p-4">
      <div className="flex items-center gap-2 mb-3 text-[var(--color-text-muted)]">
        {icon}
        <span className="font-medium text-[var(--color-text)]">{title}</span>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function SettingsItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="text-sm text-[var(--color-text-muted)]">{label}</span>
      <span className="text-sm text-[var(--color-text)]">{value}</span>
    </div>
  );
}

function SettingsToggle({ label, defaultChecked = false }: { label: string; defaultChecked?: boolean }) {
  return (
    <label className="flex items-center justify-between py-1 cursor-pointer">
      <span className="text-sm text-[var(--color-text-muted)]">{label}</span>
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        className="w-9 h-5 rounded-full appearance-none bg-[var(--color-surface-elevated)] checked:bg-[var(--color-primary)] cursor-pointer transition-colors relative before:content-[''] before:absolute before:top-0.5 before:left-0.5 before:w-4 before:h-4 before:rounded-full before:bg-white before:transition-transform checked:before:translate-x-4"
      />
    </label>
  );
}
