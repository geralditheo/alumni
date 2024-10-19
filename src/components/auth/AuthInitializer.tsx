'use client';

import { useEffect } from 'react';
import { axiosConfig } from '@/helper/axiosConfig';
import { getToken } from '@/hooks/auth/authClient';

const AuthInitializer = () => {
  useEffect(() => {
    const token = getToken();
    if (token) axiosConfig.setAuthToken(token);
  }, []);

  return null; 
};

export default AuthInitializer;