import React from 'react'
import { Landfill } from '../../types'

let landfills = [
    {
        'name': 'landfill_1',
        'street': '4703 Cambridge Dr.',
        'city': 'Sandy Springs',
        'state': 'Georgia',
        'zipcode': 30338,
        'latitude': 33.93,
        'longitude': -84.318,
        'active': true,
        'id': 1,
    },
    {
        'name': 'landfill_2',
        'street': '1775 County Services Pkwy SW',
        'city': 'Marietta',
        'state': 'Georgia',
        'zipcode': 30008,
        'latitude': 33.91,
        'longitude': -84.58,
        'active': true,
        'id': 2,
    },
    {
        'name': 'landfill_3',
        'street': '3001 S Pioneer Dr SE',
        'city': 'Smyrna',
        'state': 'Georgia',
        'zipcode': 30082,
        'latitude': 33.82,
        'longitude': -84.50,
        'active': false,
        'id': 3
    }
]

const changeLandfillStatus = (landfill: Landfill) => {
    console.log('inside on click')
    const new_landfill = {...landfill}
    if(landfill.active){
        new_landfill.active = false
    }else{
        new_landfill.active = true
    }
    landfills = landfills.map(landfill=> landfill.id===new_landfill.id ? new_landfill : landfill)
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
                <td>{ (landfill.active) ? <a className="waves-effect red btn-small" onClick={() => changeLandfillStatus(landfill)}>Deactivate</a> : <a className="waves-effect green lighten-5 btn-small" onClick={() => changeLandfillStatus(landfill)}>Activate</a>}</td>
                <td> <a className="btn-floating btn waves-effect waves-light red"><i className="material-icons">mode_edit</i></a></td>
            </tr>
        )
    )
}

const LandfillList = () => {
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