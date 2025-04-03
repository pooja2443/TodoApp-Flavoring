import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/Redux/Store/store';
import AppNavigator  from '@/Navigation/AppNavigator' 
import EnvironmentInfo from '@/components/EnvironmentInfo';

export default function Navigator() {
  return (
    <Provider store={store}>
        <AppNavigator />
        <EnvironmentInfo />
    </Provider>
  );
}