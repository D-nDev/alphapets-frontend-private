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

export default function SMS() {
  const classes = useStyles();
  const smsRef = useRef(null);
  const navigate = useHistory();
  const [sms, setSms] = useState('');
  const [disabled, setDisabled] = useState(false);

  async function handleRequest() {
    try {
      setDisabled(true);
      const body = {
        telnumber: smsRef.current.value,
      };
      const { data } = await backendapi.post('/forgotpass2', body);
      if (data !== 'Ok') {
        setDisabled(false);
        swal({
          title: 'Erro!',
          text: 'Número de telefone inválido ou não cadastrado!',
          icon: 'error',
        });
      } else {
        setDisabled(false);
        swal({
          title: 'Sucesso',
          text: 'Sms Enviado.',
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
              <SmsIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              AlphaPets - Enviar SMS
            </Typography>
            <ValidatorForm onSubmit={handleRequest} className={classes.form}>
              <Input
                id="smsnumber"
                name="smsnumber"
                label="Seu Número de Celular"
                type="number"
                validators={['required']}
                value={sms}
                inputRef={smsRef}
                onChange={event => setSms(event.target.value)}
                errorMessages={['Campo obrigatório']}
                autoFocus
                className={classes.number}
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
