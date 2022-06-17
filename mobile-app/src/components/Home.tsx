import React, { useState } from "react"
import { Text } from 'native-base'
import { StyleSheet } from "react-native"
import { Image, View, Button } from 'native-base'
import DateTimePicker from '@react-native-community/datetimepicker';
import OrderList from "./OrderList";


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





const Home = () => {

    const [date, setDate] = useState(new Date())


    const onChange = (_event: any, selectedDate: any) => {
        const currentDate = selectedDate;
        setDate(currentDate);
    };



    return (
        <>
            <View style={styles.container}>

                <Image source={require('../../assets/main_page_logo.png')} alt="Alternate Text" size="xl" style={styles.image_style} />


                <View style={styles.date_picker}>
                    <DateTimePicker value={date} onChange={onChange} />
                </View>

                <OrderList />


            </View>

        </>


    )
}

export default Home