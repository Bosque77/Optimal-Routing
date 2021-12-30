import React, { useEffect } from 'react'
import icon from './images/icon.png'
import './SideNav.css'
import M from 'materialize-css'
import { Link, useNavigate } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../state'
import { useDispatch } from 'react-redux'

const SideNav = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { setUserToken } = bindActionCreators(actionCreators, dispatch)

    useEffect(() => {
        M.AutoInit()

    }, [])



    const onSignOut = () => {
        console.log('inside onSignOut')
        window.localStorage.clear()
        setUserToken(null)
        navigate('/')
    }


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
                <li><Link to="/depot">Depots</Link></li>
                <li><Link to="/vehicle">Vehicles</Link></li>
                <li><Link to="/order">Orders</Link></li>
                <li><Link to="/route">Routes</Link></li>

                <li>
                    <div className='button-spacing'>
                        <button className="btn black" onClick={() => onSignOut()}>Sign Out</button>
                    </div>

                </li>
            </ul>

        </div>
    )

}


export default SideNav


