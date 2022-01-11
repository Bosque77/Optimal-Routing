/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OrderList from '../OrderList'
// import OrderList from '../OrderList'
import { bindActionCreators } from 'redux'
import { actionCreators, State } from '../../state'
import './OrderPage.css'
import GoogleMap from '../GoogleMap'
import { isRegExp } from 'util'
import styled from 'styled-components'
import { Depot, Landfill } from '../../types'
// import GoogleMap from '../GoogleMap'

// import './OrderPage.css'

const Spacing = styled.div`
  margin-top: 2em;
`

const OrderStyle = styled.div`
margin-bottom: 50px;
`

const OrderPage = () => {
    const dispatch = useDispatch()
    const { initializeOrders, initializeLandfills, initializeDepots } = bindActionCreators(actionCreators, dispatch)
    const region = useSelector((state: State) => state.setRegion)

    const [show_depots, setDepots] = useState<Depot[] | undefined>(undefined)
    const [show_landfills, setLandfills] = useState<Landfill[] | undefined>(undefined)

    useEffect(() => {
        console.log('inside useEffect')
        const elems = document.querySelectorAll('.datepicker')
        const date = new Date()
        M.Datepicker.init(elems, { defaultDate: date, setDefaultDate: true, onSelect: (date) => onDateChange(date) })
        if (region) {

            // const show_landfill_box = document.getElementById('checkbox')
            // if(show_landfill_box){
            //     show_landfill_box.checked = false
            // }

            initializeOrders(region, date.toDateString())
            initializeDepots(region)
            initializeLandfills(region)

        }

    }, [region])

    const orders = useSelector((state: State) => state.orders)
    const landfills = useSelector((state: State) => state.landfills)
    const depots = useSelector((state: State) => state.depots)


    const onDateChange = async (date: Date) => {
        console.log('on date change')
        const date_string = date.toDateString()

        console.log(date_string)
        if (region) {
            await initializeOrders(region, date_string)

        }

    }

    const displayLandfills = () => {
        if (!show_landfills) {
            setLandfills(landfills)
        }else{
            setLandfills(undefined)
        }
    }

    const displayDepots = () => {
        if (!show_depots) {
            setDepots(depots)
        }else{
            setDepots(undefined)
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
                        <input type="checkbox" onChange={() => displayDepots()}/>
                        <span>Display Depots</span>
                    </label>
                </div>
            </div>
            <GoogleMap orders={orders} landfills={show_landfills} depots={show_depots}/>
            <br />
            <Spacing>
                <div className="row">
                    <div className="col l3">
                        <input type="text" className="datepicker" placeholder='Select Date' />
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