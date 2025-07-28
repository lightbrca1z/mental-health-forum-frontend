"use client";

import React from 'react';
import { useState, useEffect } from "react";
import Link from "next/link";
import { Post, api } from "@/lib/api";
import DebugInfo from "@/components/DebugInfo";

type Category = Post['category'];

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log('Starting to fetch posts...');
        const data = await api.getPosts();
        console.log('Posts fetched successfully:', data);
        setPosts(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching posts:', err);
        const errorMessage = err instanceof Error ? err.message : '投稿の取得に失敗しました';
        setError(`投稿の取得に失敗しました: ${errorMessage}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = selectedCategory === "all"
    ? posts
    : posts.filter(post => post.category === selectedCategory);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">読み込み中...</div>
        </div>
        <DebugInfo />
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-background p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center text-red-500 mb-4">{error}</div>
          <div className="text-center text-gray-600 mb-4">
            API URL: {process.env.NEXT_PUBLIC_API_URL || '設定されていません'}
          </div>
          <div className="text-center">
            <button 
              onClick={() => window.location.reload()} 
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              再試行
            </button>
          </div>
        </div>
        <DebugInfo />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">メンタルヘルス掲示板</h1>
          <Link
            href="/posts/new"
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            新規投稿
          </Link>
        </div>

        <div className="flex gap-4 mb-8 flex-wrap">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-md ${
              selectedCategory === "all"
                ? "bg-primary text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            すべて
          </button>
          {["転職", "病気", "薬", "生活", "雑談"].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category as Category)}
              className={`px-4 py-2 rounded-md ${
                selectedCategory === category
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <Link key={post.id} href={`/posts/${post.id}`}>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-primary text-white text-sm rounded-full">
                    {post.category}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {new Date(post.created_at).toLocaleDateString('ja-JP')}
                  </span>
                </div>
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-4 line-clamp-2">{post.content}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{post.author}</span>
                  <span>{post.comments.length} コメント</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <DebugInfo />
    </main>
  );
} 