'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useAppSelector } from '@/utils/redux/store';

export default function Dashboard() {
  const userdata = useAppSelector((state) => state.authReducer.value);
  console.log(userdata);
  
    
  return (
    <div>
      {userdata.username}
    </div>
  );
}