import PropTypes from "prop-types";
import React, { Fragment } from "react";
import Button from "react-bootstrap/lib/Button";
import Image from "react-bootstrap/lib/Image";

const User = ( { avatar, login, className, changePage, userId, html_url } ) => {
    const showUserDetailTemplate = html_url && userId;
    return (
        <div className={`${className} github-user`}>
            <Image
                src={avatar}
                circle
            />
            {
                showUserDetailTemplate ?
                    <Fragment>
                        <figure className="user-detail--template">
                            <span>{"User ID:"}</span>
                            <span className="github-user--username">{login}</span>
                        </figure>
                        <figure className="user-detail--template">
                            <span>{"User ID:"}</span>
                            <span>{userId}</span>
                        </figure>
                        <figure className="user-detail--template">
                            <span>{"Link to user GitHub page:"}</span>
                            <a
                                href={html_url}
                                className="github-user--html_url"
                            >
                                {html_url}
                            </a>
                        </figure>
                        <figure className="user-detail--template">
                            <Button
                                className="github-user--details"
                                onClick={changePage}
                                bsStyle="link"
                            >
                                {"Go back"}
                            </Button>
                        </figure>
                    </Fragment> :
                    <Fragment>
                        <span className="github-user--username">{login}</span>
                        <Button
                            className="github-user--details"
                            onClick={changePage}
                            bsStyle="primary"
                        >
                            {"User Detail"}
                        </Button>
                    </Fragment>
            }
        </div>
    );
};

User.propTypes = {
    avatar: PropTypes.string,
    login: PropTypes.string,
    className: PropTypes.string,
    html_url: PropTypes.string,
    userId: PropTypes.number,
    changePage: PropTypes.func
};

export default User;
