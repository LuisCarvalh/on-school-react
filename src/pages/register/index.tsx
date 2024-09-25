'use client'

import { ErrorMessage, Field, Formik } from "formik";
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
import '../../app/globals.css';

const validationSchema = Yup.object({
  name: Yup.string()
        .required('Informe seu nome para continuar!'),
  email: Yup.string()
         .required('Informe um email para continuar!')
         .email('Informe um email válido!'),
  isadmin: Yup.string(),
  password: Yup.string()
            .min(5,'A senha deve conter pelo menos 5 caracteres!')
            .required('Informe uma senha para seu cadastro!'),
  confirmPassword: Yup.string()
                   .oneOf([Yup.ref('password')],'As duas senhas devem ser iguais!')
                   .required('Confirme sua senha!')
})

export default function Register() {

  const router = useRouter();

  const errorHandler = () => {
    toast.error("Erro ao registrar o usuário!", {
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

  const handleClick = async (values: any) => {
    let apiRequestBody = {...values}
    apiRequestBody.isadmin = apiRequestBody.isadmin == 'Professor' ? true : false;
    delete apiRequestBody.confirmPassword;
    try {
      const response = await fetch("http://localhost:3000/user",{
        method:"POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(apiRequestBody)
      })
  
      if(response.ok){
        router.push("/");
      }else{
        errorHandler();
      }
    } catch (error) {
      errorHandler();
    }
  };

  const initialValues = {
    name: '',
    email: '',
    isadmin: 'Aluno',
    password: '',
    confirmPassword: '',
  }

  return (
    <>
      <Container>
      <Links href="/">Voltar</Links>
        <Titulo>Cadastre-se</Titulo>
        <Formik
          initialValues={initialValues}
          onSubmit={handleClick}
          validationSchema={validationSchema}
        >
          <Form>
          
            
            <Label htmlFor="name">Nome:</Label>
            <Input type="text" name="name" id="name" placeholder=" Insira um nome"/>
            <ErrorMessage name="name" component={ErrorText}/>

            <Label htmlFor="email">Email:</Label>
            <Input type="text" name="email" id="email" placeholder="Insira um email"/>
            <ErrorMessage name="email" component={ErrorText}/>

            <Label htmlFor="isadmin">Tipo de usuário:</Label>
            <Field as="select" name="isadmin" id="isadmin" style={{'padding': 8+'px', 'border': 1+ 'px solid #ccc', 'borderRadius': 5 + 'px'}}>
              <option value="Aluno">Aluno</option>
              <option value="Professor">Professor</option>
            </Field>

            <Label htmlFor="password">Senha:</Label>
            <Input type="password" name="password" id="password" placeholder="Insira uma senha"/>
            <ErrorMessage name="password" component={ErrorText}/>

            <Label htmlFor="confirmPassword">Confirme sua senha:</Label>
            <Input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirme sua senha"/>
            <ErrorMessage name="confirmPassword" component={ErrorText}/>

            <Button type="submit">Register</Button>
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
    </>
  );
}
