import React, { useState } from "react"
import { Text } from 'native-base'
import { StyleSheet } from "react-native"
import { Image, View, Button } from 'native-base'
import DateTimePicker from '@react-native-community/datetimepicker';
import OrderList from "./OrderList";
import { NativeStackScreenProps } from "@react-navigation/native-stack";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
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

type RootStackParamList = {
    Home:undefined
    OrderDetails: undefined;
    Profile: { userId: string };
    Feed: { sort: 'latest' | 'top' } | undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;




const Home = ({ route, navigation }: Props) => {


    return (
        <>
            <View style={styles.container}>
                <OrderList navigation={navigation}  />
            </View>

        </>


    )
}

export default Home