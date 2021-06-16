import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { ValidatorForm } from 'react-material-ui-form-validator';
import swal from 'sweetalert';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import Header from '../../components/Header';
import { useCookies } from '../../hooks/useCookies';
import { Main } from './styles';
import Input from '../../components/FormInputs/input';
import backendapi from '../../services/backendapi';
import PetCard from '../../components/PetCard';

function PetList() {
  const { cookies } = useCookies();
  const tomorrow = new Date();
  tomorrow.setDate(new Date().getDate() + 1);
  const navigate = useHistory();
  const [openNewConsult, setOpenNewConsult] = useState(false);
  const [petName, setPetName] = useState('');
  const [pets, setPets] = useState([]);
  const [service, setService] = useState('');
  const [date, setDate] = useState(tomorrow);
  const [petID, setPetID] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        const { data } = await backendapi.get(
          `/getpets?email=${cookies.get('email')}`,
        );

        setPets(data);
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    }

    loadData();
  }, [cookies]);

  const handleOpenNewConsult = (petid, petname) => {
    setPetID(petid);
    setPetName(petname);
    setOpenNewConsult(true);
  };

  const handleCloseNewConsult = () => {
    setOpenNewConsult(false);
  };

  async function handleSubmit() {
    try {
      const body = {
        description_schedule: service,
        owner_email: cookies.get('email'),
        pet_id: petID,
        pet_name: petName,
        date_schedule: format(date, 'yyyy-MM-dd'),
      };
      const { data } = await backendapi.post('/schedule', body);
      if (data === 'samedate') {
        swal({
          title: 'Erro!',
          text: 'Este pet já tem um agendamento neste dia!',
          icon: 'error',
        });
      } else {
        swal({
          title: 'Sucesso',
          text: 'Serviço agendado com sucesso.',
          icon: 'success',
        }).then(success => {
          if (success) {
            navigate.push('/painel');
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
          <Header cursor="pointer" />
          <Main>
            <PetCard pets={pets} click={handleOpenNewConsult} />

            <Dialog
              open={openNewConsult}
              onClose={() => {
                handleCloseNewConsult();
                setService('');
              }}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">
                Solicitar consulta/serviço
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Para solicitar um serviço ou consulta, descreva abaixo o que
                  deseja
                </DialogContentText>
                <ValidatorForm
                  onSubmit={() => {
                    handleSubmit();
                  }}
                >
                  <Input
                    autoFocus
                    id="petid"
                    label="ID do Pet"
                    type="text"
                    value={petID}
                    disabled
                    style={{ marginBottom: '2vh' }}
                  />
                  <Input
                    autoFocus
                    id="petdescription"
                    label="Descrição do serviço"
                    type="text"
                    onChange={event => setService(event.target.value)}
                    value={service}
                    validators={['required']}
                    errorMessages={['Campo obrigatório']}
                    style={{ marginBottom: '5vh' }}
                  />
                  <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR}>
                    <DatePicker
                      value={date}
                      cancelLabel="Cancelar"
                      label="Data do agendamento"
                      onChange={setDate}
                      minDate={date}
                    />
                  </MuiPickersUtilsProvider>
                  <DialogActions>
                    <Button
                      onClick={() => {
                        handleCloseNewConsult();
                        setPetName('');
                        setPetID('');
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

export default PetList;
