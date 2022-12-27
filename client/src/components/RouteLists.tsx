import React, { useEffect, useState } from 'react'
import AddRouteItem from './AddRouteItem'
import { Order, Landfill, Depot, Route_Item, TruckRoute, Region } from '../types'
import RouteService from '../services/route_query'
import { useDispatch, useSelector } from 'react-redux'
import { actionCreators, State } from '../state'
import { bindActionCreators } from 'redux'
import AssignDriver from './AssignDriver'



interface Returning_Route_Data {
    distance: number,
    duration: number
}



interface prop {
    date: Date,
    assignedOrders: Order[],
    setAssignedOrders: React.Dispatch<React.SetStateAction<Order[]>>

}

const RouteLists = ({ date, assignedOrders, setAssignedOrders }: prop) => {



    const dispatch = useDispatch()
    const { createTruckRoute, updateTruckRoute, deleteTruckRoute } = bindActionCreators(actionCreators, dispatch)

    const truck_routes: TruckRoute[] = useSelector((state: State) => state.routes)
    const region: Region | null = useSelector((state: State) => state.setRegion)
    const orders: Order[] = useSelector((state: State) => state.orders)
    const landfills: Landfill[] = useSelector((state: State) => state.landfills)
    const depots: Depot[] = useSelector((state: State) => state.depots)

    useEffect(() => {
        const elems = document.querySelectorAll('.collapsible')
        // M.Collapsible.init(elems, {})

    })

    const [addRouteItemActive, setAddRouteItemActive] = useState(false)
    const [truckRoute, setTruckRoute] = useState<TruckRoute>()
    const [assignDriversActive, setAssignDriversActive] = useState(false)


    if (!region) {
        return (<div></div>)
    }




    const addRouteItem = (truck_route:TruckRoute) => {
        console.log('setting the route item to active')
        setTruckRoute(truck_route)
        setAddRouteItemActive(true)
    }

    const addTruckRoute = () => {


        const new_truck_route = {
            route_types: [],
            route_items: [],
            distances: [],
            durations: [],
            total_distance: 0.0,
            total_duration: 0.0,
            date: date.toDateString(),
            region_id: region.id,
        }

        createTruckRoute(new_truck_route)

    }

    const fillRouteItems = (route_items_ids:string[], route_types:string[]) => {
        
        const route_items:Route_Item[] = []
        for(let i=0;i<route_types.length;i++){
            const route_item_id = route_items_ids[i]
            const route_type = route_types[i]
            
            let route_item = undefined
            if(route_type==='Order'){
                route_item = orders.find(order => order.id === route_item_id)
            }else if (route_type==='Landfill'){
                route_item = landfills.find(landfill => landfill.id === route_item_id)
            }else if (route_type ==='Depot'){
                route_item = depots.find(depot => depot.id === route_item_id)
            }

            if(route_item){
                route_items.push(route_item)
            }
        }

        return route_items
    }

    const analyzeRouteItems = async (truck_route:TruckRoute) => {
        const route_items = fillRouteItems(truck_route.route_items, truck_route.route_types)
        const route_data = await RouteService.analyzeRoute(route_items) as Returning_Route_Data[]

        const distances = []
        const durations = []
        let total_distance = 0.0
        let total_duration = 0.0

        for (let i = 0; i < route_data.length; i++) {
            const current_route_data = route_data[i]
            distances.push(current_route_data.distance)
            durations.push(current_route_data.duration)
            total_distance += current_route_data.distance
            total_duration += current_route_data.duration
        }

        truck_route.distances = distances
        truck_route.durations = durations
        truck_route.total_distance = total_distance
        truck_route.total_duration = total_duration

        await updateTruckRoute(truck_route)

    }


    const assignDriver = async (truck_route:TruckRoute) => {
        console.log('inside assign driver')
        setAssignDriversActive(true)
        setTruckRoute(truck_route)
    }




    const deleteRouteItem = async (index:number, route_list_id: string) => {

        const truck_route = truck_routes.find(truck_route => truck_route.id === route_list_id)
        if(truck_route){
            delete truck_route.route_items[index]
            delete truck_route.route_types[index]
            await updateTruckRoute(truck_route)
        }


    }


    const getJSXObject = (route_item_id: string, route_item_type: string, truck_route_id: string, index:number) => {

        const new_id = route_item_id + Math.random().toString()

        if (route_item_type === 'Order') {



            const route_item = orders.find(order => order.id === route_item_id)

            
            if (route_item) {

                let order_type = ''
                if (date.toDateString() === route_item.pickup_date) {
                    order_type = 'Pickup'
                } else {
                    order_type = 'Delivery'
                }


                return (
                    <tr key={new_id}>
                        <td>{order_type}</td>
                        <td>{route_item.dumpster_size} Yard </td>
                        <td>{route_item.street}</td>
                      
                        <td><button className="btn-floating black" onClick={() => deleteRouteItem(index, truck_route_id)}><i className="material-icons">remove</i></button></td>
                    </tr> 
                )
            }

        } else if (route_item_type === 'Landfill') {

            const route_item = landfills.find(landfill => landfill.id === route_item_id)
            if (route_item) {
                return (
                    <tr key={new_id}>
                        <td>Landfill</td>
                        <td>{route_item.name}</td>
                        <td>{route_item.street}</td>
                      
                        <td><button className="btn-floating black" onClick={() => deleteRouteItem(index, truck_route_id)}><i className="material-icons">remove</i></button></td>
                    </tr>
                )
            }
        } else if (route_item_type === 'Depot') {


            const route_item = depots.find(depot => depot.id === route_item_id)
            if (route_item) {
                return (
                    <tr key={new_id}>
                        <td>Depot</td>
                        <td>{route_item.name}</td>
                        <td><td>{route_item.street}</td></td>
                      
                        <td><button className="btn-floating black" onClick={() => deleteRouteItem(index, truck_route_id)}><i className="material-icons">remove</i></button></td>
                    </tr>
                )
            }

        }

    }

    const insertRouteItems = (truck_route: TruckRoute) => {
        const route_items = truck_route.route_items
        const route_types = truck_route.route_types


        const jsx_list = []
        for (let i = 0; i < route_items.length; i++) {

            const jsx_object = getJSXObject(route_items[i], route_types[i], truck_route.id, i)
            jsx_list.push(jsx_object)
        }
        return jsx_list
        // return (route_items.map(route_item_id => getJSXObject(route_item_id)))

    }



    const insertRouteData = (truck_route:TruckRoute) => {


        const hours = Math.floor(truck_route.total_duration / 3600)
        const remainder_seconds = truck_route.total_duration % 3600
        const minutes = Math.floor(remainder_seconds / 60)

        let minute_str = ''
        if (minutes < 10) {
            minute_str = '0' + minutes.toString()
        } else {
            minute_str = minutes.toString()
        }


        const miles = (truck_route.total_distance * 0.000621371).toFixed(2)


        return (
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
            truck_routes.map(truck_route =>
                <div key={truck_route.id}>
                    <div className="row">
                        <div className="col l11">
                            <ul className="collapsible">

                                <li className="center-align">
                                    <div className="collapsible-header">Route</div>
                                    <div className="collapsible-body">

                                        {truck_route.durations.length > 0 ? insertRouteData(truck_route) : <div></div>}
                                        <table className="striped">
                                            <tbody>
                                                {insertRouteItems(truck_route)}
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td> <a className="red btn-floating" onClick={() => addRouteItem(truck_route)}><i className="material-icons">add</i></a>                                                 </td>
                                                </tr>
                                            </tbody>

                                        </table>
                                        <div className="row">

                                            <div className="col l4">
                                                <a className="btn light-blue darken-2" onClick={() => analyzeRouteItems(truck_route)}>Analyze Route</a>
                                            </div>
                                            <div className="col l4">
                                                <a className="btn light-green" onClick={() => assignDriver(truck_route)}>Assign Driver</a>
                                            </div>
                                        </div>

                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="col l1">
                            <button className="btn black" onClick={() => deleteTruckRoute(truck_route)}><i className="material-icons">delete</i></button>
                        </div>
                    </div>


                </div>
            )
        )
    }




    return (
        <div>
            <button className='btn grey darken-3' onClick={() => addTruckRoute()} >Add Route</button>
            {insertRouteLists()}
            {addRouteItemActive && truckRoute && <AddRouteItem date={date} setActive={setAddRouteItemActive} assignedOrders={assignedOrders} setAssignedOrders={setAssignedOrders} truckRoute={truckRoute}/>}
            {assignDriversActive && truckRoute && <AssignDriver setActive={setAssignDriversActive} truckRoute={truckRoute}/>}
        </div>
    )

}


export default RouteLists