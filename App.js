import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';

import navigationTheme from './app/navigations/navigationtheme';
import AuthNavigator from './app/navigations/AuthNavigator';
import AppDrawerNavigator from './app/navigations/AppDrawerNavigator';
import OfflineNotice from './app/components/OfflineNotice';

import authStorage from './app/auth/authStore';
import AuthContext from './app/auth/context';

import { ToastMessage } from './app/components/ToastMessage';
import authStore from './app/auth/authStore';

SplashScreen.preventAutoHideAsync();


export default function App() {
  const [isReady, setReady] = useState(false);
  const [token, setToken] = useState(null);

  const restoreToken = async () => {
    const authToken = await authStorage.getToken();
    if (authToken) setToken(authToken);
  };

  useEffect(() => {
    const rehydrate = async () => {
      await restoreToken();
      setReady(true);
      await SplashScreen.hideAsync();
    };
    rehydrate();
  }, []);



  if (!isReady) {
    return null; // Render nothing while app is loading
  }




  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <View style={{ flex: 1 }}>
        <OfflineNotice />
        <NavigationContainer theme={navigationTheme}>
          {token ? <AppDrawerNavigator /> : <AuthNavigator />}
        </NavigationContainer>
        <ToastMessage />
      </View>
      <OfflineNotice />
    </AuthContext.Provider>
    // <>
    // 
    //  <ProductViewScreen route={{ params: { productId: 6 } }} />
    // </>
    // <FilterScreen />
    // <><RegisterScreen /></>
  );
}
