import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import SignIn from './src/components/SignIn'
import { NativeBaseProvider } from "native-base"
import { store } from './src/state/store'
import { Provider } from 'react-redux'
import Main from './src/components/Main'
import { NavigationContainer } from '@react-navigation/native';
import { NativeRouter } from 'react-router-native';



export default function App() {

  return (
    <>

      <NativeRouter>
        <Provider store={store} >
          <NativeBaseProvider >
            <View style={styles.container}>
              <SignIn />
              <StatusBar style="auto" />
            </View>
          </NativeBaseProvider>
        </Provider>
      </NativeRouter>

    </>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
