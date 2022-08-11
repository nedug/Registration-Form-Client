import React, { useEffect } from 'react';
import Navbar from './navbar/Navbar';
import Registration from './authorization/Registration';
import Login from './authorization/Login';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../actions/user';
import Profile from './profile/Profile';
import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom';
import loaderGIF from '../assets/img/loading.gif';


const App = () => {
    const isAuth = useSelector(state => state.user.isAuth); /* Узнаем авторизован ли пользователь */
    const isError = useSelector(state => state.user.error);
    const success = useSelector(state => state.user.success);
    const loader = useSelector(state => state.app.loader);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(auth());
    }, [dispatch]);

    if (loader) {
        return <>
            <img className='fixed top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4' src={loaderGIF} alt='loader'
                 width='300px' height='300px' />
        </>;
    }


    return (
        <BrowserRouter>
            <div className='app'>

                <Navbar />

                <div className='wrap'>
                    {!isAuth ?
                        <Switch>
                            <Route path='/registration' component={Registration} />
                            <Route path='/login' component={Login} />
                            <Redirect to='/login' />
                        </Switch>
                        :
                        <Switch>
                            <Route exact path='/profile' component={Profile} />
                            <Redirect to='/profile' />
                        </Switch>
                    }
                </div>

                {isError && <div
                    className='fixed px-7 bg-red-500 bottom-10 text-white left-2/4 -translate-x-2/4 mx-auto rounded p-3 text-center shadow-2xl'>
                    Error: {isError}
                </div>}
                {success && <div
                    className='fixed px-7 bg-green-500 bottom-10 text-white left-2/4 -translate-x-2/4 mx-auto rounded p-3 text-center shadow-2xl'>
                    Success: {success}
                </div>}
            </div>
        </BrowserRouter>
    );
};

export default App;
