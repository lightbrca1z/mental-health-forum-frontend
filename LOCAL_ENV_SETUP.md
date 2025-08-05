# フロントエンド ローカル環境設定

## 1. ローカル環境用の.envファイルを作成

`mental-health-forum-frontend`フォルダ内で`.env`ファイルを作成し、以下の内容を追加：

```env
# Local Development Environment Variables

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# Development Settings
NODE_ENV=development

# Next.js Configuration
NEXT_PUBLIC_APP_NAME=Mental Health Forum
NEXT_PUBLIC_APP_DESCRIPTION=A supportive community for mental health discussions

# Optional: Analytics and Monitoring (if needed later)
# NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id_here
# NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn_here

# Optional: Feature Flags (if needed later)
# NEXT_PUBLIC_ENABLE_COMMENTS=true
# NEXT_PUBLIC_ENABLE_USER_PROFILES=false
```

## 2. 依存関係のインストール

```bash
cd mental-health-forum-frontend
npm install
```

## 3. 開発サーバーの起動

```bash
npm run dev
```

## 4. 確認方法

- **フロントエンド**: http://localhost:3000
- **API接続**: バックエンドが http://localhost:8000 で起動していることを確認

## 5. トラブルシューティング

### API接続エラー
- バックエンドサーバーが起動しているか確認
- `.env`ファイルの`NEXT_PUBLIC_API_URL`が正しく設定されているか確認
- CORS設定が正しいか確認

### ビルドエラー
```bash
npm run build
```

### 依存関係エラー
```bash
rm -rf node_modules package-lock.json
npm install
```

## 6. 開発時の注意点

- バックエンドとフロントエンドの両方が起動していることを確認
- 環境変数の変更後は開発サーバーを再起動
- APIの変更後はフロントエンドのキャッシュをクリア 