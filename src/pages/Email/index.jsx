import React, { useRef, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import DraftsIcon from '@material-ui/icons/Drafts';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import { ValidatorForm } from 'react-material-ui-form-validator';
import Bowser from 'bowser';
import axios from 'axios';
import { useStyles } from './theme';

import Input from '../../components/FormInputs/input';
import backendapi from '../../services/backendapi';

export default function Email() {
  axios.defaults.headers.post['Content-Type'] =
    'application/x-www-form-urlencoded';
  axios.defaults.headers.get['Content-Type'] =
    'application/x-www-form-urlencoded';
  const classes = useStyles();
  const emailRef = useRef(null);
  const navigate = useHistory();
  const [email, setEmail] = useState('');
  const [disabled, setDisabled] = useState(false);

  async function handleRequest() {
    setDisabled(true);
    try {
      const { data: userip } = await axios.get(
        'https://api.ipify.org/?format=json',
      );
      const result = Bowser.getParser(window.navigator.userAgent);
      const body = {
        email: emailRef.current.value,
        user_browser: result.parsedResult.browser.name,
        user_os: result.parsedResult.os.name,
        user_osversion: result.parsedResult.os.versionName,
        user_ip: userip.ip,
      };
      const { data } = await backendapi.post('/forgotpass', body);
      if (data !== 'Ok') {
        setDisabled(false);
        swal({
          title: 'Erro!',
          text: 'E-mail não cadastrado!',
          icon: 'error',
        });
      } else if (data === 'Ok' && userip) {
        setDisabled(false);
        swal({
          title: 'Sucesso',
          text: 'E-mail Enviado.',
          icon: 'success',
        }).then(success => {
          if (success) {
            navigate.push('/recover');
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
          <div className={classes.rightSide}>
            <Avatar className={classes.avatar}>
              <DraftsIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              AlphaPets - Enviar E-mail
            </Typography>
            <ValidatorForm onSubmit={handleRequest} className={classes.form}>
              <Input
                id="email"
                name="smsemail"
                label="Seu E-mail"
                type="email"
                validators={['required', 'isEmail']}
                value={email}
                inputRef={emailRef}
                onChange={event => setEmail(event.target.value)}
                errorMessages={['Campo obrigatório', 'E-mail inválido']}
                autoFocus
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={disabled}
              >
                Enviar
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link
                    onClick={() => {
                      navigate.push('/login');
                    }}
                    style={{ cursor: 'pointer' }}
                    variant="body2"
                  >
                    Voltar
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
    </>
  );
}
