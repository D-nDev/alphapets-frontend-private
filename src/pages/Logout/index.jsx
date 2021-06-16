import React from 'react';

// import { useHistory } from 'react-router-dom';
import { useCookies } from '../../hooks/useCookies';

function Logout() {
  const { cookies } = useCookies();
  // const navigate = useHistory();
  return (
    <>
      {cookies.remove('email', { path: '/' })}
      {cookies.remove('name', { path: '/' })}
      {(window.location.href = '/')}
    </>
  );
}

export default Logout;
