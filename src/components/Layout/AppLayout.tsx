import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../Sidebar/Sidebar';

interface AppLayoutProps {
  userName?: string;
  onLogout: () => void;
}

export interface LayoutContext {
  openSidebar: () => void;
}

export function AppLayout({ userName, onLogout }: AppLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const context: LayoutContext = {
    openSidebar: () => setIsSidebarOpen(true),
  };

  return (
    <div className="h-screen flex flex-col bg-[var(--color-bg)]">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        userName={userName}
        onLogout={onLogout}
      />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Outlet context={context} />
      </main>
    </div>
  );
}
