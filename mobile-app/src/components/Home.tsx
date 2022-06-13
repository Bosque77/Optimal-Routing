import React from "react"
import { Text } from 'native-base'
import { StyleSheet} from "react-native"
import {Image, View} from 'native-base'


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
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/main_page_logo.png')} alt="Alternate Text" size="xl" style={styles.image_style} />

            <Text> Test</Text>

        </View>

    )
}

export default Home