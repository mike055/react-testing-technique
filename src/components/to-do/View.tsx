import React from 'react';
import { Container } from './styles';

import ToDoInput from './components/to-do-input';
import ToDoList from './components/to-do-list';

import { ToDo } from './types';

const View = () => {
  const todos: ToDo[] = [
    { id: 1, task: 'Do stuff', completed: false },
    { id: 2, task: 'Do stuff', completed: false },
    { id: 3, task: 'Do stuff', completed: true },
    { id: 4, task: 'Do stuff', completed: true },
    { id: 5, task: 'Do stuff', completed: false },
  ];

  const addTodo = (task: string) => {
    console.log(task);
  };

  const removeTodo = (todo: ToDo) => {
    console.log(todo);
  };

  return (
    <Container>
      <ToDoInput addTodo={ addTodo } />
      <ToDoList todos={todos} removeTodo={ removeTodo } />
    </Container>
  )
};

export default View;