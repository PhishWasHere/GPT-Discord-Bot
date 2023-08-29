'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/router';

const CallBack = () => {
    const router = useRouter();

    useEffect(() => {
      const token = router.query.token;
  
      if (token) {
        localStorage.setItem('token', token as string);
      }
    }, [router]);
    
};

export default CallBack;
