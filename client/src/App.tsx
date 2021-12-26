import React from 'react'
import './App.css'
import Login from './components/LoginPage/Login'
import {
    BrowserRouter as Router, Route, Routes
} from 'react-router-dom'
import { State} from './state'
import { useSelector } from 'react-redux'
// import LandfillPage from './components/LandfillPage/LandfillPage'
import HomePage from './components/HomePage/HomePage'

function App() {

    const user_token = useSelector((state: State) => state.userToken)




    return (
        <Router>
            <div className="App">
                <Routes>
                    {!user_token && <Route path="/*" element={<Login />} /> }
                    {user_token && <Route path="/*" element={<HomePage />} /> }
                </Routes>
            </div>
        </Router>
    )
}

export default App
