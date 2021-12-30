import React from 'react'
import SideNav from '../SideNav/SideNav'
import LandfillPage from '../LandfillPage/LandfillPage'
import TruckDriverPage from '../TruckDriverPage/TruckDriverPage'
import VehiclePage from '../VehiclePage/VehiclePage'
import OrderPage from '../OrderPage/OrderPage'
import './HomePage.css'
import RegionSelector from '../RegionSelector'
import { Route, Routes } from 'react-router-dom'
import DepotPage from '../DepotPage/DepotPage'

const HomePage = () => {
    return (<div>
        <SideNav />
        <main>
            <div className="container">
                <RegionSelector />
                <Routes>
                    <Route path="/order" element = {<OrderPage />}/>
                    <Route path="/vehicle" element={<VehiclePage />} />
                    <Route path="/depot" element={<DepotPage />} />
                    <Route path="/driver" element={<TruckDriverPage />} />
                    <Route path="/landfill" element={<LandfillPage />} />
                    <Route path="/" element={<LandfillPage />} />
                </Routes>

            </div>
        </main>


    </div>)
}

export default HomePage