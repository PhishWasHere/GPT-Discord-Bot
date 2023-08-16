import jwtDecode from 'jwt-decode'
import { parse } from 'cookie'; // Import the parse function from the 'cookie' package
import Cookies from 'js-cookie'; // Import the js-cookie package

function getToken() {
  const token = Cookies.get('token');

  if (!token) {
    return null;
  }

  return token
}
export default getToken as any;