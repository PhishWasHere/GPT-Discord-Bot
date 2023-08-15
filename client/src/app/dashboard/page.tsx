'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import setToken from '@/utils/auth'; // Import the setToken function

const getData = async () => {
    try {
      const res = await axios.get('/api/v1/');
      return res.data; // Return the response data
    } catch (err) {
      console.log(err);
      return null; // Return null or an appropriate value in case of an error
    }
  };
  
  export default function Dashboard() {
    const [data, setData] = useState(null);
    const headers = setToken(); // Get headers from setToken function
  
    useEffect(() => {
      const fetchData = async () => {
        const fetchedData = await getData();
        setData(fetchedData);
      };
      fetchData();
    }, []);
    console.log(data);
    
    return (
      <div>
        
        {headers.authorization ? (
          <div>
            {data !== null ? <h1>Dashboard</h1> : <h1>Loading Dashboard...</h1>}
          </div>
        ) : (
          <h1>Not logged in</h1>
        )}
      </div>
    );
  }