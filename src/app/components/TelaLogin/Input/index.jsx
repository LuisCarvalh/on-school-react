/* eslint-disable linebreak-style */
import { Field } from 'formik';
import styled from 'styled-components';

const Input = styled(Field)`
  padding: 0.1rem;
  margim-bottom: 1rem;
  font-size: 1rem;
  border:none;
  outline: none;
  border-bottom: 2px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s;
  &:focus {
    border-color: #0070f3;
  }
`;

export default Input;
