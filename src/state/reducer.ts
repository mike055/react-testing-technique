import { ADD_TODO, REMOVE_TODO, COMPLETE_TODO, LOADING_COMPLETE } from "./actions";
import { ToDo } from "../components/to-do/types";
import { Reducer } from "redux";

import { AppState } from './types';

const initialState: AppState = {
  isLoading: true,
  todos: [],
  lastTodoId: 0,
}

const getNextTodoId = (lastTodoId: number) => {
  const nextTodoId = lastTodoId + 1;

  return nextTodoId;
}

const reducer: Reducer = (state: AppState = initialState, action: any) => {

  switch(action.type) {

    case ADD_TODO: {
      const nextTodoId = getNextTodoId(state.lastTodoId);
      const newTodo = {
        id: nextTodoId,
        task: action.payload,
        completed: false
      }

      return {
        ...state,
        lastTodoId: nextTodoId,
        todos: [
          ...state.todos,
          newTodo
        ]
      }
    }

    case REMOVE_TODO: {
      const filteredTodos = state.todos.filter(
        (t: ToDo) => t.id !== action.payload.id);

      const updatedTodos = filteredTodos.map( (t: ToDo) => {
        return {
          id: t.id,
          task: t.task,
          completed: t.completed,
        };
      });

      return {
        ...state,
        todos: updatedTodos,
      }
    }

    case COMPLETE_TODO: {
      const updatedTodos = state.todos.map( (t: ToDo) => {
        let completed = t.completed;
    
        if(t.id === action.payload.id) {
          completed = true;
        }
    
        return {
          id: t.id,
          task: t.task,
          completed,
        };
      });
    
      return {
        ...state,
        todos: updatedTodos,
      }
    }

    case LOADING_COMPLETE: {
      return {
        ...state,
        isLoading: false,
      }
    }

  }

  return state;
}

export default reducer;