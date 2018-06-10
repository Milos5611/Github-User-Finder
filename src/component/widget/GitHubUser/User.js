import PropTypes from "prop-types";
import React from "react";
import Button from "react-bootstrap/lib/Button";
import Image from "react-bootstrap/lib/Image";

const User = ({avatar, login, className, getUserDetail}) => {
    return (
        <div className={`${className} github-user`}>
            <Image
                src={avatar}
                circle
            />
            <span>{login}</span>
            <Button
                onClick={getUserDetail}
                bsStyle="primary"
            >
                {"Details"}
            </Button>
        </div>
    );
};

User.propTypes = {
    avatar: PropTypes.string,
    login: PropTypes.string,
    className: PropTypes.string,
    getUserDetail: PropTypes.func
};

export default User;
