'use client'

import { ErrorMessage, Formik } from "formik";
import ErrorText from "../../app/components/Shared/ErrorText";
import Form from "../../app/components/Shared/Form"
import Input from "../../app/components/TelaLogin/Input"
import Container from "../../app/components/TelaLogin/Container"
import Button from "../../app/components/TelaLogin/Button"
import Label from "../../app/components/Shared/Label"
import Links from "../../app/components/Shared/Link"
import Titulo from "../../app/components/TelaLogin/Titulo"
import * as Yup from 'yup';

import { useRouter } from "next/router";
import { Bounce, ToastContainer, toast} from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';
import { useUser } from "@/context/UserContext";

const validationSchema = Yup.object({
  email: Yup.string()
            .required('Informe um email para continuar!')
            .email('Informe um email válido!'),
  password: Yup.string()
            .required('Informe uma senha para continuar!')
})

export default function Login() {
  const router = useRouter();
  const { setToken } = useUser();
  const handleClick = async (values: any) => {
    try {
      const response = await fetch("http://localhost:3000/user/signin",{
        method:"POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })
      const data = await response.json();
      if(response.ok){
        await setToken(data.token);
        router.push('/list-post')
      }else{
        errorHandler();
      }
    } catch (error) {
      errorHandler();
    }
  };

  const errorHandler = () => {
    toast.error("Erro ao realizar o login!", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce
    })
  }

  const initialValues = {
    email: '',
    password: ''
  }

  return (
    <main>
      <Container>
        <Titulo>Login</Titulo>
        <Formik
          initialValues={initialValues}
          onSubmit={handleClick}
          validationSchema={validationSchema}
        >
          <Form>
            <Label htmlFor="email">Email:</Label>
            <Input type="text" name="email" id="email" placeholder="Insira seu email"/>
            <ErrorMessage name="email" component={ErrorText}/>
            <Label htmlFor="password">Password:</Label>
            <Input type="password" name="password" id="password" placeholder="Insira sua senha"/>
            <ErrorMessage name="password" component={ErrorText}/>
            <Button type="submit">Login</Button>
            <Links href="/register" style={{alignSelf: "center"}}>Crie uma conta aqui!</Links>
          </Form>
        </Formik>
      </Container>

      <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"          
          transition={Bounce}
          />
    </main>
  );
}
