import React, { useEffect } from 'react';
import Navbar from './navbar/Navbar';
import Registration from './authorization/Registration';
import Login from './authorization/Login';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../actions/user';
import Profile from './profile/Profile';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import loaderGIF from '../assets/img/loading.gif';
import RestorePassword from './authorization/RestorePassword';
import RestoreForm from './authorization/RestoreForm';
import style from './App.module.css';


const App = () => {
    const isAuth = useSelector(state => state.user.isAuth); /* Узнаем авторизован ли пользователь */
    const isError = useSelector(state => state.user.error);
    const success = useSelector(state => state.user.success);
    const loader = useSelector(state => state.app.loader);
    const preloader = useSelector(state => state.app.preloader);

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
        // <BrowserRouter>
        <HashRouter>
            <div>

                <Navbar />

                {preloader ?
                    <div className={style.container}>
                        <div className={style.progressBar}>
                        </div>
                    </div>
                    :
                    <div className='h-[5px]'></div>
                }

                <div>
                    {!isAuth ?
                        <Switch>
                            <Route path='/registration' component={Registration} />
                            <Route path='/login' component={Login} />
                            <Route path='/restore' component={RestorePassword} />
                            <Route path='/restoreForm' component={RestoreForm} />
                            <Redirect to='/login' />
                        </Switch>
                        :
                        <Switch>
                            <Route exact path='/profile' component={Profile} />
                            <Redirect to='/profile' />
                        </Switch>
                    }
                </div>

                {!isAuth &&
                    <div className='flex flex-col items-center bg-pink-100 py-3'>
                        <h3 className='font-bold text-xl w-[520px] text-center'>Форма регистрации пользователей с
                            помощью: React, Node.js, Express, MongoDB, JWT Token.</h3>
                        <div className='pt-2 pb-1'>1. Зарегистируйтесь используя вымышленный или настоящий Email.</div>
                        <div className='py-1'>2. При необходимости активируйте аккаунт через свою почту.</div>
                        <div className='py-1'>3. Зайдите в профиль с помощью указанных данных.</div>
                    </div>}

                {isError && <div
                    className='fixed px-7 bg-red-500 bottom-10 text-white left-2/4 -translate-x-2/4 mx-auto rounded p-3 text-center shadow-2xl'>
                    Error: {isError}
                </div>}
                {success && <div
                    className='fixed px-7 bg-green-500 bottom-10 text-white left-2/4 -translate-x-2/4 mx-auto rounded p-3 text-center shadow-2xl'>
                    Success: {success}
                </div>}
            </div>
        </HashRouter>
        // <BrowserRouter>
    );
};

export default App;
