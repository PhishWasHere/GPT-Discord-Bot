import jwtDecode from 'jwt-decode'
import Cookies from 'js-cookie'; // Import the js-cookie package

function getToken() {
  const token = Cookies.get('token') as string;

  if (!token) {
    return null;
  }

  return token
}

export default getToken;