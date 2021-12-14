import React from 'react'
import './Home.css'
import SideNav from '../SideNav/SideNav'


import {
    Route, Routes
} from 'react-router-dom'

const Home = () => {
    return (
        <div className="body">
            <Routes>
                <Route path="/" element={<SideNav />} />
            </Routes>
            {/* <SignInForm /> */}
        </div>
    )
}

export default Home