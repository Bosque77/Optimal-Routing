import React, { useEffect, useState } from 'react'
import AddRouteItem from './AddRouteItem'
import M from 'materialize-css'
import { Order, Landfill, Depot, Route_Item } from '../types'
import styled from 'styled-components'
import { cleanup } from '@testing-library/react'
import RouteService from '../services/route_query'


const Spacing = styled.div`
  margin-top: 2em;
`


interface prop {
    orders: Order[],
    landfills: Landfill[],
    depots: Depot[],
    date: Date,
    assignedOrders: Order[],
    setAssignedOrders: React.Dispatch<React.SetStateAction<Order[]>>

}

const RouteLists = ({ orders, landfills, depots, date, assignedOrders, setAssignedOrders }: prop) => {

    const [addRouteItemActive, setAddRouteItemActive] = useState(false)
    const [routeItemsDictionary, setRouteItemsDictionary] = useState<{ [id: string]: Route_Item[] }>({ 'original-route-list': [] })
    const [routeListIds, setRouteListIds] = useState(['original-route-list'])
    const [routeListId, setRouteListId] = useState('')


    useEffect(() => {
        const elems = document.querySelectorAll('.collapsible')
        M.Collapsible.init(elems, {})

    })

    const addRouteItem = (list_id: string) => {
        console.log('setting the route item to active')
        setRouteListId(list_id)
        setAddRouteItemActive(true)
    }


    const insertRouteItems = (list_id: string) => {
        const route_items = routeItemsDictionary[list_id]
        return (route_items.map(route_item => getJSXObject(route_item, list_id)))

    }

    const deleteRouteItem = (route_item: Route_Item, list_id: string) => {
        console.log('inside delete route item')
        const new_route_items_dictionary = { ...routeItemsDictionary }
        new_route_items_dictionary[list_id] = new_route_items_dictionary[list_id].filter(current_route_item => current_route_item.id != route_item.id)
        setRouteItemsDictionary(new_route_items_dictionary)
        if (route_item.type === 'Order') {
            const new_assigned_orders = assignedOrders.filter(order => order.id != route_item.id)
            setAssignedOrders(new_assigned_orders)
        }
    }


    const getJSXObject = (route_item: Route_Item, list_id: string) => {

        if (route_item.type === 'Order') {
            return (
                <tr key={route_item.id}>
                    <td>Order</td>
                    <td>{route_item.order_type}</td>
                    <td>{route_item.name}</td>
                    <td>{route_item.dumpster_size} Yard</td>
                    <td><button className="btn-floating black" onClick={() => deleteRouteItem(route_item, list_id)}><i className="material-icons">remove</i></button></td>
                </tr>
            )
        } else if (route_item.type === 'Landfill') {
            return (
                <tr key={route_item.id}>
                    <td>Landfill</td>
                    <td>{route_item.name}</td>
                    <td></td>
                    <td></td>
                    <td><button className="btn-floating black" onClick={() => deleteRouteItem(route_item, list_id)}><i className="material-icons">remove</i></button></td>
                </tr>
            )
        } else if (route_item.type === 'Depot') {
            return (
                <tr key={route_item.id}>
                    <td>Depot</td>
                    <td>{route_item.name}</td>
                    <td></td>
                    <td></td>
                    <td><button className="btn-floating black" onClick={() => deleteRouteItem(route_item, list_id)}><i className="material-icons">remove</i></button></td>
                </tr>
            )
        }

    }


    const analyzeRouteItems = async (list_id:string) => {
        const route_items = routeItemsDictionary[list_id]
        const route_data = await RouteService.analyzeRoute(route_items)

    }

    const insertRouteLists = () => {
        return (
            routeListIds.map(id =>
                <div key='id'>
                    <div className="row">
                        <div className="col l10">
                            <ul className="collapsible">

                                <li className="center-align">
                                    <div className="collapsible-header">Route</div>
                                    <div className="collapsible-body">
                                        <table className="striped">
                                            <tbody>
                                                {insertRouteItems(id)}
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td> <a className="red btn-floating" onClick={() => addRouteItem(id)}><i className="material-icons">add</i></a>                                                 </td>
                                                </tr>
                                            </tbody>

                                        </table>
                                        <Spacing />
                                        <div className="row">

                                            <div className="col l4">
                                                <a className="btn blue lighten-3" onClick={() => analyzeRouteItems(id)}>Analyze Route</a>
                                            </div>

                                        </div>

                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="col l2">
                            <button className="btn black" onClick={() => deleteRouteList(id)}><i className="material-icons">delete</i></button>
                        </div>
                    </div>
                </div>
            )
        )
    }

    const deleteRouteList = (list_id: string) => {
        console.log('inside delete route list')

        const new_route_items_dictionary = { ...routeItemsDictionary }
        const route_items_for_this_list = new_route_items_dictionary[list_id]
        let new_route_list_ids = [...routeListIds]

        let new_assigned_orders = [...assignedOrders]

        route_items_for_this_list.forEach(route_item => {
            if (route_item.type === 'Order') {
                new_assigned_orders = new_assigned_orders.filter(assignedOrder => assignedOrder.id != route_item.id)
            }
        })

        setAssignedOrders(new_assigned_orders)
        delete new_route_items_dictionary['list_id']
        setRouteItemsDictionary(new_route_items_dictionary)

        new_route_list_ids = new_route_list_ids.filter(current_list_id => current_list_id != list_id)
        setRouteListIds(new_route_list_ids)

    }

    const addRouteList = () => {
        const list_id = 'list-id-' + (routeListIds.length + 1).toString()
        const new_route_list_ids = [...routeListIds]
        new_route_list_ids.push(list_id)


        const new_route_items_dictionary = { ...routeItemsDictionary }
        new_route_items_dictionary[list_id] = []
        setRouteItemsDictionary(new_route_items_dictionary)
        setRouteListIds(new_route_list_ids)
    }

    return (
        <div>
            <button className='btn grey darken-3' onClick={() => addRouteList()} >Add Route</button>
            {insertRouteLists()}
            {addRouteItemActive && <AddRouteItem orders={orders} landfills={landfills} depots={depots} date={date} setActive={setAddRouteItemActive} routeItemsDictionary={routeItemsDictionary} setRouteItemsDictionary={setRouteItemsDictionary} assignedOrders={assignedOrders} setAssignedOrders={setAssignedOrders} routeListId={routeListId} />}

        </div>
    )

}


export default RouteLists