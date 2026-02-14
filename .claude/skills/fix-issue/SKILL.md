---
name: fix-issue
description: GitHub Issueを解決する。Issue番号を指定すると、内容を取得し、ブランチ作成から実装までを行う。使用例：/fix-issue 3
---

# GitHub Issue 解決

## 手順

1. `gh issue view <番号>` でIssue内容を取得
2. ブランチを作成: `git checkout -b feature/#<番号>-<内容>`
   - 例: `feature/#3-login-page`
3. 関連するコードを特定・分析
4. 実装計画を立てて提示
5. ユーザー承認後、実装を開始
6. 動作確認
7. コミット作成（`/commit` スキルを使用）

## ブランチ命名規則

```
feature/#<Issue番号>-<簡潔な説明>
```

例:
- `feature/#3-login-page`
- `feature/#5-stream-tile`
- `feature/#7-drag-drop`

## 実装時の注意

- 既存のコーディング規約に従う
- 変更は最小限に留める
- 関連するファイルへの影響を確認

## 完了後

- PRを作成するか確認（`/pr` スキルを使用）
