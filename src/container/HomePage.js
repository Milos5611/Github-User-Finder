import {
    USERS,
    fetchAllUsers,
    findUserFromQuery,
    goToPage
} from "../services/users";
import HomePage from "../component/view/homePage/HomePage";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const mapStateToProps = ( state ) => {
    return {
        [ USERS ]: state.users[ USERS ]
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return bindActionCreators({ fetchAllUsers, findUserFromQuery, goToPage }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
