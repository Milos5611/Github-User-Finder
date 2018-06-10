import { TYPE_KEY } from "../common/constant";
import history from "../common/history";
import rest from "../common/rest";
import { beginLoading, endLoading } from "./loadingSpinner";
import parseLink from "parse-link-header";
import isEmpty from "lodash/isEmpty";

const DATA_LOADED = "DATA_LOADED";
const USER_DETAIL_LOADED = "USER_DETAIL_LOADED";

export const NEXT = "next_link";
export const USERS = "users";
export const USER_DETAIL = "userDetail";

export const initialState = {
    [ USERS ]: null,
    [ USER_DETAIL ]: null,
    [ NEXT ]: {}
};

export default function reducer( state = initialState, action ) {
    let newState;
    switch ( action[ TYPE_KEY ] ) {

        case DATA_LOADED:
            newState = {
                ...state,
                [ USERS ]: action[ USERS ],
                [ NEXT ]: action[ NEXT ]
            };
            break;
        case USER_DETAIL_LOADED:
            newState = {
                ...state,
                [ USER_DETAIL ]: action[ USER_DETAIL ]
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

// async func, return all users
export function fetchAllUsers() {
    return async ( dispatch, getState ) => {
        dispatch(beginLoading());
        const next = getState().users[ NEXT ];
        const users = getState().users[ USERS ];
        try {
            const search_value = await rest.doGet(`${window.com.advanon.GITHUB_API}/users?since=${next.since}`);
            const links = parseLink(search_value.headers.link);
            dispatch(dataLoadedSuccessful({ ...search_value.data, users }, links.next));
            dispatch(endLoading());
        } catch ( error ) {
            dispatch(endLoading());
            throw new Error(error);
        }
    };
}

// async func, return detail about chosen user
export function userDetail( id ) {
    return async ( dispatch ) => {
        dispatch(beginLoading());
        try {
            const search_value = await rest.doGet(`${window.com.advanon.GITHUB_API}/users/${id}`);
            dispatch(userDetailDataLoadedSuccessful(search_value));
            dispatch(endLoading());
            history.push(`/users/${id}`);
        } catch ( error ) {
            dispatch(endLoading());
            throw new Error(error);
        }
    };
}

// async func, return filtered result list
export function findUserFromQuery( query ) {
    return async ( dispatch ) => {
        dispatch(beginLoading());
        try {
            const search_value = await rest.doGet(`${window.com.advanon.GITHUB_API}/search/users?q=${query}`);
            dispatch(dataLoadedSuccessful(search_value.items));
            dispatch(endLoading());
        } catch ( error ) {
            dispatch(endLoading());
            throw new Error(error);
        }
    };
}

function dataLoadedSuccessful( users_list, next ) {
    return {
        [ TYPE_KEY ]: DATA_LOADED,
        [ USERS ]: users_list,
        [ NEXT ]: next
    };
}

function userDetailDataLoadedSuccessful( user_detail ) {
    return {
        [ TYPE_KEY ]: USER_DETAIL_LOADED,
        [ USER_DETAIL ]: user_detail
    };
}
