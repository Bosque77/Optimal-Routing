import React from 'react'
// import logo from './logo.svg';
import './App.css'
// import Login from './components/LoginPage/Login'
import Home from './components/Home/Home'
import {
    BrowserRouter as Router, Route, Routes
} from 'react-router-dom'

function App() {



    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/*" element={<Home />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App
