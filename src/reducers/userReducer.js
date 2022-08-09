const SET_USER = 'SET_USER';
const LOGOUT = 'LOGOUT';
const ERROR = 'ERROR';

const defaultState = {
    currentUser: {},
    isAuth: false,
    error: false,
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
            return {
                ...state,
                currentUser: {},
                isAuth: false,
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
