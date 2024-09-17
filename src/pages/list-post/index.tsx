import PostList, { Post } from '@/app/components/Shared/Lista';
import React, { useEffect, useState } from 'react';

const PostListPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:3000/post?page=0&limit=10', {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByb2Zlc3NvckB0ZXN0ZS5jb20iLCJpYXQiOjE3MjY1MzYzMTIsImV4cCI6MTcyNjUzNjkxMn0.-1M6T75mUliYp1xug75CB-OiToa1w7q5V_As1GFy7hw'
          }
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar os posts');
        }

        const data = await response.json();
        setPosts(data);
      } catch (error) {
        setError('error.message');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return <PostList posts={posts} isAdmin={false } />;
};

export default PostListPage;