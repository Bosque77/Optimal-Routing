import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import styled from 'styled-components'
import { actionCreators, State } from '../state'
import './RegionSelector.css'

const TopSpacing = styled.div`
  margin-top: 2em;
`




const RegionSelector = () => {

    console.log('inside Region Selector Component')

    const dispatch = useDispatch()
    const { initializeRegions, setRegion, createRegion } = bindActionCreators(actionCreators, dispatch)


    const [new_region, setNewRegion] = useState('')
    const user_token = useSelector((state: State) => state.userToken)
    const regions = useSelector((state: State) => state.regions)
    const set_region = useSelector((state: State) => state.setRegion)


    useEffect(() => {
        // M.AutoInit()
        const elems = document.querySelectorAll('.dropdown-trigger')
        M.Dropdown.init(elems, { constrainWidth: false })

        const add_region_modal = document.querySelector('#addRegionModal')
        if (add_region_modal) {
            M.Modal.init(add_region_modal)
        }

        if (user_token) {
            if (regions.length <1) {
                initializeRegions()
            } else {
                setRegion(regions[0])
            }

        }

    }, [regions])


    const insertRegionTabs = () => {
        return (
            regions?.map(region =>
                <li key={region.id}><a href="#!" onClick={() => setRegion(region)}>{region.name}</a></li>
            )

        )
    }

    const onCreateRegion = () => {
        console.log('inside createRegion')
        const new_region_object = {name: new_region}
        createRegion(new_region_object)
    }

    const openAddRegionModal = () => {
        const modal_elem = document.getElementById('addRegionModal')
        if (modal_elem) {
            const instance = M.Modal.getInstance(modal_elem)
            instance.open()
        }
    }


    return (
        <div>
            <TopSpacing >
                <div className="row right-align">
                    <div className="col offset l10 right-align">
                        <a className='dropdown-trigger btn' href='#' data-target='dropdown1'>{set_region?.name}</a>
                    </div>
                    <div className="col right-align">
                        <button className='btn-floating' onClick={openAddRegionModal}><i className="material-icons">add</i></button>
                    </div>
                    <div className="col right-align">
                        <button className='btn-floating black' ><i className="material-icons">delete</i></button>
                    </div>

                </div>
            </TopSpacing>


            <ul id='dropdown1' className='dropdown-content'>
                {insertRegionTabs()}
            </ul>


            <div id="addRegionModal" className="modal" style={{width:30}}>
                <div className="modal-content">
                    <h6>Insert Region</h6>
                    <input value={new_region} placeholder="New Region" onChange={({ target }) => setNewRegion(target.value)} />
                    <br />
                    <div className="right row">
                        <div className="col s2">
                            <button className="btn modal-close" onClick={() => onCreateRegion()}>Submit</button>
                        </div>

                    </div>
                </div>
            </div>



        </div>

    )
}


export default RegionSelector

