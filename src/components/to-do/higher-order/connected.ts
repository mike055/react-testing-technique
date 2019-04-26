import { connect } from "react-redux";
import { loadingComplete } from "../../../state/actions";
import { Dispatch } from "redux";

const mapStateToProps = (state: any) => {
  return {
    isLoading: state.isLoading
  };
};

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    loadingComplete: () => dispatch(loadingComplete()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
);