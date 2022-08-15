import axios from 'axios';
import { error, getAllUsers, logout, setUser, success } from '../reducers/userReducer';
import { API_URL } from '../config';
import { hideLoader, showLoader } from '../reducers/appReducer';

export const registration = (email, password, setEmail, setPassword, isNeedActivate) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${API_URL}api/auth/registration`, {
                email,
                password,
                isNeedActivate,
            });

            dispatch(success(response.data.message));
            setTimeout(() => {
                dispatch(success(false));
            }, 3500);

            setEmail('');
            setPassword('');
        } catch (e) {
            dispatch(error(e.response.data.message));

            setTimeout(() => {
                dispatch(error(false));
            }, 3500);
        }
    };
};

export const login = (email, password, checkbox) => {
    return async dispatch => {
        try {

            const response = await axios.post(`${API_URL}api/auth/login`, {
                email,
                password,
                checkbox,
            });

            if (!response.data.user.isActivated) {
                dispatch(error('Нужна активация через почту'));
                setTimeout(() => {
                    dispatch(error(false));
                }, 3500);
                return;
            }

            dispatch(setUser(response.data.user)); /* Сохраняем пользователя */

            checkbox
                ? localStorage.setItem('token', response.data.token) /* Сохраняем Токен в локал сторидж */
                : sessionStorage.setItem('token', response.data.token); /* Сохраняем Токен в сейшн сторидж */

        } catch (e) {
            dispatch(error(e.response.data.message));
            setTimeout(() => {
                dispatch(error(false));
            }, 3500);
        }
    };
};

export const auth = () => { /* Проверка пользователя на авторизацию */
    return async dispatch => {
        try {
            dispatch(showLoader());

            const response = await axios.get(`${API_URL}api/auth/auth`,
                {/* Отправляем Токен в Заголовках */
                    headers: { Authorization: `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}` },
                },
            );

            dispatch(setUser(response.data.user)); /* Сохраняем пользователя */

            response.data.user.isSaveSession
                ? localStorage.setItem('token', response.data.token)
                : sessionStorage.setItem('token', response.data.token);

        } catch (e) {
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
        } finally {
            dispatch(hideLoader());
        }
    };
};

export const removeUser = () => {
    return async dispatch => {
        try {
            dispatch(showLoader());
            const response = await axios.delete(`${API_URL}api/auth/delete`,
                { headers: { Authorization: `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}` } }, /* Отправляем Токен в Заголовках */
            );
            dispatch(logout()); /* Удаялем данные о пользователе */

            dispatch(success(`User ${response.data.user.email} was removed!`));
            setTimeout(() => {
                dispatch(success(false));
            }, 3500);
        } catch (e) {
            dispatch(error(e.response.data.message));
            setTimeout(() => {
                dispatch(error(false));
            }, 3500);
        } finally {
            dispatch(hideLoader());
        }
    };
};

export const changePassword = (email, newPassword, setPassword) => {
    return async dispatch => {
        try {
            const response = await axios.patch(`${API_URL}api/auth/change`, {
                email,
                newPassword,
            });

            dispatch(setUser(response.data.user)); /* Сохраняем пользователя */

            response.data.user.isSaveSession
                ? localStorage.setItem('token', response.data.token)
                : sessionStorage.setItem('token', response.data.token);

            setPassword('');

            dispatch(success('New password was saved!'));
            setTimeout(() => {
                dispatch(success(false));
            }, 3500);
        } catch (e) {
            dispatch(error(e.response.data.message));
            setTimeout(() => {
                dispatch(error(false));
            }, 3500);
        }
    };
};

export const createNotes = (notes, setNotes) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${API_URL}api/auth/notes`,
                { notes, },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}` } },
            );

            dispatch(setUser(response.data.user)); /* Сохраняем пользователя */

            response.data.user.isSaveSession
                ? localStorage.setItem('token', response.data.token)
                : sessionStorage.setItem('token', response.data.token);

            setNotes('');

            dispatch(success('New note was created!'));
            setTimeout(() => {
                dispatch(success(false));
            }, 3500);
        } catch (e) {
            dispatch(error(e.response.data.message));
            setTimeout(() => {
                dispatch(error(false));
            }, 3500);
        }
    };
};

export const findAllUsers = () => {
    return async dispatch => {
        try {
            const response = await axios.get(`${API_URL}api/auth/users`,
                { headers: { Authorization: `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}` } }, /* Отправляем Токен в Заголовках */
            );

            console.log(response.data);

            dispatch(getAllUsers(response.data.users)); /* Сохраняем всех пользователей */

            // dispatch(getLoginUsers(response.data.users.filter(u => ))); /* Сохраняем пользователей online */

            // dispatch(success(`User ${response.data.user.email} was removed!`));
            // setTimeout(() => {
            //     dispatch(success(false));
            // }, 3500);
        } catch (e) {
            dispatch(error(e.response.data.message));
            setTimeout(() => {
                dispatch(error(false));
            }, 3500);
        }
    };
};

export const removeAllUsers = () => {
    return async dispatch => {
        try {
            const response = await axios.delete(`${API_URL}api/auth/removeUsers`,
                { headers: { Authorization: `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}` } }, /* Отправляем Токен в Заголовках */
            );

            dispatch(logout()); /* Удаялем данные о пользователе */

            dispatch(success(`${response.data.message}`));
            setTimeout(() => {
                dispatch(success(false));
            }, 3500);
        } catch (e) {
            dispatch(error(e.response.data.message));
            setTimeout(() => {
                dispatch(error(false));
            }, 3500);
        }
    };
};