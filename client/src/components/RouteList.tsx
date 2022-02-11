import React, { useEffect, useState } from 'react'
import AddRouteItem from './AddRouteItem'
import M from 'materialize-css'


const RouteList = () => {

    const [addRouteItemActive, setAddRouteItemActive] = useState(false)


    // useEffect(() => {
    //     M.AutoInit()
    // }
    // )

    const addRouteItem = () => {
        console.log('setting the route item to active')
        setAddRouteItemActive(true)
    }

    return (
        <div>
            <ul className="collapsible">
                <li className="center-align">
                    <div className="collapsible-header">Route</div>
                    <div className="collapsible-body">
                        <table>
                            <tbody>
                                <tr>
                                    <div className="row">
                                        <div className="col l6">
                                            Total Distance:
                                        </div>
                                        <div className=" col l6">
                                            Total Time:
                                        </div>
                                    </div>
                                    <div className="row ">
                                        <div className="col l3 offset-l5">
                                            <a className="waves-effect waves-light red btn" onClick={() => addRouteItem()}>Add Route Item</a>
                                        </div>
                                    </div>

                                </tr>
                            </tbody>
                        </table>
                    </div>
                </li>
            </ul>
            {addRouteItemActive && <AddRouteItem setActive={setAddRouteItemActive} />}
        </div>
    )

}


export default RouteList