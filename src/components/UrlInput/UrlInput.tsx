import { useState } from 'react';
import { Plus, AlertCircle } from 'lucide-react';

interface UrlInputProps {
  onAdd: (url: string) => { success: boolean; error?: string };
  disabled?: boolean;
}

export function UrlInput({ onAdd, disabled }: UrlInputProps) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const result = onAdd(url.trim());
    if (result.success) {
      setUrl('');
    } else {
      setError(result.error || 'エラー');
    }
  };

  return (
    <div className="w-full max-w-2xl">
      <form onSubmit={handleSubmit} className="flex gap-3 items-center">
        <div className="flex-1 relative">
          <input
            type="text"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setError('');
            }}
            placeholder="YouTubeまたはTwitchのURLを入力"
            disabled={disabled}
            className="input text-base h-10 w-full px-4"
          />
          {error && (
            <div className="absolute left-0 top-full mt-1 flex items-center gap-1 text-red-400 text-xs z-10">
              <AlertCircle size={12} />
              {error}
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={disabled || !url.trim()}
          className="btn btn-primary h-10 text-base px-4 disabled:opacity-50 shrink-0"
        >
          <Plus size={18} />
          <span className="hidden sm:inline">追加</span>
        </button>
      </form>
    </div>
  );
}
