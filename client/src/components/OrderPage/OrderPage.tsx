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
    const { initializeOrders } = bindActionCreators(actionCreators, dispatch)


    const region = useSelector((state: State) => state.setRegion)

    useEffect(() => {
        console.log('inside useEffect')
        const elems = document.querySelectorAll('.datepicker')
        const date = new Date()
        M.Datepicker.init(elems, { defaultDate: date, setDefaultDate: true, onSelect: (date) => onDateChange(date) })
        if (region) {

            initializeOrders(region, date.toDateString())
        }

    }, [region])

    const orders = useSelector((state: State) => state.orders)

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
                        <input type="checkbox" />
                        <span>Display Landfills</span>
                    </label>
                </div>
                <div className="col l3">
                    <label>
                        <input type="checkbox" />
                        <span>Display Depots</span>
                    </label>
                </div>
            </div>
            <GoogleMap orders={orders} />
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