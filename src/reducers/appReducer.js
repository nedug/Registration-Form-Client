const SHOW_LOADER = 'SHOW_LOADER';
const HIDE_LOADER = 'HIDE_LOADER';
const SHOW_PRELOADER = 'SHOW_PRELOADER';
const HIDE_PRELOADER = 'HIDE_PRELOADER';

const defaultState = {
    loader: false,
    preloader: false,
};

export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case SHOW_LOADER:
            return { ...state, loader: true };
        case HIDE_LOADER:
            return { ...state, loader: false };
        case SHOW_PRELOADER:
            return { ...state, preloader: true };
        case HIDE_PRELOADER:
            return { ...state, preloader: false };
        default:
            return state;
    }
}


export const showLoader = () => ({ type: SHOW_LOADER });
export const hideLoader = () => ({ type: HIDE_LOADER });

export const showPreLoader = () => ({ type: SHOW_PRELOADER });
export const hidePreLoader = () => ({ type: HIDE_PRELOADER });
