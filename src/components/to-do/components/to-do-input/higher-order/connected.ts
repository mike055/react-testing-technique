import { connect } from "react-redux";
import { addTodo } from "../../../../../state/actions";
import { Dispatch } from "redux";

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    addTodo: (task: string) => dispatch(addTodo(task)),
  };
};

export default connect(
  null,
  mapDispatchToProps
);