import { ToDo } from "../components/to-do/types";

export interface AppState {
  isLoading: boolean;
  todos: Array<ToDo>;
  lastTodoId: number,
}