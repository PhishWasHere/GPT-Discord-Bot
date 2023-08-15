import jwtDecode from 'jwt-decode'

const setToken = async () => {
    const tokenCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('token='));
    
    const token = tokenCookie ? tokenCookie.split('=')[1] : null;
    if(token) {
      const decodedToken = jwtDecode(token) as any;
      if (decodedToken.exp * 1000 > Date.now()) {
        // return <AuthProvider token={token}>{children}</AuthProvider>
        return {
            headers: {
                authorization: token ? `Bearer ${token}` : '',
            }
        }
      }
      console.log('invalid');
    }
    return {}
}

export default setToken as any;