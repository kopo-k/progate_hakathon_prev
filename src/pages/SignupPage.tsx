import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid3X3, Mail, Lock, User, Eye, EyeOff, Loader2 } from 'lucide-react';

interface SignupPageProps {
  onSignup: (name: string, email: string, password: string) => Promise<boolean>;
}

export function SignupPage({ onSignup }: SignupPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('パスワードが一致しません');
      return;
    }

    if (password.length < 8) {
      setError('パスワードは8文字以上で入力してください');
      return;
    }

    setIsLoading(true);

    try {
      const success = await onSignup(name, email, password);
      if (!success) {
        setError('登録に失敗しました');
      }
    } catch {
      setError('登録に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* ロゴ */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-[var(--color-primary)] rounded-xl mb-4">
            <Grid3X3 size={24} className="text-white" />
          </div>
          <h1 className="text-xl font-bold text-[var(--color-text)]">
            MultiView
          </h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">
            アカウント作成
          </p>
        </div>

        {/* フォーム */}
        <div className="card p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* ユーザー名 */}
            <div>
              <label className="block text-sm text-[var(--color-text-muted)] mb-1.5">
                ユーザー名
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-subtle)]" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="ユーザー名"
                  className="input pl-9"
                  required
                />
              </div>
            </div>

            {/* メール */}
            <div>
              <label className="block text-sm text-[var(--color-text-muted)] mb-1.5">
                メールアドレス
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-subtle)]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="mail@example.com"
                  className="input pl-9"
                  required
                />
              </div>
            </div>

            {/* パスワード */}
            <div>
              <label className="block text-sm text-[var(--color-text-muted)] mb-1.5">
                パスワード
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-subtle)]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="8文字以上"
                  className="input pl-9 pr-9"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-subtle)] hover:text-[var(--color-text)]"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* パスワード確認 */}
            <div>
              <label className="block text-sm text-[var(--color-text-muted)] mb-1.5">
                パスワード（確認）
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-subtle)]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="パスワードを再入力"
                  className="input pl-9"
                  required
                />
              </div>
            </div>

            {/* エラー */}
            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}

            {/* ボタン */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary w-full justify-center disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  登録中...
                </>
              ) : (
                'アカウントを作成'
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[var(--color-border)] text-center">
            <p className="text-sm text-[var(--color-text-muted)]">
              すでにアカウントがある場合は{' '}
              <Link to="/login" className="text-[var(--color-primary)] hover:underline">
                ログイン
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
