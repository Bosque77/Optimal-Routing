import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { State } from '../state'
import { Order, Landfill, Depot, Route_Item } from '../types'

const Spacing = styled.div`
  margin-top: 2em;
`

const DataHeader = styled.div`
    font-size:16px;
    font-weight:bold;
`



interface prop {
    date: Date,
    routeItemsDictionary: { [id: string]: Route_Item[] },
    setRouteItemsDictionary: React.Dispatch<React.SetStateAction<{ [id: string]: Route_Item[] }>>,
    setActive: React.Dispatch<React.SetStateAction<boolean>>,
    assignedOrders: Order[],
    setAssignedOrders: React.Dispatch<React.SetStateAction<Order[]>>
    routeListId: string
}

const AddRouteItem = ({ date, routeItemsDictionary, assignedOrders, setAssignedOrders, setRouteItemsDictionary, setActive, routeListId }: prop) => {

    const orders:Order[] = useSelector((state: State) => state.orders)
    const landfills:Landfill[] = useSelector((state: State) => state.landfills)
    const depots:Depot[] = useSelector((state: State) => state.depots)

    useEffect(() => {
        const modal_1 = document.querySelector('#modal1')
        if (modal_1) {
            const instance = M.Modal.init(modal_1, { onCloseEnd: () => setActive(false) })
            instance.open()
        }
    }
    )

    const insertOrders = () => {


        // const orders_info = []
        for (let i = 0; i < orders.length; i++) {
            const current_order = orders[i]
            let order_type = ''
            if (date.toDateString() === current_order.pickup_date) {
                order_type = 'Pickup'
            } else {
                order_type = 'Delivery'
            }

            current_order['order_type'] = order_type
        }




        const unassigned_orders = []
        for (let i = 0; i < orders.length; i++) {
            const current_order = orders[i]
            const index = assignedOrders.findIndex(order => order.id === current_order.id)
            if (index === -1) {
                unassigned_orders.push(current_order)
            }

        }

        return (
            unassigned_orders.map(order =>
                < tr key={order.id} >
                    <td>{order.name}</td>
                    <td>{order.dumpster_size}</td>
                    <td>{order.order_type}</td>
                    <td><button className="btn blue darken-4" onClick={() => selectRouteItem(order)}><i className="large material-icons">add</i></button></td>
                </tr >


            )
        )

    }

    const insertDepots = () => {


        return (
            depots.map(depot => {
                if (depot.active) {
                    return (
                        <tr key={depot.id}>
                            <td>{depot.name}</td>
                            <td>{depot.street}</td>
                            <td>{depot.city}</td>
                            <td><button className="btn blue darken-4" onClick={() => selectRouteItem(depot)}><i className="large material-icons">add</i></button></td>
                        </tr>
                    )
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
                            <td>{landfill.name}</td>
                            <td>{landfill.street}</td>
                            <td>{landfill.city}</td>
                            <td><button className="btn blue darken-4" onClick={() => selectRouteItem(landfill)}><i className="large material-icons">add</i></button></td>
                        </tr>
                    )
                }
            }
            )
        )
    }

    const selectRouteItem = (route_item: Route_Item) => {
        console.log('inside select route item')
        const new_route_items_dictionary = { ...routeItemsDictionary }

        
        // if(route_item){
        //     new_route_items_list.push(route_item)
        // }

        const updated_route_item = {...route_item}

        const new_assigned_orders = [...assignedOrders]
        if (route_item.type === 'Order') {
            new_assigned_orders.push(route_item)
            setAssignedOrders(new_assigned_orders)
        }else{
            updated_route_item.id = route_item.id
            // updated_route_item.id = route_item.id+Math.random().toString()
        }



        new_route_items_dictionary[routeListId].push(updated_route_item)
        console.log(new_route_items_dictionary)

        const modal_elem = document.getElementById('modal1')
        if (modal_elem) {
            const instance = M.Modal.getInstance(modal_elem)
            instance.close()
        }
        setRouteItemsDictionary(new_route_items_dictionary)
        setActive(false)

    }



    return (
        <div id="modal1" className="modal">
            <div className="modal-content">
                <DataHeader>Unassigned Orders</DataHeader>
                <table className="striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Dumpster Size</th>
                            <th>Order Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {insertOrders()}
                    </tbody>
                </table>
                <Spacing />
                <DataHeader>Landfills</DataHeader>
                <table className="striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Street</th>
                            <th>City</th>
                        </tr>
                    </thead>
                    <tbody>
                        {insertLandfills()}
                    </tbody>
                </table>
                <Spacing />
                <DataHeader>Depots</DataHeader>
                <table className="striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Street</th>
                            <th>City</th>
                        </tr>
                    </thead>
                    <tbody>
                        {insertDepots()}
                    </tbody>
                </table>
            </div>
            <div className="modal-footer">
                <a href="#!" className="modal-close waves-effect waves-green btn-flat">Agree</a>
            </div>
        </div>

    )


}

export default AddRouteItem