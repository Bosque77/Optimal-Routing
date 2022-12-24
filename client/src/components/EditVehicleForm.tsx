import React, { useState, useEffect } from 'react'
import { Depot, EditVehicle, Vehicle } from '../types'
import { actionCreators, State } from '../state'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
interface prop {
    vehicle: Vehicle,
    setActive: React.Dispatch<React.SetStateAction<boolean>>,
}


const EditVehicleForm = ({ vehicle, setActive }: prop) => {


    const dispatch = useDispatch()
    const { updateVehicle } = bindActionCreators(actionCreators, dispatch)
    const depots = useSelector((state: State) => state.depots)


    useEffect(() => {

        // M.AutoInit()
        console.log('inside useEffect')
        const modal_1 = document.querySelector('#modal1')
        if (modal_1) {
            const instance = M.Modal.init(modal_1, { onCloseEnd: () => setActive(false) })
            instance.open()
        }

        const elems = document.querySelectorAll('select')
        M.FormSelect.init(elems)

    }, [])


    const [license_number, setLicenseNumber] = useState(vehicle.license_number)
    const [size, setSize] = useState(vehicle.size)
    const [start_depot, setStartDepot] = useState(vehicle.start_depot)
    const [end_depot, setEndDepot] = useState(vehicle.end_depot)
    const [active, setStatus] = useState(vehicle.active)

    if (!vehicle || !depots) {
        return (<div></div>)
    }



    const submit = () => {
        console.log('inside on submit')
        if (license_number === '' || size === 0) {
            M.toast({ html: 'All fields need to be filled out' })
        } else {
            const id = vehicle.id
            const start_depot_id = start_depot.id
            let new_vehicle = {} as EditVehicle
            if (end_depot) {
                const end_depot_id = end_depot.id
                new_vehicle = { id, license_number, size, 'start_depot': start_depot_id, 'end_depot': end_depot_id, active, 'region_id': vehicle.region_id }
            } else {
                new_vehicle = { id, license_number, size, 'start_depot': start_depot_id, 'end_depot': null, active, 'region_id': vehicle.region_id }
            }

            updateVehicle(new_vehicle)
            M.toast({html: 'Updated Vehicle'})
            const modal_elem = document.getElementById('modal1')
            if (modal_elem) {
                const instance = M.Modal.getInstance(modal_elem)
                instance.close()
            }
            setActive(false)
        }
    }

    const insertStartingDepotChoices = () => {
        return (
            depots.map(depot => {
                if (depot.id === start_depot.id) {
                    return (
                        <option value={depot.id} key={depot.id} selected={true}>{depot.name}</option>
                    )
                } else {
                    return (
                        <option value={depot.id} key={depot.id} >{depot.name}</option>
                    )
                }
            })
        )
    }

    const insertEndDepotChoices = () => {
        return (
            depots.map(depot => {
                if (end_depot && depot.id === end_depot.id) {
                    return (
                        <option value={depot.id} key={depot.id} selected={true}>{depot.name}</option>
                    )
                } else {
                    return (
                        <option value={depot.id} key={depot.id} >{depot.name}</option>
                    )
                }

            })
        )
    }

    const setStartingDepot = () => {
        const val = document.getElementById('select1') as any
        const depot_id = val.value
        const selected_depot = depots.find(depot => depot.id === depot_id)
        if (selected_depot) {
            setStartDepot(selected_depot)
        }
    }

    const setEndingDepot = () => {
        const val = document.getElementById('select2') as any
        const depot_id = val.value
        const selected_depot = depots.find(depot => depot.id === depot_id)
        if (selected_depot) {
            setEndDepot(selected_depot)
        } else {
            setEndDepot(undefined)
        }
    }

    const onSetSize = (input: string) => {

        if (input) {
            setSize(parseInt(input))
        } else {
            setSize(0)
        }
    }



    return (
        <div className="row">
            <div id="modal1" className="modal">
                <div className="modal-content">
                    <h4>Vehicle</h4>
                    <form className="col s12" >
                        <div className="row">
                            <div className="input-field col s4">
                                <input id="name" type="text" className="validate" value={license_number} onChange={({ target }) => setLicenseNumber(target.value)} />
                                <label htmlFor="name" className="active">License Number</label>
                            </div>
                            <div className="input-field col s4">
                                <input id="street" type="text" className="validate" value={size} onChange={({ target }) => onSetSize(target.value)} />
                                <label htmlFor="street" className="active">Size</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s4">
                                <select id="select1" onChange={() => setStartingDepot()}>
                                    {insertStartingDepotChoices()}
                                </select>
                                <label>Starting Depot</label>
                            </div>
                            <div className="input-field col s4">
                                <select id="select2" onChange={() => setEndingDepot()}>
                                    <option value="none" >Any</option>
                                    {insertEndDepotChoices()}
                                </select>
                                <label>Ending Depot</label>
                            </div>
                        </div>
                        <div className="row left-align" >
                            {(active) ? <a className="red btn-small" onClick={() => setStatus(!active)}>Deactivate</a> : <a className="green lighten-1 btn-small" onClick={() => setStatus(!active)}>Activate</a>}

                        </div>
                        <div className="row right-align">
                            <a className=" waves-effect waves-teal btn-flat" onClick={() => submit()}>Submit</a>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )

}

export default EditVehicleForm

