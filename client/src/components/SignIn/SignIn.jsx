import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { AuthContext } from '../../context/AuthContext';

import './SignIn.css'

export default function SignIn() {
    const navigate = useNavigate();

    const [errInf, errInfSet] = useState('');

    const [form, setForm] = useState({
        login: '',
        pass: ''
    });

    const resetError = () => {
        errInfSet('');
    }

    const { login } = useContext(AuthContext);

    const changeHandle = (event) => {
        resetError();
        setForm({ ...form, [event.target.name]: event.target.value});
    }

    const loginHandle = async () => {
        try {
            await axios.post('http://localhost:5000/auth/login', {...form}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                login(response.data.token, response.data.user.id);
                navigate('/createL');
            });
        } catch(err) {
            errInfSet(err.response.data.msg);
            console.error(err);
        }

        return false;
    }

  return (
    <React.Fragment>
        <div className="container-auth">
            <main className="form-signin w-100 m-auto">
                <form onSubmit={e => e.preventDefault()}>
                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                    <div className="mb-3 form-floating err-inp" style={{display: errInf ? 'block' : 'none'}}>
                        {errInf}
                    </div>

                    <div className="mb-3 form-floating">
                        <input 
                                type="login" 
                                className="form-control" 
                                id="floatingInput" 
                                placeholder="user login"
                                name="login"
                                onChange={changeHandle}
                            ></input>
                        <label htmlFor="floatingInput">Login</label>
                    </div>
                    <div className="mb-3 form-floating">
                        <input 
                            type="password" 
                            className="form-control" 
                            id="floatingPassword" 
                            placeholder="password"
                            name="pass"
                            onChange={changeHandle}
                        ></input>
                        <label htmlFor="floatingPassword">Password</label>
                    </div>

                    <button 
                        className="w-100 btn btn-lg btn-primary" 
                        type="submit"
                        onClick={loginHandle}    
                    >Sign in</button>
                </form>
            </main>
        </div>
    </React.Fragment>
  )
}
