const API_BASE_URL = 'http://160.251.184.93:8000/api';

export interface Post {
  id: number;
  title: string;
  content: string;
  category: '転職'| '病気' | '薬' | '生活' | '雑談' ;
  author: string;
  created_at: string;
  updated_at: string;
  comments: Comment[];
}

export interface Comment {
  id: number;
  content: string;
  author: string;
  post_id: number;
  created_at: string;
  updated_at: string;
}

export const api = {
  getPosts: async (): Promise<Post[]> => {
    try {
      console.log('Fetching posts from:', `${API_BASE_URL}/posts`);
      const response = await fetch(`${API_BASE_URL}/posts`);
      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`Failed to fetch posts: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Received data:', data);
      return data;
    } catch (error) {
      console.error('Error in getPosts:', error);
      throw error;
    }
  },

  getPost: async (id: number): Promise<Post> => {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch post');
    }
    return response.json();
  },

  createPost: async (post: Omit<Post, 'id' | 'created_at' | 'updated_at' | 'comments'>): Promise<Post> => {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });
    if (!response.ok) {
      throw new Error('Failed to create post');
    }
    return response.json();
  },

  updatePost: async (id: number, post: Partial<Post>): Promise<Post> => {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });
    if (!response.ok) {
      throw new Error('Failed to update post');
    }
    return response.json();
  },

  deletePost: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete post');
    }
  },

  createComment: async (postId: number, comment: Omit<Comment, 'id' | 'post_id' | 'created_at' | 'updated_at'>): Promise<Comment> => {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comment),
    });
    if (!response.ok) {
      throw new Error('Failed to create comment');
    }
    return response.json();
  },

  deleteComment: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/comments/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete comment');
    }
  },
};