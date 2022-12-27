import React, { useState } from 'react'
import { Depot } from '../types'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators, State } from '../state'
import { useEffect } from 'react'
import EditDepotForm from './EditDepotForm'
import CreateDepotForm from './CreateDepotForm'
import ConfirmDelete from './ConfirmDelete'



const DepotList = () => {

    const dispatch = useDispatch()

    const { updateDepot } = bindActionCreators(actionCreators, dispatch)


    useEffect(() => {
        // M.AutoInit()

    }, [])
    
    const depots = useSelector((state: State) => state.depots)
    const [depot, setdepot] = useState<Depot>(depots[0])
    const [editFormActive, setEditFormActive] = useState(false)
    const [createFormActive, setCreateFormActive] = useState(false)
    const [confirmDeleteActive, setConfirmDeleteActive] = useState(false)



    const changedepotStatus = (depot: Depot) => {
        console.log('inside on click')
        const new_depot = { ...depot }
        if (depot.active) {
            new_depot.active = false
        } else {
            new_depot.active = true
        }
        updateDepot(new_depot)
    }



    const editdepot = (depot: Depot) => {
        setdepot(depot)
        setEditFormActive(true)
    }

    const onDeletedepot = (depot: Depot) => {
        console.log('inside delete depot')
        setdepot(depot)
        setConfirmDeleteActive(true)

    }

    const onCreatedepot = () => {
        setCreateFormActive(true)
    }


    const insertdepots = () => {
        return (
            depots.map(depot =>
                <tr key={depot.id}>
                    <td>{depot.name}</td>
                    <td>{depot.street}</td>
                    <td>{depot.city}</td>
                    <td>{depot.zipcode}</td>
                    <td>{depot.latitude}</td>
                    <td>{depot.longitude}</td>
                    <td>{(depot.active) ? <p><label><input type="checkbox" checked={true} onChange={() => changedepotStatus(depot)} /><span>Active</span></label> </p> : <p><label><input type="checkbox" checked={false} onChange={() => changedepotStatus(depot)} /><span>Inactive</span></label> </p>}</td>
                    <td> <button className="btn-floating btn waves-light red" onClick={() => editdepot(depot)}><i className="material-icons">mode_edit</i></button></td>
                    <td> <button className="btn-floating btn black" onClick={() => onDeletedepot(depot)}><i className="material-icons">delete</i></button></td>
                </tr>
            )
        )
    }




    return (
        <div>
            <div className="row ">
                <br></br>
                <div className="col offset-s10">
                    <button className='btn black offset-s10' onClick={() => onCreatedepot()}>New depot</button>
                </div>

            </div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Street</th>
                            <th>City</th>
                            <th>Zipcode</th>
                            <th>Latitude</th>
                            <th>Longitude</th>
                            <th>Active</th>
                        </tr>
                    </thead>

                    <tbody>
                        {insertdepots()}
                    </tbody>
                </table>
            {editFormActive && <EditDepotForm depot={depot} setActive={setEditFormActive}  />}
            {createFormActive && <CreateDepotForm setActive={setCreateFormActive}  />}
            {confirmDeleteActive && <ConfirmDelete setActive={setConfirmDeleteActive} depot={depot} />}

        </div>
    )
}


export default DepotList