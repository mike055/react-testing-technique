import React from "react";
import { Container, ToDoList, ToDoListItem } from "./styles";

import { ToDo } from "../../types";

interface Props {
  todos: ToDo[];
  removeTodo: (todo: ToDo) => void;
}

const View = ({ todos, removeTodo }: Props) => {
  return (
    <Container>
      <ToDoList>
        {todos.map(t => {
          return (
            <ToDoListItem key={t.id} onClick={() => removeTodo(t)}>{t.task}</ToDoListItem>
          );
        })}
      </ToDoList>
    </Container>
  );
};

export default View;
