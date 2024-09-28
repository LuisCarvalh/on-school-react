import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

const StyledButton = styled.button<{ variant: 'primary' | 'secondary' }>`
  padding: 10px 20px;
  margin: 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  color: #fff;
  background-color: ${props => (props.variant === 'primary' ? '#2364A9' : '#EC4646')};
  &:hover {
    background-color: ${props => (props.variant === 'primary' ? '#1C5087' : '#E62525')};
  }
`;

const Button: React.FC<ButtonProps> = ({ onClick, children, variant = 'primary' }) => {
  return (
    <StyledButton onClick={onClick} variant={variant}>
      {children}
    </StyledButton>
  );
};

export default Button;