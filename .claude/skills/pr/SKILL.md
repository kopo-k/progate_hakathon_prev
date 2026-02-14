---
name: pr
description: Pull Requestを作成する。現在のブランチの変更内容を確認し、PRを作成する。Issue番号があれば自動でcloses記法を追加。
---

# Pull Request 作成

## 手順

1. 現在のブランチ名からIssue番号を抽出
2. `git log main..HEAD` で変更コミットを確認
3. `git diff main...HEAD` で差分を確認
4. PRタイトルと説明文を生成
5. `gh pr create` でPRを作成

## Issue番号の取得

```bash
git branch --show-current | grep -oE '#[0-9]+'
```

## PRテンプレート

```markdown
## 概要
<!-- 変更内容の要約 -->

## 変更点
- 変更1
- 変更2

## 関連Issue
closes #<Issue番号>

## テスト方法
<!-- 動作確認の手順 -->
```

## タイトル形式

```
#<Issue番号> <type>: <subject>
```

例:
- `#3 feat: ログイン画面を作成`
- `#5 fix: ミュート状態が保持されない問題を修正`

## コマンド例

```bash
gh pr create --title "#3 feat: ログイン画面を作成" --body "## 概要
ログイン画面を実装

## 変更点
- メールアドレス入力フォーム
- パスワード入力フォーム
- ログインボタン

## 関連Issue
closes #3

## テスト方法
1. /login にアクセス
2. メールアドレスとパスワードを入力
3. ログインボタンをクリック"
```

## 注意事項

- mainブランチへの直接プッシュは禁止
- PRは日本語で記述
- `closes #番号` でIssueと自動リンク（マージ時に自動クローズ）
- プッシュ前に `git push origin <ブランチ名>` を実行
