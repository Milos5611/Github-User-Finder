import React, { Component } from "react";
import PropTypes from "prop-types";
import debounce from "lodash/debounce";
import isNull from "lodash/isNull";
import { FormGroup, FormControl, Grid, Row, Col } from "react-bootstrap";
import User from "../../widget/GitHubUser/User";

class Home extends Component {

    static propTypes = {
        fetchAllUsers: PropTypes.func.isRequired,
        findUserFromQuery: PropTypes.func.isRequired,
        goToPage: PropTypes.func.isRequired,
        users: PropTypes.array
    };

    constructor( props ) {
        super(props);
        // In case of feature needs keep query parameter
        this.state = {
            value: ""
        };

        // dispatch find
        this.changed = debounce(props.findUserFromQuery, 200);
    }

    componentDidMount() {
        const { fetchAllUsers, users } = this.props;
        if ( isNull(users) ) {
            fetchAllUsers();
        }
    }

    handleQuery = ( query ) => {
        const value = query.target.value;

        // Keep query with in state and fire rest call on callback
        this.setState({ value: value }, () => {
            this.changed(value);
        });
    };

    handleLoadMoreUsers = () => {
        const { fetchAllUsers } = this.props;
        if ( (window.innerHeight + window.scrollY) >= document.body.offsetHeight ) {
            fetchAllUsers();
        }
    };

    render() {
        const { users, goToPage } = this.props;
        return (
            <Grid>
                <div className="github-logo"/>
                <Row className="show-grid">
                    <section
                        className="user-list--wrapper"
                        onWheel={this.handleLoadMoreUsers}
                    >
                        <FormGroup bsSize="large">
                            <FormControl
                                className="search"
                                type="text"
                                placeholder="Search for Git user"
                                autoFocus
                                value={this.state.value}
                                onChange={( query ) => this.handleQuery(query)}
                            />
                        </FormGroup>
                        {users && users.map(user => {
                            return (
                                <Col
                                    key={user.id}
                                    sm={12}
                                    md={6}
                                    lg={4}
                                >
                                    <User
                                        className="card"
                                        avatar={user.avatar_url}
                                        login={user.login}
                                        changePage={() => goToPage("details", user.login)}
                                    />
                                </Col>
                            );
                        })}
                    </section>
                </Row>
            </Grid>
        );
    }
}

export default Home;
