import React, { useState } from 'react';
import InputPas from '../../utils/input/InputPas';
import { useDispatch } from 'react-redux';
import { login } from '../../actions/user';
import style from './Login.module.css';
import Input from '../../utils/input/Input';
import { NavLink } from 'react-router-dom';


const Login = () => {
    const [email, setEmail] = useState('ru5nedug@mail.ru');
    const [password, setPassword] = useState('123');
    const [checkbox, setCheckbox] = useState(false);
    const dispatch = useDispatch();


    return (
        <div className='flex justify-center'>

            <div
                className='flex flex-col items-center bg-gray-200 shadow-xl hover:bg-gray-200 transition-all my-10 w-[650px] justify-between rounded-lg px-14 py-5'>
                <h2 className='font-bold text-3xl'>Log In!</h2>

                <Input value={email} setValue={setEmail} type='text' placeholder='Email...' />
                <InputPas value={password} setValue={setPassword} placeholder='Password...' />

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

                <button className='py-2 w-[150px] rounded-lg bg-blue-300 m-4 hover:shadow-md hover:bg-blue-400'
                        onClick={() => dispatch(login(email, password, checkbox))}>Log In
                </button>

                <NavLink to='/restore'>
                    <button className='py-2 w-[200px] rounded-lg bg-lime-300 m-4 hover:shadow-md hover:bg-lime-300'>
                        I forgot password...
                    </button>
                </NavLink>
            </div>
        </div>
    );
};

export default Login;
