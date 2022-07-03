import React from "react"
import { StyleSheet } from "react-native"
import {View} from 'native-base'
import OrderList from "./OrderList";
import { Navigation } from "../types";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    image_style: {
        height: 150,
        marginBottom: 10
    },
    date_picker: {
        width: 300,
    }
})

interface prop {
    navigation: Navigation
}

const Home = ( {navigation}:prop) => {

    return (
        <>
            <View style={styles.container}>
                <OrderList navigation = {navigation} />
            </View>

        </>


    )
}

export default Home