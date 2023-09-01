'use client';

import { useEffect } from "react";
import Cookies from 'js-cookie';


export default function Page () {
    useEffect(() => {    
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token'); 
    
        if (token) {
          Cookies.set('token', token);
        }
        
        window.location.href = '/'
    }, []);
    
    return(
        <>
            loading...
        </>
    )
}