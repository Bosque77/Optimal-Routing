import React from 'react'
import SideNav from '../SideNav/SideNav'
import LandfillPage from '../LandfillPage/LandfillPage'
import './HomePage.css'
import RegionSelector from '../RegionSelector'

const HomePage = () => {
    return (<div>
        <SideNav />
        <div className="container">
            <RegionSelector />
            <LandfillPage />
        </div>

    </div>)
}

export default HomePage