import React from 'react'
import { Landfill } from '../../types'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators, State } from '../../state'
import { useEffect } from 'react'



const LandfillList = () => {

    const dispatch = useDispatch()
    const { initializeLandfills, updateLandfill } = bindActionCreators(actionCreators, dispatch)
    useEffect(() => {
        initializeLandfills()
    }, [])
    const landfills = useSelector((state: State) => state.landfills)


    const changeLandfillStatus = (landfill: Landfill) => {
        console.log('inside on click')
        const new_landfill = {...landfill}
        if(landfill.active){
            new_landfill.active = false
        }else{
            new_landfill.active = true
        }
        updateLandfill(new_landfill)

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
                    <td> <a className="btn-floating btn waves-light red"><i className="material-icons">mode_edit</i></a></td>
                </tr>
            )
        )
    }




    return (
        <div>
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
        </div>
    )
}


export default LandfillList