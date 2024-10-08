/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import VehicleList from '../VehicleList'
import { bindActionCreators } from 'redux'
import { actionCreators, State } from '../../state'

import GoogleMap from '../../components/GoogleMap'

import RouteItemSummaryList from '../../components/RouteItemSummaryList'
import styled from 'styled-components'

import { Order, TruckRoute } from '../../types'

import RouteLists from '../../components/RouteLists'
import orderReducer from '../../state/reducers/orderReducer'

const Spacing = styled.div`
  margin-top: 2em;
`


const RoutePage = () => {

    const dispatch = useDispatch()

    const { initializeOrders, initializeTruckRoutes } = bindActionCreators(actionCreators, dispatch)
    const region = useSelector((state: State) => state.setRegion)
    const truck_routes:TruckRoute[] = useSelector((state: State) => state.routes)
    const orders:Order[] = useSelector((state: State) => state.orders)
    const [date, setDate] = useState<Date>(new Date())
    const [assignedOrders, setAssignedOrders] = useState<Order[]>([])



    useEffect(() => {
        const elems = document.querySelectorAll('.datepicker')
        M.Datepicker.init(elems, { defaultDate: date, setDefaultDate: true, onSelect: (date) => onDateChange(date) })
        if (region) {
            initializeOrders(region, date.toDateString())
            initializeTruckRoutes(region, date.toDateString())
        }
        

    }, [region])


    useEffect(() => {
        const temp_assigned_orders = []
        for(let i=0;i< truck_routes.length;i++){
            const truck_route = truck_routes[i]
            const route_item_ids = truck_route.route_items
            for( let j=0;j<route_item_ids.length;j++){
                const route_item_id = route_item_ids[j]
                const assigned_order = orders.find(order => order.id === route_item_id)
                if(assigned_order){
                    temp_assigned_orders.push(assigned_order)
                }
            }
        }
        setAssignedOrders(temp_assigned_orders)
    }, [truck_routes])


    const onDateChange = async (date: Date) => {
        const date_string = date.toDateString()
        if (region) {
            await initializeOrders(region, date_string)
            await initializeTruckRoutes(region, date_string)
        }
        setDate(date)

    }





    return (

        <div>
            <GoogleMap />
            <Spacing />
            <div className="row">
                <div className="col l3">
                    <input type="text" className="datepicker" placeholder='Select Date' />
                </div>
            </div>
            <div className='row'>
                <div className='col l4'>
                    <RouteItemSummaryList  date={date} assignedOrders={assignedOrders} />
                </div>
                <div className='col l8 left-align' id='route-list'>
                    <RouteLists  date={date} assignedOrders={assignedOrders} setAssignedOrders={setAssignedOrders} />
                </div>
            </div>

        </div>

    )
}



export default RoutePage