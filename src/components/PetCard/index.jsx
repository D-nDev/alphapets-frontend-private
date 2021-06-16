import React from 'react';

import {
  Card,
  PetImg,
  PetName,
  PetHelp,
  PetData,
  PetDataTitle,
} from './styles';

function PetCard(props) {
  return props.pets.map((pet, i) => (
    <Card
      style={{ cursor: 'pointer' }}
      onClick={() => {
        props.click(pet.id, pet.name);
      }}
      aria-hidden="true"
      key={i}
    >
      <br />
      <PetImg src={pet.photo} alt={pet.name} />
      <div style={{ marginTop: '2vh', flex: '1' }}>
        <PetName className="pet-help">{pet.name}</PetName>
        <PetHelp className="pet-help">
          Clique no pet para agendar uma consulta
        </PetHelp>
        <PetDataTitle>
          <span style={{ marginBottom: '4px', display: 'inline-block' }}>
            Agende uma consulta,
          </span>
          <span style={{ display: 'block', marginBottom: '2.5vh' }}>
            para poder ter atendimento para seu pet
          </span>
        </PetDataTitle>
        <PetData>
          <i>Cuide daqueles que ama</i>
        </PetData>
      </div>
    </Card>
  ));
}

export default PetCard;
