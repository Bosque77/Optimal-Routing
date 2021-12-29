import React, { useState } from 'react'
import { Driver } from '../types'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators, State } from '../state'
import { useEffect } from 'react'
import styled from 'styled-components'
// import CreateLandfillForm from './CreateLandfillForm'
import ConfirmDelete from './ConfirmDelete'

import M from 'materialize-css'
import EditDriverForm from './EditDriverForm'

const TopSpacing = styled.div`
  margin-top: 2em;
`

const DriverList = () => {

    const dispatch = useDispatch()

    const { updateDriver } = bindActionCreators(actionCreators, dispatch)


    useEffect(() => {
        M.AutoInit()

    }, [])
    
    const drivers = useSelector((state: State) => state.drivers)
    const [driver, setDriver] = useState<Driver>(drivers[0])
    const [editFormActive, setEditFormActive] = useState(false)
    const [createFormActive, setCreateFormActive] = useState(false)
    const [confirmDeleteActive, setConfirmDeleteActive] = useState(false)



    const changeDriverStatus = (driver: Driver) => {

        const new_driver = { ...driver }
        if (driver.active) {
            new_driver.active = false
        } else {
            new_driver.active = true
        }
        updateDriver(new_driver)
    }



    const editDriver = (driver: Driver) => {
        setDriver(driver)
        setEditFormActive(true)
    }

    const onDeleteDriver = (driver: Driver) => {
        console.log('inside delete landfill')
        setDriver(driver)
        setConfirmDeleteActive(true)

    }

    // const onCreateLandfill = () => {
    //     setCreateFormActive(true)
    // }


    const insertDrivers = () => {
        return (
            drivers.map(driver =>
                <tr key={driver.id}>
                    <td>{driver.name}</td>
                    <td>{driver.phone_number}</td>
                    <td>{driver.email}</td>

                    <td>{(driver.active) ? <p><label><input type="checkbox" checked={true} onChange={() => changeDriverStatus(driver)} /><span>Active</span></label> </p> : <p><label><input type="checkbox" checked={false} onChange={() => changeDriverStatus(driver)} /><span>Inactive</span></label> </p>}</td>
                    <td> <button className="btn-floating btn waves-light red" onClick={() => editDriver(driver)}><i className="material-icons">mode_edit</i></button></td>
                    <td> <button className="btn-floating btn black" onClick={() => onDeleteDriver(driver)}><i className="material-icons">delete</i></button></td>
                </tr>
            )
        )
    }




    return (
        <div>
            <div className="row ">
                <br></br>
                {/* <div className="col offset-s10">
                    <button className='btn black offset-s10' onClick={() => onCreateLandfill()}>New Landfill</button>
                </div> */}

            </div>
            <TopSpacing>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Phone Number</th>
                            <th>Email</th>
                            <th>Active</th>
                        </tr>
                    </thead>

                    <tbody>
                        {insertDrivers()}
                    </tbody>
                </table>
            </TopSpacing>
            {editFormActive && <EditDriverForm driver={driver} setActive={setEditFormActive}  />}
            {/* {createFormActive && <CreateLandfillForm setActive={setCreateFormActive}  />} */}
            {confirmDeleteActive && <ConfirmDelete setActive={setConfirmDeleteActive} driver={driver} />}

        </div>
    )
}


export default DriverList