import React, { useState, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import { ValidatorForm } from 'react-material-ui-form-validator';
import Snackbar from '@material-ui/core/Snackbar';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Input from '../FormInputs/input';
import logo from '../../assets/logoimg.svg';
import { HeaderContainer, ContainerDialogText } from './styles';
import { useUpload } from '../../hooks/useUpload';
import { useCookies } from '../../hooks/useCookies';
import backendapi from '../../services/backendapi';

function Header(props) {
  const location = useLocation();
  const navigate = useHistory();
  const buttonError = useRef();
  const buttonSuccess = useRef();
  const { cookies } = useCookies();
  const [oldpass, setOldPass] = useState('');
  const [newpass, setNewPass] = useState('');
  const [repeatpass, setRepeatPass] = useState('');
  const [openUpload, setOpenUpload] = useState(false);
  const [openToastSuccess, setOpenToastSuccess] = useState({
    open2: false,
    vertical2: 'top',
    horizontal2: 'center',
  });
  const [openToastError, setOpenToastError] = useState({
    open1: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open1 } = openToastError;
  const { vertical2, horizontal2, open2 } = openToastSuccess;
  const [openPass, setOpenPass] = useState(false);
  const { fileSelectedHandler, fileUploadHandler, loading } = useUpload();
  const userphoto = localStorage.getItem('@alphapets:photo');

  const handleClickOpenUpload = () => {
    setOpenUpload(true);
  };

  const handleCloseUpload = () => {
    setOpenUpload(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickOpenPass = () => {
    setOpenPass(true);
  };

  const handleClosePass = () => {
    setOpenPass(false);
  };

  const handleClickSuccess = () => {
    setOpenToastSuccess({ open2: true, vertical: 'top', horizontal: 'left' });
  };

  const handleCloseSuccess = () => {
    setOpenToastSuccess({ open2: false, vertical: 'top', horizontal: 'left' });
    navigate.push('/logout');
  };

  const handleClickErr = () => {
    setOpenToastError({ open1: true, vertical: 'top', horizontal: 'left' });
  };

  const handleCloseErr = () => {
    setOpenToastError({ open1: false, vertical: 'top', horizontal: 'left' });
  };

  const handleSubmit = async () => {
    const body = {
      email: cookies.get('email'),
      user_oldpass: oldpass,
      user_newpass: newpass,
    };
    const { data } = await backendapi.post('/changepass', body);
    console.log(data);
    if (data === 'Ok') {
      buttonSuccess.current.click();
    } else {
      buttonError.current.click();
    }
  };

  ValidatorForm.addValidationRule('isPasswordMatch', value => {
    if (value !== newpass) {
      return false;
    }
    return true;
  });

  return (
    <HeaderContainer>
      <div>
        <div
          className="logo"
          onClick={() => {
            if (location !== '/petlist') {
              navigate.push('/painel');
            }
          }}
          style={{ cursor: props.cursor }}
          aria-hidden="true"
        >
          <img
            style={{
              marginRight: '1vh',
              marginLeft: '2vh',
              pointerEvents: 'all',
            }}
            src={logo}
            width={32}
            alt="Logo"
          />
          <h1>AlphaPets</h1>
        </div>

        <div className="leftside">
          <Avatar
            alt={`Foto de ${cookies.get('name')}`}
            src={userphoto}
            style={{ pointerEvents: 'all' }}
            onClick={handleClick}
            aria-hidden="true"
          />
        </div>
        <Button
          onClick={() => {
            handleClickErr();
          }}
          style={{ display: 'none' }}
          ref={buttonError}
        >
          Error
        </Button>

        <Button
          onClick={() => {
            handleClickSuccess();
          }}
          style={{ display: 'none' }}
          ref={buttonSuccess}
        >
          Success
        </Button>
      </div>
      <Dialog
        open={openUpload}
        onClose={handleCloseUpload}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Alterar Foto</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <ContainerDialogText>
              <input
                type="file"
                onChange={fileSelectedHandler}
                accept=".jpg,.png,.jpeg,.svg"
              />
              <button type="submit" onClick={fileUploadHandler}>
                Upload
              </button>
            </ContainerDialogText>
            <span>{loading}</span>
          </DialogContentText>
        </DialogContent>
      </Dialog>

      <Dialog
        open={openPass}
        onClose={() => {
          handleClosePass();
          setOldPass('');
          setNewPass('');
          setRepeatPass('');
        }}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Alterar senha</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Para alterar sua senha, forneça sua senha atual e a nova senha.
          </DialogContentText>
          <ValidatorForm
            onSubmit={() => {
              handleSubmit();
            }}
          >
            <Input
              autoFocus
              id="oldpass"
              label="Senha atual"
              type="password"
              onChange={event => setOldPass(event.target.value)}
              value={oldpass}
              validators={['required']}
              errorMessages={['Campo obrigatório']}
              style={{ marginBottom: '2vh' }}
            />
            <Input
              id="newpass"
              label="Senha Nova"
              type="password"
              onChange={event => setNewPass(event.target.value)}
              value={newpass}
              validators={['required']}
              errorMessages={['Campo obrigatório']}
              style={{ marginBottom: '2vh' }}
            />
            <Input
              id="repeatnewpass"
              label="Repita a Senha Nova"
              type="password"
              onChange={event => setRepeatPass(event.target.value)}
              value={repeatpass}
              validators={['isPasswordMatch', 'required']}
              errorMessages={['Senhas não coincidem', 'Campo obrigatório']}
            />
            <DialogActions>
              <Button
                onClick={() => {
                  handleClosePass();
                  setOldPass('');
                  setNewPass('');
                  setRepeatPass('');
                }}
                color="primary"
              >
                Cancelar
              </Button>
              <Button type="submit" color="primary">
                Enviar
              </Button>
            </DialogActions>
          </ValidatorForm>
        </DialogContent>
      </Dialog>

      <Menu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        scroll="body"
        open={Boolean(anchorEl)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MenuItem>
          <span
            onClick={() => {
              handleClickOpenUpload();
              handleClose();
            }}
            aria-hidden="true"
          >
            Alterar foto
          </span>
        </MenuItem>
        <MenuItem>
          <span
            onClick={() => {
              handleClickOpenPass();
              handleClose();
            }}
            aria-hidden="true"
          >
            Alterar senha
          </span>
        </MenuItem>
        <MenuItem>
          <span
            onClick={() => {
              navigate.push('/logout');
            }}
            aria-hidden="true"
          >
            Logout
          </span>
        </MenuItem>
      </Menu>

      <Snackbar
        open={open2}
        autoHideDuration={3000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical, horizontal }}
        key={`${vertical2 + horizontal2}sucess`}
      >
        <Alert onClose={handleCloseSuccess} severity="success">
          Senha alterada com sucesso.
        </Alert>
      </Snackbar>

      <Snackbar
        open={open1}
        autoHideDuration={3000}
        onClose={handleCloseErr}
        anchorOrigin={{ vertical, horizontal }}
        key={`${vertical + horizontal}error`}
      >
        <Alert onClose={handleCloseErr} severity="error">
          Senha Atual incorreta.
        </Alert>
      </Snackbar>
    </HeaderContainer>
  );
}

export default Header;
