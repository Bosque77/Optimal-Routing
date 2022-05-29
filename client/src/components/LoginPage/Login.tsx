import React from 'react'
import './Login.css'
import SignUpForm from '../SignUpForm/SignUpForm'
import SignInForm from '../SignInForm/SignInForm'
import background_image from './images/login_background.png'


import {
    Route, Routes
} from 'react-router-dom'

const Login = () => {
    return (
        <div className="body">
            <div className="row">
                <div className="col l6">
                    <img src={background_image} id='background-image'/>

                </div>
                <div className="col l1"></div>
                <div className="col l5 sign-in">
                    <Routes>
                        <Route path="/" element={<SignInForm />} />
                        <Route path="/SignUp" element={<SignUpForm />} />
                        <Route path="SignIn" element={<SignInForm />} />
                    </Routes>
                </div>
                <div className="col l1"></div>

            </div>



        </div>

    )
}

export default Login