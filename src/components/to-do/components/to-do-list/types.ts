import { ToDo } from "../../types";

export interface ToDoListProps {
  todos: ToDo[];
  markTodoAsComplete: (todo: ToDo) => void;
  removeTodo: (todo: ToDo) => void;
}