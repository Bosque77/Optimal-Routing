import React, { useState, useEffect } from 'react'
import { NewOrder, Address } from '../types'
import { actionCreators, State } from '../state'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import geocode from '../services/geocode'
import { LatLng } from '../types'
import { DUMPSTER_SIZES, dumpster_sizes } from '../utils/enums'

import M from "materialize-css";

interface prop {
    setActive: React.Dispatch<React.SetStateAction<boolean>>,
}


const CreateOrderForm = ({ setActive }: prop) => {

    const dispatch = useDispatch()
    const { createOrder, setAlert, removeAlert } = bindActionCreators(actionCreators, dispatch)
    const region = useSelector((state: State) => state.setRegion)



    const [name, setName] = useState('')
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zipcode, setZipcode] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [lat_lng, setCoord] = useState<LatLng>({ lat: 0.0, lng: 0.0 })
    const [dumpster_size, setDumpsterSize] = useState(DUMPSTER_SIZES.TEN)
    const [email, setEmail] = useState('')
    const [phone_number, setPhoneNumber] = useState('')
    const [drop_off_date, setDropOffDate] = useState('')
    const [pickup_date, setPickupDate] = useState('')
    const [special_instructions, setInstructions] = useState('')
    const [delivery_completed, setDeliveryStatus] = useState(false)
    const [pickup_completed, setPickupStatus] = useState(false)

    if (!region) {
        return (<div></div>)
    }



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
            console.log('inside response error')
            setAlert(response.message, 'error')
            console.log('removing the alert')
            setTimeout(() => {
                console.log('executing timeout code')
                removeAlert()
            }, 3000)
            console.log('after timeout')
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

        if (name === '' || phone_number==='' || email==='' || street === '' || city === '' || state === '' || zipcode === '' || latitude === '' || longitude === '' || drop_off_date === '' || pickup_date==='') {
            M.toast({ html: 'All fields need to be filled out' })
        } else {
            const new_order: NewOrder = { name, street, city, email, phone_number, dumpster_size, 'delivery_date': drop_off_date, pickup_date, state, special_instructions, delivery_completed, pickup_completed, 'zipcode': parseInt(zipcode), 'latitude': parseFloat(latitude), 'longitude': parseFloat(longitude), 'region_id': region.id, 'type':'Order' }
            console.log(new_order)
            await createOrder(new_order)
            M.toast({ html: 'Created New Order' })
            const modal_elem = document.getElementById('modal1')
            if (modal_elem) {
                const instance = M.Modal.getInstance(modal_elem)
                instance.close()
            }
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
                    <form className="col s12" >
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

                                <select id="dumpster_size_selector" onChange={({ target }) => onDumpsterSelect(target.value)}>
                                    <option value="" disabled selected>Dumpster Size</option>
                                    {insertDumpsterSizeChoices()}
                                </select>
                                <label htmlFor="dumpster_size_selector" className="active">Dumpster Size</label>
                            </div>
                            <div className="col l3">
                                <input type="text" className="datepicker" id="drop-off-date" placeholder='Drop Off Date' />
                                <label htmlFor="pickup-date" className="active">Drop Off Date</label>

                            </div>
                            <div className="col l3">
                                <input type="text" className="datepicker" id="pickup-date" placeholder='Pickup Date' />
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
                            <a className="waves-effect waves-teal btn-flat" onClick={() => submit()}>Submit</a>
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

export default CreateOrderForm

