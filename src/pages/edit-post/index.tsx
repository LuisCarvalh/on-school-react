'use client'

import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import ErrorText from "../../app/components/Shared/ErrorText";
import Form from "../../app/components/Shared/Form";
import Input from "../../app/components/TelaLogin/Input";
import Container from "../../app/components/TelaLogin/Container";
import Button from "../../app/components/TelaLogin/Button";
import Label from "../../app/components/Shared/Label";
import Titulo from "../../app/components/TelaLogin/Titulo";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/router";
import { Post } from "@/interfaces/Post";
import Links from "@/app/components/Shared/Link";

const EditPost: React.FC<Post> = () => {
  const { user } = useUser();
  const router = useRouter();
  const { id, title, content, author} = router.query;

  const initialValues = {
    title: title as string,
    text: content as string,
    author: author as string
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Informe o título do post!'),
    text: Yup.string().required('Informe o texto do post!')
  });

  const handleSubmit = async (values: { title: string, text: string }) => {
    try {
      const response = await fetch(`http://localhost:3000/post/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.token}`
        },
        body: JSON.stringify({
            id: id,
          title: values.title,
          content: values.text,
          author: user?.id
        })
      });

      if (!response.ok) {
        throw new Error('Erro ao editar o post');
      }

      const data = await response.json();
      console.log('Post editado:', data);
     
      router.push('/list-admin')
    } catch (error) {
      console.error('Houve um erro:', error);
    }
  };

  return (
    <Container>
      <Links href="/list-post">Voltar</Links>
      <Titulo>Editar Post</Titulo>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Label htmlFor="title">Título</Label>
            <Field name="title" type="text" as={Input} />
            <ErrorMessage name="title" component={ErrorText} />

            <Label htmlFor="text">Texto</Label>
            <Field name="text" as="textarea" className="textarea" />
            <ErrorMessage name="text" component={ErrorText} />

            <Button type="submit">Atualizar</Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default EditPost;