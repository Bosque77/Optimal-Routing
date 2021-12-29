import React, { useState, useEffect } from 'react'
import { Driver} from '../types'
import { actionCreators } from '../state'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
interface prop {
    driver: Driver ,
    setActive: React.Dispatch<React.SetStateAction<boolean>>,
}


const EditDriverForm = ({ driver, setActive }: prop) => {


    if(!driver){
        return(<div></div>)
    }


    useEffect(() => {

        // M.AutoInit()
        console.log('inside useEffect')
        const modal_1 = document.querySelector('#modal1')
        if (modal_1) {
            const instance = M.Modal.init(modal_1, { onCloseEnd: () => setActive(false) })
            instance.open()
        }
    }, [])


    const [name, setName] = useState(driver.name)
    const [phone_number, setPhoneNumber] = useState(driver.phone_number)
    const [email, setEmail] = useState(driver.email)
    const [active, setStatus] = useState(driver.active)
    


    const dispatch = useDispatch()
    const { updateDriver } = bindActionCreators(actionCreators, dispatch)


    const submit = () => {
        console.log('inside on submit')
        const id = driver.id
        const new_driver: Driver = { id, name, phone_number, email, active, 'user_id': driver.user_id, 'region_id': driver.region_id}
        updateDriver(new_driver)
        setActive(false)
    }


    return (
        <div className="row">
            <div id="modal1" className="modal">
                <div className="modal-content">
                    <h4>driver</h4>
                    <form className="col s12" onSubmit={submit}>
                        <div className="row">
                            <div className="input-field col s4">
                                <input id="name" type="text" className="validate" value={name} onChange={({ target }) => setName(target.value)} />
                                <label htmlFor="name" className="active">Name</label>
                            </div>
                            <div className="input-field col s4">
                                <input id="street" type="text" className="validate" value={phone_number} onChange={({ target }) => setPhoneNumber(target.value)} />
                                <label htmlFor="street" className="active">Street</label>
                            </div>
                            <div className="input-field col s4">
                                <input id="street" type="text" className="validate" value={email} onChange={({ target }) => setEmail(target.value)} />
                                <label htmlFor="street" className="active">Street</label>
                            </div>
                        </div>
                        <div className="row left-align" >
                            {(active) ? <a className="red btn-small" onClick={() => setStatus(!active)}>Deactivate</a> : <a className="green lighten-1 btn-small" onClick={() => setStatus(!active)}>Activate</a>}

                        </div>
                        <div className="row right-align">
                            <button className="modal-close waves-effect waves-teal btn-flat" type="submit">Submit</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )

}

export default EditDriverForm

