import { connect } from "react-redux";
import { removeTodo, completeTodo } from "../../../../../state/actions";
import { ToDo } from "../../../types";
import { Dispatch } from "redux";

const mapStateToProps = (state: any) => {
  return {
    todos: state.todos
  };
};

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    removeTodo: (todo: ToDo) => dispatch(removeTodo(todo)),
    markTodoAsComplete: (todo: ToDo) => dispatch(completeTodo(todo)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
);