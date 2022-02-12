import React, { useEffect, useState } from 'react'
import AddRouteItem from './AddRouteItem'
import M from 'materialize-css'
import { Order, Landfill, Depot, Route_Item } from '../types'


interface prop {
    orders: Order[],
    landfills: Landfill[],
    depots: Depot[],
    todays_date: Date,

}

const RouteList = ({ orders, landfills, depots, todays_date }: prop) => {

    const [addRouteItemActive, setAddRouteItemActive] = useState(false)
    const [routeItemsList, setRouteItemsList] = useState<Route_Item[]>([])


    // useEffect(() => {
    // }
    // )

    const addRouteItem = () => {
        console.log('setting the route item to active')
        setAddRouteItemActive(true)
    }

    function instanceOfOrder(object: any): object is Order {
        return true
    }

    function instanceOfLandfill(object: any): object is Landfill {
        return true
    }

    function instanceOfDepot(object: any): object is Depot {
        return true
    }

    const insertRouteItems = () => {


        // let display_data = []

        for (let i = 0; i < routeItemsList.length; i++) {
            const current_route_item = routeItemsList[i]
            console.log(current_route_item.type)

            // if (instanceOfOrder(current_route_item)) {
            //     console.log('Route Item is a Order')
            // } else if (instanceOfDepot(current_route_item)) {
            //     console.log('Route Item is a Depot')
            // } else if (instanceOfLandfill(current_route_item)) {
            //     console.log('Route Item is a Landfill')
            // }


        }




        return (
            routeItemsList.map(route_item =>
                <tr key={route_item.id}>
                    <td>{route_item.name}</td>
                </tr>)
        )
    }

    return (
        <div>
            <ul className="collapsible">
                <li className="center-align">
                    <div className="collapsible-header">Route</div>
                    <div className="collapsible-body">
                        <table>
                            <thead>
                                {/* <tr>
                                    <div className="row">
                                        <div className="col l6">
                                            Total Distance:
                                        </div>
                                        <div className=" col l6">
                                            Total Time:
                                        </div>
                                    </div>
                                </tr> */}
                                <tr>
                                    <th>Name</th>
                                    <th>Dumpster Size</th>
                                    <th>Order Type</th>
                                </tr>
                            </thead>
                            <tbody>


                                {insertRouteItems()}

                                <tr>
                                    <a className="waves-effect waves-light red btn" onClick={() => addRouteItem()}>Add Route Item</a>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </li>
            </ul>
            {addRouteItemActive && <AddRouteItem orders={orders} landfills={landfills} depots={depots} todays_date={todays_date} setActive={setAddRouteItemActive} routeItemsList={routeItemsList} setRouteItemsList={setRouteItemsList} />}
        </div>
    )

}


export default RouteList