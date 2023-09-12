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
  
  const res = await axios.get('api/v1/usage/users',{
    headers: {
      'Content-Type': 'application/json',
      authorization: token ? `Bearer ${token}` : '',
    },
  });
  
  return res;
}

export async function getCredit() {
  const token = getToken();

  const res = await axios.get('api/v1/usage',{
    headers: {
      'Content-Type': 'application/json',
      authorization: token ? `Bearer ${token}` : '',
    },
  });
 
  return res;
}

export async function getGuildUsage({ guild_id }: { guild_id: any } ) {
  const token = getToken();
  
  const res = await axios.get('api/v1/usage/guilds',{
    headers: {
      'Content-Type': 'application/json',
      authorization: token ? `Bearer ${token}` : '',
      guild_id: guild_id,
    },
  });
  
  return res;
}

export async function toggleUserPersistence() {
  const token = getToken();

  const res = await axios.post('api/v1/userdata/users',{
    headers: {
      'Content-Type': 'application/json', 
      authorization: token ? `Bearer ${token}` : '',
    },
  });

  return res;
}


export async function toggleGuildPersistence({ guild_id }: { guild_id: string } ) {
  const token = getToken();
  
  const res = await axios.post(
    'api/v1/userdata/guilds ',
    {guild_id},
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '', 
      },
    }
  );

  return res; 
}

export default getToken;