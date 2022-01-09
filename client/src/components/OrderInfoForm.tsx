import React, { useEffect, useState } from 'react'
import { LatLng, Order } from '../types'


interface prop {
    setActive: React.Dispatch<React.SetStateAction<boolean>>,
    order: Order
}


const OrderInfoForm = ({ setActive, order }: prop) => {

    useEffect(() =>{

        const modal = document.querySelector('#info-form-modal')
        if (modal) {
            const instance = M.Modal.init(modal, { onCloseEnd: () => setActive(false) })
            instance.open()
        }
    
    },[])


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
                Thiss is a test
            </div>
        </div>
    )


}


export default OrderInfoForm