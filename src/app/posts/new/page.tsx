"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";

export default function NewPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState<"転職" | "病気" | "薬" | "生活" | "雑談">("病気");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !author.trim()) {
      setError("すべての項目を入力してください");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setDebugInfo("投稿処理を開始します...");

    try {
      const postData = {
        title: title.trim(),
        content: content.trim(),
        author: author.trim(),
        category,
      };
      
      setDebugInfo(`投稿データを送信中: ${JSON.stringify(postData)}`);
      console.log('Submitting post data:', postData);
      console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);
      
      const result = await api.createPost(postData);
      console.log('Post created successfully:', result);
      setDebugInfo("投稿が成功しました！トップページにリダイレクトします...");
      
      // 少し待ってからリダイレクト
      setTimeout(() => {
        router.push("/");
      }, 1000);
      
    } catch (error) {
      console.error('Error creating post:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setError(`投稿エラー: ${errorMessage}`);
      setDebugInfo(`エラー詳細: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-primary hover:underline">
            ← トップページに戻る
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6">新規投稿</h1>

          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
              <div className="font-medium">エラーが発生しました</div>
              <div className="text-sm mt-1">{error}</div>
              <div className="text-xs mt-2 text-red-500">
                API URL: {process.env.NEXT_PUBLIC_API_URL || '設定されていません'}
              </div>
            </div>
          )}

          {debugInfo && (
            <div className="bg-blue-50 text-blue-700 p-4 rounded-md mb-6">
              <div className="font-medium">デバッグ情報</div>
              <div className="text-sm mt-1">{debugInfo}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                投稿者名
              </label>
              <input
                type="text"
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="投稿者名を入力してください"
              />
            </div>

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                タイトル
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="タイトルを入力してください"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                カテゴリー
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value as typeof category)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="転職">転職</option>
                <option value="病気">病気</option>
                <option value="薬">薬</option>
                <option value="生活">生活</option>
                <option value="雑談">雑談</option>
              </select>
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                本文
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={10}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="本文を入力してください"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "投稿中..." : "投稿する"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
} 