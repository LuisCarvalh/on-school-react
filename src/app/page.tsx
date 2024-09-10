'use client'

import { ErrorMessage, Formik } from "formik";
import ErrorText from "./components/Shared/ErrorText";
import Form from "./components/Shared/Form"
import Input from "./components/TelaLogin/Input"
import Container from "./components/TelaLogin/Container"
import Button from "./components/TelaLogin/Button"
import Label from "./components/Shared/Label"
import Links from "./components/Shared/Link"
import Titulo from "./components/TelaLogin/Titulo"
import * as Yup from 'yup';

const validationSchema = Yup.object({
  email: Yup.string()
            .required('Informe um email para continuar!')
            .email('Informe um email válido!'),
  password: Yup.string()
            .required('Informe uma senha para continuar!')
})

export default function Home() {

  const handleClick = (values: any) => {
    console.log(values)
  };

  const initialValues = {
    email: '',
    password: ''
  }

  return (
    <main>
      <Container>
        <Titulo>On-School</Titulo>
        <Formik
          initialValues={initialValues}
          onSubmit={handleClick}
          validationSchema={validationSchema}
        >
          <Form>
            <Label htmlFor="email">Email:</Label>
            <Input type="text" name="email" id="email"/>
            <ErrorMessage name="email" component={ErrorText}/>
            <Label htmlFor="password">Password:</Label>
            <Input type="password" name="password" id="password"/>
            <ErrorMessage name="password" component={ErrorText}/>
            <Button type="submit">Login</Button>
            <Links href="/register" style={{alignSelf: "center"}}>Crie uma conta aqui!</Links>
          </Form>
        </Formik>
      </Container>
    </main>
  );
}
