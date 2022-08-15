import React, { useState } from 'react';
import InputPas from '../../utils/input/InputPas';
import { useDispatch } from 'react-redux';
import { savePassword } from '../../actions/user';
import Input from '../../utils/input/Input';
import { useHistory } from 'react-router-dom';


const RestoreForm = () => {
    const history = useHistory();

    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const savePasswordHandler = () => {
        dispatch(savePassword(code, password, history));
    };

    return (
        <div className='flex justify-center'>

            <div
                className='flex flex-col items-center bg-gray-200 shadow-xl hover:bg-gray-200 transition-all my-10 w-[650px] justify-between rounded-lg px-14 py-5'>
                <h2 className='font-bold text-3xl'>Restore Password!</h2>

                <h3 className='my-4'>Only for real users.</h3>
                <h3 className='my-4 font-bold text-green-500'>Confirmation code sent to your email.</h3>

                <Input value={code} setValue={setCode} type='text' placeholder='Confirmation code...' />

                <InputPas value={password} setValue={setPassword} placeholder='New Password...' />

                <button className='py-2 w-[150px] rounded-lg bg-blue-300 m-4 hover:shadow-md hover:bg-blue-400'
                        onClick={savePasswordHandler}
                >Save Password
                </button>
            </div>

        </div>
    );
};

export default RestoreForm;
