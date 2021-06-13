import React, { useRef } from 'react';
import swal from 'sweetalert';
import { useCookies } from 'react-cookie';

import {
  Container,
  LeftSide,
  RightSide,
  MyData,
  UserEmail,
  UserPassword,
} from './styles';
import BtnLogin from '../../components/LoginButton';
import loginimg from '../../assets/loginimg.svg';

import backendapi from '../../services/backendapi';

function Login() {
  const [cookies, setCookie] = useCookies(['email']);
  const emailRef = useRef(null);
  const passRef = useRef(null);

  async function handleRequest() {
    try {
      const body = {
        email: emailRef.current.value,
        password: passRef.current.value,
      };
      const { data } = await backendapi.post('/login', body);
      if (data === 1) {
        swal({
          title: 'Erro!',
          text: 'Senha incorreta!',
          icon: 'error',
        });
        /* localStorage.setItem(
          '@alphapets:email',
          JSON.stringify({ email: `${data}` }),
        ); */
      } else if (data === 0) {
        swal({
          title: 'Erro!',
          text: 'Email não cadastrado.',
          icon: 'error',
        });
      } else {
        setCookie('email', data, { path: '/', maxAge: 259200 }); // expires in 3 days
        console.log(cookies.email);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleLogin() {
    if (emailRef.current.value.length > 0 && passRef.current.value.length > 0) {
      handleRequest();
    } else {
      swal({
        title: 'Aviso!',
        text: 'Preencha todos os campos!',
        icon: 'warning',
      });
    }
  }
  return (
    <>
      <Container>
        <LeftSide>
          <img
            src={loginimg}
            width={587}
            height={487}
            className="logo-login"
            alt="Logo"
          />
        </LeftSide>

        <RightSide>
          <MyData>Meus dados</MyData>
          <UserEmail
            type="email"
            placeholder="E-mail"
            name="email"
            ref={emailRef}
          />
          <UserPassword
            type="password"
            placeholder="Senha"
            name="Senha"
            ref={passRef}
          />
          <BtnLogin
            type="submit"
            onClick={() => {
              handleLogin();
            }}
          />
        </RightSide>
      </Container>
    </>
  );
}

export default Login;
