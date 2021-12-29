import React from 'react'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state'
import { Driver, Landfill } from '../types'

interface props {
    setActive: React.Dispatch<React.SetStateAction<boolean>>,
    landfill?: Landfill,
    driver?: Driver
}

const ConfirmDelete = ({ setActive, landfill, driver }: props) => {

    const dispatch = useDispatch()

    const { deleteLandfill } = bindActionCreators(actionCreators, dispatch)
    const { deleteDriver } = bindActionCreators(actionCreators, dispatch)


    React.useEffect(() => {

        const modal = document.querySelector('#confirm_delete')
        if (modal) {
            const instance = M.Modal.init(modal, { dismissible: false })
            instance.open()
        }
    }, [])

    const handleConfirmation = (status: boolean) => {
        if (status) {
            if(landfill){
                deleteLandfill(landfill)
            }else if(driver){
                deleteDriver(driver)
            }
        }
        setActive(false)

    }

    return (
        <div className='center-align'>
            <div id="confirm_delete" className="modal">
                <div className="modal-content center-align">
                    <div>
                        Are you sure you want to delete this item?

                    </div>
                    <br />
                    <div className="row">
                        <div className="col s4"></div>
                        <div className="col s2">
                            <button onClick={() => handleConfirmation(true)} className="btn black modal-close" >Yes</button>
                        </div>
                        <div className="col s2">
                            <button onClick={() => handleConfirmation(false)} className="btn black modal-close">No</button>
                        </div>


                    </div>

                </div>
            </div>
        </div>

    )

}

export default ConfirmDelete