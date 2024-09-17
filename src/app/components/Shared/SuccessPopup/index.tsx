import React from 'react';
import styled from 'styled-components';

interface SuccessPopupProps {
  message: string;
  onClose: () => void;
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  background: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
`;

const Button = styled.button`
  margin-top: 20px;
`;

const SuccessPopup: React.FC<SuccessPopupProps> = ({ message, onClose }) => {

  return (
    <Overlay>
      <Content>
        <h2>Sucesso</h2>
        <p>{message}</p>
        <Button onClick={onClose}>Fechar</Button>
      </Content>
    </Overlay>
  );
};

export default SuccessPopup;