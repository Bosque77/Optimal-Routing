import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SignIn from './src/components/SignIn';
import { NativeBaseProvider } from "native-base";
import { store } from './src/state/store'
import { Provider } from 'react-redux'

export default function App() {
  return (
    <Provider store={store} >
      <NativeBaseProvider >
        <View style={styles.container}>
          <SignIn />
          <StatusBar style="auto" />
        </View>
      </NativeBaseProvider>
    </Provider>


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
