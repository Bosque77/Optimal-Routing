/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import {  useSelector } from 'react-redux'
import DriverList from '../../components/DriverList'
import { State } from '../../state'
// import GoogleMap from '../GoogleMap'

// import './LandfillPage.css'

const TruckDriverPage = () => {



    return (

        <div>
            <DriverList />
        </div>

    )
}



export default TruckDriverPage