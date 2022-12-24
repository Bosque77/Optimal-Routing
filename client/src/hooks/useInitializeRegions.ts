
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, State } from '../state';

const useInitializeRegions = () => {


const dispatch = useDispatch()
const {  initializeRegions, setRegion } = bindActionCreators(actionCreators, dispatch)
    
    initializeRegions()
    const regions = useSelector((state: State) => state.regions)
    setRegion(regions[0])
    return regions[0]
}

export default useInitializeRegions;