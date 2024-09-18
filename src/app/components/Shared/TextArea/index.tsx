import React from 'react';
import styled from 'styled-components';

const StyledTextArea = styled.textarea`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  font-size: 16px;
  resize: vertical;
`;

interface TextAreaProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea: React.FC<TextAreaProps> = ({ id, name, value, onChange }) => {
  return (
    <StyledTextArea
      id={id}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
};

export default TextArea;