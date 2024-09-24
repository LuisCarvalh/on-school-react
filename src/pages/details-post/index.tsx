'use client'

import Links from "@/app/components/Shared/Link";
import Container from "../../app/components/TelaLogin/Container";
import { useRouter } from "next/router";

const DetailsPost = () => {
  const router = useRouter();
  const {title, author, content, createdAt, updatedAt} = router.query;

  const formatDate = (date:any, isUpdate: boolean) => {
    let data = new Date(date?.substr(0,10));
    if(isUpdate) data.setDate(data.getDate()-1)
    return data.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
  }

  return (
    <Container>
      <Links href="/list-post">Voltar</Links>
      <h1>{title}</h1>
      <p>posted by {author} at {formatDate(createdAt, false)} {updatedAt && (
        ", edited at "+ formatDate(updatedAt, true)
      )}</p>
      <p>{content}</p>
    </Container>
  );
};

export default DetailsPost;