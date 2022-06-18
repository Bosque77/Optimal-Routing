import React from "react"
// import { Text } from "native-base"
import { StyleSheet, View, Text, Image } from "react-native"
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


const orders = [
    {
        'name': 'Forest Schwartz',
        'email': 'forestschwrtz@gmail.com',
        'phone_number': '404-617-9402',
        'street': '4703 Cambridge Dr.',
        'city': 'Atlanta',
        'state': 'Georgia',
        'zipcode': 30338,
        'latitude': 33.935,
        'longitude': -84.318,
        'dumpster_size': 15,
        'delivery_date': 'Thu Dec 30 2021',
        'pickup_date': 'Fri Dec 31 2021',
        'delivery_time': {
            'hour': 12,
            'minute': 35,
            'am_pm': 'AM'
        },
        'pickup_time': {
            'hour': 5,
            'minute': 45,
            'am_pm': 'PM'
        },
        'special_instructions': 'Please come early',
        'delivery_completed': false,
        'pickup_completed': false,
        'user_id': '61c7483607e4533869b9ec08',
        'region_id': '61ca3cb19e9ade7351418e30',
        'type': 'Order'
    },
    {
        'name': 'Josh Rodriguez',
        'email': 'jr@gmail.com',
        'phone_number': '404-585-8945',
        'street': '225 Baker St NW',
        'city': 'Atlanta',
        'state': 'Georgia',
        'zipcode': 30313,
        'latitude': 33.764,
        'longitude': -84.395,
        'dumpster_size': 15,
        'delivery_date': 'Wed Dec 29 2021',
        'pickup_date': 'Thu Dec 30 2021',
        'delivery_time': {
            'hour': 12,
            'minute': 35,
            'am_pm': 'AM'
        },
        'pickup_time': {
            'hour': 5,
            'minute': 45,
            'am_pm': 'PM'
        },
        'special_instructions': 'Please come early',
        'delivery_completed': true,
        'pickup_completed': false,
        'user_id': '61c7483607e4533869b9ec08',
        'region_id': '61ca3cb19e9ade7351418e30',
        'type': 'Order'
    },
    {
        'name': 'Daniel Carusi',
        'email': 'd.carusi@gmail.com',
        'phone_number': '485-859-8569',
        'street': '690 Olde Rope Mill Park Rd',
        'city': 'Woodstock',
        'state': 'Georgia',
        'zipcode': 30188,
        'latitude': 34.131,
        'longitude': -84.523,
        'dumpster_size': 30,
        'delivery_date': 'Thu Dec 30 2021',
        'pickup_date': 'Wed Jan 05 2022',
        'delivery_time': {
            'hour': 12,
            'minute': 35,
            'am_pm': 'AM'
        },
        'pickup_time': {
            'hour': 5,
            'minute': 45,
            'am_pm': 'PM'
        },
        'special_instructions': 'Please come early',
        'delivery_completed': false,
        'pickup_completed': false,
        'user_id': '61c7483607e4533869b9ec08',
        'region_id': '61ca3cb19e9ade7351418e30',
        'type': 'Order'
    },

]

const OrderListComponent = () => {

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
            width:15,
            height: 14,
            marginRight: 5


        }

    })

    return (
        <>
            <View style={styles.main_layout}>
                <View>
                    <Text style={styles.header_text}> The Kitchen - Quinao</Text>
                    <View style={styles.address_display}>
                        <AddressIcon style={styles.address_icon}/>
                        <Text style={styles.normal_text}>4703 Cambridge Dr.</Text>
                    </View>

                    <Text style={styles.normal_text}>Dumpster Size 20 Yards</Text>
                    <Text style={styles.normal_text}>Type: Delivery</Text>
                </View>
            </View>
        </>
    )



}




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
            marginTop: 10
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
        }
    }
    )


    return (
        <>
            <View style={styles.list_layout}>
                <View style={styles.title_view}><Text style={styles.title_text}> Order List</Text></View>

                <OrderListComponent />
                <OrderListComponent />

            </View>



        </>
    )

}

export default OrderList