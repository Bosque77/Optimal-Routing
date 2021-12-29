import React, {useState} from 'react'
import './SignInForm.css'
import logo from './images/logo.svg'
import {
    Link, useNavigate
} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../state'
import { LoginInfo } from '../../types'



const SignInForm = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loginUser} = bindActionCreators(actionCreators, dispatch)

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')




    const handleLogin = async (event: React.SyntheticEvent) => {
        event.preventDefault()
        const login_info: LoginInfo = {username: email, password: password}
        // eslint-disable-next-line no-debugger
        try{
            const response = await loginUser(login_info)
            navigate('/')
            console.log('logging the login response')
            console.log(response)
        } catch(error){
            console.log(error)
            M.toast({ html: 'Sign in was not successfull. Double check the username and password' })
        }
        
        // console.log('after user login')
        // console.log(response)
    }


    return (
        <div className="sign-up-wrap"><img src={logo} alt="" />
            <div className="w-form">
                <div className="placeholder-text-style-embed-code w-embed">
                </div>
                <form id="email-form" name="email-form" data-name="Email Form" className="form" autoComplete="off" onSubmit={handleLogin}><input type="text" className="text_field" maxLength={256} name="email" data-name="Email"
                    placeholder="Email Address" id="email" autoCapitalize="off" value={email} onChange={({target})=>setEmail(target.value)}/><input type="password" className="text_field"
                    maxLength={256} name="Password" data-name="Password" placeholder="Password" id="Password" value={password}  onChange={({target})=>setPassword(target.value)}/><input
                    type="submit" value="Sign In" data-wait="Please wait..." className="btn grey darken-1"/></form>
                <div className="w-form-done">
                    <div>Thank you! Your submission has been received!</div>
                </div>
                <div className="w-form-fail">
                    <div>Oops! Something went wrong while submitting the form.</div>
                </div>
            </div>
            <div className="sign-up">
                <p className="paragraph">Dont have an account? <Link to="/SignUp"
                    className="link">Sign Up</Link>.<br/></p>
                <input className="input-field" />
            </div>
        </div>
    )
}

export default SignInForm