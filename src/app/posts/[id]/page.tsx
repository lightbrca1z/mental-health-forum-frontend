"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Post, Comment, api } from "@/lib/api";

interface PostPageProps {
  params: {
    id: string;
  };
}

export default function PostPage({ params }: PostPageProps) {
  const [post, setPost] = useState<Post | null>(null);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await api.getPost(parseInt(params.id));
        setPost(data);
      } catch (err) {
        setError('投稿の取得に失敗しました');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [params.id]);

  const handleDeletePost = async () => {
    if (!post) return;

    if (!confirm('この投稿を削除してもよろしいですか？')) {
      return;
    }

    try {
      await api.deletePost(post.id);
      window.location.href = '/';
    } catch (err) {
      console.error('投稿の削除に失敗しました:', err);
      alert('投稿の削除に失敗しました');
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post || !newComment.trim()) return;

    try {
      const comment = await api.createComment(post.id, {
        content: newComment,
        author: "匿名ユーザー", // 実際のアプリケーションでは認証情報から取得
      });
      setPost(prev => prev ? {
        ...prev,
        comments: [...prev.comments, comment],
      } : null);
      setNewComment("");
    } catch (err) {
      console.error('コメントの投稿に失敗しました:', err);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    if (!post) return;

    try {
      await api.deleteComment(commentId);
      setPost(prev => prev ? {
        ...prev,
        comments: prev.comments.filter(comment => comment.id !== commentId)
      } : null);
    } catch (err) {
      console.error('コメントの削除に失敗しました:', err);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">読み込み中...</div>
        </div>
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className="min-h-screen bg-background p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center text-red-500">{error || '投稿が見つかりません'}</div>
          <div className="mt-4 text-center">
            <Link href="/" className="text-primary hover:underline">
              トップページに戻る
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-primary hover:underline">
            ← トップページに戻る
          </Link>
        </div>

        <article className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 bg-primary text-white text-sm rounded-full">
              {post.category}
            </span>
            <div className="flex items-center gap-4">
              <span className="text-gray-500 text-sm">
                {new Date(post.created_at).toLocaleDateString('ja-JP')}
              </span>
              <Link
                href={`/posts/${post.id}/edit`}
                className="text-blue-500 hover:text-blue-700 text-sm font-medium"
              >
                編集
              </Link>
              <button
                onClick={handleDeletePost}
                className="text-red-500 hover:text-red-700 text-sm font-medium"
              >
                削除
              </button>
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
          <p className="text-gray-700 mb-6 whitespace-pre-wrap">{post.content}</p>
          <div className="text-sm text-gray-500">
            投稿者: {post.author}
          </div>
        </article>

        <section>
          <h2 className="text-xl font-semibold mb-4">コメント ({post.comments.length})</h2>
          
          <form onSubmit={handleSubmitComment} className="mb-6">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="コメントを入力..."
              className="w-full p-3 border rounded-md mb-2"
              rows={3}
            />
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              コメントを投稿
            </button>
          </form>

          <div className="space-y-4">
            {post.comments.map((comment) => (
              <div key={comment.id} className="border-b pb-4 last:border-b-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{comment.author}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">
                      {new Date(comment.created_at).toLocaleDateString('ja-JP')}
                    </span>
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      削除
                    </button>
                  </div>
                </div>
                <p className="text-gray-700">{comment.content}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
} 