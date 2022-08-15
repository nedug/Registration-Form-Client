import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../reducers/userReducer';


const Navbar = () => {
    const isAuth = useSelector(state => state.user.isAuth);
    const dispatch = useDispatch();


    return (
        <nav className='flex justify-between items-center h-[75px] px-5 shadow-md bg-gray-400 text-white'>

            <h3 className='font-bold text-3xl text-white ml-3'>JWT Token</h3>

            <div className='flex flex-row'>
                {!isAuth &&
                    <NavLink to='/registration'>
                        <button className='px-4 py-2 rounded-lg bg-pink-400 m-3 hover:shadow-md hover:bg-pink-500'>
                            Sign Up
                        </button>
                    </NavLink>}

                {!isAuth &&
                    <NavLink to='/login'>
                        <button
                            className='px-4 py-2 rounded-lg bg-emerald-400 m-3 hover:shadow-md hover:bg-emerald-500'>
                            Log In
                        </button>
                    </NavLink>}


                {isAuth && <button className='px-4 py-2 rounded-lg bg-gray-800 m-3 hover:shadow-md hover:bg-gray-900'
                                   onClick={() => dispatch(logout())}>Log Out</button>}
            </div>
        </nav>
    );
};

export default Navbar;