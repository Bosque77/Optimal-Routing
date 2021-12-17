import React from 'react'
import './Home.css'
import SideNav from '../SideNav/SideNav'
import LandfillList from '../LandfillList'


import {
    Route, Routes
} from 'react-router-dom'

const Home = () => {
    return (
        <div className="body">
            <Routes>
                <Route path="/" element={
                    <div>
                        <SideNav />
                        <main>
                            <div className="container">
                                <LandfillList />
                            </div>
                        </main>

                    </div>
                }
                />
            </Routes>
            {/* <SignInForm /> */}
        </div>
    )
}

export default Home