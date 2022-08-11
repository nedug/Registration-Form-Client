import React, { useState } from 'react';
import InputPas from '../../utils/input/InputPas';
import { registration } from '../../actions/user';
import { useDispatch } from 'react-redux';
import Input from '../../utils/input/Input';


const Registration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const onClickButton = () => dispatch(registration(email, password, setEmail, setPassword));


    return (
        <div className='flex justify-center'>

            <div
                className='flex flex-col items-center bg-gray-200 shadow-xl hover:bg-gray-200 transition-all my-10 w-[650px] justify-between rounded-lg px-14 py-5'>
                <h2 className='font-bold text-3xl'>Sign Up!</h2>

                <Input value={email} setValue={setEmail} type='text' placeholder='Email...' />
                <InputPas value={password} setValue={setPassword} type='password' placeholder='Password...' />
                <button className='py-2 w-[150px] rounded-lg bg-blue-300 m-4 hover:shadow-md hover:bg-blue-400'
                        onClick={onClickButton}>Sign Up
                </button>
            </div>
        </div>
    );
};

export default Registration;
