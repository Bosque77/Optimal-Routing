import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators, State } from '../state'
import { Region } from '../types'
import './RegionSelector.css'



const RegionSelector = () => {

    console.log('inside Region Selector Component')

    
    const dispatch = useDispatch()
    const { setRegion } = bindActionCreators(actionCreators, dispatch)


    const [new_region, setNewRegion] = useState('')
    const user_token = useSelector((state: State) => state.userToken)
    const region = useSelector((state: State) => state.setRegion)
    const regions = useSelector((state: State) => state.regions)
    const set_region = useSelector((state: State) => state.setRegion)



    const insertRegionTabs = () => {
        console.log(regions)
        console.log(set_region)
        return (

            regions?.map(region =>
                <option value={region.id}>{region.name}</option>
            )
        )
    }

    const onRegionSelect = (region_id: string) => {
        const new_region = regions.find( region => region.id == region_id) as Region
        setRegion(new_region)
    }

    return (

        <div className="flex flex-col mt-4 w-40">
            <label
                htmlFor="region-selector"
                className="text-md font-medium text-gray-700 text-left"
            >
                Region Selector
            </label>
            <select id="region-selector" className="mt-2 bg-white p-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500 focus:border-2  sm:text-sm w-40" 
              value={region?.id}
            onChange={({ target }) => onRegionSelect(target.value)}>
                {insertRegionTabs()}
            </select>
        </div>


    )
}


export default RegionSelector

