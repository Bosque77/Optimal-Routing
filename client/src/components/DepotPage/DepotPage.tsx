/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DepotList from '../DepotList'
import { bindActionCreators } from 'redux'
import { actionCreators, State } from '../../state'
import GoogleMap from '../GoogleMap'



const DepotPage = () => {
    console.log('inside depot page')

    const dispatch = useDispatch()
    const { initializeDepots } = bindActionCreators(actionCreators, dispatch)

    const region = useSelector((state: State) => state.setRegion)

    useEffect(() => {
        if(region){
            initializeDepots(region)
        }
    }, [region])

    const depots = useSelector((state: State) => state.depots)

    return (

        <div>
            <GoogleMap depots={depots} />
            <DepotList />
        </div>

    )
}



export default DepotPage