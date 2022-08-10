import React from 'react';
import { useSelector } from 'react-redux';


const Profile = () => {
    const currentUser = useSelector(state => state.user.currentUser);

    console.log(currentUser);


    return (
        <div className='flex justify-center'>

            <div className='flex flex-col items-center bg-gray-200 shadow-xl hover:bg-gray-200 transition-all my-10 h-[300px] w-[650px] justify-between rounded-lg p-5'>

                <h2 className='font-bold text-3xl'>{currentUser.email}</h2>
                <h4 className='font-bold text-xl'>Time of create: {new Date(currentUser.date).toLocaleString()}</h4>
                <h4 className='font-bold text-xl'>Time of login: {new Date(currentUser.dateLogin).toLocaleString()}</h4>

            </div>
        </div>
    );
};

export default Profile;
