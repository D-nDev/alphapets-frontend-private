import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
// import Button from '@material-ui/core/Button';
// import swal from 'sweetalert';
import swal from 'sweetalert';
import Header from '../../components/Header';
import { useCookies } from '../../hooks/useCookies';
import { Main } from './styles';
import ScheduleCard from '../../components/ScheduleCard';
import backendapi from '../../services/backendapi';

function Schedules() {
  const { cookies } = useCookies();
  const navigate = useHistory();
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const { data } = await backendapi.get(
          `/getschedules?email=${cookies.get('email')}`,
        );

        setSchedules(data);
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    }

    loadData();
  }, [cookies]);

  async function handleSchedule(petid) {
    try {
      const body = {
        email: cookies.get('email'),
        pid: petid.toString(),
      };
      const { data } = await backendapi.post(`/unschedule`, body);
      if (data) {
        swal({
          title: 'Sucesso!',
          text: 'Consulta deletada com sucesso!',
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

  function handleDeleteSchedule(petid) {
    swal({
      title: 'Aviso',
      text: 'Deseja realmente desagendar essa consulta?',
      icon: 'warning',
    }).then(success => {
      if (success) {
        handleSchedule(petid);
      }
    });
  }

  const handlePetId = petid => {
    handleDeleteSchedule(petid);
  };

  return (
    <>
      {cookies.get('email') ? (
        <>
          <Header cursor="pointer" />
          <Main>
            <ScheduleCard schedules={schedules} click={handlePetId} />
          </Main>
        </>
      ) : (
        navigate.push('/login')
      )}
    </>
  );
}

export default Schedules;
