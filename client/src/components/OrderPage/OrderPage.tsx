/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OrderList from '../OrderList'
// import OrderList from '../OrderList'
import { bindActionCreators } from 'redux'
import { actionCreators, State } from '../../state'
// import GoogleMap from '../GoogleMap'

// import './OrderPage.css'

const OrderPage = () => {
    const dispatch = useDispatch()
    const { initializeOrders } = bindActionCreators(actionCreators, dispatch)
    const [selected_date, setDate] = useState('')

    const region = useSelector((state: State) => state.setRegion)

    useEffect(() => {
        console.log('inside useEffect')
        if(selected_date===''){
            const elems = document.querySelectorAll('.datepicker')
            const date = new Date()
            M.Datepicker.init(elems, { setDefaultDate: true, defaultDate: date, onSelect: (date) => onDateChange(date) })
        }else{
            if (region) {
                console.log(selected_date)
                initializeOrders(region, selected_date)
            }
        }

    }, [region, selected_date])

    const orders = useSelector((state: State) => state.orders)

    const onDateChange = (date: Date) => {
        console.log('on date change')
        const date_string = date.toDateString()
        setDate(date_string)
    }

    return (

        <div>
            {/* <GoogleMap orders={orders} /> */}
            <div className="row">
                <div className="col l3">
                    <input type="text" className="datepicker" placeholder='Select Date'/>
                </div>

            </div>
            <OrderList />
        </div>

    )
}



export default OrderPage