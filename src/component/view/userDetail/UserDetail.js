import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col } from "react-bootstrap";
import User from "../../widget/GitHubUser/User";

class UserDetail extends Component {

    static propTypes = {
        match: PropTypes.object.isRequired,
        fetchUserDetail: PropTypes.func.isRequired,
        userDetail: PropTypes.object
    };

    constructor( props ) {
        super(props);
    }

    componentDidMount() {
        const { fetchUserDetail, match } = this.props;
        fetchUserDetail(match.params.id);
    }

    onGoingBack = () => {
        history.back();
    };

    render() {
        const { userDetail } = this.props;
        return (
            <Grid>
                <div className="github-logo"/>
                <Row className="show-grid">
                    <Col
                        md={8}
                        mdOffset={2}
                        sm={12}
                    >
                        {
                            userDetail &&
                            <User
                                className="details"
                                userId={userDetail.id}
                                login={userDetail.login}
                                avatar={userDetail.avatar_url}
                                html_url={userDetail.html_url}
                                changePage={this.onGoingBack}
                            />
                        }
                    </Col>
                </Row>
            </Grid>
        );
    }

}

export default UserDetail;
