import axios from 'axios';
import { error, setUser, success } from '../reducers/userReducer';
import { API_URL } from '../config';

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
    }
};

export const login = (email, password) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${API_URL}api/auth/login`, {
                email,
                password,
            });

            dispatch(setUser(response.data.user)); /* Сохраняем пользователя */
            localStorage.setItem('token', response.data.token); /* Сохраняем Токен в локал сторидж */
        } catch (e) {

            dispatch(error(e.response.data.message));

            setTimeout(() => {
                dispatch(error(false));
            }, 3500);

            // alert(e.response.data.message);
        }
    };
};

export const auth = () => { /* Проверка пользователя на авторизацию */
    return async dispatch => {
        try {
            const response = await axios.get(`${API_URL}api/auth/auth`,
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }, /* Отправляем Токен в Заголовках */
            );

            dispatch(setUser(response.data.user)); /* Сохраняем пользователя */
            localStorage.setItem('token', response.data.token); /* Сохраняем Токен в локал сторидж */
        } catch (e) {
            localStorage.removeItem('token');
        }
    };
};
