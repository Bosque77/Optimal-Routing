import React, { useState } from "react"
// import { Badge, Box, Flex, HStack, Pressable, Spacer,Text } from "native-base"
import { StyleSheet, View, ScrollView, SafeAreaView, Button, Text} from "react-native"
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
import { orders } from '../local_db'
import { Navigation} from "../types"
import DateTimePickerModal from "react-native-modal-datetime-picker";
import OrderListComponent from "./OrderListComponent"


interface prop {
    navigation: Navigation
}


const OrderList = ( {navigation}: prop) => {

    const [date, setDate] = useState(new Date())
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

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
        list_layout: {
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'flex-start',
            backgroundColor: '#F9F9F9',
            padding: 15,
            marginTop: 10,

        },
        title_view: {
            // width: '100%',
            flexDirection: 'row',
            justifyContent: 'flex-start',
        },

        title_text: {
            fontSize: 28,
            fontFamily: 'Roboto_500Medium',
            flex: 1,
        },
        scroll_view: {
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'flex-start',
            backgroundColor: '#F9F9F9',
            padding: 15,
            marginTop: 10,

        },
        scroll_view_break: {
            height: 15
        },
        date_picker: {
            width: 300,
            // flex:1

        },
        date_container: {
            flexDirection: 'column',
            marginTop: 15,
            marginBottom: 15,
            justifyContent: 'flex-end',
            alignItems: 'center'
        }
    }
    )

    const insertOrders = () => {


        return (
            orders.map(order => {
                return (
                    <OrderListComponent order={order} key={order.id} navigation={navigation} />
                )

            })
        )
    }





    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date: Date) => {
        setDate(date)
        hideDatePicker();
    };


    return (
        <>



            <SafeAreaView style={{ flex: 1, marginTop: 15 }}>
                <View style={styles.title_view}><Text style={styles.title_text}> Order List</Text></View>
                <View style={styles.date_container}>
                    <Button onPress={showDatePicker} title={date.toDateString()} />
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        date={date}
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker} />
                </View>
                <ScrollView style={styles.scroll_view} >
                    {insertOrders()}

                    <View style={styles.scroll_view_break}></View>

                </ScrollView>
            </SafeAreaView>










        </>
    )

}

export default OrderList