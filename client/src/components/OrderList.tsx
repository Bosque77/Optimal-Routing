import React, { useState } from 'react'
import { Order } from '../types'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators, State } from '../state'
import { useEffect } from 'react'
import styled from 'styled-components'
import CreateOrderForm from './CreateOrderForm'
import OrderInfoForm from './OrderInfoForm'


import M from 'materialize-css'
import EditOrderForm from './EditOrderForm'
import ConfirmDelete from './ConfirmDelete'


const TopSpacing = styled.div`
  margin-top: 2em;
`

const OrderList = () => {

    const dispatch = useDispatch()

 


    useEffect(() => {
        M.AutoInit()

    }, [])
    
    const orders = useSelector((state: State) => state.orders)
    const [order, setOrder] = useState<Order>(orders[0])
    const [editFormActive, setEditFormActive] = useState(false)
    const [createFormActive, setCreateFormActive] = useState(false)
    const [orderInfoFormActive, setOrderInfoFormActive] = useState(false)
    const [confirmDeleteActive, setConfirmDeleteActive] = useState(false)



    // const changeOrderStatus = (order: Order) => {

    //     const new_order = { ...order }
    //     if (order.active) {
    //         new_order.active = false
    //     } else {
    //         new_order.active = true
    //     }
    //     updateOrder(new_order)
    // }



    const editOrder = (order: Order) => {
        setOrder(order)
        setEditFormActive(true)
    }

    const info = (order: Order) => {
        setOrder(order)
        setOrderInfoFormActive(true)
    }

    const onDeleteOrder = (order: Order) => {
        console.log('inside delete landfill')
        setOrder(order)
        setConfirmDeleteActive(true)

    }

    const onCreateOrder = () => {
        setCreateFormActive(true)
    }


    const insertOrders = () => {
        return (
            orders.map(order =>
                <tr key={order.id}>
                    <td>{order.name}</td>
                    <td>{order.dumpster_size}</td>
                    <td>{order.delivery_date}</td>
                    <td>{order.pickup_date}</td>
                    <td>{order.phone_number}</td>
        
                    <td> <button className="btn-floating btn waves-light red" onClick={() => editOrder(order)}><i className="material-icons">mode_edit</i></button></td>
                    <td> <button className="btn-floating btn black" onClick={() => onDeleteOrder(order)}><i className="material-icons">delete</i></button></td>
                    <td> <button className="btn-floating btn green" onClick={() => info(order)}><i className="material-icons">info_outline</i></button></td>
                </tr>
            )
        )
    }




    return (
        <div>
            <div className="row ">
                <br></br>
                <div className="col offset-s10">
                    <button className='btn black offset-s10' onClick={() => onCreateOrder()}>New Order</button>
                </div>

            </div>
            <TopSpacing>
                <table>
                    <thead>
                        <tr>
                            <th>Customer Name</th>
                            <th>Dumpster Size</th>
                            <th>Delivery Date</th>
                            <th>Pickup Date </th>
                            <th>Phone Number</th>
                        </tr>
                    </thead>

                    <tbody>
                        {insertOrders()}
                    </tbody>
                </table>
            </TopSpacing>
            {editFormActive && <EditOrderForm order={order} setActive={setEditFormActive}  />}
            {createFormActive && <CreateOrderForm setActive={setCreateFormActive} />}
            {orderInfoFormActive && <OrderInfoForm setActive={setOrderInfoFormActive} order={order}/>}
            {confirmDeleteActive && <ConfirmDelete setActive={setConfirmDeleteActive} order={order} />}

        </div>
    )
}


export default OrderList