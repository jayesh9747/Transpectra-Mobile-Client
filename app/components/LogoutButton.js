import React, { useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import authStore from '../auth/authStore';
import AuthContext from '../auth/context';
import AppButton from './AppButton';
import AuthApi from '../apis/AuthApi';

const LogoutButton = () => {

  const { setToken } = useContext(AuthContext);

  


  
  return (
    <AppButton title="Logout" onPress={handleLogout} />
  );
};

export default LogoutButton;
