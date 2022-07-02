import React, { useState } from "react"
// import { Badge, Box, Flex, HStack, Pressable, Spacer,Text } from "native-base"
import { StyleSheet, View, ScrollView, SafeAreaView, Button, Text, Pressable } from "react-native"
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
import AddressIcon from '../../assets/address_icon.svg'
import { orders } from '../local_db'
import { Order } from "../types"
import { flexbox } from "native-base/lib/typescript/theme/styled-system"
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeStackNavigationConfig, NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types"


type RootStackParamList = {
    Home: undefined;
    OrderDetails:undefined
    Profile: { userId: string };
    Feed: { sort: 'latest' | 'top' } | undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

interface prop {
    order: Order
    navigation:NativeStackNavigationProp<RootStackParamList,'Profile'>
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
              : 'white'
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

interface prop_2 {
    navigation:NativeStackNavigationProp<RootStackParamList,'Profile'>
}



const OrderList = ({ navigation }: prop_2) => {

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