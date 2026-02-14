# StreamBoard

YouTube・Twitchの配信を1画面で複数同時に視聴できるWebアプリ。

## 技術スタック

### フロントエンド
- React + JavaScript + Vite
- Tailwind CSS（スタイリング）
- @dnd-kit（ドラッグ&ドロップ）
- Lucide React（アイコン）
- React Router（ルーティング）
- aws-amplify（AWS SDK）

### AWS構成（Amplify Gen 2）

| サービス | 用途 |
|----------|------|
| AWS Amplify Gen 2 | 全体管理・ホスティング・CI/CD |
| Amazon Cognito | ユーザー認証（サインアップ/ログイン/パスワードリセット） |
| Amazon DynamoDB | レイアウト設定・お気に入りリストの保存 |
| AWS Lambda | 追加機能で必要な場合（MVP時点では不要） |

### DynamoDB テーブル設計（予定）

```
# Layoutsテーブル
- userId (PK): ユーザーID
- layoutId (SK): レイアウトID
- name: レイアウト名
- streams: 配信URL配列
- createdAt: 作成日時

# Favoritesテーブル（追加機能）
- userId (PK): ユーザーID
- streamUrl (SK): 配信URL
- platform: youtube | twitch
- addedAt: 追加日時
```

### Cognito 認証フロー

```
サインアップ → メール確認 → ログイン
パスワードリセット → 確認コード送信 → 新パスワード設定
```

## コマンド

```bash
npm run dev      # 開発サーバー起動 (localhost:5173)
npm run build    # 本番ビルド
npm run lint     # ESLint実行
npm run preview  # ビルド後のプレビュー
```

## ディレクトリ構成

```
src/
├── components/   # UIコンポーネント
├── hooks/        # カスタムフック
├── pages/        # ページコンポーネント
├── types/        # 型定義
└── utils/        # ユーティリティ関数
```

## コーディング規約

- コンポーネントは関数コンポーネントで記述
- スタイリングはTailwind CSSのユーティリティクラスを使用
- 状態管理は useState / useContext を使用（外部ライブラリ不使用）
- ファイル名はPascalCase（コンポーネント）、camelCase（その他）

## 主要ファイル

- `src/App.tsx` - ルーティング、認証状態管理
- `src/pages/MainPage.tsx` - メイン画面（配信タイル表示）
- `src/components/StreamTile/StreamTile.tsx` - 配信タイルコンポーネント
- `src/hooks/useStreams.ts` - 配信管理フック
- `src/hooks/useLayouts.ts` - レイアウト保存/読み込みフック

## MVP機能

### マルチストリーム表示
- YouTube・Twitchの配信をタイル形式で1画面に表示（iframe）
- 配信URLを入力して追加・削除
- ワンクリックで音声のON/OFF切り替え

### レイアウトカスタマイズ
- ドラッグ&ドロップで配信の配置変更
- タイルのリサイズ対応（ドラッグでサイズ変更）
- レイアウトの保存・読み込み（DynamoDB）

### ユーザー認証
- サインアップ・ログイン機能（Cognito）
- ログインは任意（未ログインでもアプリ使用可能）
- ログインするとレイアウトがクラウドに保存される
- パスワードリセット機能（確認コード方式）

## 注意事項

- 日本語でコメント・コミットメッセージを記述
- コンポーネント追加時は `src/components/` に専用フォルダを作成
- 新規ページ追加時は `src/pages/index.ts` にエクスポートを追加
