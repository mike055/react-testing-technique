import React from 'react';
import { Container } from './styles';

import ToDoInput from './components/to-do-input';
import ToDoList from './components/to-do-list';
import Loading from '../../components/loading';

import { ToDo } from './types';

interface Props {
  isLoading: boolean;
  todos: Array<ToDo>;
  addTodo: () => void;
  markTodoAsComplete: () => void;
  removeTodo: () => void;
}

const View = ({ addTodo, markTodoAsComplete, removeTodo, isLoading, todos}: Props) => {
  
  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <ToDoInput addTodo={ addTodo } />
      <ToDoList todos={todos} markTodoAsComplete={ markTodoAsComplete } removeTodo={ removeTodo } />
    </Container>      
  )
};

export default View;