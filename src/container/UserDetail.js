import {
    USER_DETAIL,
    fetchUserDetail
} from "../services/users";
import UserDetail from "../component/view/userDetail/UserDetail";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const mapStateToProps = ( state ) => {
    return {
        [ USER_DETAIL ]: state.users[ USER_DETAIL ]
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return bindActionCreators({ fetchUserDetail }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);
