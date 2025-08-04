# Railway 環境変数設定ガイド

## 必須環境変数

Railwayダッシュボードの「Variables」タブで以下の環境変数を設定してください：

```
NEXT_PUBLIC_API_URL=https://mental-health-forum-backend-production.up.railway.app/api
```

## オプション環境変数

```
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

## 設定手順

1. Railwayダッシュボードにログイン
2. フロントエンドプロジェクトを選択
3. 「Variables」タブをクリック
4. 「New Variable」をクリック
5. 上記の環境変数を追加

## 重要な注意事項

- `NEXT_PUBLIC_API_URL`は必ずバックエンドのURLに`/api`を付けて設定してください
- 環境変数を変更した後は、アプリケーションが自動的に再デプロイされます
- デプロイ完了後、デバッグ情報でAPI URLが正しく設定されているか確認してください

## トラブルシューティング

### API接続エラーが発生する場合

1. バックエンドが正常に動作しているか確認
2. `NEXT_PUBLIC_API_URL`が正しく設定されているか確認
3. デバッグ情報の「API接続テスト」ボタンで接続をテスト
4. ブラウザの開発者ツールでネットワークタブを確認

### 環境変数が反映されない場合

1. Railwayダッシュボードで環境変数が正しく設定されているか確認
2. アプリケーションが再デプロイされているか確認
3. ブラウザのキャッシュをクリア 