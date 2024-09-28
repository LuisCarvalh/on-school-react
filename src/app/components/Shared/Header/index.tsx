
import { useUser } from '@/context/UserContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';


const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: transparent;
  color: #605B56;
  font-family: sans-serif;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const UserName = styled.span`
  margin-right: 10px;
  font-weight: bold;
  font-size: 15px;
  font-family: sans-serif;
  color: black;
`;

const LogoutButton = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  font-family: sans-serif;
  background-color: #dc3545;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;

const CreatePostLink = styled(Link)`
  margin-right: 10px;
  justify-content: center;
  diplsay: flex;
  padding: 5px 10px;
  font-family: sans-serif;
  border: none;
  border-radius: 4px;
  background-color: #2364A9;
  color: #fff;
  text-decoration: none;

  &:hover {
    background-color: #1F5A98;
  }
`;

const Header: React.FC = () => {
  const { user, logout } = useUser();
  const router = useRouter();
  const currentRoute = router.pathname;
  console.log ("rota " + currentRoute)

  return (
    <HeaderContainer>
      <Logo>On-School</Logo>
      {user && (
        <UserInfo>
          <UserName>Olá, {user.name}</UserName>
          {user.isadmin && currentRoute !== '/create-post'  && (
            <CreatePostLink href="/create-post">Criar Post</CreatePostLink>
          )}
          <LogoutButton onClick={logout}>Logout</LogoutButton>
        </UserInfo>
      )}
    </HeaderContainer>
  );
};

export default Header;