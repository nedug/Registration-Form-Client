import axios from 'axios';
import { error, logout, setUser, success } from '../reducers/userReducer';
import { API_URL } from '../config';
import { hideLoader, showLoader } from '../reducers/appReducer';

export const registration = (email, password, setEmail, setPassword) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${API_URL}api/auth/registration`, {
                email,
                password,
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
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }, /* Отправляем Токен в Заголовках */
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
            localStorage.setItem('token', response.data.token); /* Сохраняем Токен в локал сторидж */

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
