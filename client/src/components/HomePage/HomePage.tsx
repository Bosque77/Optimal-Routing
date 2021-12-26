import React from 'react'
import SideNav from '../SideNav/SideNav'
import LandfillPage from '../LandfillPage/LandfillPage'
import './HomePage.css'

const HomePage = () => {
    return (<div>
        <SideNav />
        <div className="container">
            <LandfillPage />
        </div>

    </div>)
}

export default HomePage