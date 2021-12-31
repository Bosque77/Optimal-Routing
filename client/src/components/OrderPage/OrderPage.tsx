/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OrderList from '../OrderList'
// import OrderList from '../OrderList'
import { bindActionCreators } from 'redux'
import { actionCreators, State } from '../../state'
// import GoogleMap from '../GoogleMap'

// import './OrderPage.css'

const OrderPage = () => {
    const dispatch = useDispatch()
    // const { initializeOrders } = bindActionCreators(actionCreators, dispatch)

    const region = useSelector((state: State) => state.setRegion)

    useEffect(() => {
        // if(region){
        //     initializeOrders(region)
        // }

        const elems = document.querySelectorAll('.datepicker')
        const instances = M.Datepicker.init(elems, {setDefaultDate:true, defaultDate:new Date()})
    }, [region])

    // const orders = useSelector((state: State) => state.orders)

    return (

        <div>
            {/* <GoogleMap orders={orders} /> */}
            <div className="row">
                <div className="col l3">
                    <input type="text" className="datepicker" placeholder='Select Date' />
                </div>

            </div>
            <OrderList />
        </div>

    )
}



export default OrderPage