/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DriverList from '../DriverList'
import { bindActionCreators } from 'redux'
import { actionCreators, State } from '../../state'
// import GoogleMap from '../GoogleMap'

// import './LandfillPage.css'

const TruckDriverPage = () => {

    const dispatch = useDispatch()
    const { initializeDrivers } = bindActionCreators(actionCreators, dispatch)

    const region = useSelector((state: State) => state.setRegion)

    useEffect(() => {
        if(region){
            initializeDrivers(region)
        }
    }, [region])

    const drivers = useSelector((state: State) => state.drivers)
    console.log(drivers)

    return (

        <div>
            <DriverList />
        </div>

    )
}



export default TruckDriverPage