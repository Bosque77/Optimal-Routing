import React, { useState } from 'react'
import { Landfill } from '../types'
import { actionCreators } from '../state'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

const LandfillForm = ({ landfill }: { landfill: Landfill }) => {

    if (!landfill) {
        return <div></div>
    }

    const [name, setName] = useState(landfill.name)
    const [street, setStreet] = useState(landfill.street)
    const [city, setCity] = useState(landfill.city)
    const [state, setState] = useState(landfill.state)
    const [zipcode, setZipcode] = useState(landfill.zipcode.toString())
    const [latitude, setLatitude] = useState(landfill.latitude.toString())
    const [longitude, setLongitude] = useState(landfill.longitude.toString())
    const [active, setStatus] = useState(landfill.active)

    const dispatch = useDispatch()
    const { updateLandfill } = bindActionCreators(actionCreators, dispatch)



    const submit = () => {
        console.log('inside on submit')
        const id = landfill.id
        const new_landfill: Landfill = { id, name, street, city, state, 'zipcode': parseInt(zipcode), 'latitude': parseInt(latitude), 'longitude': parseInt(longitude), active }
        updateLandfill(new_landfill)
    }


    return (
        <div className="row">
            <form className="col s12" onSubmit={submit}>
                <div className="row">
                    <div className="input-field col s6">
                        <input id="name" type="text" className="validate" value={name} onChange={({ target }) => setName(target.value)} />
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
                <div className="row left-align" >
                    {(active) ? <a className="red btn-small" onClick={() => setStatus(!active)}>Deactivate</a> : <a className="green lighten-1 btn-small" onClick={() => setStatus(!active)}>Activate</a>}
                </div>
                <div className="row right-align">
                    <button className="modal-close waves-effect waves-teal btn-flat">Submit</button>
                </div>
            </form>
        </div>
    )

}

export default LandfillForm

