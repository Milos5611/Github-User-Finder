import { applyMiddleware, combineReducers, createStore } from "redux";
import loadingSpinner from "../services/loadingSpinner";
import users from "../services/users";
import thunk from "redux-thunk";

const reducers = {
    loadingSpinner,
    users
};

const logger = store => next => action => {

    let result = next(action);

    if ( process.env.NODE_ENV !== "production" ) {
        /* eslint-disable */
        console.group(action.type);
        console.info("Dispatching:", action);
        console.log("Next state:", store.getState());
        console.groupEnd(action.type);
        /* eslint-enable */
    }

    return result;
};

export default createStore(combineReducers(reducers), applyMiddleware(thunk, logger));
