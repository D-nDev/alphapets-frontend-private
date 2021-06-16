import styled from 'styled-components';

export const HeaderContainer = styled.header`
  padding: 20px;
  height: 140px;
  background-color: var(--primary);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 2vh;
  padding-right: 2vh;

  > img {
    vertical-align: -55%;
  }

  > div {
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;

    display: flex;
    align-items: center;
    justify-content: space-between;

    > p {
      margin-top: 4.5vh;
      cursor: pointer;
    }

    > p.back {
      margin-right: 2vh;
    }

    > h1 {
      font-family: 'Rationale', sans-serif;
      font-size: 32px;
      font-weight: 400;
    }

    div.logo h1 {
      font-family: 'Rationale', sans-serif;
      font-size: 32px;
      font-weight: 400;
      display: inline-block;
      margin-left: 1vh;
    }

    div.logo img {
      vertical-align: sub;
    }

    div.leftside {
      margin-left: 1.5vh;
      cursor: pointer;
    }
  }
`;

export const ContainerDialogText = styled.span`
  display: flex;
  text-align: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 2vh;
`;
