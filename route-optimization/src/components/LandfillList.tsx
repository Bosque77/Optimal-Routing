import React, { useState } from 'react'
import { Landfill } from '../types'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators, State } from '../state'
import { useEffect } from 'react'
import styled from 'styled-components'
import LandfillForm from './LandfillForm'

import M from 'materialize-css'

const TopSpacing = styled.div`
  margin-top: 2em;
`

const LandfillList = () => {

    const dispatch = useDispatch()

    const { initializeLandfills, updateLandfill } = bindActionCreators(actionCreators, dispatch)
    useEffect(() => {
        M.AutoInit()
        initializeLandfills()
    }, [])
    const landfills = useSelector((state: State) => state.landfills)
    const [landfill, setLandfill] = useState(landfills[0])
    const [edit_state, setEditState] = useState(false)



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
        setEditState(true)
    
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
                    <td>{(landfill.active) ? <a className="red btn-small" onClick={() => changeLandfillStatus(landfill)}>Deactivate</a> : <a className="green lighten-1 btn-small" onClick={() => changeLandfillStatus(landfill)}>Activate</a>}</td>
                    <td> <button className="btn-floating btn waves-light red" onClick={() => editLandfill(landfill)}><i className="material-icons">mode_edit</i></button></td>
                </tr>
            )
        )
    }




    return (
        <div>
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
            {edit_state && <LandfillForm landfill={landfill} setEditState ={setEditState}/>

            }

        </div>
    )
}


export default LandfillList