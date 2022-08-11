import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword, createNotes, removeUser } from '../../actions/user';
import Input from '../../utils/input/Input';


const Profile = () => {
    const currentUser = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch();

    const [newPassword, setPassword] = useState('');
    const [notes, setNotes] = useState('');

    const removeHandler = () => dispatch(removeUser());

    const changePassHandler = () => {
        dispatch(changePassword(currentUser.email, newPassword, setPassword));
    };

    const createNoteHandler = () => {
        dispatch(createNotes(notes, setNotes));
    };


    return (
        <div className='flex justify-center'>

            <div
                className='flex flex-col items-center bg-gray-200 shadow-xl hover:bg-gray-200 transition-all my-10 w-[550px] justify-between rounded-lg p-5'>

                <h2 className='font-bold text-3xl my-6'>{currentUser.email}</h2>
                <h4 className='font-bold text-xl my-3'>
                    Time of create: {new Date(currentUser.date).toLocaleString()}
                </h4>
                <h4 className='font-bold text-xl my-3'>
                    Time of login: {new Date(currentUser.dateLogin).toLocaleString()}
                </h4>


                <div className='flex flex-row items-center mb-6 mt-8 w-[100%]'>
                    <textarea
                        className='w-[500px] h-[70px] py-2 px-3 resize-none outline-none rounded-lg hover:shadow bg-gray-100'
                        value={notes}
                        onChange={e => setNotes(e.target.value)}
                        placeholder='Type new notes...' />
                    <button
                        className='py-3 w-[250px] rounded-lg bg-lime-300 my-4 ml-5 hover:shadow-md hover:bg-lime-400'
                        onClick={createNoteHandler}>Create notes
                    </button>
                </div>


                <div className='flex flex-row items-center mb-6 mt-8 w-[100%]'>
                    <Input
                        value={newPassword}
                        setValue={setPassword}
                        type='password'
                        placeholder='New Password...' />
                    <button
                        className='py-3 w-[250px] rounded-lg bg-yellow-400 my-4 ml-5 hover:shadow-md hover:bg-yellow-500'
                        onClick={changePassHandler}>Change Password
                    </button>
                </div>

                <button className='py-2 w-[100%] rounded-lg bg-red-300 mb-4 hover:shadow-md hover:bg-red-400'
                        onClick={removeHandler}>Remove User
                </button>

            </div>
        </div>
    );
};

export default Profile;
