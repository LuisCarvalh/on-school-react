'use client'

import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../Button';
import { Post } from '@/interfaces/Post';
import { User } from '@/interfaces/User';
import { useRouter } from 'next/router';
import Modal from '../Modal';

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
  margin: 2rem auto 0;
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
  cursor: pointer;

  &:hover{
    color: black;
  }
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
  const [isOpen, setIsOpen] = useState(false)
  const [postId, setPostId] = useState('')
  const router = useRouter();

  const handleRedirect = (post: Post, pathName: string) => {
      router.push({
        pathname: pathName,
        query: {id: post.id, title: post.title, content: post.content, author: post.author.name, createdAt: post.createdAt, updatedAt: post.updatedAt}
      })
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
      setIsOpen(false);
    } catch (error) {
      console.error('Erro ao deletar o post:', error);
    }
  };

   
  return (
      <PostListContainer>
        <Title>Lista de Posts</Title>
        <PostListUl>
          {postsList.map(post => (
            <PostListItem key={post.id} >
              <PostTitle onClick={() => handleRedirect(post, "/details-post")}>{post.title}</PostTitle>
              <PostContent>{post.content}</PostContent>
              <AuthorInfo><strong>Autor:</strong> {post.author.name}</AuthorInfo>
              {isAdmin && (
                  <ButtonContainer>
                      <Button onClick={() => handleRedirect(post, "/edit-post")} variant="primary">Editar</Button>
                      <Button onClick={() => {setIsOpen(true), setPostId(post.id)}} variant="secondary">Deletar</Button>
                  </ButtonContainer>
              )}
              {isOpen && (
                <Modal message="Tem certeza que deseja deletar o post? Não será possível reverter essa ação!" 
                       onCancel={()=>{setIsOpen(false)}} 
                       onConfirm={()=>{handleDelete(postId)}}
                />
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