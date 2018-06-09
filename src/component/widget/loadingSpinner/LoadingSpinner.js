import PropTypes from "prop-types";
import React from "react";

const DELAY = 0;

const Loading = ( { open } ) => {

    window.setTimeout(() => {
        [].map.call(
            document.getElementsByClassName("loading"),
            ( ele ) => ele.className += " show"
        );
    }, DELAY);

    return (
        open ?
            (<div className="loading">
                <div className="loading-box">
                    <div className="loading-cube1 loading-cube"/>
                    <div className="loading-cube2 loading-cube"/>
                    <div className="loading-cube4 loading-cube"/>
                    <div className="loading-cube3 loading-cube"/>
                </div>
            </div>) : null
    );
};

Loading.propTypes = {
    open: PropTypes.bool.isRequired,
};

export default Loading;
