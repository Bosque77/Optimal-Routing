import React from "react"
import { View, Text, StyleSheet } from "react-native"

const styles = StyleSheet.create({
    main_container: {
        marginTop: "5%",
        marginLeft: "3%",
        marginRight: "3%"
    },
    data_row: {
        flexDirection: "row",
    },
    label: {
        justifyContent: "flex-start",
        flex:1

    },
    info:{
        justifyContent: "flex-end",
        flex:0

    }
})

const OrderDetails = () => {
    return (
        <>
            <View style={styles.main_container}>
                <View style={styles.data_row}>
                    <Text style={styles.label}>   order info goes here</Text>
                    <Text style={styles.info}>   order info goes here</Text>
                </View>

            </View>


        </>
    )
}


export default OrderDetails