'use client'

import Links from "@/app/components/Shared/Link";
import Container from "../../app/components/TelaLogin/Container";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/router";

const DetailsPost = () => {
  const { user } = useUser();
  const router = useRouter();
  const {title, author, content, createdAt, updatedAt} = router.query;

  const formatDate = (date:any) => {
    let data = new Date(date.substr(0,10));
    return data.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
  }

  return (
    <Container>
      <Links href="/list-post">Voltar</Links>
      <h1>{title}</h1>
      <p>posted by {author} at {formatDate(createdAt)} {updatedAt && (
        ", edited at "+ formatDate(updatedAt)
      )}</p>
      <p>{content}</p>
    </Container>
  );
};

export default DetailsPost;