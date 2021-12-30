/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import VehicleList from '../VehicleList'
import { bindActionCreators } from 'redux'
import { actionCreators, State } from '../../state'
import VehicleList from '../VehicleList'


const VehiclePage = () => {

    const dispatch = useDispatch()
    const { initializeVehicles } = bindActionCreators(actionCreators, dispatch)
    const { initializeDepots } = bindActionCreators(actionCreators, dispatch)

    const region = useSelector((state: State) => state.setRegion)

    useEffect(() => {
        if(region){
            initializeVehicles(region)
            initializeDepots(region)
        }
    }, [region])


    return (

        <div>
            <VehicleList />
        </div>

    )
}



export default VehiclePage