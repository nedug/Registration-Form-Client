import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { restorePassword } from '../../actions/user';
import Input from '../../utils/input/Input';
import { useHistory } from 'react-router-dom';


const RestorePassword = () => {
    const history = useHistory();

    const [email, setEmail] = useState('ru5nedug@mail.ru');
    const dispatch = useDispatch();

    const restorePasswordHandler = () => {
        dispatch(restorePassword(email, history));
    };


    return (
        <div className='flex justify-center'>

            <div
                className='flex flex-col items-center bg-gray-200 shadow-xl hover:bg-gray-200 transition-all my-10 w-[650px] justify-between rounded-lg px-14 py-5'>
                <h2 className='font-bold text-3xl'>Restore Password!</h2>
                <h3 className='my-4'>Only for real users.</h3>

                <Input value={email} setValue={setEmail} type='text' placeholder='Email...' />

                <button className='py-2 w-[150px] rounded-lg bg-blue-300 m-4 hover:shadow-md hover:bg-blue-400'
                        onClick={() => dispatch(restorePasswordHandler)}>Restore Password
                </button>
            </div>

        </div>
    );
};

export default RestorePassword;
