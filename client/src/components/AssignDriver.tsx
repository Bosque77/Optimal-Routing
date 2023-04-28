import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actionCreators, State } from '../state'
import { TruckRoute } from '../../../shared/types'
import { bindActionCreators } from 'redux'




interface prop {
    setActive: React.Dispatch<React.SetStateAction<boolean>>,
    truckRoute: TruckRoute
}


const AssignDriver = ({ setActive, truckRoute }: prop) => {

    const dispatch = useDispatch()
    const { updateTruckRoute, initializeDrivers } = bindActionCreators(actionCreators, dispatch)
    const region = useSelector((state: State) => state.setRegion)
    const drivers = useSelector((state: State) => state.drivers)

    useEffect(() => {
        const modal_1 = document.querySelector('#modal1')
        if (modal_1) {
            if(region){
                initializeDrivers(region)
            }

        }
    }, [])


    const selectDriver = async (driver_id: string) => {
        console.log('inside select Driver')
        const new_truck_route = {...truckRoute, driver_id}
        await updateTruckRoute(new_truck_route)
        setActive(false)
    }


    const insertDrivers = () => {
        return (
            drivers.map(driver =>
                <tr key={driver.id}>
                    <td>{driver.name}</td>
                    <td>{driver.phone_number}</td>
                    <td>{driver.email}</td>
                    <td><button className="btn modal-close" onClick={ () => selectDriver(driver.id)}> Select </button></td>
                </tr>
            )
        )
    }

    return (
        <div id="modal1" className="modal">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Phone Number</th>
                            <th>Email</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {insertDrivers()}
                    </tbody>
                </table>
        </div>
    )

}


export default AssignDriver