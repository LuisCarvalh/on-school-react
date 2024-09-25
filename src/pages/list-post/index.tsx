'use client'


import PostList from '@/app/components/Shared/Lista';
import { useUser } from '@/context/UserContext';
import { Post } from '@/interfaces/Post';
import React, { useEffect, useState } from 'react';

const PostListPage = () => {
  const { user } = useUser();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const postsPerPage = 10;

  useEffect(() => {
    const fetchPosts = async (page: number) => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/post?page=${page}&limit=${postsPerPage}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${user?.token}`
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

    fetchPosts(currentPage);
  }, [currentPage]); 

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return <PostList 
            posts={posts}
            isAdmin={user?.isadmin || false}
            user={user}
            currentPage={currentPage}
            totalPages={totalPages}
            onPreviousPage={handlePreviousPage}
            onNextPage={handleNextPage}
          />;
};

export default PostListPage;