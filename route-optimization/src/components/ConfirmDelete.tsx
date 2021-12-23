import React from 'react'
import styled from 'styled-components'

interface props {
    setActive: React.Dispatch<React.SetStateAction<boolean>>,
    setStatus: React.Dispatch<React.SetStateAction<boolean>>
}

const ConfirmDelete = ({ setActive, setStatus }: props) => {


    React.useEffect(() => {

        const modal = document.querySelector('#confirm_delete')
        if (modal) {
            const instance = M.Modal.init(modal, { dismissible: false })
            instance.open()
        }
    }, [])

    const handleConfirmation = (status: boolean) => {
        setStatus(status)
        setActive(false)
    }

    return (
        <div className='center-align'>
            <div id="confirm_delete" className="modal">
                <div className="modal-content center-align">
                    <div>
                        Are you sure you want to delete this item?

                    </div>
                    <br/>
                    <div className="row">
                        <div className="col s5"></div>
                        <div className="col s1">
                            <button onClick={() => handleConfirmation(true)} className="btn black" >Yes</button>
                        </div>
                        <div className="col s1">
                            <button onClick={() => handleConfirmation(false)} className="btn black">No</button>
                        </div>


                    </div>

                </div>
            </div>
        </div>

    )

}

export default ConfirmDelete