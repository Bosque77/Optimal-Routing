import React, { useEffect, useState } from 'react'
import AddRouteItem from './AddRouteItem'
import M from 'materialize-css'
import { Order, Landfill, Depot, Route_Item } from '../types'
import styled from 'styled-components'


const Spacing = styled.div`
  margin-top: 2em;
`


interface prop {
    orders: Order[],
    landfills: Landfill[],
    depots: Depot[],
    todays_date: Date,
    assignedOrders: Order[],
    setAssignedOrders: React.Dispatch<React.SetStateAction<Order[]>>

}

const RouteList = ({ orders, landfills, depots, todays_date, assignedOrders, setAssignedOrders }: prop) => {

    const [addRouteItemActive, setAddRouteItemActive] = useState(false)
    const [routeItemsList, setRouteItemsList] = useState<Route_Item[]>([])


    useEffect(() => {
        const elems = document.querySelectorAll('.collapsible')
        M.Collapsible.init(elems, {})
    }
    )

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
        return (
            routeItemsList.map(route_item => getJSXObject(route_item))
        )
    }

    const deleteRouteItem = (route_item: Route_Item) => {
        console.log('inside delete route item')
        const new_route_item_list = routeItemsList.filter(current_route_item => current_route_item.id != route_item.id)
        setRouteItemsList(new_route_item_list)
        if (route_item.type === 'Order') {
            const new_assigned_orders = assignedOrders.filter(order => order.id != route_item.id)
            setAssignedOrders(new_assigned_orders)
        }
    }


    const getJSXObject = (route_item: Route_Item) => {

        if (route_item.type === 'Order') {
            return (
                <tr key={route_item.id}>
                    <td>Order</td>
                    <td>{route_item.order_type}</td>
                    <td>{route_item.name}</td>
                    <td>{route_item.dumpster_size} Yard</td>
                    <td><button className="btn black" onClick={() => deleteRouteItem(route_item)}><i className="large material-icons">delete</i></button></td>
                </tr>
            )
        } else if (route_item.type === 'Landfill') {
            return (
                <tr key={route_item.id}>
                    <td>Landfill</td>
                    <td>{route_item.name}</td>
                    <td></td>
                    <td></td>
                    <td><button className="btn black" onClick={() => deleteRouteItem(route_item)}><i className="large material-icons">delete</i></button></td>
                </tr>
            )
        } else if (route_item.type === 'Depot') {
            return (
                <tr key={route_item.id}>
                    <td>Depot</td>
                    <td>{route_item.name}</td>
                    <td></td>
                    <td></td>
                    <td><button className="btn black" onClick={() => deleteRouteItem(route_item)}><i className="large material-icons">delete</i></button></td>
                </tr>
            )
        }

    }

    return (
        <div>
            <ul className="collapsible">
                <li className="center-align">
                    <div className="collapsible-header">Route</div>
                    <div className="collapsible-body">
                        <table className="striped">
                            <tbody>


                                {insertRouteItems()}




                            </tbody>
                            <Spacing />
                            <a className="red btn" onClick={() => addRouteItem()}>Add Route Item</a>
                        </table>
                    </div>
                </li>
            </ul>
            {addRouteItemActive && <AddRouteItem orders={orders} landfills={landfills} depots={depots} todays_date={todays_date} setActive={setAddRouteItemActive} routeItemsList={routeItemsList} setRouteItemsList={setRouteItemsList} assignedOrders={assignedOrders} setAssignedOrders={setAssignedOrders} />}
        </div>
    )

}


export default RouteList