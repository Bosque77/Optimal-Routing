import React, { useEffect, useState } from 'react'
import { LatLng, Order } from '../types'


interface prop {
    setActive: React.Dispatch<React.SetStateAction<boolean>>,
    order: Order
}


const OrderInfoForm = ({ setActive, order }: prop) => {

    useEffect(() => {

        const modal = document.querySelector('#info-form-modal')
        if (modal) {
            const instance = M.Modal.init(modal, { onCloseEnd: () => setActive(false) })
            instance.open()
        }

    }, [])


    // const [name, setName] = useState(order.name)
    // const [street, setStreet] = useState(order.street)
    // const [city, setCity] = useState(order.city)
    // const [state, setState] = useState(order.state)
    // const [zipcode, setZipcode] = useState(order.zipcode)
    // const [latitude, setLatitude] = useState(order.latitude)
    // const [longitude, setLongitude] = useState(order.longitude)
    // const [lat_lng, setCoord] = useState<LatLng>({ lat: 0.0, lng: 0.0 })
    // const [dumpster_size, setDumpsterSize] = useState(order.dumpster_size)
    // const [email, setEmail] = useState(order.email)
    // const [phone_number, setPhoneNumber] = useState(order.phone_number)
    // const [drop_off_date, setDropOffDate] = useState(order.delivery_date)
    // const [pickup_date, setPickupDate] = useState(order.pickup_date)
    // const [special_instructions, setInstructions] = useState(order.special_instructions)
    // const [delivery_completed, setDeliveryStatus] = useState(order.delivery_completed)
    // const [pickup_completed, setPickupStatus] = useState(order.pickup_completed)




    return (

        <div id="info-form-modal" className="modal">
            <div className="modal-content">
                <h4>Order Info</h4>
                <div className="row">
                    <div className="col l3" >
                        <label htmlFor="order-name">Name</label>
                        <div id="order-name"> {order.name}</div>
                    </div>
                    <div className="col l3" >
                        <label htmlFor="phone-number">Phone Number</label>
                        <div id="phone-number"> {order.phone_number}</div>
                    </div>
                    <div className="col l3" >
                        <label htmlFor="email">Email</label>
                        <div id="email"> {order.email}</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col l3" >
                        <label htmlFor="street">Street</label>
                        <div id="street"> {order.street}</div>
                    </div>
                    <div className="col l3" >
                        <label htmlFor="city">City</label>
                        <div id="city"> {order.city}</div>
                    </div>
                    <div className="col l3" >
                        <label htmlFor="state">State</label>
                        <div id="state"> {order.state}</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col l3" >
                        <label >Zipcode</label>
                        <div > {order.zipcode}</div>
                    </div>
                    <div className="col l3" >
                        <label >Latitude</label>
                        <div > {order.latitude}</div>
                    </div>
                    <div className="col l3" >
                        <label >Longitude</label>
                        <div > {order.longitude}</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col l3" >
                        <label >Dumpster Size</label>
                        <div > {order.dumpster_size}</div>
                    </div>
                    <div className="col l3" >
                        <label >Delivery Date</label>
                        <div > {order.delivery_date}</div>
                    </div>
                    <div className="col l3" >
                        <label >Pickup Date</label>
                        <div > {order.pickup_date}</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col l12" >
                        {(order.special_instructions !== '') ?
                            <div><label >Special Instructions</label>
                                <div > {order.special_instructions}</div></div> : <div></div>}

                    </div>
                </div>
                <div className="row">
                    <div className="col l3" >
                        <label >Delivery Status</label>
                        {(order.delivery_completed) ? <div>Delivery Completed</div> : <div>Delivery Incomplete</div>}
                    </div>
                    <div className="col l3" >
                        <label >Pikcup Status</label>
                        {(order.pickup_completed) ? <div>Pickup Completed</div> : <div>Pikcup Incomplete</div>}
                    </div>
                </div>
            </div>
        </div>
    )


}


export default OrderInfoForm