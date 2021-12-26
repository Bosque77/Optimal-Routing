/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LandfillList from '../LandfillList'
import { bindActionCreators } from 'redux'
import { actionCreators, State } from '../../state'
import GoogleMap from '../GoogleMap'

// import './LandfillPage.css'

const LandfillPage = () => {
    console.log('inside landfill page')

    const dispatch = useDispatch()
    const { initializeLandfills } = bindActionCreators(actionCreators, dispatch)
    useEffect(() => {
        initializeLandfills()
    }, [])

    const landfills = useSelector((state: State) => state.landfills)

    return (

        <div>
            <GoogleMap landfills={landfills} />
            <LandfillList />
        </div>

    )
}



export default LandfillPage