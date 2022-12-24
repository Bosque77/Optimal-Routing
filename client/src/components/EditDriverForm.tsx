import React, { useState, useEffect } from 'react'
import { Driver } from '../types'
import { actionCreators } from '../state'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
interface prop {
    driver: Driver,
    setActive: React.Dispatch<React.SetStateAction<boolean>>,
}


const EditDriverForm = ({ driver, setActive }: prop) => {


    const dispatch = useDispatch()
    const { updateDriver } = bindActionCreators(actionCreators, dispatch)

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


    if (!driver) {
        return (<div></div>)
    }



    const submit = () => {
        console.log('inside on submit')
        if (name === '' || phone_number === '' || email === '') {
            M.toast({ html: 'All fields need to be filled out' })
        } else {
            const id = driver.id
            const new_driver: Driver = { id, name, phone_number, email, active, 'user_id': driver.user_id, 'region_id': driver.region_id }
            updateDriver(new_driver)
            const modal_elem = document.getElementById('modal1')
            M.toast({html: 'Driver was updated'})
            if(modal_elem){
                const instance = M.Modal.getInstance(modal_elem)
                instance.close()
            }
            setActive(false)
        }
    }


    return (
        <div className="row">
            <div id="modal1" className="modal">
                <div className="modal-content">
                    <h4>driver</h4>
                    <form className="col s12">
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
                            <a className="waves-effect waves-teal btn-flat" onClick={() => submit()}>Submit</a>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )

}

export default EditDriverForm

