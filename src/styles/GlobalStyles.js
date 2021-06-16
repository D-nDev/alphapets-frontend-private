import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root {
    --primary: #01937c;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
  }

  body {
    background: #F5F5F9;
    color: #333333;
    padding-right: 0 !important;
  }

  body, input, button {
    font: 400 16px sans-serif;
  }

  button {
    cursor: pointer;
  }
`;
