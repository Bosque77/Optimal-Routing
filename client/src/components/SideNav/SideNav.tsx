import React, { Component } from 'react'
import icon from './images/icon.png'
import './SideNav.css'
// Import Materialize
import M from 'materialize-css'
import { Link } from 'react-router-dom'

class SideNav extends Component {

    componentDidMount() {
        M.AutoInit()

    }

    render() {
        return (
            <div>
                <ul id="slide-out" className="sidenav sidenav-fixed">
                    <li>
                        {/* <div> <i className="material-icons">add</i></div> */}
                        <div><a href="#!" className=""><img className="icon" src={icon} /></a></div>
                    </li>
                    <li><div className="divider"></div></li>
                    <li><Link to="/landfill">Landfills</Link></li>
                    <li><Link to="/driver">Truck Drivers</Link></li>
                    <li><Link to="/vehicle">Vehicles</Link></li>
                    <li><Link to="/order">Orders</Link></li>
                    <li><Link to="/route">Routes</Link></li>

                    {/* <li><a href="/landfill" >Landfills</a></li>
                    <li><a href="#!" >Truck Drivers</a></li>
                    <li><a href="#!" >Vehicles</a></li>
                    <li><a href="#!" >Orders</a></li>
                    <li><a href="#!" >Routes</a></li> */}
                </ul>

            </div>
        )
    }

}


export default SideNav