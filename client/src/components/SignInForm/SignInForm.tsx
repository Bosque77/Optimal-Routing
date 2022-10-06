/* eslint-disable indent */
import React, { useState } from 'react'
import './SignInForm.css'
import front_page_logo from '../../static/images/front_page_logo.png'
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
                    <h1 className="header black-text">Route Optimization Services</h1>
                    {/* <img className="responsive-img" style={{width: 250}} src="https://i.imgur.com/ax0NCsK.gif" /> */}
                    <div >
                        <img src={front_page_logo} className="image-logo" />
                    </div>

                    <h5 className="grey-text lighten-4 under-logo-text">Please, login into your account</h5>
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


