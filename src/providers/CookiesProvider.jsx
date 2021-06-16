import React, { createContext } from 'react';
// import { useCookies } from 'react-cookie';
import Cookies from 'universal-cookie';

export const CookiesContext = createContext({});

export const CookiesProvider = props => {
  // const [cookies, setCookies, removeCookie] = useCookies(['email']);
  const cookies = new Cookies();
  return (
    <CookiesContext.Provider value={{ cookies }}>
      {props.children}
    </CookiesContext.Provider>
  );
};
