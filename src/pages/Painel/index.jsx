import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { ValidatorForm } from 'react-material-ui-form-validator';
import swal from 'sweetalert';
import Header from '../../components/Header';
import { useCookies } from '../../hooks/useCookies';
import addpet from '../../assets/addpet.svg';
import { usePetUpload } from '../../hooks/usePetUpload';
import {
  Main,
  Card,
  PetImg,
  PetName,
  PetData,
  PetDataTitle,
  ContainerDialogText,
} from './styles';
import Input from '../../components/FormInputs/input';
import backendapi from '../../services/backendapi';
import listpet from '../../assets/petlist.svg';
import listschedule from '../../assets/list.svg';

function Index() {
  const { cookies } = useCookies();
  const navigate = useHistory();
  const [openNewPet, setOpenNewPet] = useState(false);
  const { fileSelectedHandler, fileUploadHandler, loading, photourl } =
    usePetUpload();
  const [petName, setPetName] = useState('');
  const [petAge, setPetAge] = useState('');
  const [petWeight, setPetWeight] = useState('');
  const [petBreed, setPetBreed] = useState('');
  const [petType, setPetType] = useState('');

  const handleOpenNewPet = () => {
    setOpenNewPet(true);
  };

  const handleCloseNewPet = () => {
    setOpenNewPet(false);
  };

  async function handleSubmit() {
    try {
      const body = {
        name: petName,
        age: petAge,
        weight: petWeight,
        breed: petBreed,
        type: petType,
        owner_email: cookies.get('email'),
        photo: photourl,
      };
      const { data } = await backendapi.post('/newpet', body);
      if (data === 0) {
        swal({
          title: 'Erro!',
          text: 'Um pet com este mesmo nome e tipo já existe!',
          icon: 'error',
        });
      } else {
        swal({
          title: 'Sucesso',
          text: 'Pet cadastrado com sucesso.',
          icon: 'success',
        }).then(success => {
          if (success) {
            handleCloseNewPet();
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      {cookies.get('email') ? (
        <>
          <Header />
          <Main>
            <Card
              style={{ cursor: 'pointer' }}
              onClick={() => {
                handleOpenNewPet();
              }}
              aria-hidden="true"
            >
              <br />
              <PetImg src={addpet} alt="Add pet" />
              <div style={{ marginTop: '9vh', flex: '1' }}>
                <PetName className="pet-name">Adicionar novo pet</PetName>
                <PetDataTitle>
                  <span
                    style={{ marginBottom: '4px', display: 'inline-block' }}
                  >
                    Adicione um pet,
                  </span>
                  <span style={{ display: 'block', marginBottom: '2.5vh' }}>
                    para poder agendar consultas
                  </span>
                </PetDataTitle>
                <PetData>
                  <i>O amor dos pets traz paz</i>
                </PetData>
              </div>
            </Card>

            <Card
              style={{ cursor: 'pointer' }}
              onClick={() => {
                navigate.push('/petlist');
              }}
              aria-hidden="true"
            >
              <br />
              <PetImg src={listpet} alt="List pet" />
              <div style={{ marginTop: '9vh', flex: '1' }}>
                <PetName className="pet-name">Listar todos os pets</PetName>
                <PetDataTitle>
                  <span
                    style={{ marginBottom: '4px', display: 'inline-block' }}
                  >
                    Visualize todos os seus pets,
                  </span>
                  <span style={{ display: 'block', marginBottom: '2.5vh' }}>
                    para poder agendar consultas
                  </span>
                </PetDataTitle>
                <PetData>
                  <i>Cada pet tem um dom especial</i>
                </PetData>
              </div>
            </Card>

            <Card
              style={{ cursor: 'pointer', marginBottom: '3vh' }}
              onClick={() => {
                navigate.push('/schedules');
              }}
              aria-hidden="true"
            >
              <br />
              <PetImg src={listschedule} alt="List pet" />
              <div style={{ marginTop: '9vh', flex: '1' }}>
                <PetName className="pet-name">
                  Listar todas as consultas
                </PetName>
                <PetDataTitle>
                  <span
                    style={{ marginBottom: '4px', display: 'inline-block' }}
                  >
                    Visualize todas os consultas de seus pets,
                  </span>
                  <span style={{ display: 'block', marginBottom: '2.5vh' }}>
                    para estar no controle de tudo
                  </span>
                </PetDataTitle>
                <PetData>
                  <i>Cuidar também faz parte</i>
                </PetData>
              </div>
            </Card>

            <Dialog
              open={openNewPet}
              onClose={() => {
                handleCloseNewPet();
                setPetName('');
                setPetAge('');
                setPetWeight('');
                setPetBreed('');
                setPetType('');
              }}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Adicionar pet</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Para adicionar um novo pet, preencha os dados abaixo
                </DialogContentText>
                <ValidatorForm
                  onSubmit={() => {
                    handleSubmit();
                  }}
                >
                  <Input
                    autoFocus
                    id="petname"
                    label="Nome do pet"
                    type="text"
                    onChange={event => setPetName(event.target.value)}
                    value={petName}
                    validators={['required']}
                    errorMessages={['Campo obrigatório']}
                    style={{ marginBottom: '2vh' }}
                  />
                  <Input
                    id="petage"
                    label="Idade"
                    type="text"
                    onChange={event => setPetAge(event.target.value)}
                    value={petAge}
                    validators={['required']}
                    errorMessages={['Campo obrigatório']}
                    style={{ marginBottom: '2vh' }}
                  />
                  <Input
                    id="petkg"
                    label="Peso em KG"
                    type="number"
                    onChange={event => setPetWeight(event.target.value)}
                    value={petWeight}
                    validators={['required']}
                    errorMessages={['Campo obrigatório']}
                    style={{ marginBottom: '2vh' }}
                  />
                  <Input
                    id="petbreed"
                    label="Raça"
                    type="text"
                    onChange={event => setPetBreed(event.target.value)}
                    value={petBreed}
                    validators={['required']}
                    errorMessages={['Campo obrigatório']}
                    style={{ marginBottom: '2vh' }}
                  />
                  <Input
                    id="pettype"
                    label="A qual animal se refere?"
                    type="text"
                    onChange={event => setPetType(event.target.value)}
                    value={petType}
                    validators={['required']}
                    errorMessages={['Campo obrigatório']}
                    style={{ marginBottom: '2vh' }}
                  />
                  <ContainerDialogText>
                    <input
                      type="file"
                      onChange={fileSelectedHandler}
                      accept=".jpg,.png,.jpeg,.svg"
                    />
                    <button type="button" onClick={fileUploadHandler}>
                      Upload
                    </button>
                  </ContainerDialogText>
                  <span>{loading}</span>
                  <DialogActions>
                    <Button
                      onClick={() => {
                        handleCloseNewPet();
                        setPetName('');
                        setPetAge('');
                        setPetWeight('');
                        setPetBreed('');
                        setPetType('');
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
          </Main>
        </>
      ) : (
        navigate.push('/login')
      )}
    </>
  );
}

export default Index;
