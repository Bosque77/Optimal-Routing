import React, { useEffect } from 'react'
import './App.css'
import Login from './pages/LoginPage/Login'
import {
    BrowserRouter as Router, Route, Routes
} from 'react-router-dom'
import { actionCreators, State } from './state'
import { useDispatch, useSelector } from 'react-redux'
import HomePage from './pages/HomePage/HomePage'
import { bindActionCreators } from 'redux'
import { Region, UserToken } from './types'



function App() {

    const user_token = useSelector((state: State) => state.userToken)
    const region = useSelector((state: State) => state.setRegion);
    const dispatch = useDispatch()
    const { setUserToken, setRegion, initializeRegions } = bindActionCreators(actionCreators, dispatch)

    useEffect(() => {
        const user_token = window.localStorage.getItem('user_token')
        const region = window.localStorage.getItem('region')
        if (user_token) {
            const parsed_user_token: UserToken = JSON.parse(user_token)
            setUserToken(parsed_user_token)
            if(region){
                const parsed_region: Region = JSON.parse(region)
                setRegion(parsed_region)
                initializeRegions()
            }
        }
    }, [])


    return (
        <Router>
            <div className="App">


                <Routes>
                    
                    {!user_token && <Route path="/*" element={<Login />} />}

                    {user_token && region && <Route path="/*" element={<HomePage />} />}

                </Routes>

            </div>
        </Router>
    )
}

export default App

