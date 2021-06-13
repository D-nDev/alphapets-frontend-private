/* eslint-disable no-console */
import React from 'react';
import AppProvider from './providers';
import Routes from './routes/routes';
import GlobalStyle from './styles/GlobalStyles';

function App() {
  return (
    <AppProvider>
      <GlobalStyle />
      <Routes />
    </AppProvider>
  );
}

export default App;
