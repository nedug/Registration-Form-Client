import React, { useState } from 'react';
import Input from '../../utils/input/Input';
import { useDispatch } from 'react-redux';
import { login } from '../../actions/user';
import style from './Login.module.css';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkbox, setCheckbox] = useState(false);
    const dispatch = useDispatch();


    return (
        <div className='flex justify-center'>

            <div
                className='flex flex-col items-center bg-gray-200 shadow-xl hover:bg-gray-200 transition-all my-10 w-[650px] justify-between rounded-lg p-5'>
                <h2 className='font-bold text-3xl'>Log In!</h2>

                <Input value={email} setValue={setEmail} type='text' placeholder='Email...' />
                <Input value={password} setValue={setPassword} type='password' placeholder='Password...' />

                <div className={style.checkbox}>
                    <input
                        className={style.customCheckbox}
                        type='checkbox'
                        id='color'
                        name='color'
                        checked={checkbox}
                        onChange={() => setCheckbox(!checkbox)}
                    />
                    <label htmlFor='color'>Remember Me</label>
                </div>


                <button className='py-2 w-[150px] rounded-lg bg-blue-300 mb-4 mt-6 hover:shadow-md hover:bg-blue-400'
                        onClick={() => dispatch(login(email, password, checkbox))}>Log In
                </button>
            </div>
        </div>
    );
};

export default Login;
