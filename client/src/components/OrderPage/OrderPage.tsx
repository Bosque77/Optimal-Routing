/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import OrderList from '../OrderList'
// import { bindActionCreators } from 'redux'
// import { actionCreators, State } from '../../state'
// import GoogleMap from '../GoogleMap'

// import './OrderPage.css'

const OrderPage = () => {
    console.log('inside order page')

    const dispatch = useDispatch()
    // const { initializeOrders } = bindActionCreators(actionCreators, dispatch)

    // const region = useSelector((state: State) => state.setRegion)

    // useEffect(() => {
    //     if(region){
    //         initializeOrders(region)
    //     }
    // }, [region])

    // const orders = useSelector((state: State) => state.orders)

    return (

        <div>
            Inside the Orders Page
            {/* <GoogleMap orders={orders} /> */}
            {/* <OrderList /> */}
        </div>

    )
}



export default OrderPage