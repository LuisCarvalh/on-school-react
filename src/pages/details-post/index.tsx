'use client'

import Links from "@/app/components/Shared/Link";
import Container from "../../app/components/TelaLogin/Container";
import { useRouter } from "next/router";
import { styled } from "styled-components";

const DetailsPost = () => {
  const router = useRouter();
  const {title, author, content, createdAt, updatedAt} = router.query;

  const formatDate = (date:any, isUpdate: boolean) => {
    let data = new Date(date?.substr(0,10));
    if(isUpdate) data.setDate(data.getDate()-1)
    return data.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
  }

  const H1 = styled.h1`
    text-align: center;
    color: #605B56;
  `;

  const PostedBy = styled.p`
    font-family: sans-serif;
    font-size: 0.8rem;
    align-self: flex-end;
  `;

  const P = styled.p`
    font-family: sans-serif;
    font-size: 0.8rem;
    margin: 40px 0;
  `;

  const ContainerPost = styled(Container)`
    padding: 20px;
    width: 50%;
    margin: 15px auto;
  `

  return (
    <ContainerPost>
      <Links href="/list-post">Voltar</Links>
      <H1>{title}</H1>
      <P>{content}</P>
      <PostedBy> Postado por: {author} em {formatDate(createdAt, false)} {updatedAt && (
        ", editado por "+ formatDate(updatedAt, true)
      )}</PostedBy>
    </ContainerPost>
  );
};

export default DetailsPost;