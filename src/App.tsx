import { useState, useCallback } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { AppLayout } from './components';
import {
  MainPage,
  LoginPage,
  SignupPage,
  SettingsPage,
  FavoritesPage,
} from './pages';

interface User {
  id: string;
  name: string;
  email: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null);

  // モック認証（後でAmplify Cognitoに置き換え）
  const handleLogin = useCallback(async (email: string, _password: string): Promise<boolean> => {
    // シミュレート遅延
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // モックログイン（実際の認証に置き換え）
    if (email) {
      setUser({
        id: '1',
        name: email.split('@')[0],
        email,
      });
      return true;
    }
    return false;
  }, []);

  const handleSignup = useCallback(
    async (name: string, email: string, _password: string): Promise<boolean> => {
      // シミュレート遅延
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // モック登録（実際の認証に置き換え）
      if (name && email) {
        setUser({
          id: '1',
          name,
          email,
        });
        return true;
      }
      return false;
    },
    []
  );

  const handleLogout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* 認証済みユーザー用ルート */}
        {user ? (
          <Route element={<AppLayout userName={user.name} onLogout={handleLogout} />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        ) : (
          <>
            {/* 未認証ユーザー用ルート */}
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/signup" element={<SignupPage onSignup={handleSignup} />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
