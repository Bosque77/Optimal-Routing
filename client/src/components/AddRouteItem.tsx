import React, { useEffect } from 'react'


interface prop {
    setActive: React.Dispatch<React.SetStateAction<boolean>>,
}

const AddRouteItem = ({ setActive }: prop) => {

    console.log('inside add route item')

    useEffect(() => {
        const modal_1 = document.querySelector('#modal1')
        if (modal_1) {
            const instance = M.Modal.init(modal_1, { onCloseEnd: () => setActive(false) })
            instance.open()
        }
    }
    )


    return (
        <div id="modal1" className="modal">
            <div className="modal-content">
                <h4>Modal Header</h4>
                <p>A bunch of text</p>
            </div>
            <div className="modal-footer">
                <a href="#!" className="modal-close waves-effect waves-green btn-flat">Agree</a>
            </div>
        </div>

    )


}

export default AddRouteItem