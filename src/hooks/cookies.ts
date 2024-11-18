import { useCookies } from 'react-cookie';

interface UseAuthCookie {
  setAuthCookie: () => void;
  getAuthCookie: () => string | undefined;
  removeAuthCookie: () => void;
}

const useAuthCookie = (): UseAuthCookie => {
  const [cookies, setCookie, removeCookie] = useCookies(['authToken']);
  //!                 D    H    M    S 
  const timeCookie =  7 * 24 * 60 * 60;


  
  const setAuthCookie = () => {
    setCookie('authToken', 'token', { path: '/', maxAge: timeCookie});
  };

  const getAuthCookie = (): string | undefined => {
    return cookies.authToken;
  };

  const removeAuthCookie = () => {
    removeCookie('authToken', { path: '/' });
  };

  return { setAuthCookie, getAuthCookie, removeAuthCookie };
};

export default useAuthCookie;
