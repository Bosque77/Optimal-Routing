import React from 'react'
import './Login.css'
import SignUpForm from '../SignUpForm/SignUpForm'
import SignInForm from '../SignInForm/SignInForm'

import {
    Route, Routes
} from 'react-router-dom'

const Login = () => {
    return (
        <div className="body">
            <Routes>
                <Route path="/" element={<SignInForm />} />
                <Route path="/SignUp" element={<SignUpForm />} />
                <Route path="SignIn" element={<SignInForm />} />
            </Routes>
            {/* <SignInForm /> */}
        </div>
    )
}

export default Login