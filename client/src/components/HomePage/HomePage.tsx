import React from 'react'
import SideNav from '../SideNav/SideNav'
import LandfillPage from '../LandfillPage/LandfillPage'
import TruckDriverPage from '../TruckDriverPage/TruckDriverPage'
import './HomePage.css'
import RegionSelector from '../RegionSelector'
import { Route, Routes } from 'react-router-dom'

const HomePage = () => {
    return (<div>
        <SideNav />
        <main>
            <div className="container">
                <RegionSelector />
                <Routes>
                    <Route path="/driver" element={<TruckDriverPage />}/>
                    <Route path="/landfill" element={<LandfillPage />} />
                    <Route path="/" element={<LandfillPage />} />
                </Routes>

            </div>
        </main>


    </div>)
}

export default HomePage