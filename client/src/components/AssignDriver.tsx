import React, { useEffect, useState } from 'react'


interface prop {
    setActive: React.Dispatch<React.SetStateAction<boolean>>,

}


const AssignDriver = ({setActive}:prop) => {

    useEffect(() => {
        const modal_1 = document.querySelector('#modal1')
        if (modal_1) {
            const instance = M.Modal.init(modal_1, { onCloseEnd: () => setActive(false) })
            instance.open()
        }
    },[])
    
    return(
        <div id="modal1" className="modal">
            Assign a driver
        </div>
    )

}


export default AssignDriver