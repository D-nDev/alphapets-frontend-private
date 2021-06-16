import React, { useRef, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import { ValidatorForm } from 'react-material-ui-form-validator';
import Input from '../../components/FormInputs/input';
import { useStyles } from './theme';
import backendapi from '../../services/backendapi';

export default function Register() {
  const classes = useStyles();
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const telRef = useRef(null);
  const navigate = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [tel, setTel] = useState('');

  async function handleRequest() {
    try {
      const body = {
        name: nameRef.current.value,
        email: emailRef.current.value,
        pass: passRef.current.value,
        telnumber: telRef.current.value,
      };
      const { data } = await backendapi.post('/register', body);
      if (data === false) {
        swal({
          title: 'Erro!',
          text: 'Email ou Número de telefone já usado(s)!',
          icon: 'error',
        });
      } else {
        swal({
          title: 'Sucesso!',
          text: 'Cadastro sucedido.',
          icon: 'success',
        }).then(success => {
          if (success) {
            navigate.push('/login');
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={6}>
          <div className={classes.leftSide}>
            <Avatar className={classes.avatar}>
              <LockOpenIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              AlphaPets - Registro
            </Typography>
            <ValidatorForm onSubmit={handleRequest} className={classes.form}>
              <Input
                id="name"
                name="name"
                label="Seu Nome completo"
                type="text"
                variant="outlined"
                validators={['required']}
                value={name}
                inputRef={nameRef}
                onChange={event => setName(event.target.value)}
                errorMessages={['Campo obrigatório']}
                autoFocus
              />
              <Input
                id="email"
                name="email"
                label="Seu E-mail"
                type="email"
                variant="outlined"
                validators={['required', 'isEmail']}
                value={email}
                inputRef={emailRef}
                onChange={event => setEmail(event.target.value)}
                errorMessages={['Campo obrigatório', 'E-mail inválido']}
                autoComplete="email"
              />
              <Input
                id="password"
                name="password"
                label="Sua senha"
                type="password"
                variant="outlined"
                validators={['required']}
                value={password}
                inputRef={passRef}
                onChange={event => setPassword(event.target.value)}
                errorMessages={['Campo obrigatório']}
                autoComplete="current-password"
              />
              <Input
                id="telnumber"
                name="telnumber"
                label="Seu Número de Celular"
                type="text"
                variant="outlined"
                validators={['required']}
                value={tel}
                inputRef={telRef}
                onChange={event => setTel(event.target.value)}
                errorMessages={['Campo obrigatório']}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Registrar
              </Button>
              <Grid container>
                <Grid item>
                  <Link
                    onClick={() => {
                      navigate.push('/login');
                    }}
                    style={{ cursor: 'pointer' }}
                    variant="body2"
                  >
                    Possui uma conta? Entre
                  </Link>
                </Grid>
              </Grid>
            </ValidatorForm>
          </div>
        </Grid>
        <Grid item xs={false} sm={4} md={6} className={classes.image} />
      </Grid>
    </>
  );
}
