import React from 'react';
import { Container } from './styles';

import ToDoInput from './components/to-do-input';
import ToDoList from './components/to-do-list';

import { ToDo } from './types';

const View = () => {
  const todos: ToDo[] = [
    { id: 1, task: 'Do stuff 1', completed: true },
    { id: 2, task: 'Do stuff 2', completed: false },
    { id: 3, task: 'Do stuff 3', completed: false },
    { id: 4, task: 'Do stuff 4', completed: true },
  ];

  const addTodo = (task: string) => {
    console.log(task);
  };

  const markTodoAsComplete = (todo: ToDo) => {
    console.log(todo);
  };

  const removeTodo = (todo: ToDo) => {
    console.log(todo);
  };

  return (
    <Container>
      <ToDoInput addTodo={ addTodo } />
      <ToDoList todos={todos} markTodoAsComplete={ markTodoAsComplete } removeTodo={ removeTodo } />
    </Container>
  )
};

export default View;