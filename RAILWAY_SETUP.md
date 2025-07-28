# Frontend Railway デプロイ設定ガイド

## 環境変数の設定

Railwayダッシュボードの「Variables」タブで以下の環境変数を設定してください：

### 必須環境変数
```
NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app/api
```

### オプション環境変数
```
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

## デプロイ手順

1. **Railwayでプロジェクトを作成**
   - GitHubリポジトリを選択
   - mental-health-forum-frontendディレクトリを指定

2. **環境変数を設定**
   - 上記の環境変数をRailwayダッシュボードで設定
   - **重要**: `NEXT_PUBLIC_API_URL`にBackendのURLを設定

3. **デプロイ実行**
   - Railwayが自動的にNIXPACKSでビルド
   - Next.jsアプリケーションが起動

## Backendとの連携

### Backend URLの設定
Backendがデプロイされたら、そのURLをFrontendの環境変数に設定：

```
NEXT_PUBLIC_API_URL=https://mental-health-forum-backend-production.up.railway.app/api
```

### CORS設定の確認
BackendのCORS設定でFrontendのドメインが許可されていることを確認：

```php
// Backendのconfig/cors.php
'allowed_origins' => [
    'https://mental-health-forum-frontend-production.up.railway.app'
],
```

## トラブルシューティング

### よくある問題

1. **API接続エラー**
   - `NEXT_PUBLIC_API_URL`が正しく設定されているか確認
   - Backendが正常に動作しているか確認

2. **ビルドエラー**
   - TypeScriptエラーがないか確認
   - 依存関係が正しくインストールされているか確認

3. **ポートエラー**
   - `$PORT`環境変数がRailwayによって自動設定されることを確認

4. **ヘルスチェックエラー**
   - アプリケーションが正常に起動しているか確認

## 動作確認

デプロイ後、以下のURLで動作確認：

- フロントエンド: `https://your-frontend-url.railway.app`
- API接続: 投稿一覧が表示されることを確認

## 開発環境でのテスト

ローカルでテストする場合：

```bash
# Backendを起動
cd mental-health-forum-backend
php artisan serve

# Frontendを起動（別ターミナル）
cd mental-health-forum-frontend
npm run dev
```

環境変数：
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
``` 