import React, { useEffect } from 'react';
import Navbar from './navbar/Navbar';
import './app.css';
import Registration from './authorization/Registration';
import Login from './authorization/Login';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../actions/user';
import Profile from './profile/Profile';
import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom';


const App = () => {
    const isAuth = useSelector(state => state.user.isAuth); /* Узнаем авторизован ли пользователь */
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(auth());
    }, [dispatch]);


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
                            <Redirect to='/' />
                        </Switch>
                    }

                </div>
            </div>
        </BrowserRouter>
    );
};

export default App;
