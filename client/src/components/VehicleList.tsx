import React, { useState } from 'react'
import { Vehicle } from '../types'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators, State } from '../state'
import { useEffect } from 'react'
import styled from 'styled-components'
// import CreateVehicleForm from './CreateVehicleForm'
import ConfirmDelete from './ConfirmDelete'

import M from 'materialize-css'
import EditVehicleForm from './EditVehicleForm'

const TopSpacing = styled.div`
  margin-top: 2em;
`

const VehicleList = () => {

    const dispatch = useDispatch()

    const { updateVehicle } = bindActionCreators(actionCreators, dispatch)


    useEffect(() => {
        M.AutoInit()

    }, [])
    
    const vehicles = useSelector((state: State) => state.vehicles)
    const [vehicle, setVehicle] = useState<Vehicle>(vehicles[0])
    const [editFormActive, setEditFormActive] = useState(false)
    const [createFormActive, setCreateFormActive] = useState(false)
    const [confirmDeleteActive, setConfirmDeleteActive] = useState(false)



    const changeVehicleStatus = (vehicle: Vehicle) => {

        const new_vehicle = { ...vehicle }
        if (vehicle.active) {
            new_vehicle.active = false
        } else {
            new_vehicle.active = true
        }
        updateVehicle(new_vehicle)
    }



    const editVehicle = (vehicle: Vehicle) => {
        setVehicle(vehicle)
        setEditFormActive(true)
    }

    const onDeleteVehicle = (vehicle: Vehicle) => {
        console.log('inside delete landfill')
        setVehicle(vehicle)
        setConfirmDeleteActive(true)

    }

    const onCreateVehicle = () => {
        setCreateFormActive(true)
    }


    const insertVehicles = () => {
        return (
            vehicles.map(vehicle =>
                <tr key={vehicle.id}>
                    <td>{vehicle.license_number}</td>
                    <td>{vehicle.size}</td>
                    <td>{vehicle.start_depot.name}</td>
                    { (vehicle.end_depot) ? <td>{vehicle.end_depot?.name}</td> : <td>Any</td>}
                    
                    <td>{(vehicle.active) ? <p><label><input type="checkbox" checked={true} onChange={() => changeVehicleStatus(vehicle)} /><span>Active</span></label> </p> : <p><label><input type="checkbox" checked={false} onChange={() => changeVehicleStatus(vehicle)} /><span>Inactive</span></label> </p>}</td>
                    <td> <button className="btn-floating btn waves-light red" onClick={() => editVehicle(vehicle)}><i className="material-icons">mode_edit</i></button></td>
                    <td> <button className="btn-floating btn black" onClick={() => onDeleteVehicle(vehicle)}><i className="material-icons">delete</i></button></td>
                </tr>
            )
        )
    }




    return (
        <div>
            <div className="row ">
                <br></br>
                <div className="col offset-s10">
                    <button className='btn black offset-s10' onClick={() => onCreateVehicle()}>New Vehicle</button>
                </div>

            </div>
            <TopSpacing>
                <table>
                    <thead>
                        <tr>
                            <th>License Number</th>
                            <th>Size</th>
                            <th>Start Depot</th>
                            <th>End Depot</th>
                            <th>Active</th>
                        </tr>
                    </thead>

                    <tbody>
                        {insertVehicles()}
                    </tbody>
                </table>
            </TopSpacing>
            {editFormActive && <EditVehicleForm vehicle={vehicle} setActive={setEditFormActive}  />}
            {/* {createFormActive && <CreateVehicleForm setActive={setCreateFormActive} />}
            {confirmDeleteActive && <ConfirmDelete setActive={setConfirmDeleteActive} vehicle={vehicle} />} */}

        </div>
    )
}


export default VehicleList