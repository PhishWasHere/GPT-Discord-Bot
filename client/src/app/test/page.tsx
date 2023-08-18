'use client'
export default function Test() {
  const handleLogin = () => {
    // Redirect user to the backend's OAuth route
    window.location.href = '/api/v1/auth';
  };
  
  return (
    <div>
      <button className='justify-center' onClick={handleLogin}>Login with Discord</button>
    </div>  
  )
}

