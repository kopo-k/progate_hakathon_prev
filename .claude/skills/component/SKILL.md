---
name: component
description: 新しいReactコンポーネントを作成する。コンポーネント名を指定すると、適切なディレクトリ構成でファイルを生成する。使用例：/component Button
---

# Reactコンポーネント作成

## 手順

1. コンポーネント名を確認
2. `src/components/<ComponentName>/` フォルダを作成
3. `<ComponentName>.tsx` ファイルを作成
4. 必要に応じて `index.ts` でエクスポート

## ファイル構成

```
src/components/
└── ComponentName/
    ├── ComponentName.tsx    # メインコンポーネント
    └── index.ts             # エクスポート（任意）
```

## コンポーネントテンプレート

```tsx
interface ComponentNameProps {
  // props定義
}

export function ComponentName({ }: ComponentNameProps) {
  return (
    <div>
      {/* コンテンツ */}
    </div>
  );
}
```

## 規約

- 関数コンポーネントを使用
- Props型は `interface` で定義
- スタイリングはTailwind CSSを使用
- コンポーネント名はPascalCase
