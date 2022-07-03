import React, { useState } from "react"
import { StyleSheet, View, ScrollView, SafeAreaView, Button, Text, Pressable } from "react-native"
import {Navigation, Order} from "../types"
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
import AddressIcon from '../../assets/address_icon.svg'

interface prop {
    order: Order
    navigation: Navigation
}

const OrderListComponent = ({order, navigation}:prop) => {

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

    if (!fontsLoaded) {
        return (<Text>Loading</Text>)
    }

    const styles = StyleSheet.create({
        main_layout: {
            alignItems: 'center',
            padding: 16,
            gap: 16,
            width: 343,
            height: 112,
            margin: 10,
            backgroundColor: '#FFFFFF',
            boxShadow: '0px 8px 60px rgba(0, 0, 0, 0.1)',
            borderRadius: 10,
        },
        text_box_layout: { "display": "flex", "flexDirection": "column", "alignItems": "flex-start", "padding": 0, "width": 235, "height": 800, "flex": 0, "flexGrow": 1 },
        header_text: {
            "width": 235,
            "height": 17,
            "fontStyle": "normal",
            "fontWeight": "500",
            "fontSize": 14,
            "lineHeight": 17,
            "color": "#323232",
            "flex": 0,
            "alignSelf": "stretch",
            "flexGrow": 1
        },
        normal_text: {
            "width": 235,
            "height": 14,
            "fontFamily": "Roboto_500Medium",
            "fontStyle": "normal",
            "fontWeight": "400",
            "fontSize": 12,
            "lineHeight": 14,
            "color": "#9e9e9e",
            "flex": 0,
            "alignSelf": "stretch",
            "flexGrow": 1
        },
        address_display: {
            flexDirection: 'row',
            flexGrow: 1
        },
        address_icon: {
            width: 15,
            height: 14,
            marginRight: 5
        },
    })

    const showOrderDetails = () => {
        console.log('inside show order details')
        navigation.navigate('OrderDetails')
    }

    return (
        <>
            <Pressable onPress={()=>showOrderDetails()} style={({ pressed }) => [
          {
            backgroundColor: pressed
              ? 'rgb(210, 230, 255)'
              : '#f5f5f5'
          },
        ]}>
                <View style={styles.main_layout}>
                    <View>
                        <Text style={styles.header_text}> {order.name}</Text>
                        <View style={styles.address_display}>
                            <AddressIcon style={styles.address_icon} />
                            <Text style={styles.normal_text}>{order.street} , {order.city} , {order.state}</Text>
                        </View>

                        <Text style={styles.normal_text}>Dumpster Size {order.dumpster_size} Yards</Text>
                        <Text style={styles.normal_text}>Type: {order.type}</Text>
                    </View>
                </View>
            </Pressable>




        </>
    )



}

export default OrderListComponent