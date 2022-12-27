import React, { useState, useEffect } from 'react'
import { NewDriver } from '../types'
import { actionCreators, State } from '../state'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'

interface prop {
    setActive: React.Dispatch<React.SetStateAction<boolean>>,
}


const CreateDriverForm = ({ setActive }: prop) => {


    const region = useSelector((state: State) => state.setRegion)

    useEffect(() => {

        // M.AutoInit()
        console.log('inside useEffect')
        const modal_1 = document.querySelector('#modal1')
        if (modal_1) {
            const instance = M.Modal.init(modal_1, { onCloseEnd: () => setActive(false) })
            instance.open()
        }
    }, [])


    const [name, setName] = useState('')
    const [phone_number, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [active, setStatus] = useState(true)



    const dispatch = useDispatch()
    const { createDriver } = bindActionCreators(actionCreators, dispatch)

    if (!region) {
        return (<div></div>)
    }




    const submit = async () => {
        console.log('inside on submit')

        if (name === '' || phone_number === '' || email === '' || password === '') {
            M.toast({ html: 'All fields need to be filled out' })
        } else {
            const new_driver: NewDriver = { name, phone_number, email, password, 'region_id': region.id }
            await createDriver(new_driver)
            M.toast({ html: 'Created New Landfill' })
            const modal_elem = document.getElementById('modal1')
            if (modal_elem) {
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
                    <h4>Driver</h4>
                    <form className="col s12" >
                        <div className="row">
                            <div className="input-field col s4">
                                <input id="name" type="text" className="validate" value={name} onChange={({ target }) => setName(target.value)} />
                                <label htmlFor="name" className="active">Name</label>
                            </div>
                            <div className="input-field col s4">
                                <input id="phone-number" type="text" className="validate" value={phone_number} onChange={({ target }) => setPhoneNumber(target.value)} />
                                <label htmlFor="phone-number" className="active">Phone Number</label>
                            </div>
                            <div className="input-field col s4">
                                <input id="email" type="text" className="validate" value={email} onChange={({ target }) => setEmail(target.value)} />
                                <label htmlFor="email" className="active">Email</label>
                            </div>
                            <div className="input-field col s4">
                                <input id="password" type="text" className="validate" value={password} onChange={({ target }) => setPassword(target.value)} />
                                <label htmlFor="password" className="active">Password</label>
                            </div>
                        </div>
                        <div className="row left-align" >
                            {(active) ? <a className="red btn-small" onClick={() => setStatus(!active)}>Deactivate</a> : <a className="green lighten-1 btn-small" onClick={() => setStatus(!active)}>Activate</a>}

                        </div>
                        <div className="row right-align">
                            <a className=" waves-effect waves-teal btn-flat" onClick={() => submit()}>Submit</a>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )

}

export default CreateDriverForm

