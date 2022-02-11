/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OrderList from '../OrderList'
// import OrderList from '../OrderList'
import { bindActionCreators } from 'redux'
import { actionCreators, State } from '../../state'
import './OrderPage.css'
import GoogleMap from '../GoogleMap'
import styled from 'styled-components'
import { Depot, Landfill, RouteQuery } from '../../types'
import RoutingService from '../../services/route_query'


const Spacing = styled.div`
  margin-top: 2em;
`

const OrderStyle = styled.div`
margin-bottom: 50px;
`

const OrderPage = () => {
    const dispatch = useDispatch()
    const { initializeOrders, initializeLandfills, initializeDepots, initializeVehicles } = bindActionCreators(actionCreators, dispatch)
    const region = useSelector((state: State) => state.setRegion)
    const [show_depots, setDepots] = useState<Depot[] | undefined>(undefined)
    const [show_landfills, setLandfills] = useState<Landfill[] | undefined>(undefined)
    const [date] = useState<Date>(new Date())

    

    useEffect(() => {
        console.log('inside useEffect')
        const elems = document.querySelectorAll('.datepicker')
        // const date = new Date()
        M.Datepicker.init(elems, { defaultDate: date, setDefaultDate: true, onSelect: (date) => onDateChange(date) })
        if (region) {

            initializeOrders(region, date.toDateString())
            initializeDepots(region)
            initializeLandfills(region)
            initializeVehicles(region)

        }

    }, [region])

    const orders = useSelector((state: State) => state.orders)
    const landfills = useSelector((state: State) => state.landfills)
    const depots = useSelector((state: State) => state.depots)
    const vehicles = useSelector((state: State) => state.vehicles)



    const createRoutes = async () => {
        M.toast({ html: 'Sending Request to Create Routes. This is still a work in progress' })
        const route_query:RouteQuery = {landfills, depots, vehicles, orders, 'date': date.toDateString()}
        const route_response = await RoutingService.createRoutes(route_query)
        //const route_response = await RoutingService.getRoutes()
        console.log(route_response)
        // const data = JSON.stringify(route_query, null, 2)
        // console.log(data)
    }


    const displayLandfills = () => {
        if (!show_landfills) {
            setLandfills(landfills)
        } else {
            setLandfills(undefined)
        }
    }

    const displayDepots = () => {
        if (!show_depots) {
            setDepots(depots)
        } else {
            setDepots(undefined)
        }
    }

    const onDateChange = async (date: Date) => {
        console.log('on date change')
        const date_string = date.toDateString()

        console.log(date_string)
        if (region) {
            await initializeOrders(region, date_string)

        }

    }

    return (

        <div>
            <div className="row">
                <div className="col l3">
                    <label>
                        <input type="checkbox" id="show-landfill" onChange={() => displayLandfills()} />
                        <span>Display Landfills</span>
                    </label>
                </div>
                <div className="col l3">
                    <label>
                        <input type="checkbox" onChange={() => displayDepots()} />
                        <span>Display Depots</span>
                    </label>
                </div>
            </div>
            <GoogleMap orders={orders} landfills={show_landfills} depots={show_depots} />
            <br />
            <Spacing>
                <div className="row">
                    <div className="col l3">
                        <input type="text" className="datepicker" placeholder='Select Date' />
                    </div>
                    <div className="col l3 offset-l6">
                        <div className="btn blue lighten-2" onClick={() => createRoutes()}>Create Routes</div>
                    </div>

                </div>
            </Spacing>
            <OrderStyle>
                <OrderList />
            </OrderStyle>

        </div>

    )
}



export default OrderPage