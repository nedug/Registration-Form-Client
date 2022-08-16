import React, { useState } from 'react';
import InputPas from '../../utils/input/InputPas';
import { registration } from '../../actions/user';
import { useDispatch } from 'react-redux';
import Input from '../../utils/input/Input';
import style from './Login.module.css';


const Registration = () => {
    const [email, setEmail] = useState('test1@gmail.com');
    // const [email, setEmail] = useState('ru5nedug@mail.ru');
    const [password, setPassword] = useState('123');
    const [checkbox, setCheckbox] = useState(false);
    const dispatch = useDispatch();

    const onClickButton = () => dispatch(registration(email, password, setEmail, setPassword, checkbox));


    return (
        <div className='flex justify-center'>

            <div
                className='flex flex-col items-center bg-gray-200 shadow-xl hover:bg-gray-200 transition-all my-10 w-[650px] justify-between rounded-lg px-14 py-5'>
                <h2 className='font-bold text-3xl mb-2'>Sign Up!</h2>

                <Input value={email} setValue={setEmail} type='text' placeholder='Email...' />
                <InputPas value={password} setValue={setPassword} type='password' placeholder='Password...' />

                <div className={style.checkbox}>
                    <input
                        className={style.customCheckbox}
                        type='checkbox'
                        id='color'
                        name='color'
                        checked={checkbox}
                        onChange={() => setCheckbox(!checkbox)}
                    />
                    <label htmlFor='color'>Use real email with link confirmation</label>
                </div>

                <button className='py-2 w-[150px] rounded-lg bg-blue-300 mx-4 mt-4 mb-2 hover:shadow-md hover:bg-blue-400'
                        onClick={onClickButton}>Sign Up
                </button>
            </div>
        </div>
    );
};

export default Registration;
