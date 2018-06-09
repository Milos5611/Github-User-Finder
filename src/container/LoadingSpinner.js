import LoadingSpinner from "../component/widget/loadingSpinner/LoadingSpinner";
import {OPEN} from "../services/loadingSpinner";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        [OPEN]: state.loadingSpinner[OPEN]
    };
};


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(LoadingSpinner);
