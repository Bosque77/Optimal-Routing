/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import './Home.css'
import SideNav from '../SideNav/SideNav'
import LandfillList from '../LandfillList'
// import Map from '../Map'
import GoogleMap from '../GoogleMap'
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
                                <GoogleMap />
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



export default Home