import React, { useState, useEffect } from 'react'
import { NewOrder, Address } from '../types'
import { actionCreators, State } from '../state'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import geocode from '../services/geocode'
import { LatLng, Dumpster_Sizes } from '../types'
import {TRUCK_SIZES} from '../utils/enums'

interface prop {
    setActive: React.Dispatch<React.SetStateAction<boolean>>,
}


const CreateOrderForm = ({setActive }: prop) => {

    const dispatch = useDispatch()
    const { createOrder } = bindActionCreators(actionCreators, dispatch)
    const region = useSelector((state: State) => state.setRegion)

    if(!region){
        return(<div></div>)
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

    }, [])


    const [name, setName] = useState('')
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zipcode, setZipcode] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [lat_lng, setCoord] = useState<LatLng>({ lat: 0.0, lng: 0.0 })
    const [dumpster_size, setDumpsterSize] = useState<Dumpster_Sizes>(TRUCK_SIZES.TEN)
    const [email, setEmail] = useState('')
    const [phone_number, setPhoneNumber] = useState('')
    const [delivery_date, setDeliverydate] = useState('')
    const [pickup_date, setPickupDate] = useState('')
    const [special_instructions, setInstructions] = useState('')
    const [ delivery_completed, setDeliveryStatus] = useState(false)
    const [pickup_completed, setPickupStatus] = useState(false)







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
        }else{
            const lat_lng = response.data as LatLng
            setCoord(lat_lng)
            const modal_elem = document.getElementById('geoModal')
            if (modal_elem) {
                const instance = M.Modal.getInstance(modal_elem)
                instance.open()
            }
        }

    }



    const submit = async () => {
        console.log('inside on submit')

        if(name==='' || street==='' || city==='' || state==='' || zipcode==='' || latitude==='' || longitude===''){
            M.toast({html: 'All fields need to be filled out'})
        }else{
            const new_order: NewOrder = { name, street, city, email, phone_number, delivery_date, dumpster_size, pickup_date, state, special_instructions, delivery_completed, pickup_completed, 'zipcode': parseInt(zipcode), 'latitude': parseFloat(latitude), 'longitude': parseFloat(longitude), 'region_id':region.id }
            console.log(new_order)
            await createOrder(new_order)
            M.toast({html: 'Created New Order'})
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
                                <input id="name" type="text" className="validate" value={name} onChange={({ target }) => setName(target.value)}/>
                                <label htmlFor="name" className="active">Name</label>
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
                        <div className="row right-align">
                            <button className="waves-effect waves-teal btn-flat modal-close" type="submit">Submit</button>
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

