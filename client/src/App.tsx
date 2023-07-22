import React, { useEffect } from 'react'
import './App.css'
import Login from './pages/LoginPage/Login'
import {
    BrowserRouter as Router, Route, Routes
} from 'react-router-dom'
import { actionCreators, State } from './state'
import { useDispatch, useSelector } from 'react-redux'
import HomePage from './pages/HomePage/HomePage'
import RoutePage from './pages/RoutePage/RoutePage'
import RegionPage from './pages/RegionPage/RegionPage'
import { bindActionCreators } from 'redux'
import { Region, UserToken } from '../../shared/types'
import AccountPage from './pages/AccountPage/AccountPage'



function App() {

    const user_token = useSelector((state: State) => state.userToken)
    const regions = useSelector((state: State) => state.regions);
    const region = useSelector((state: State) => state.setRegion);
    const dispatch = useDispatch()
    const { setUserToken, initializeRegions } = bindActionCreators(actionCreators, dispatch)

    console.log('logging the basic user info, inside the Apps Component')
    console.log(region)
    console.log(user_token)
    console.log(!user_token || !region)

    useEffect(() => {
        // Ensure the script is not loaded more than once
        if (!document.getElementById('googleMaps')) {
          loadGoogleMapsScript();
        }
      }, []);
    
      const loadGoogleMapsScript = () => {
        const script = document.createElement('script');
        script.id = 'googleMaps';
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&callback=initMap`;
        script.async = true;
        script.defer = true;
        // @ts-ignore
        window.initMap = () => {
          // your callback function logic here
        };
        document.body.appendChild(script);
      };

      useEffect(() => {
        const storedUserToken = window.localStorage.getItem('user_token')
        if (storedUserToken && storedUserToken !== JSON.stringify(user_token)) {
          const parsedUserToken: UserToken = JSON.parse(storedUserToken)
          setUserToken(parsedUserToken)
          initializeRegions() // This should also set a current region
        }
      }, [user_token]) // Add user_token as a dependency
      
      


    return (
        <Router>
            <div className="App">


                <Routes>
                    
                    {(!user_token || !region) && <Route path="/*" element={<Login />} />}
                    {user_token  && region && <Route path="/routes" element={<RoutePage />} />}
                    {user_token  && region && <Route path="/regions" element={<RegionPage />} />}
                    {user_token  && region && <Route path="/user-profile" element={<AccountPage />} />}
                    {user_token  && region && <Route path="/*" element={<HomePage />} />}

                </Routes>

            </div>
        </Router>
    )
}

export default App

