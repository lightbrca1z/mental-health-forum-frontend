export type Category = "病気" | "薬" | "生活" | "雑談";

export interface Comment {
  id: string;
  content: string;
  author: string;
  createdAt: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  category: Category;
  author: string;
  createdAt: string;
  comments: Comment[];
}