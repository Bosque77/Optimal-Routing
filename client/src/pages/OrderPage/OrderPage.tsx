/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OrderList from '../../components/OrderTable'
import { bindActionCreators } from 'redux'
import { actionCreators, State } from '../../state'
import GoogleMap from '../../../archive/GoogleMap'
import { Depot, Landfill } from '../../../../shared/types'




const OrderPage = () => {


    const dispatch = useDispatch()
    const { initializeOrders } = bindActionCreators(actionCreators, dispatch)


    const region = useSelector((state: State) => state.setRegion)
    const [show_depots, setDepots] = useState<Depot[] | undefined>(undefined)
    const [show_landfills, setLandfills] = useState<Landfill[] | undefined>(undefined)
    const [date] = useState<Date>(new Date())

    

    useEffect(() => {

        const elems = document.querySelectorAll('.datepicker')
        // M.Datepicker.init(elems, { defaultDate: date, setDefaultDate: true, onSelect: (date) => onDateChange(date) })
        if (region) {
            initializeOrders(region, date.toString())

        }

    }, [region])

    const orders = useSelector((state: State) => state.orders)
    const landfills = useSelector((state: State) => state.landfills)
    const depots = useSelector((state: State) => state.depots)



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

        const month = date.getMonth() + 1
        const day = date.getDate()
        const year = date.getFullYear()
        const date_string = `${month}/${day}/${year}`


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
                <div className="row">
                    <div className="col l3">
                        <input type="text" className="datepicker" placeholder='Select Date' />
                    </div>

                </div>
                {/* <OrderList /> */}

        </div>

    )
}



export default OrderPage