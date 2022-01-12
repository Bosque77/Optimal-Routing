import React, { useState, useEffect } from 'react'
import { NewOrder, Address, Order } from '../types'
import { actionCreators, State } from '../state'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import geocode from '../services/geocode'
import { LatLng } from '../types'
import { dumpster_sizes } from '../utils/enums'
import './OrderPage/OrderPage.css'

interface prop {
    setActive: React.Dispatch<React.SetStateAction<boolean>>,
    order: Order
}


const EditOrderForm = ({ setActive, order }: prop) => {

    const dispatch = useDispatch()
    const { updateOrder } = bindActionCreators(actionCreators, dispatch)
    const region = useSelector((state: State) => state.setRegion)

    if (!region) {
        return (<div></div>)
    }

    useEffect(() => {

        // M.AutoInit()
        console.log('inside useEffect')
        const modal_1 = document.querySelector('#modal1')
        if (modal_1) {
            const instance = M.Modal.init(modal_1, { onCloseEnd: () => setActive(false) })
            instance.open()
        }
        const geo_modal = document.querySelector('#geoModal')
        if (geo_modal) {
            M.Modal.init(geo_modal)
        }
        const elems = document.querySelectorAll('select')
        M.FormSelect.init(elems)


        // Drop Off Date Picker Initialization
        const drop_off_date_picker = document.getElementById('drop-off-date')
        if (drop_off_date_picker) {
            const elem = document.body
            console.log(elem)
            M.Datepicker.init(drop_off_date_picker, { setDefaultDate: true, onSelect: (date) => onDropOffDateChange(date), container: elem })
        }


        // Pickup Date Picker Initialization
        const pickup_date_picker = document.getElementById('pickup-date')
        if (pickup_date_picker) {
            const elem = document.body
            console.log(elem)
            M.Datepicker.init(pickup_date_picker, { setDefaultDate: true, onSelect: (date) => onPickupDateChange(date), container: elem })
        }




    }, [])





    const [name, setName] = useState(order.name)
    const [street, setStreet] = useState(order.street)
    const [city, setCity] = useState(order.city)
    const [state, setState] = useState(order.state)
    const [zipcode, setZipcode] = useState(order.zipcode.toString())
    const [latitude, setLatitude] = useState(order.latitude.toString())
    const [longitude, setLongitude] = useState(order.longitude.toString())
    const [lat_lng, setCoord] = useState<LatLng>({ lat: 0.0, lng: 0.0 })
    const [dumpster_size, setDumpsterSize] = useState(order.dumpster_size)
    const [email, setEmail] = useState(order.email)
    const [phone_number, setPhoneNumber] = useState(order.phone_number)
    const [drop_off_date, setDropOffDate] = useState(order.delivery_date)
    const [pickup_date, setPickupDate] = useState(order.pickup_date)
    const [special_instructions, setInstructions] = useState(order.special_instructions)
    const [delivery_completed, setDeliveryStatus] = useState(order.delivery_completed)
    const [pickup_completed, setPickupStatus] = useState(order.pickup_completed)







    const geoLocate = async () => {
        console.log('inside geoLocate')
        const address: Address = {
            street,
            city,
            state,
            'zipcode': parseInt(zipcode)
        }
        const response = await geocode.get(address)
        console.log(response)
        if (response.status === 'ERROR') {
            M.toast({ html: 'Was not able to geolocate this location' })
        } else {
            const lat_lng = response.data as LatLng
            setCoord(lat_lng)
            const modal_elem = document.getElementById('geoModal')
            if (modal_elem) {
                const instance = M.Modal.getInstance(modal_elem)
                instance.open()
            }
        }

    }

    const insertDumpsterSizeChoices = () => {
        return (
            dumpster_sizes.map(size => {
                return (
                    <option value={size} key={size}>{size}</option>
                )

            })
        )
    }



    const onDumpsterSelect = (dumpster_size: string) => {
        console.log('inside on dumpser select')
        console.log(dumpster_size)
        setDumpsterSize(parseInt(dumpster_size))

    }

    const onPickupDateChange = (date: Date) => {
        setPickupDate(date.toDateString())
    }

    const onDropOffDateChange = (date: Date) => {
        setDropOffDate(date.toDateString())
    }



    const submit = async () => {
        console.log('inside on submit')

        if (name === '' || street === '' || city === '' || state === '' || zipcode === '' || latitude === '' || longitude === '' || drop_off_date === '' || pickup_date==='') {
            M.toast({ html: 'All fields need to be filled out' })
        } else {
            const updated_order: Order = {'id': order.id ,name, street, city, email, phone_number, dumpster_size, 'delivery_date': drop_off_date, pickup_date, state, special_instructions, delivery_completed, pickup_completed, 'zipcode': parseInt(zipcode), 'latitude': parseFloat(latitude), 'longitude': parseFloat(longitude), 'region_id': region.id, 'user_id': order.user_id }
            await updateOrder(updated_order)
            M.toast({ html: 'Updated Order' })
            setActive(false)
        }


    }

    const assignLatLng = () => {
        setLatitude(lat_lng.lat.toFixed(3))
        setLongitude(lat_lng.lng.toFixed(3))
        const modal_elem = document.getElementById('geoModal')
        if (modal_elem) {
            const instance = M.Modal.getInstance(modal_elem)
            instance.close()
        }
    }

    return (
        <div className="row">
            <div id="modal1" className="modal">
                <div className="modal-content">
                    <h4>Order</h4>
                    <form className="col s12" onSubmit={submit}>
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="name" type="text" className="validate" value={name} onChange={({ target }) => setName(target.value)} />
                                <label htmlFor="name" className="active">Name</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="phone-number" type="text" className="validate" value={phone_number} onChange={({ target }) => setPhoneNumber(target.value)} />
                                <label htmlFor="phone-number" className="active">Phone Number</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="email" type="email" className="validate" value={email} onChange={({ target }) => setEmail(target.value)} />
                                <label htmlFor="email" className="active">Email</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="street" type="text" className="validate" value={street} onChange={({ target }) => setStreet(target.value)} />
                                <label htmlFor="street" className="active">Street</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="city" type="text" className="validate" value={city} onChange={({ target }) => setCity(target.value)} />
                                <label htmlFor="city" className="active">City</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="state" type="text" className="validate" value={state} onChange={({ target }) => setState(target.value)} />
                                <label htmlFor="state" className="active">State</label>
                            </div>

                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="zipcode" type="number" className="validate" value={zipcode} onChange={({ target }) => setZipcode(target.value)} />
                                <label htmlFor="zipcode" className="active">Zipcode</label>
                            </div>
                            <div className="input-field col s3">
                                <input id="latitude" type="text" className="validate" value={latitude} onChange={({ target }) => setLatitude(target.value)} />
                                <label htmlFor="latitude" className="active">Latitude</label>
                            </div>
                            <div className="input-field col s3">
                                <input id="longitude" type="text" className="validate" value={longitude} onChange={({ target }) => setLongitude(target.value)} />
                                <label htmlFor="longitude" className="active">Longitude</label>
                            </div>
                        </div>
                        <div className="row right-align">
                            <a className="btn-flat offset-s6" onClick={geoLocate}>Geolocate</a>
                        </div>
                        <div className="row">
                            <div className="col l3">

                                <select id="dumpster_size_selector" value={order.dumpster_size} onChange={({ target }) => onDumpsterSelect(target.value)}>
                                    <option  disabled selected>Dumpster Size</option>
                                    {insertDumpsterSizeChoices()}
                                </select>
                                <label htmlFor="dumpster_size_selector" className="active">Dumpster Size</label>
                            </div>
                            <div className="col l3">
                                <input type="text" className="datepicker" value={drop_off_date} id="drop-off-date" placeholder='Drop Off Date' />
                                <label htmlFor="pickup-date" className="active">Drop Off Date</label>

                            </div>
                            <div className="col l3">
                                <input type="text" className="datepicker" value={pickup_date} id="pickup-date" placeholder='Pickup Date' />
                                <label htmlFor="pickup-date" className="active">Pickup Date</label>
                            </div>

                        </div>
                        <div className="row">
                            <div className="input-field col l12">
                                <textarea id="textarea1" className="materialize-textarea" onChange={({ target }) => setInstructions(target.value)}></textarea>
                                <label htmlFor="textarea1">Special Instructions</label>
                            </div>
                        </div>
                        <div className="row left-align" >
                            <div className="col">
                                {(delivery_completed) ? <a className="green btn-small" onClick={() => setDeliveryStatus(!delivery_completed)}>Delivery Completed</a> : <a className="red lighten-1 btn-small" onClick={() => setDeliveryStatus(!delivery_completed)}>Delivery Incomplete</a>}
                            </div>
                            <div className="col">
                                {(pickup_completed) ? <a className="green btn-small" onClick={() => setPickupStatus(!pickup_completed)}>Pickup Completed</a> : <a className="red lighten-1 btn-small" onClick={() => setPickupStatus(!pickup_completed)}>Pickup Incomplete</a>}
                            </div>


                        </div>

                        <div className="row right-align">
                            <a className="waves-effect waves-teal btn-flat modal-close" type="submit" onClick={() => submit()}>Submit</a>
                        </div>
                    </form>
                    <div id="geoModal" className="modal">
                        <div className="modal-content">
                            <h6>Geolocation</h6>
                            <div >Latitude: {lat_lng.lat.toFixed(3)} </div>
                            <div>Longitude: {lat_lng.lng.toFixed(3)}</div>
                            <br />
                            <div className="right row">
                                <div className="col s5=4">
                                    Asign Lat Lng Values
                                </div>
                                <div className="col s2">
                                    <button className="btn" onClick={assignLatLng}>Submit</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default EditOrderForm

