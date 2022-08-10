import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword, removeUser } from '../../actions/user';
import Input from '../../utils/input/Input';


const Profile = () => {
    const currentUser = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch();

    const [newPassword, setPassword] = useState('');

    const removeHandler = () => dispatch(removeUser());

    const changePassHandler = () => {
        dispatch(changePassword(currentUser.email, newPassword));
    };


    return (
        <div className='flex justify-center'>

            <div className='flex flex-col items-center bg-gray-200 shadow-xl hover:bg-gray-200 transition-all my-10 w-[550px] justify-between rounded-lg p-5'>

                <h2 className='font-bold text-3xl my-6'>{currentUser.email}</h2>
                <h4 className='font-bold text-xl my-3'>Time of create: {new Date(currentUser.date).toLocaleString()}</h4>
                <h4 className='font-bold text-xl my-3'>Time of login: {new Date(currentUser.dateLogin).toLocaleString()}</h4>

                <button className='py-2 w-[150px] rounded-lg bg-yellow-400 mt-9 mb-5 hover:shadow-md hover:bg-yellow-500'
                        onClick={changePassHandler}>Change Password
                </button>
                <Input value={newPassword} setValue={setPassword} type='password' placeholder='New Password...' />

                <button className='py-2 w-[150px] rounded-lg bg-neutral-400 mt-11 mb-4 hover:shadow-md hover:bg-neutral-500'
                        onClick={removeHandler}>Remove User
                </button>

            </div>
        </div>
    );
};

export default Profile;
