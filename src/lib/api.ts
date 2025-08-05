const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://mental-health-forum-backend-production.up.railway.app/api';

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
      console.log('API_BASE_URL:', API_BASE_URL);
      console.log('Fetching posts from:', `${API_BASE_URL}/posts`);
      
      const response = await fetch(`${API_BASE_URL}/posts`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      
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
      console.error('API_BASE_URL was:', API_BASE_URL);
      throw error;
    }
  },

  getPost: async (id: number): Promise<Post> => {
    try {
      const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch post');
      }
      return response.json();
    } catch (error) {
      console.error('Error in getPost:', error);
      throw error;
    }
  },

  createPost: async (post: Omit<Post, 'id' | 'created_at' | 'updated_at' | 'comments'>): Promise<Post> => {
    console.log('Creating post with data:', post);
    console.log('API_BASE_URL:', API_BASE_URL);
    
    try {
      const response = await fetch(`${API_BASE_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(post),
      });
      
      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Create post error response:', errorText);
        console.error('Response status:', response.status);
        console.error('Response status text:', response.statusText);
        throw new Error(`Failed to create post: ${response.status} ${response.statusText} - ${errorText}`);
      }
      
      const data = await response.json();
      console.log('Post created successfully:', data);
      return data;
    } catch (error) {
      console.error('Error in createPost:', error);
      throw error;
    }
  },

  updatePost: async (id: number, post: Partial<Post>): Promise<Post> => {
    try {
      const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(post),
      });
      if (!response.ok) {
        throw new Error('Failed to update post');
      }
      return response.json();
    } catch (error) {
      console.error('Error in updatePost:', error);
      throw error;
    }
  },

  deletePost: async (id: number): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete post');
      }
    } catch (error) {
      console.error('Error in deletePost:', error);
      throw error;
    }
  },

  createComment: async (postId: number, comment: Omit<Comment, 'id' | 'post_id' | 'created_at' | 'updated_at'>): Promise<Comment> => {
    try {
      const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(comment),
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Create comment error:', errorText);
        throw new Error('Failed to create comment');
      }
      return response.json();
    } catch (error) {
      console.error('Error in createComment:', error);
      throw error;
    }
  },

  deleteComment: async (id: number): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/comments/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete comment');
      }
    } catch (error) {
      console.error('Error in deleteComment:', error);
      throw error;
    }
  },
};