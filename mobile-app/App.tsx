import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SignIn from './src/components/SignIn';
import { NativeBaseProvider } from "native-base";
import { store } from './src/state/store'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store} >
        <NativeBaseProvider >
          {/* <SignIn /> */}
          <Stack.Navigator>
            <Stack.Screen name="SignIn" component={SignIn} />
          </Stack.Navigator>
        </NativeBaseProvider>
      </Provider>
    </NavigationContainer>



  );
}

