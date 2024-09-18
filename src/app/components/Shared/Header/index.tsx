
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
  background-color: #007bff;
  color: #fff;
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
`;

const LogoutButton = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  background-color: #dc3545;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;

const CreatePostLink = styled(Link)`
  margin-right: 10px;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  background-color: #28a745;
  color: #fff;
  text-decoration: none;

  &:hover {
    background-color: #218838;
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
          {user.isadmin && currentRoute !== '/create-post'  && (
            <CreatePostLink href="/create-post">Criar Post</CreatePostLink>
          )}
          <UserName>{user.name}</UserName>
          <LogoutButton onClick={logout}>Logout</LogoutButton>
        </UserInfo>
      )}
    </HeaderContainer>
  );
};

export default Header;