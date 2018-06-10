import {
    USERS,
    USER_DETAIL,
    fetchAllUsers,
    userDetail,
    findUserFromQuery
} from "../services/users";
import HomePage from "../component/view/homePage/HomePage";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const mapStateToProps = ( state ) => {
    return {
        [USERS]: state.users[ USERS ],
        [USER_DETAIL]: state.users[ USER_DETAIL ]
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return bindActionCreators({ fetchAllUsers, userDetail, findUserFromQuery }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
