import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import MainApp from './src/index';

function App(): JSX.Element {
  return (
    <>
      <SafeAreaProvider>
        <NativeBaseProvider>
          <NavigationContainer>
            <MainApp />
          </NavigationContainer>
        </NativeBaseProvider>
      </SafeAreaProvider>
    </>
  );
}

export default App;
