import Link from "next/link";
import { Post } from "@/lib/api";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/posts/${post.id}`}>
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
  );
} 