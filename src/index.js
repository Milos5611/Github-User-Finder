import "./index.scss";
import * as ROUTES from "./common/routes";
import { Route, Router, Switch } from "react-router-dom";
import { AppContainer } from "react-hot-loader";
import { Provider } from "react-redux";
import { render } from "react-dom";
import React from "react";
import customHistory from "./common/history";
import store from "./common/store";
import LoadingSpinner from "./container/LoadingSpinner";

const rootEl = document.getElementById("root");

const App = () => {
    return (
        <Provider store={store}>
            <Router history={customHistory}>
                <div>
                    <LoadingSpinner/>
                    <Switch>
                        <Route
                            exact
                            path={ROUTES.HOME}
                        />
                    </Switch>
                </div>
            </Router>
        </Provider>
    );
};

render(
    <AppContainer>
        <App/>
    </AppContainer>,
    rootEl
);

if ( module.hot ) {
    module.hot.accept(App, () => {
        const NewApp = require(App).default;

        render(
            <AppContainer>
                <NewApp/>
            </AppContainer>,
            rootEl
        );
    });
}
