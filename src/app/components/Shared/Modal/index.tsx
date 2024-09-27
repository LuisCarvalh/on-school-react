import React from 'react';
import styled from 'styled-components';
import Button from '../Button';

interface ModalProps {
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const ModalTitle = styled.h2`
  margin: 0 0 10px;
  color: #333;
`;

const ModalContent = styled.p`
  margin: 0 0 10px;
  color: black;
`;

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

const Modal: React.FC<ModalProps> = ({ message, onCancel, onConfirm }) => {
  return (
    <Overlay>
      <Content>
        <ModalTitle>Deletar post</ModalTitle>
        <ModalContent>{message}</ModalContent>
        <Button onClick={onCancel} variant='secondary'>Cancelar</Button>
        <Button onClick={onConfirm} variant="primary">Confirmar</Button>
      </Content>
    </Overlay>
  );
};

export default Modal;