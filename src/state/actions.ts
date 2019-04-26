import { ToDo } from "../components/to-do/types";

export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';

export const LOADING_COMPLETE = 'LOADING_COMPLETE';

export const addTodo = (task: string) => {
  return {
    type: ADD_TODO,
    payload: task,
  };
};

export const removeTodo = (todo: ToDo) => {
  return {
    type: REMOVE_TODO,
    payload: todo,
  };
};

export const completeTodo = (todo: ToDo) => {
  return {
    type: COMPLETE_TODO,
    payload: todo,
  };
};

export const loadingComplete = () => {
  return {
    type: LOADING_COMPLETE,
  };
};