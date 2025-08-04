'use client';

import { useState } from 'react';

export default function DebugInfo() {
  const [isVisible, setIsVisible] = useState(false);
  const [apiTestResult, setApiTestResult] = useState<string>('');

  const debugInfo = {
    'NEXT_PUBLIC_API_URL': process.env.NEXT_PUBLIC_API_URL || '設定されていません',
    'NODE_ENV': process.env.NODE_ENV || '設定されていません',
    'Current URL': typeof window !== 'undefined' ? window.location.href : 'SSR',
    'User Agent': typeof window !== 'undefined' ? window.navigator.userAgent : 'SSR',
  };

  const testApiConnection = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://mental-health-forum-backend-production.up.railway.app/api';
      const response = await fetch(`${apiUrl}/debug`);
      if (response.ok) {
        const data = await response.json();
        setApiTestResult(`✅ API接続成功: ${JSON.stringify(data, null, 2)}`);
      } else {
        setApiTestResult(`❌ API接続失敗: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      setApiTestResult(`❌ API接続エラー: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="bg-gray-800 text-white px-3 py-2 rounded text-sm"
      >
        デバッグ情報
      </button>
      
      {isVisible && (
        <div className="absolute bottom-full right-0 mb-2 bg-white border border-gray-300 rounded-lg p-4 shadow-lg max-w-md">
          <h3 className="font-bold mb-2">デバッグ情報</h3>
          <div className="space-y-1 text-sm">
            {Object.entries(debugInfo).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="font-medium">{key}:</span>
                <span className="text-gray-600 break-all">{value}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-4">
            <button
              onClick={testApiConnection}
              className="bg-blue-500 text-white px-2 py-1 rounded text-xs mr-2"
            >
              API接続テスト
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(JSON.stringify(debugInfo, null, 2));
                alert('デバッグ情報をクリップボードにコピーしました');
              }}
              className="bg-green-500 text-white px-2 py-1 rounded text-xs"
            >
              コピー
            </button>
          </div>
          
          {apiTestResult && (
            <div className="mt-2 p-2 bg-gray-100 rounded text-xs">
              <div className="font-medium mb-1">API接続テスト結果:</div>
              <pre className="whitespace-pre-wrap text-xs">{apiTestResult}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 