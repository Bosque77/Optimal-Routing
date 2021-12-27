import React, { useEffect } from 'react'
import styled from 'styled-components'

const TopSpacing = styled.div`
  margin-top: 2em;
`

const RegionSelector = () => {

    useEffect(() => {

        M.AutoInit()


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