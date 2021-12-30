import React, { useState, useEffect } from 'react'
import { NewDriver} from '../types'
import { actionCreators, State } from '../state'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'

interface prop {
    setActive: React.Dispatch<React.SetStateAction<boolean>>,
}


const CreateDriverForm = ({ setActive }: prop) => {


    const region = useSelector((state: State) => state.setRegion)

    if(!region){
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


    const [name, setName] = useState('')
    const [phone_number, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [active, setStatus] = useState(true)
    


    const dispatch = useDispatch()
    const { createDriver } = bindActionCreators(actionCreators, dispatch)


    const submit = async () => {
        console.log('inside on submit')

        if(name==='' || phone_number==='' || email==='' ){
            M.toast({html: 'All fields need to be filled out'})
        }else{
            const new_driver: NewDriver = { name, phone_number, email,  'region_id': region.id }
            await createDriver(new_driver)
            M.toast({html: 'Created New Landfill'})
            setActive(false)
        }
    }


    return (
        <div className="row">
            <div id="modal1" className="modal">
                <div className="modal-content">
                    <h4>Driver</h4>
                    <form className="col s12" onSubmit={submit}>
                        <div className="row">
                            <div className="input-field col s4">
                                <input id="name" type="text" className="validate" value={name} onChange={({ target }) => setName(target.value)} />
                                <label htmlFor="name" className="active">Name</label>
                            </div>
                            <div className="input-field col s4">
                                <input id="street" type="text" className="validate" value={phone_number} onChange={({ target }) => setPhoneNumber(target.value)} />
                                <label htmlFor="street" className="active">Phone Number</label>
                            </div>
                            <div className="input-field col s4">
                                <input id="street" type="text" className="validate" value={email} onChange={({ target }) => setEmail(target.value)} />
                                <label htmlFor="street" className="active">Email</label>
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

export default CreateDriverForm

