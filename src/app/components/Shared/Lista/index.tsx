import React from 'react';
import styled from 'styled-components';
import Button from '../Button';

interface Author {
  id: string;
  name: string;
  email: string;
  password: string;
  isadmin: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: Author;
}

interface PostListProps {
  posts: Post[];
  isAdmin: boolean;
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

const PostList: React.FC<PostListProps> = ({ posts, isAdmin }) => {
    const handleEdit = (id: string) => {
        console.log(`Edit post with id: ${id}`);
      };
    
      const handleDelete = (id: string) => {
        console.log(`Delete post with id: ${id}`);
      };

   
        return (
            <PostListContainer>
              <Title>Lista de Posts</Title>
              <PostListUl>
                {posts.map(post => (
                  <PostListItem key={post.id}>
                    <PostTitle>{post.title}</PostTitle>
                    <PostContent>{post.content}</PostContent>
                    <AuthorInfo><strong>Autor:</strong> {post.author.name}</AuthorInfo>
                    {isAdmin &&(
                        <ButtonContainer>
                            <Button onClick={() => handleEdit(post.id)} variant="primary">Editar</Button>
                            <Button onClick={() => handleDelete(post.id)} variant="secondary">Deletar</Button>
                        </ButtonContainer>
                    )}
                  </PostListItem>
                ))}
              </PostListUl>
            </PostListContainer>
          );
 
};

export default PostList;