import { Button } from "native-base"
import React from "react"
import { View, Text, StyleSheet } from "react-native"

import {orders} from "../local_db"
import { Order } from "../types"

const order = orders[0]

const styles = StyleSheet.create({
    main_container: {
        marginTop: '5%',
        marginLeft: '3%',
        marginRight: '3%',
    },
    data_row: {
        flexDirection: 'row',
        paddingTop: 10,
        marginTop: 1,
        paddingBottom: 10,
        backgroundColor: 'white'
    },
    label: {
        justifyContent: 'flex-start',
        flex:1,
        color: '#9e9e9e',
        fontSize: 16,
        fontWeight: '500'

    },
    info:{
        justifyContent: 'flex-end',
        flex:0,
        fontSize: 16,
        fontWeight: '500'

    },
    completed_button:{
        marginTop: 15,

    }
})

const OrderDetails = () => {
    return (
        <>
            <View style={styles.main_container}>
            <View style={styles.data_row}>
                    <Text style={styles.label}>   Name</Text>
                    <Text style={styles.info}>   {order.name} </Text>
                </View>
                <View style={styles.data_row}>
                    <Text style={styles.label}>   Email</Text>
                    <Text style={styles.info}>   {order.email} </Text>
                </View>
                <View style={styles.data_row}>
                    <Text style={styles.label}>   Number</Text>
                    <Text style={styles.info}>   {order.phone_number} </Text>
                </View>
                <View style={styles.data_row}>
                    <Text style={styles.label}>   Street</Text>
                    <Text style={styles.info}>   {order.street} </Text>
                </View>
                <View style={styles.data_row}>
                    <Text style={styles.label}>   City</Text>
                    <Text style={styles.info}>   {order.city} </Text>
                </View>
                <View style={styles.data_row}>
                    <Text style={styles.label}>   State</Text>
                    <Text style={styles.info}>   {order.state} </Text>
                </View>
                <View style={styles.data_row}>
                    <Text style={styles.label}>   Zipcode</Text>
                    <Text style={styles.info}>   {order.zipcode} </Text>
                </View>
                <View style={styles.data_row}>
                    <Text style={styles.label}>   Dumpster Size</Text>
                    <Text style={styles.info}>   {order.dumpster_size} </Text>
                </View>
                <View style={styles.data_row}>
                    <Text style={styles.label}>   Delivery Date</Text>
                    <Text style={styles.info}>   {order.delivery_date} </Text>
                </View>
                <View style={styles.data_row}>
                    <Text style={styles.label}>   Pickup Date</Text>
                    <Text style={styles.info}>   {order.pickup_date} </Text>
                </View>
                <View style={styles.data_row}>
                    <Text style={styles.label}>   Delivery Time (Optional)</Text>
                    <Text style={styles.info}>   {order.delivery_time?.hour} {order.delivery_time?.am_pm} </Text>
                </View>
                <View style={styles.data_row}>
                    <Text style={styles.label}>   Pickup Time (Optional)</Text>
                    <Text style={styles.info}>   {order.pickup_time?.hour} {order.pickup_time?.am_pm} </Text>
                </View>
                <Button style={styles.completed_button}>Completed</Button>

            </View>


        </>
    )
}


export default OrderDetails