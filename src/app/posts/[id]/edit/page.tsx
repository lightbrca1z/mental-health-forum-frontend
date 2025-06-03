"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api, Post } from "@/lib/api";

interface EditPostPageProps {
  params: {
    id: string;
  };
}

export default function EditPostPage({ params }: EditPostPageProps) {
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState<"転職" | "病気" | "薬" | "生活" | "雑談">("転職");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await api.getPost(Number(params.id));
        setPost(data);
        setTitle(data.title);
        setContent(data.content);
        setAuthor(data.author);
        setCategory(data.category);
      } catch (err) {
        setError("投稿の取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !author.trim()) return;
    setIsSubmitting(true);
    setError(null);
    try {
      await api.updatePost(Number(params.id), {
        title,
        content,
        category,
        author,
      });
      router.push(`/posts/${params.id}`);
    } catch (err) {
      setError("投稿の更新に失敗しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <main className="min-h-screen bg-background p-8"><div className="max-w-4xl mx-auto"><div className="text-center">読み込み中...</div></div></main>;
  }

  if (error || !post) {
    return <main className="min-h-screen bg-background p-8"><div className="max-w-4xl mx-auto"><div className="text-center text-red-500">{error || "投稿が見つかりません"}</div><div className="mt-4 text-center"><Link href="/" className="text-primary hover:underline">トップページに戻る</Link></div></div></main>;
  }

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href={`/posts/${params.id}`} className="text-primary hover:underline">
            ← 投稿詳細に戻る
          </Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6">投稿を編集</h1>
          {error && <div className="bg-red-50 text-red-500 p-4 rounded-md mb-6">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">投稿者名</label>
              <input type="text" id="author" value={author} onChange={e => setAuthor(e.target.value)} required className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" placeholder="投稿者名を入力してください" />
            </div>
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">タイトル</label>
              <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} required className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" placeholder="タイトルを入力してください" />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">カテゴリー</label>
              <select id="category" value={category} onChange={e => setCategory(e.target.value as typeof category)} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="転職">転職</option>
                <option value="病気">病気</option>
                <option value="薬">薬</option>
                <option value="生活">生活</option>
                <option value="雑談">雑談</option>
              </select>
            </div>
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">本文</label>
              <textarea id="content" value={content} onChange={e => setContent(e.target.value)} required rows={10} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" placeholder="本文を入力してください" />
            </div>
            <div className="flex justify-end">
              <button type="submit" disabled={isSubmitting} className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50">
                {isSubmitting ? "更新中..." : "更新する"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
} 