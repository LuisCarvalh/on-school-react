/* eslint-disable linebreak-style */
import Link from 'next/link';
import styled from 'styled-components';

const Links = styled(Link)`
    text-decoration: none;
    color: #808080;
    margin-bottom: 8px;
    font-family: sans-serif;

     &:hover {
    color: #333;
    transform: scale(1.05); 
`;

export default Links;
