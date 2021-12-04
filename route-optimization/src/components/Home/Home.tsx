import React from 'react'
import './Home.css'
import SignUpForm from '../SignUpForm/SignUpForm'
import SignInForm from '../SignInForm/SignInForm'
import {
    Route, Routes
} from 'react-router-dom'

const Home = () => {
    return (
        <div className="body">
            <Routes>
                <Route path="/" element={<SignUpForm />} />
                <Route path="/SignUp" element={<SignUpForm />} />
                <Route path="SignIn" element={<SignInForm />} />
            </Routes>
            {/* <SignInForm /> */}
        </div>
    )
}

export default Home