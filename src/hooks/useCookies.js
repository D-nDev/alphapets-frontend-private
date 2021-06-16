import { useContext } from 'react';
import { CookiesContext } from '../providers/CookiesProvider';

export function useCookies() {
  const context = useContext(CookiesContext);

  return context;
}
