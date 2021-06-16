import React, { useRef, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import PetsIcon from '@material-ui/icons/Pets';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { useStyles } from './theme';
import { ContainerDialogButtons, ContainerDialogText } from './styles';

import Input from '../../components/FormInputs/input';
import { useCookies } from '../../hooks/useCookies';
import backendapi from '../../services/backendapi';

export default function Login() {
  const classes = useStyles();
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const navigate = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const { cookies } = useCookies();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
      } else if (data === 0) {
        swal({
          title: 'Erro!',
          text: 'Email não cadastrado.',
          icon: 'error',
        });
      } else {
        cookies.set('email', data.email, {
          path: '/',
          maxAge: 259200,
          sameSite: 'lax',
        }); // expires in 3 days
        cookies.set('name', data.name, {
          path: '/',
          maxAge: 259200,
          sameSite: 'lax',
        });
        localStorage.setItem('@alphapets:photo', data.userphoto); // expires in 3 days
        navigate.push('/painel');
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
          <div className={classes.rightSide}>
            <Avatar className={classes.avatar}>
              <PetsIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              AlphaPets - Login
            </Typography>
            <ValidatorForm onSubmit={handleRequest} className={classes.form}>
              <Input
                id="email"
                name="email"
                label="Seu E-mail"
                type="email"
                validators={['required', 'isEmail']}
                value={email}
                inputRef={emailRef}
                onChange={event => setEmail(event.target.value)}
                errorMessages={['Campo obrigatório', 'E-mail inválido']}
                autoComplete="email"
                autoFocus
              />
              <Input
                id="password"
                name="password"
                label="Sua senha"
                type="password"
                validators={['required']}
                value={password}
                inputRef={passRef}
                onChange={event => setPassword(event.target.value)}
                errorMessages={['Campo obrigatório']}
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Entrar
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link
                    onClick={handleClickOpen}
                    style={{ cursor: 'pointer' }}
                    variant="body2"
                  >
                    Esqueceu a senha?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    onClick={() => {
                      navigate.push('/register');
                    }}
                    style={{ cursor: 'pointer' }}
                    variant="body2"
                  >
                    Não possui uma conta? cadastre-se
                  </Link>
                </Grid>
              </Grid>
            </ValidatorForm>
          </div>
        </Grid>
        <Grid item xs={false} sm={4} md={6} className={classes.image} />
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Recuperação de Senha</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <ContainerDialogText>
              Selecione o metódo desejado para recuperar sua senha
            </ContainerDialogText>
            <ContainerDialogButtons>
              <Button
                onClick={() => {
                  navigate.push('/sms');
                }}
                color="primary"
              >
                SMS
              </Button>
              <Button
                onClick={() => {
                  navigate.push('/email');
                }}
                color="primary"
              >
                E-mail
              </Button>
            </ContainerDialogButtons>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}
