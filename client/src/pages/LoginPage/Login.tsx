import React from 'react'
import './Login.css'
import SignUpForm from '../../components/SignUpForm/SignUpForm'
import SignInForm from '../../components/SignInForm/SignInForm'
import background_image from './images/login_background.png'


import {
    Route, Routes
} from 'react-router-dom'

const Login = () => {
    return (
        <div className="body grid grid-cols-2 bg-slate-50 h-screen">
            <div className="col-span-1">
                <img src={background_image} id='background-image'  />
            </div>
            <div className="col-span-1">
                <div className='flex h-full justify-center items-center'>
                    <Routes>
                        <Route path="/" element={<SignInForm />} />
                        <Route path="/SignUp" element={<SignUpForm />} />
                        <Route path="SignIn" element={<SignInForm />} />
                    </Routes>
                </div>
 

            </div>
        </div>
    )
}

export default Login