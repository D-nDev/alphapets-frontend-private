import React, { useRef, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import SmsIcon from '@material-ui/icons/Sms';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { useStyles } from './theme';

import Input from '../../components/FormInputs/input';
import backendapi from '../../services/backendapi';

export default function Recover() {
  const classes = useStyles();
  const tokenRef = useRef(null);
  const navigate = useHistory();
  const [token, setToken] = useState('');
  const [newpass, setNewPass] = useState('');
  const [repeatpass, setRepeatPass] = useState('');
  const [disabled, setDisabled] = useState(false);

  async function handleRequest() {
    try {
      setDisabled(true);
      const body = {
        token: tokenRef.current.value,
        newpass_user: newpass,
      };
      const { data } = await backendapi.post('/resetpass', body);
      if (data === 0) {
        setDisabled(false);
        swal({
          title: 'Erro!',
          text: 'Token não encontrado!',
          icon: 'error',
        });
      } else if (data === 1) {
        setDisabled(false);
        swal({
          title: 'Erro!',
          text: 'Token inválido!',
          icon: 'error',
        });
      } else if (data === 2) {
        setDisabled(false);
        swal({
          title: 'Erro!',
          text: 'Token Expirado!',
          icon: 'error',
        });
      } else {
        swal({
          title: 'Sucesso',
          text: 'Senha alterada com sucesso.',
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

  ValidatorForm.addValidationRule('isPasswordMatch', value => {
    if (value !== newpass) {
      return false;
    }
    return true;
  });

  return (
    <>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={6}>
          <div className={classes.rightSide}>
            <Avatar className={classes.avatar}>
              <SmsIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              AlphaPets - Alterar Senha
            </Typography>
            <ValidatorForm onSubmit={handleRequest} className={classes.form}>
              <Input
                id="token"
                name="token"
                label="Seu Token"
                type="text"
                validators={['required']}
                value={token}
                inputRef={tokenRef}
                onChange={event => setToken(event.target.value)}
                errorMessages={['Campo obrigatório']}
                autoFocus
              />
              <Input
                id="newpass2"
                label="Senha Nova"
                type="password"
                onChange={event => setNewPass(event.target.value)}
                value={newpass}
                validators={['required']}
                errorMessages={['Campo obrigatório']}
                style={{ marginBottom: '2vh' }}
              />
              <Input
                id="repeatnewpass2"
                label="Repita a Senha Nova"
                type="password"
                onChange={event => setRepeatPass(event.target.value)}
                value={repeatpass}
                validators={['isPasswordMatch', 'required']}
                errorMessages={['Senhas não coincidem', 'Campo obrigatório']}
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
