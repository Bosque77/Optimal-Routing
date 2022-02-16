import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Depot, Landfill, Order } from '../types'
import DepotList from './DepotList'

const Spacing = styled.div`
  margin-top: 2em;
`

const DataHeader = styled.div`
    font-size:16px;
    font-weight:bold;
`



interface prop {
    orders: Order[],
    landfills: Landfill[],
    depots: Depot[],
    todays_date: Date,
    assignedOrders: Order[],

}


const RouteItemSummaryList= ({ orders, landfills, depots, todays_date, assignedOrders }: prop) => {

    useEffect(() => {
        const elems = document.querySelectorAll('.collapsible')
        const instances = M.Collapsible.init(elems, {})

        M.AutoInit()
    }, [])

    const insertOrders = () => {

        const orders_info = []
        for (let i = 0; i < orders.length; i++) {

            const current_order = orders[i]
            const index = assignedOrders.findIndex(order => order.id === current_order.id)
            if (index === -1) {
                console.log(current_order)
                console.log(todays_date)
                let order_type = ''
                if (todays_date.toDateString() === current_order.pickup_date) {
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
                                <input type="checkbox" id="show-landfill" />
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
            depots.map(depot =>
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

                </tr>)
        )
    }


    const insertLandfills = () => {
        return (
            landfills.map(landfill =>
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

                </tr>)
        )
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
                                    <input placeholder="Number of Routes" id="first_name" type="number" className="validate" />
                                </div>
                                <button className='btn black offset-s10' >Compute Routes</button>

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