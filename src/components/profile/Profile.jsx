import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registration, removeUser } from '../../actions/user';


const Profile = () => {
    const currentUser = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch();

    const onClickButton = () => dispatch(removeUser());


    return (
        <div className='flex justify-center'>

            <div className='flex flex-col items-center bg-gray-200 shadow-xl hover:bg-gray-200 transition-all my-10 w-[550px] justify-between rounded-lg p-5'>

                <h2 className='font-bold text-3xl my-6'>{currentUser.email}</h2>
                <h4 className='font-bold text-xl my-4'>Time of create: {new Date(currentUser.date).toLocaleString()}</h4>
                <h4 className='font-bold text-xl my-4'>Time of login: {new Date(currentUser.dateLogin).toLocaleString()}</h4>
                <button className='py-2 w-[150px] rounded-lg bg-neutral-400 my-7 hover:shadow-md hover:bg-neutral-500'
                        onClick={onClickButton}>Remove User
                </button>

            </div>
        </div>
    );
};

export default Profile;
