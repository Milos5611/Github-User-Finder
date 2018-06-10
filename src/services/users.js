import { TYPE_KEY } from "../common/constant";
import history from "../common/history";
import rest from "../common/rest";
import { beginLoading, endLoading } from "./loadingSpinner";
import parseLink from "parse-link-header";

const DATA_LOADED = "DATA_LOADED";
const USER_DETAIL_LOADED = "USER_DETAIL_LOADED";
const PAGE_CHANGED = "PAGE_CHANGED";

export const NEXT = "next_link";
export const USERS = "users";
export const USER_DETAIL = "userDetail";
export const PAGE = "page";

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
        case PAGE_CHANGED:
            newState = {
                ...state,
                [ PAGE ]: action[ PAGE ]
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
            if ( users ) {
                dispatch(dataLoadedSuccessful([ ...users, ...search_value.data ], links.next));
            } else {
                dispatch(dataLoadedSuccessful(search_value.data, links.next));
            }
            dispatch(endLoading());
        } catch ( error ) {
            dispatch(endLoading());
            throw new Error(error);
        }
    };
}

// async func, return detail about chosen user
export function fetchUserDetail( id ) {
    return async ( dispatch ) => {
        dispatch(beginLoading());
        try {
            const search_value = await rest.doGet(`${window.com.advanon.GITHUB_API}/users/${id}`);
            dispatch(userDetailDataLoadedSuccessful(search_value.data));
            dispatch(endLoading());
        } catch ( error ) {
            dispatch(endLoading());
            throw new Error(error);
        }
    };
}

// async func, return filtered result list
export function findUserFromQuery( query ) {
    return async ( dispatch, getState ) => {
        dispatch(beginLoading());
        const next = getState().users[ NEXT ];
        try {
            const search_value = await rest.doGet(`${window.com.advanon.GITHUB_API}/search/users?q=${query}`);
            dispatch(dataLoadedSuccessful(search_value.data.items, next));
            dispatch(endLoading());
        } catch ( error ) {
            dispatch(endLoading());
            throw new Error(error);
        }
    };
}

export function goToPage( page, id ) {
    history.push(`/${page}/${id}`);
    return {
        [ TYPE_KEY ]: PAGE_CHANGED,
        [ PAGE ]: page
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
