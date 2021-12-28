import React, { useState } from 'react'
import { Landfill } from '../types'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators, State } from '../state'
import { useEffect } from 'react'
import styled from 'styled-components'
import EditLandfillForm from './EditLandfillForm'
import CreateLandfillForm from './CreateLandfillForm'
import ConfirmDelete from './ConfirmDelete'

import M from 'materialize-css'

const TopSpacing = styled.div`
  margin-top: 2em;
`

const LandfillList = () => {

    const dispatch = useDispatch()

    const { updateLandfill } = bindActionCreators(actionCreators, dispatch)


    useEffect(() => {
        M.AutoInit()

    }, [])
    
    const landfills = useSelector((state: State) => state.landfills)
    const [landfill, setLandfill] = useState<Landfill>(landfills[0])
    const [editFormActive, setEditFormActive] = useState(false)
    const [createFormActive, setCreateFormActive] = useState(false)
    const [confirmDeleteActive, setConfirmDeleteActive] = useState(false)



    const changeLandfillStatus = (landfill: Landfill) => {
        console.log('inside on click')
        const new_landfill = { ...landfill }
        if (landfill.active) {
            new_landfill.active = false
        } else {
            new_landfill.active = true
        }
        updateLandfill(new_landfill)
    }



    const editLandfill = (landfill: Landfill) => {
        setLandfill(landfill)
        setEditFormActive(true)
    }

    const onDeleteLandfill = (landfill: Landfill) => {
        console.log('inside delete landfill')
        setLandfill(landfill)
        setConfirmDeleteActive(true)

    }

    const onCreateLandfill = () => {
        setCreateFormActive(true)
    }


    const insertLandfills = () => {
        return (
            landfills.map(landfill =>
                <tr key={landfill.id}>
                    <td>{landfill.name}</td>
                    <td>{landfill.street}</td>
                    <td>{landfill.city}</td>
                    <td>{landfill.zipcode}</td>
                    <td>{landfill.latitude}</td>
                    <td>{landfill.longitude}</td>
                    <td>{(landfill.active) ? <p><label><input type="checkbox" checked={true} onChange={() => changeLandfillStatus(landfill)} /><span>Active</span></label> </p> : <p><label><input type="checkbox" checked={false} onChange={() => changeLandfillStatus(landfill)} /><span>Inactive</span></label> </p>}</td>
                    <td> <button className="btn-floating btn waves-light red" onClick={() => editLandfill(landfill)}><i className="material-icons">mode_edit</i></button></td>
                    <td> <button className="btn-floating btn black" onClick={() => onDeleteLandfill(landfill)}><i className="material-icons">delete</i></button></td>
                </tr>
            )
        )
    }




    return (
        <div>
            <div className="row ">
                <br></br>
                <div className="col offset-s10">
                    <button className='btn black offset-s10' onClick={() => onCreateLandfill()}>New Landfill</button>
                </div>

            </div>
            <TopSpacing>
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
                        {insertLandfills()}
                    </tbody>
                </table>
            </TopSpacing>
            {editFormActive && <EditLandfillForm landfill={landfill} setActive={setEditFormActive}  />}
            {createFormActive && <CreateLandfillForm setActive={setCreateFormActive}  />}
            {confirmDeleteActive && <ConfirmDelete setActive={setConfirmDeleteActive} landfill={landfill} />}

        </div>
    )
}


export default LandfillList