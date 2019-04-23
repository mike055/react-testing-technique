import React from "react";
import { Container, ToDoList, ToDoListItem, TodoText, TodoRemoveIcon } from "./styles";

import TrashCan from '../../../icons/TrashCan';

import { ToDo } from "../../types";


interface Props {
  todos: ToDo[];
  markTodoAsComplete: (todo: ToDo) => void;
  removeTodo: (todo: ToDo) => void;
}

const View = ({ todos, markTodoAsComplete, removeTodo }: Props) => {

  const sortedTodos = todos.sort((a, b) => {

    if ( !a.completed && b.completed ) {
      return -1;
    }

    if ( a.completed && !b.completed ) {
      return 1;
    }

    if ( a.id < b.id ) {
      return -1;
    }

    return 1;

  });

  return (
    <Container>
      <ToDoList data-testid="todo-list">
        {sortedTodos.map(t => {
          return (
            <ToDoListItem key={t.id}>
              <TodoText onClick={() => markTodoAsComplete(t)} completed={t.completed}>{t.task}</TodoText>
              <TodoRemoveIcon onClick={ () => removeTodo(t) } aria-label={ 'Remove ' + t.task }>
                <TrashCan />
              </TodoRemoveIcon>
            </ToDoListItem>
          );
        })}
      </ToDoList>
    </Container>
  );
};

export default View;
