import axios from 'axios';
import { setUser } from '../reducers/userReducer';
import { API_URL } from '../config';

export const registration = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}api/auth/registration`, {
            email,
            password,
        });

        alert(response.data.message);
    } catch (e) {
        alert(e.response.data.message);
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
            alert(e.response.data.message);
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
