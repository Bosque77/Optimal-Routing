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
})



/*  
Home component is the front screen for the driver.

-- Select Date
-- Orders





*/


const Home = () => {

    const [date, setDate] = useState(new Date(1598051730000))
    const [mode, setMode] = useState('date')
    const [show, setShow] = useState(false)

    const onChange = (_event: any, selectedDate: any) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };

    const showMode = (currentMode: React.SetStateAction<string>) => {
        console.log(show)
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        console.log('trying to show the date')
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };


    return (
        <View style={styles.container}>
            <Image source={require('../../assets/main_page_logo.png')} alt="Alternate Text" size="xl" style={styles.image_style} />
            <View>
                <Button onPress={() => showDatepicker()} title="Show date picker!" >Show Date Picker</Button>
            </View>
            {show && <DateTimePicker
                testID="dateTimePicker"
                value={date}
                is24Hour={true}
                mode='date'
                onChange={onChange}
            />}
            {/* <Text> Test</Text> */}

        </View>

    )
}

export default Home