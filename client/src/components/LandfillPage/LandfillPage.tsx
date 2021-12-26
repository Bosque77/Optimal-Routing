/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SideNav from '../SideNav/SideNav'
import LandfillList from '../LandfillList'
import { bindActionCreators } from 'redux'
import { actionCreators, State} from '../../state'
import GoogleMap from '../GoogleMap'
import {
    Route, Routes
} from 'react-router-dom'
import './LandfillPage.css'

const LandfillPage = () => {

    const dispatch = useDispatch()
    const { initializeLandfills} = bindActionCreators(actionCreators, dispatch)
    useEffect(() => {
        initializeLandfills()
    }, [])

    const landfills = useSelector((state: State) => state.landfills)

    return (
        <div className="body">

            <Routes>
                <Route path="/" element={
                    <div>
                        <SideNav />
                        <main>
                            <div className="container">
                                <GoogleMap landfills={landfills}/>
                                <LandfillList />
                            </div>
                        </main>

                    </div>
                }
                />
            </Routes>
            {/* { <SignInForm /> */}
        </div>
    )
}



export default LandfillPage