/* eslint-disable indent */
import React, { useState } from 'react'
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
    const { loginUser } = bindActionCreators(actionCreators, dispatch)

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')




    const handleLogin = async (event: React.SyntheticEvent) => {
        event.preventDefault()
        const login_info: LoginInfo = { username: email, password: password }
        // eslint-disable-next-line no-debugger
        try {
            await loginUser(login_info)
            navigate('/')

        } catch (error) {
            console.log(error)
            M.toast({ html: 'Sign in was not successfull. Double check the username and password' })
        }


    }


    return (


        <>
            <body >
                <div className="section"></div>
                <main>
                    <h1 className="header">Route Optimization Services</h1>
                    {/* <img className="responsive-img" style={{width: 250}} src="https://i.imgur.com/ax0NCsK.gif" /> */}
                    <div className="section"></div>

                    <h5 className="grey-text lighten-4">Please, login into your account</h5>
                    <div className="section"></div>

                    <div className="container">
                        <div className="z-depth-1 grey lighten-4 row" style={{ display: 'inline-block', padding: '32 48 0 48', border: '1 solid #EEE' }}>

                            <div className="col l10 offset-l1">
                                <form className="col s12" method="post" onSubmit={(event) => handleLogin(event)}>
                                    <div className='row'>
                                        <div className='col s12'>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='input-field col s12'>
                                            <input className='validate' type='text' name='user-name' id='user-name' onChange={({target})=>setEmail(target.value)} />
                                            <label htmlFor='email'>Enter your email</label>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='input-field col s12'>
                                            <input className='validate' type='password' name='password' id='password' onChange={({target})=>setPassword(target.value)} />
                                            <label htmlFor='password'>Enter your password</label>
                                        </div>
                                        <label>
                                            <a className='pink-text' href='#!'><b>Forgot Password?</b></a>
                                        </label>
                                    </div>

                                    <br />
                                    <div className='row'>
                                        <button type='submit' name='btn_login' className='col s12 btn btn-large waves-effect indigo'>Login</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <a href="#!" className="black-text">Create account</a>

                </main>

            </body>
        </>

    )
}

export default SignInForm



        // <div className="sign-up-wrap"><img src={logo} alt="" />
        //     <div className="w-form">
        //         <div className="placeholder-text-style-embed-code w-embed">
        //         </div>
        //         <form id="email-form" name="email-form" data-name="Email Form" className="form" autoComplete="off" onSubmit={(event) => handleLogin(event)}><input type="text" className="text_field" maxLength={256} name="email" data-name="Email"
        //             placeholder="Email Address" id="email" autoCapitalize="off" value={email} onChange={({target})=>setEmail(target.value)}/><input type="password" className="text_field"
        //             maxLength={256} name="Password" data-name="Password" placeholder="Password" id="Password" value={password}  onChange={({target})=>setPassword(target.value)}/><input
        //             type="submit" value="Sign In" data-wait="Please wait..." className="btn grey darken-1"/></form>
        //         <div className="w-form-done">
        //             <div>Thank you! Your submission has been received!</div>
        //         </div>
        //         <div className="w-form-fail">
        //             <div>Oops! Something went wrong while submitting the form.</div>
        //         </div>
        //     </div>
        //     <div className="sign-up">
        //         <p className="paragraph">Dont have an account? <Link to="/SignUp"
        //             className="link">Sign Up</Link>.<br/></p>
        //         <input className="input-field" />
        //     </div>
        // </div>