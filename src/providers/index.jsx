import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { theme } from '../themes/main';

import { UploadProvider } from './UploadProvider';
import { UploadPetProvider } from './UploadPetProvider';
import { CookiesProvider } from './CookiesProvider';

function AppProvider(props) {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale="ptBR">
      <CookiesProvider>
        <ThemeProvider theme={theme}>
          <UploadProvider>
            <UploadPetProvider>{props.children}</UploadPetProvider>
          </UploadProvider>
        </ThemeProvider>
      </CookiesProvider>
    </MuiPickersUtilsProvider>
  );
}

export default AppProvider;
