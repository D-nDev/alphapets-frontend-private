import styled from 'styled-components';

export const Main = styled.main`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  max-width: 1380px;
  margin: 0 auto;
  padding-left: 4vh;
  padding-right: 4vh;
`;

export const Card = styled.div`
  margin-top: 10vh;
  background-color: #fff;
  border-radius: 10px;
  width: 537px;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  cursor: pointer;
  padding-left: 2vh;
  padding-right: 2vh;
  padding-bottom: 10px;
`;

export const PetImg = styled.img`
  margin-top: 3vh;
  border-radius: 5px;
  width: 183px;
  height: 283px;
  flex: 1;
`;

export const PetName = styled.p`
  color: #3ca265;
  font-size: 24px;
  margin-top: 1.6vh;
  margin-bottom: 1vh;
  margin-left: 6vh;
  font-weight: 600;
`;

export const PetHelp = styled.p`
  color: #364547;
  font-size: 24px;
  margin-top: 1.6vh;
  margin-bottom: 1vh;
  margin-left: 6vh;
  font-weight: 600;
`;

export const PetDataTitle = styled.p`
  color: #a7c5eb;
  font-size: 14px;
  margin-left: 6vh;
  margin-bottom: 5px;
`;

export const PetData = styled.span`
  display: inline-block;
  color: #007580;
  font-size: 18px;
  margin-left: 6vh;
  font-weight: 700;
  margin-bottom: 2vh;
`;

export const ContainerDialogText = styled.span`
  display: flex;
  text-align: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 2vh;
`;
