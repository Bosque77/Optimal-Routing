import React, { useState } from "react"
import { Text } from 'native-base'
import { StyleSheet } from "react-native"
import { Image, View, Button } from 'native-base'
import DateTimePicker from '@react-native-community/datetimepicker';


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
        // alignSelf: 'flex-start',
        // flex:1,
        // flexDirection: 'row',
        // flexWrap: 'wrap',
        // justifyContent: 'center',
        // flex: 1,
        width: 300,
    }
})



/*  
Home component is the front screen for the driver.

-- Select Date
-- Orders





*/


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


            </View>

        </>


    )
}

export default Home