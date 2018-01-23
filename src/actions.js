import axios from 'axios';

export const AUTHENTICATED = 'authenticated_user';
export const UNAUTHENTICATED = 'unauthenticated_user';
export const AUTHENTICATION_ERROR = 'authentication_error';

const baseURL = 'http://10.193.104.254:8080/dmr-api';

export default function signInAction( userId, password, history) {
  return async (dispatch) => {
    try {
      const res = await axios.post(`${baseURL}/userLogin`, {userId, password});
      dispatch({ type: AUTHENTICATED });
      localStorage.setItem('user', res.data.token);
      // history.push('/');
      window.location = '/';
    } catch(error) {
      dispatch({
        type: AUTHENTICATION_ERROR,
        payload: 'Invalid email or password'
      });
    }
  };
}