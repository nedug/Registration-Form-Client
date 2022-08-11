const SET_USER = 'SET_USER';
const LOGOUT = 'LOGOUT';
const ERROR = 'ERROR';
const SUCCESS = 'SUCCESS';

const defaultState = {
    currentUser: {},
    isAuth: false,
    error: false,
    success: false,
};

export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                currentUser: action.payload,
                isAuth: true,
            };
        case LOGOUT:
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
            return {
                ...state,
                currentUser: {},
                isAuth: false,
            };
        case SUCCESS:
            return {
                ...state,
                success: action.payload,
            };
        case ERROR:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
}


export const setUser = user => ({ type: SET_USER, payload: user });
export const logout = () => ({ type: LOGOUT });
export const error = error => ({ type: ERROR, payload: error });
export const success = success => ({ type: SUCCESS, payload: success });
