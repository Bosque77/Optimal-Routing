import React from "react"
import { Text } from "native-base"
import { StyleSheet } from "react-native"
import {
    Roboto_100Thin,
    Roboto_100Thin_Italic,
    Roboto_300Light,
    Roboto_300Light_Italic,
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_500Medium_Italic,
    Roboto_700Bold,
    Roboto_700Bold_Italic,
    Roboto_900Black,
    Roboto_900Black_Italic
} from '@expo-google-fonts/roboto'

import { useFonts } from 'expo-font'
import AppLoading from 'expo-app-loading'





const OrderList = () => {

    let [fontsLoaded, error] = useFonts({
        Roboto_100Thin,
        Roboto_100Thin_Italic,
        Roboto_300Light,
        Roboto_300Light_Italic,
        Roboto_400Regular,
        Roboto_400Regular_Italic,
        Roboto_500Medium,
        Roboto_500Medium_Italic,
        Roboto_700Bold,
        Roboto_700Bold_Italic,
        Roboto_900Black,
        Roboto_900Black_Italic
    })
    
    const styles = StyleSheet.create({
        title_text: {
            fontFamily: 'Roboto_500Medium'
        }
    }
    )

    return (
        <>
            <Text style={styles.title_text}> Order List</Text>
        </>
    )

}

export default OrderList