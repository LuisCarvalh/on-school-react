'use client'

import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../Button';
import { Post } from '@/interfaces/Post';
import { User } from '@/interfaces/User';

interface PostListProps {
  posts: Post[];
  isAdmin: boolean;
  user: User  | null;
  currentPage: number;
  totalPages: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

const PostListContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
`;

const PostListUl = styled.ul`
  list-style: none;
  padding: 0;
`;

const PostListItem = styled.li`
  background-color: #fff;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const PostTitle = styled.h2`
  margin: 0 0 10px;
  color: #333;
`;

const PostContent = styled.p`
  margin: 0 0 10px;
  color: #666;
`;

const AuthorInfo = styled.p`
  font-weight: bold;
  color: #333;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PaginationButton = styled.button`
  margin: 0 5px;
`;

const PostList: React.FC<PostListProps> = ({ posts, isAdmin, user, currentPage, totalPages, onPreviousPage, onNextPage }) => {
  const [postsList, setPosts] = useState<Post[]>(posts);

    const handleEdit = (id: string) => {
        console.log(`Edit post with id: ${id}`);
      };
    
      const handleDelete = async (id: string) => {
        try {
          const response = await fetch(`http://localhost:3000/post/${id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${user?.token}`
            }
          });
    
          if (!response.ok) {
            throw new Error('Erro ao deletar o post');
          }
    
          console.log(`Post com id: ${id} deletado com sucesso`);
          setPosts(postsList.filter(post => post.id !== id));
        } catch (error) {
          console.error('Erro ao deletar o post:', error);
        }
      };

   
        return (
            <PostListContainer>
              <Title>Lista de Posts</Title>
              <PostListUl>
                {postsList.map(post => (
                  <PostListItem key={post.id}>
                    <PostTitle>{post.title}</PostTitle>
                    <PostContent>{post.content}</PostContent>
                    <AuthorInfo><strong>Autor:</strong> {post.author.name}</AuthorInfo>
                    {isAdmin && (
                        <ButtonContainer>
                            <Button onClick={() => handleEdit(post.id)} variant="primary">Editar</Button>
                            <Button onClick={() => handleDelete(post.id)} variant="secondary">Deletar</Button>
                        </ButtonContainer>
                    )}
                  </PostListItem>
                ))}
              </PostListUl>
              <PaginationContainer>
                <PaginationButton onClick={onPreviousPage} disabled={currentPage === 0}>
                  Anterior
                </PaginationButton>
                <span>Página {currentPage + 1} de {totalPages}</span>
                <PaginationButton onClick={onNextPage} disabled={currentPage === totalPages - 1}>
                  Próxima
                </PaginationButton>
              </PaginationContainer>
            </PostListContainer>
          );
 
};

export default PostList;