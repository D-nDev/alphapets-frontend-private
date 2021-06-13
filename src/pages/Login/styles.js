import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
`;

export const LeftSide = styled.div`
  flex: 1;
  background-color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const RightSide = styled.div`
  flex: 1;
  padding-left: 15vh;
  padding-top: 30vh;
  background-color: #fff;
`;

export const MyData = styled.h1`
  font-weight: 500;
  font-size: 32px;
  color: #3c3d40;
  margin-bottom: 2vh;
  text-align: left;
`;

export const UserEmail = styled.input`
  width: 70%;
  height: 60px;
  background-color: #fff;
  color: #aeaab7;
  text-indent: 20px;
  border-radius: 5px;
  display: inline-block;
  border: 1px solid #e6e6f0;
  margin-bottom: 2vh;
`;

export const UserPassword = styled(UserEmail)``;

export const LoginButton = styled.button`
  display: block;
  background-color: var(--primary);
  width: 70.5%;
  height: 60px;
  color: white;
  text-align: center;
  border: 1px solid #e6e6f0;
  border-radius: 5px;
  cursor: pointer;
`;
