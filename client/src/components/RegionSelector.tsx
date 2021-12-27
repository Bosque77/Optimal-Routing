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
    const { initializeRegions,  } = bindActionCreators(actionCreators, dispatch)
    
    const user_token = useSelector((state: State) => state.userToken)

    useEffect(() => {
        M.AutoInit()
        if(user_token){
            console.log('inside the useEffect Hook')
            console.log(user_token)
            initializeRegions(user_token.token)
        }
      
    }, [])




    return (
        <div>
            <TopSpacing >
                <div className="row right-align">
                    <a className='dropdown-trigger btn' href='#' data-target='dropdown1'>Select Region</a>
                </div>
            </TopSpacing>

            <ul id='dropdown1' className='dropdown-content'>
                <li><a href="#!">one</a></li>
                <li><a href="#!">two</a></li>
                <li><a href="#!">three</a></li>
                <li><a href="#!"><i className="material-icons">view_module</i>four</a></li>
                <li><a href="#!"><i className="material-icons">cloud</i>five</a></li>
            </ul>
        </div>

    )
}


export default RegionSelector

