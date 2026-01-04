import React, { useEffect, useState } from 'react'
import './login.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


function Login() {

    const [alreadyAccount, setAlreadyAccount] = useState(true);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [repassword, setRePassword] = useState('');
    const navigate = useNavigate();
    const [check, setCheck] = useState(false);

    const signupData = {
        name,
        email,
        password
    }
    const loginData = {

        email,
        password
    }

    function clearFields() {
        setName('');
        setEmail('');
        setPassword('');
        setRePassword('');
    }


    async function submit(type) {


        try {
            if (type === 'signup') {
                if (!check) {
                    const res = await axios.post('http://localhost:4000/api/auth/signup', signupData)

                    const data = res.data;
                    if (!data.success) {
                        toast.error(data.message, {
                            className: "my-toast"
                        })
                    } else {
                        localStorage.setItem('token', data.token)
                        if (!check) {
                            navigate('/events', { state: { login: true } })
                        }

                    }

                }else{
                    toast.error('Your Password is wrong', {
                        className: "my-toast"
                    })
                }
                }

                if (type === 'login') {
                    const res = await axios.post('http://localhost:4000/api/auth/login', loginData)
                    const data = res.data;

                    if (!data.success) {
                        toast.error(data.message, {
                            className: "my-toast"
                        })
                    } else {

                        localStorage.setItem('token', data.token)
                        navigate('/events', { state: { login: true} })

                    }
                }


            } catch (error) {
                console.log(error)
            }

        }

    useEffect(() => {
            if (password !== repassword) {
                setCheck(true)
            } else {
                setCheck(false)
            }
        }, [repassword])
        return (
            <div className='container'>
                <div className='left'>
                    <img src="../../public/images/4140048.png" alt="" /><br />
                    <p>👤 Create your account</p>

                    <p>✨ Join us in seconds</p>

                </div>
                {
                    alreadyAccount ? (
                        <div id='right' className='right'>
                            <div className='welcome'>

                                <h3>Welcome back</h3>
                            </div>


                            <h2>Signup your account</h2>

                            <form onSubmit={submit} >
                                <input value={name} name='name' onChange={(e) => setName(e.target.value)} style={{ position: 'relative', bottom: '25px' }} type="text" placeholder='Enter the name' required />
                                <input value={email} name='email' onChange={(e) => setEmail(e.target.value)} style={{ position: 'relative', bottom: '30px' }} type="email" placeholder='Enter the email' required />

                                <input value={password} name='password' onChange={(e) => setPassword(e.target.value)} style={{ position: 'relative', bottom: '30px' }} type="password" placeholder='Enter the password' required />
                                <input value={repassword} name='repassword' onChange={(e) => { setRePassword(e.target.value) }} style={{ position: 'relative', bottom: '30px' }} type="password" placeholder='Enter the Repassword' required />
                                <p style={check ? { display: 'block' } : { display: 'none' }} className='check'>• Your Password is wrong</p>

                                <button className='signup-button' onClick={(e) => {
                                    e.preventDefault(), submit('signup')
                                }} style={{ position: 'relative', bottom: '135px' }}  >SignUp</button>
                            </form>
                            <p style={{ position: 'relative', bottom: '125px' }} onClick={() => { clearFields(), setAlreadyAccount(false) }} className='create'>Already an  Account</p>
                        </div>
                    ) : (
                        <div id='left' className='right'>
                            <div className='welcome'>

                                <h3>Welcome back</h3>
                            </div>


                            <h2>Login your account</h2>

                            <form onSubmit={submit}>
                                <input value={email} name='email' onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Enter the email' required />

                                <input value={password} name='password' onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Enter the password' required />

                                <button className='login-button' onClick={(e) => { submit('login'), e.preventDefault() }}>Login</button>
                            </form>
                            <p onClick={() => { setAlreadyAccount(true), clearFields() }} className='create'>Create Account</p>
                            <p className='forgot'>Forgot Password</p>
                        </div>
                    )
                }


            </div>


        )
    }

    export default Login
