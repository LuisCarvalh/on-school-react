import React, { useState } from 'react';
import styled from 'styled-components';

interface SearchBarProps {
  onSearch: (keyword: string) => void;
}

const Form = styled.form`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
  width: 300px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  background-color: #2364A9;
  color: white;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
    background-color: #1C5087;
  }
`;

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [keyword, setKeyword] = useState<string>('');

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(keyword);
  };

  return (
    <Form onSubmit={handleSearch}>
    <Input
      type="text"
      value={keyword}
      onChange={(e) => setKeyword(e.target.value)}
      placeholder="Buscar posts"
    />
    <Button type="submit">Buscar</Button>
  </Form>
  );
};

export default SearchBar;