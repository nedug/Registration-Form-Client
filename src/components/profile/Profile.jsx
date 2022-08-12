import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword, createNotes, findAllUsers, removeAllUsers, removeUser } from '../../actions/user';
import InputPas from '../../utils/input/InputPas';


const Profile = () => {
    const currentUser = useSelector(state => state.user.currentUser);
    const allUsers = useSelector(state => state.user.allUsers);
    const dispatch = useDispatch();

    const [newPassword, setPassword] = useState('');
    const [notes, setNotes] = useState('');
    const [isSureOne, setIsSure] = useState(false);
    const [isSureAll, setIsSureAll] = useState(false);

    const removeHandler = () => dispatch(removeUser());

    const changePassHandler = () => {
        dispatch(changePassword(currentUser.email, newPassword, setPassword));
    };

    const createNoteHandler = () => {
        dispatch(createNotes(notes, setNotes));
    };

    const findAllUsersHandler = () => {
        dispatch(findAllUsers());
    };

    const removeAllUsersHandler = () => {
        dispatch(removeAllUsers());
    };


    return (
        <div className='flex justify-center'>

            <div
                className='flex flex-col items-center bg-gray-200 shadow-xl transition-all my-8 w-[550px] justify-between rounded-lg px-5'>

                <h2 className='font-bold text-3xl my-5'>{currentUser.email}</h2>

                <h4 className='font-bold text-xl mb-1'>
                    Time of create: {new Date(currentUser.dateAuth).toLocaleString()}
                </h4>
                <h4 className='font-bold text-xl my-1'>
                    Time of login: {new Date(currentUser.dateLogin).toLocaleString()}
                </h4>

                <div className='border border-b-gray-400 w-[100%] my-2' />

                {currentUser.notes.length > 0 &&
                    <div className='flex flex-col items-center mb-0 mt-0 w-[100%]'>
                        <h4 className='font-bold text-xl my-1'>Notes:</h4>
                        <div
                            className='flex flex-row items-center mb-0 mt-1 w-[100%] flex-wrap bg-emerald-50 rounded-lg p-2'>
                            {currentUser.notes.map((num, i) => {
                                return <div className='mx-1' key={i}>{num},</div>;
                            })}
                        </div>
                    </div>}

                <div className='flex flex-row items-center mb-1 mt-3 w-[100%]'>
                    <textarea
                        className='w-[500px] h-[65px] py-2 px-3 resize-none outline-none rounded-lg hover:shadow bg-gray-100'
                        value={notes}
                        onChange={e => setNotes(e.target.value)}
                        placeholder='Type new notes...' />
                    <button
                        className='py-3 w-[250px] rounded-lg bg-lime-300 my-4 ml-5 hover:shadow-md hover:bg-lime-400'
                        onClick={createNoteHandler}>Create Note
                    </button>
                </div>

                <div className='border border-b-gray-400 w-[100%] my-2' />


                <div className='flex flex-row items-center mb-3 mt-0 w-[100%]'>
                    <InputPas
                        value={newPassword}
                        setValue={setPassword}
                        type='password'
                        placeholder='New Password...' />
                    <button
                        className='py-3 w-[250px] rounded-lg bg-yellow-300 my-4 ml-5 hover:shadow-md hover:bg-yellow-400'
                        onClick={changePassHandler}>Change Password
                    </button>
                </div>

                <div className='flex flex-col relative items-center w-[100%]'>
                    <button className='py-2 w-[60%] rounded-lg bg-pink-300 mb-3 hover:shadow-md hover:bg-pink-400'
                            onClick={() => setIsSure(true)}>Remove current User!
                    </button>

                    {isSureOne &&
                        <div className='flex flex-col absolute shadow-xl -top-6 -right-40 rounded-lg bg-gray-300 p-2'>
                            <div className='absolute shadow-xl -left-3 top-8 '
                                 style={{
                                     width: 0,
                                     height: 0,
                                     borderTop: '12px solid transparent',
                                     borderRight: '15px solid rgb(209 213 219)',
                                     borderBottom: '12px solid transparent',
                                 }} />
                            <h4 className='font-bold mb-1'>Are you sure?</h4>
                            <div className='flex flex-row justify-between'>
                                <button
                                    className='py-1 px-2 rounded-lg bg-gray-200 m-1 hover:shadow-md hover:bg-green-200'
                                    onClick={removeHandler}>Yes
                                </button>
                                <button
                                    className='py-1 px-2 rounded-lg bg-gray-200 m-1 hover:shadow-md hover:bg-red-200'
                                    onClick={() => setIsSure(false)}>No
                                </button>
                            </div>
                        </div>}
                </div>

                <div className='border border-b-gray-400 w-[100%] my-2' />

                <div className='flex flex-col items-center mb-4 mt-1 w-[100%]'>
                    <button
                        className='py-2 w-[100%] rounded-lg bg-cyan-200 my-2 hover:shadow-md hover:bg-cyan-300 transition-all'
                        onClick={findAllUsersHandler}>Find all Users
                    </button>

                    {allUsers.length > 0 &&
                        <div className='flex flex-col items-center mb-3 mt-0 w-[100%]'>
                            <h4 className='font-bold text-xl my-1'>All Users:</h4>
                            <div
                                className='flex flex-row items-center mb-0 mt-1 w-[100%] flex-wrap bg-emerald-50 rounded-lg p-2'>
                                {allUsers.map(user => {
                                    return <div className='mx-1' key={user._id}>{user.email},</div>;
                                })}
                            </div>
                        </div>}

                    <div className='flex flex-col relative items-center w-[100%]'>
                        <button
                            className='py-2 w-[100%] rounded-lg bg-gray-300 my-2 hover:shadow-md hover:bg-gray-400 transition-all'
                            onClick={() => setIsSureAll(true)}>Remove all Users!
                        </button>
                        {isSureAll &&
                            <div className='flex flex-col absolute shadow-xl -top-4 -right-40 rounded-lg bg-gray-300 p-2'>
                                <div className='absolute shadow-xl -left-3 top-8 '
                                     style={{
                                         width: 0,
                                         height: 0,
                                         borderTop: '12px solid transparent',
                                         borderRight: '15px solid rgb(209 213 219)',
                                         borderBottom: '12px solid transparent',
                                     }} />
                                <h4 className='font-bold mb-1'>Are you sure?</h4>
                                <div className='flex flex-row justify-between'>
                                    <button
                                        className='py-1 px-2 rounded-lg bg-gray-200 m-1 hover:shadow-md hover:bg-green-200'
                                        onClick={removeAllUsersHandler}>Yes
                                    </button>
                                    <button
                                        className='py-1 px-2 rounded-lg bg-gray-200 m-1 hover:shadow-md hover:bg-red-200'
                                        onClick={() => setIsSureAll(false)}>No
                                    </button>
                                </div>
                            </div>}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Profile;
