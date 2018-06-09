import { TYPE_KEY } from "../common/constant";

export const BEGIN_LOADING = "BEGIN_LOADING";
export const END_LOADING = "END_LOADING";

export const OPEN = "open";

export const initialState = {
    [OPEN]: false,
};

export default function reducer( state = initialState, action ) {
    let newState;
    switch ( action[ TYPE_KEY ] ) {

        case BEGIN_LOADING:
            newState = {
                ...state,
                [OPEN]: true
            };
            break;

        case END_LOADING:
            newState = {
                ...state,
                [OPEN]: false
            };
            break;

        default:
            newState = {
                ...state
            };
            break;
    }
    return newState;
}

export function beginLoading() {
    return {
        [TYPE_KEY]: BEGIN_LOADING
    };
}

export function endLoading() {
    return {
        [TYPE_KEY]: END_LOADING
    };
}
