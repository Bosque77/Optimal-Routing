import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { DbResponse, Depot, Landfill, NewTruckRoute, Order, Region, RouteQuery } from '../types'
import RoutingService from '../services/route_query'
import { useDispatch, useSelector } from 'react-redux'
import { actionCreators, State } from '../state'
import { bindActionCreators } from 'redux'
import route from '../services/route'


const Spacing = styled.div`
  margin-top: 2em;
`

const DataHeader = styled.div`
    font-size:16px;
    font-weight:bold;
`



interface prop {
    date: Date,
    assignedOrders: Order[],

}


const RouteItemSummaryList = ({ date, assignedOrders }: prop) => {

    const dispatch = useDispatch()
    const { createTruckRoute} = bindActionCreators(actionCreators, dispatch)

    const orders:Order[] = useSelector((state: State) => state.orders)
    const landfills:Landfill[] = useSelector((state: State) => state.landfills)
    const depots:Depot[] = useSelector((state: State) => state.depots)
    const region:Region | null = useSelector((state: State) => state.setRegion)


    if(!region){
        return <div></div>
    }

    const [num_of_routes, setNumberOfRoutes] = useState(1)



    useEffect(() => {
        const elems = document.querySelectorAll('.collapsible')
        M.Collapsible.init(elems, {})
        M.AutoInit()
    }, [])

    const insertOrders = () => {



        const orders_info = []
        for (let i = 0; i < orders.length; i++) {

            const current_order = orders[i]
            const index = assignedOrders.findIndex(order => order.id === current_order.id)


            if (index === -1) {
                let order_type = ''
                if (date.toDateString() === current_order.pickup_date) {
                    order_type = 'Pickup'
                } else {
                    order_type = 'Delivery'
                }

                const data = {
                    'id': current_order.id,
                    'customer_name': current_order.name,
                    'order_type': order_type,
                    'dumpster_size': current_order.dumpster_size
                }
                orders_info.push(data)
            }



        }

        return (
            orders_info.map(order_info =>
                <tr key={order_info.id}>
                    <td>
                        <div className="col l10">
                            {order_info.customer_name} : {order_info.dumpster_size} Yard {order_info.order_type}
                        </div>
                        <div className="col l2">
                            <label>
                                <input type="checkbox" className="checkbox" id={order_info.id} />
                                <span></span>
                            </label>
                        </div>

                    </td>

                </tr>


            )
        )
    }

    const insertDepots = () => {
        return (
            depots.map(depot => {

                if (depot.active) {
                    return (
                        <tr key={depot.id}>
                            <td>
                                <div className="row">
                                    <DataHeader>
                                        {depot.name}
                                    </DataHeader>
                                </div>
                                <div className="row">
                                    {depot.street} {depot.city}
                                </div>
                                <br />
                            </td>

                        </tr>
                    )
                } else {
                    return
                }
            }
            )
        )
    }


    const insertLandfills = () => {
        return (
            landfills.map(landfill => {
                if (landfill.active) {
                    return (
                        <tr key={landfill.id}>
                            <td>
                                <div className="row">
                                    <DataHeader>
                                        {landfill.name}
                                    </DataHeader>
                                </div>
                                <div className="row">
                                    {landfill.street} {landfill.city}
                                </div>
                                <br />
                            </td>

                        </tr>
                    )
                } else {
                    return
                }
            }
            )
        )
    }


    const computeRoutes = async () => {

        const elements = document.getElementsByClassName('checkbox')

        const orders_to_analyze = [] as Array<Order>

        for (let i = 0; i < elements.length; i++) {
            const current_element = elements[i] as HTMLInputElement
            if (current_element.checked == true) {
                const order_id = current_element.id
                const order_to_analyze = orders.find(order => order.id === order_id)
                if (order_to_analyze) {
                    orders_to_analyze.push(order_to_analyze)
                }

            }
        }





        M.toast({ html: 'Sending Request to Create Routes. This is still a work in progress' })
        const route_query: RouteQuery = { landfills, depots, orders: orders_to_analyze, 'date': date.toDateString(), num_of_routes }
        const route_response = await RoutingService.createRoutes(route_query) as DbResponse

        console.log('logging the route_response')
        console.log(route_response)

        const routes = route_response.routes

        for(let i=0;i<num_of_routes;i++){
            const current_route = routes[i]

            const route_objects = current_route.route_objects

            const route_types = [] as string[]
            const route_object_ids = [] as string []
            route_objects.forEach(route_object => {
                route_types.push(route_object.type)
                route_object_ids.push(route_object.id)
            })

            const new_truck_route: NewTruckRoute = {
                route_types: route_types,
                route_items: route_object_ids,
                distances: current_route.distances,
                durations: current_route.durations,
                total_distance: current_route.total_distance,
                total_duration: current_route.total_duration,
                date: date.toDateString(),
                region_id: region.id

            }
            console.log('about to create a new truck route')
            console.log(new_truck_route)
            
            await createTruckRoute(new_truck_route)
        }

    }


    return (
        <div>
            <ul className="collapsible">
                <li>
                    <div className="collapsible-header"><i className="material-icons">filter_drama</i>Unassigned Orders</div>
                    <div className="collapsible-body">
                        <table>
                            <tbody>
                                {insertOrders()}
                                <Spacing />
                                <div className="input-field">
                                    <input placeholder="Number of Routes" id="first_name" type="number" className="validate" onChange={({ target }) => setNumberOfRoutes(parseInt(target.value))} />
                                </div>
                                <button className='btn black offset-s10' onClick={() => computeRoutes()} >Compute Routes</button>

                            </tbody>
                        </table>
                    </div>
                </li>
                <li>
                    <div className="collapsible-header"><i className="material-icons">place</i>Depots</div>
                    <div className="collapsible-body">
                        <table>
                            <tbody>
                                {insertDepots()}
                            </tbody>
                        </table>

                    </div>
                </li>
                <li>
                    <div className="collapsible-header"><i className="material-icons">whatshot</i>Landfills</div>
                    <div className="collapsible-body">
                        <table>
                            <tbody>
                                {insertLandfills()}
                            </tbody>
                        </table>
                    </div>
                </li>
            </ul>
        </div>

    )

}


export default RouteItemSummaryList