import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import styled from 'styled-components'
import { actionCreators, State } from '../state'

const TopSpacing = styled.div`
  margin-top: 2em;
`

const RegionSelector = () => {

    console.log('inside Region Selector Component')

    const dispatch = useDispatch()
    const { initializeRegions, setRegion } = bindActionCreators(actionCreators, dispatch)

    const user_token = useSelector((state: State) => state.userToken)
    const regions = useSelector((state: State) => state.regions)
    const set_region = useSelector((state: State) => state.setRegion)


    useEffect(() => {
        M.AutoInit()
        if (user_token) {
            if (!regions) {
                initializeRegions(user_token.token)
            } else {
                setRegion(regions[0])
            }

        }

    }, [regions])


    const insertRegionTabs = () => {
        return (
            regions?.map(region => {
                return (
                    <><li key={region.id}><a href="#!" onClick={() => setRegion(region)}>{region.name}</a></li><li className="divider" tabIndex={-1}></li></>
                )
            })

        )
    }



    return (
        <div>
            <TopSpacing >
                <div className="row right-align">
                    <a className='dropdown-trigger btn' href='#' data-target='dropdown1'>{set_region?.name}</a>
                </div>
            </TopSpacing>

            <ul id='dropdown1' className='dropdown-content'>


       
                {insertRegionTabs()}
            </ul>
        </div>

    )
}


export default RegionSelector

