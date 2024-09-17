import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import ErrorText from "../../app/components/Shared/ErrorText";
import Form from "../../app/components/Shared/Form";
import Input from "../../app/components/TelaLogin/Input";
import Container from "../../app/components/TelaLogin/Container";
import Button from "../../app/components/TelaLogin/Button";
import Label from "../../app/components/Shared/Label";
import Titulo from "../../app/components/TelaLogin/Titulo";
import { useState } from "react";
import SuccessPopup from "@/app/components/Shared/SuccessPopup";

const CreatePost = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const initialValues = {
    title: '',
    text: '',
    author: '92259a7f-a2be-4209-a90d-5bafc32f51b6' // Adicione o campo author

  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Informe o título do post!'),
    text: Yup.string().required('Informe o texto do post!')
  });

  const handleSubmit = async (values: { title: string, text: string }) => {
    try {
      const response = await fetch('http://localhost:3000/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByb2Zlc3NvckB0ZXN0ZS5jb20iLCJpYXQiOjE3MjY0MjIzMTAsImV4cCI6MTcyNjQyMjkxMH0.SmVEcE_tbgzUBn9lUhR2sfOXhm4fLgxxlXFzTM9NqBE' 
        },
        body: JSON.stringify({
          title: values.title,
          content: values.text,
          author: '92259a7f-a2be-4209-a90d-5bafc32f51b6' // Adicione o campo author
        })
      });

      if (!response.ok) {
        throw new Error('Erro ao criar o post');
      }

      const data = await response.json();
      console.log('Post criado:', data);
      setPopupMessage('Post criado com sucesso!');
      setShowPopup(true);
    } catch (error) {
      console.error('Erro:', error);
      // Aqui você pode adicionar lógica para lidar com o erro, como mostrar uma mensagem de erro para o usuário
    }
  };

  return (
    <Container>
      <Titulo>Criar Post</Titulo>
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

            <Button type="submit">Criar</Button>
          </Form>
        )}
      </Formik>
      {showPopup && <SuccessPopup message={popupMessage} onClose={() => setShowPopup(false)} />}
    </Container>
  );
};

export default CreatePost;