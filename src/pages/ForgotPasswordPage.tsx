import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Grid3X3, Mail, Lock, Loader2, ArrowLeft, CheckCircle, Eye, EyeOff } from 'lucide-react';

type Step = 'email' | 'code' | 'password' | 'complete';

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [codeDigits, setCodeDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Step 1: メールアドレス送信
  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // モック送信（後で Amplify resetPassword に置き換え）
      // await resetPassword({ username: email });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStep('code');
    } catch {
      setError('送信に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  // 確認コード入力ハンドラー
  const handleCodeChange = (index: number, value: string) => {
    // 数字のみ許可
    if (value && !/^\d$/.test(value)) return;

    const newDigits = [...codeDigits];
    newDigits[index] = value;
    setCodeDigits(newDigits);

    // 次の入力欄にフォーカス
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleCodeKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Backspaceで前の入力欄にフォーカス
    if (e.key === 'Backspace' && !codeDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleCodePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pastedData) {
      const newDigits = [...codeDigits];
      for (let i = 0; i < pastedData.length; i++) {
        newDigits[i] = pastedData[i];
      }
      setCodeDigits(newDigits);
      // 最後の入力欄またはペーストした最後の位置にフォーカス
      const focusIndex = Math.min(pastedData.length, 5);
      inputRefs.current[focusIndex]?.focus();
    }
  };

  // Step 2: コード確認
  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const code = codeDigits.join('');
    if (code.length !== 6) {
      setError('確認コードを6桁すべて入力してください');
      return;
    }

    setIsLoading(true);

    try {
      // モック検証（実際のAWSではコードの検証はパスワード変更時に行われる）
      await new Promise((resolve) => setTimeout(resolve, 500));
      setStep('password');
    } catch {
      setError('確認コードが正しくありません');
    } finally {
      setIsLoading(false);
    }
  };

  // Step 3: パスワード変更
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) {
      setError('パスワードが一致しません');
      return;
    }

    if (newPassword.length < 8) {
      setError('パスワードは8文字以上で入力してください');
      return;
    }

    setIsLoading(true);

    try {
      // モック確認（後で Amplify confirmResetPassword に置き換え）
      // await confirmResetPassword({
      //   username: email,
      //   confirmationCode: codeDigits.join(''),
      //   newPassword: newPassword
      // });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStep('complete');
    } catch {
      setError('リセットに失敗しました');
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
            StreamBoard
          </h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">
            パスワードをリセット
          </p>
        </div>

        {/* フォーム */}
        <div className="card p-6">
          {/* Step 1: メールアドレス入力 */}
          {step === 'email' && (
            <>
              <p className="text-sm text-[var(--color-text-muted)] mb-4">
                登録したメールアドレスを入力してください。確認コードを送信します。
              </p>
              <form onSubmit={handleSendCode} className="space-y-4">
                <div>
                  <label className="block text-sm text-[var(--color-text-muted)] mb-1.5">
                    メールアドレス
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-subtle)] pointer-events-none" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="mail@example.com"
                      className="input !pl-10"
                      required
                    />
                  </div>
                </div>

                {error && <p className="text-red-400 text-sm">{error}</p>}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-primary w-full justify-center disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      送信中...
                    </>
                  ) : (
                    '確認コードを送信'
                  )}
                </button>
              </form>
            </>
          )}

          {/* Step 2: コード入力 */}
          {step === 'code' && (
            <>
              <p className="text-sm text-[var(--color-text-muted)] mb-4">
                <span className="text-[var(--color-text)]">{email}</span> に送信された確認コードを入力してください。
              </p>
              <form onSubmit={handleVerifyCode} className="space-y-4">
                {/* 確認コード - 6桁個別入力 */}
                <div>
                  <label className="block text-sm text-[var(--color-text-muted)] mb-2">
                    確認コード
                  </label>
                  <div className="flex gap-2 justify-center" onPaste={handleCodePaste}>
                    {codeDigits.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => { inputRefs.current[index] = el; }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleCodeChange(index, e.target.value)}
                        onKeyDown={(e) => handleCodeKeyDown(index, e)}
                        className="w-11 h-12 text-center text-lg font-mono rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
                      />
                    ))}
                  </div>
                  <p className="text-xs text-[var(--color-text-subtle)] text-center mt-2">
                    コードは10分間有効です
                  </p>
                </div>

                {error && <p className="text-red-400 text-sm">{error}</p>}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-primary w-full justify-center disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      確認中...
                    </>
                  ) : (
                    '確認'
                  )}
                </button>
              </form>

            </>
          )}

          {/* Step 3: 新パスワード入力 */}
          {step === 'password' && (
            <>
              <p className="text-sm text-[var(--color-text-muted)] mb-4">
                新しいパスワードを入力してください。
              </p>
              <form onSubmit={handleResetPassword} className="space-y-4">
                {/* 新しいパスワード */}
                <div>
                  <label className="block text-sm text-[var(--color-text-muted)] mb-1.5">
                    新しいパスワード
                  </label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-subtle)] pointer-events-none" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="8文字以上"
                      className="input !pl-10 !pr-10"
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
                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-subtle)] pointer-events-none" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="パスワードを再入力"
                      className="input !pl-10"
                      required
                    />
                  </div>
                </div>

                {error && <p className="text-red-400 text-sm">{error}</p>}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-primary w-full justify-center disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      変更中...
                    </>
                  ) : (
                    'パスワードを変更'
                  )}
                </button>
              </form>

            </>
          )}

          {/* Step 4: 完了 */}
          {step === 'complete' && (
            <div className="text-center py-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500/20 rounded-full mb-4">
                <CheckCircle size={24} className="text-green-400" />
              </div>
              <h2 className="text-base font-medium text-[var(--color-text)] mb-2">
                パスワードを変更しました
              </h2>
              <p className="text-sm text-[var(--color-text-muted)] mb-6">
                新しいパスワードでログインしてください。
              </p>
              <button
                onClick={() => navigate('/login')}
                className="btn btn-primary w-full justify-center"
              >
                ログインへ
              </button>
            </div>
          )}

          {/* ログインに戻る（完了画面以外） */}
          {step !== 'complete' && (
            <div className="mt-6 pt-6 border-t border-[var(--color-border)]">
              <Link
                to="/login"
                className="flex items-center justify-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
              >
                <ArrowLeft size={14} />
                ログインに戻る
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
