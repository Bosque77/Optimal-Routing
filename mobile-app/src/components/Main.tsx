import { StatusBar } from "expo-status-bar"
import { NativeBaseProvider } from "native-base"
import React from "react"
import { StyleSheet, View } from "react-native"
import SignIn from "./SignIn"


const Main = () => {
    return (
        <>
            <NativeBaseProvider >
                <View style={styles.container}>
                    {/* <SignIn /> */}
                    <StatusBar style="auto" />
                </View>
            </NativeBaseProvider>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });


export default Main