import jwtDecode from 'jwt-decode'
import Cookies from 'js-cookie'; // Import the js-cookie package
import axios from 'axios';

function getToken() {
  const token = Cookies.get('token') as string;

  if (!token) {
    return null;
  }

  return token
}

export async function getUserData() {
  const token = getToken();

  const res = await axios.get('api/v1/userdata',{
    headers: {
      'Content-Type': 'application/json',
      authorization: token ? `Bearer ${token}` : '',
    },
  });
  return res;
}

export async function getUserUsage() {
  const token = getToken();

  const decodedToken = jwtDecode(token!) as { [key: string]: string };
  
  const res = await axios.get('api/v1/usage/users',{
    headers: {
      'Content-Type': 'application/json',
      authorization: token ? `Bearer ${token}` : '',
      user_id: decodedToken.user_id,
    },
  });
  
  return res;
}

export async function getGuildUsage({ guild_id }: { guild_id: any } ) {
  const token = getToken();

  const decodedToken = jwtDecode(token!) as { [key: string]: string };
  
  const res = await axios.get('api/v1/usage/guilds',{
    headers: {
      'Content-Type': 'application/json',
      authorization: token ? `Bearer ${token}` : '',
      user_id: decodedToken.user_id,
      guild_id: guild_id,
    },
  });
  
  return res;
}


export default getToken;