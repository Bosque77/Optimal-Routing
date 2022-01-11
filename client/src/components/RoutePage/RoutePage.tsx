/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import VehicleList from '../VehicleList'
import { bindActionCreators } from 'redux'
import { actionCreators, State } from '../../state'
import VehicleList from '../VehicleList'


const VehiclePage = () => {


    const region = useSelector((state: State) => state.setRegion)


    const computeRoutes = () => {
        console.log('inside compute routes')
    }



    return (

        <div>
            <a className="btn" onClick={() => computeRoutes()}>Compute Routes</a>
        </div>

    )
}



export default VehiclePage