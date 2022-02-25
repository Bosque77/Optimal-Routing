import React, { useEffect, useState } from 'react'
import AddRouteItem from './AddRouteItem'
import M from 'materialize-css'
import { Order, Landfill, Depot, Route_Item } from '../types'
import styled from 'styled-components'
import RouteService from '../services/route_query'
import { ObjectId } from 'mongodb'



const Spacing = styled.div`
  margin-top: 2em;
`

interface Route_Data {
    distances : number[]
    durations: number[]
    total_distance: number
    total_duration: number
}

interface Returning_Route_Data {
    distance: number,
    duration: number
}



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
    const [routeDataDictionary, setRouteDataDictionary] = useState<{ [id: string]: Route_Data }>({ 'original-route-list': {distances : [], durations : [], total_distance : 0.0, total_duration : 0.0} })
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
        const route_data = await RouteService.analyzeRoute(route_items) as Returning_Route_Data[]

        const distances = []
        const durations = []
        let total_distance = 0.0
        let total_duration = 0.0

        for(let i=0;i<route_data.length;i++){
            const current_route_data = route_data[i]
            distances.push(current_route_data.distance)
            durations.push(current_route_data.duration)
            total_distance += current_route_data.distance
            total_duration += current_route_data.duration
        }

        const compiled_route_data: Route_Data = {
            distances: distances,
            durations: durations,
            total_distance: total_distance,
            total_duration: total_duration
        }

        const updated_route_data_dict = {...routeDataDictionary}
        updated_route_data_dict[list_id] = compiled_route_data
        setRouteDataDictionary(updated_route_data_dict)

    }


    const insertRouteData = (list_id: string) => {

        const route_data = routeDataDictionary[list_id]

        const hours = Math.floor(route_data.total_duration / 3600)
        const remainder_seconds = route_data.total_duration % 3600
        const minutes = Math.floor(remainder_seconds / 60)

        let minute_str = ''
        if (minutes < 10){
            minute_str = '0'+minutes.toString()
        }else{
            minute_str = minutes.toString()
        }
          

        const miles = (route_data.total_distance * 0.000621371).toFixed(2)
        

        return(
            <div className="row">
                <div className="col l6">
                    Total Duration: {`${hours}:${minute_str}`}
                </div>
                <div className="col l6">
                    Total Distance: {`${miles} miles`}

                </div>
            </div>

        )
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

                                        {routeDataDictionary[id].durations.length > 0 ? insertRouteData(id) : <div></div>}
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

        const list_id = new ObjectId().toString()
        const new_route_list_ids = [...routeListIds]

        new_route_list_ids.push(list_id)

        console.log(new_route_list_ids)

        const new_route_items_dictionary = { ...routeItemsDictionary }
        new_route_items_dictionary[list_id] = []

        const new_route_data_dictionary = {...routeDataDictionary}
        new_route_data_dictionary[list_id] = {distances : [], durations : [], total_distance : 0.0, total_duration : 0.0}

        setRouteDataDictionary(new_route_data_dictionary)
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