import React from 'react';
import { render, cleanup, fireEvent, RenderResult, getByText } from 'react-testing-library';
import 'jest-dom/extend-expect';

import ToDoList from './index';
 
import { ToDo } from "../../types";

describe('to-do-list', () => {
  let markAsCompleteCallback: any;
  let removeTodoCallback: any;
  let renderedResult: RenderResult;

  const todos: ToDo[] = [
    { id: 1, task: 'Do stuff 1', completed: true },
    { id: 2, task: 'Do stuff 2', completed: false },
    { id: 3, task: 'Do stuff 3', completed: false },
    { id: 4, task: 'Do stuff 4', completed: true },
  ];

  const getTodoById = (id: number): ToDo => {
    const todo = todos.find(t => t.id === id);

    return todo ? todo : { id: 0, task: '', completed: false };
  }

  beforeEach(()=> {
    markAsCompleteCallback = jest.fn();
    removeTodoCallback = jest.fn();
    renderedResult = render(<ToDoList todos={todos} markTodoAsComplete={markAsCompleteCallback} removeTodo={removeTodoCallback} />);
  });

  afterEach(()=> {
    cleanup();
  });

  describe('when the todos are rendered', ()=> {

    it('renders not completed todos at the top of the list and completed todos at the bottom', () => {
      const { getByTestId } = renderedResult;

      const todoList = getByTestId('todo-list');

      expect(todoList.childNodes[0].textContent).toBe(getTodoById(3).task);
      expect(todoList.childNodes[1].textContent).toBe(getTodoById(2).task);
      expect(todoList.childNodes[2].textContent).toBe(getTodoById(4).task);
      expect(todoList.childNodes[3].textContent).toBe(getTodoById(1).task);
    });

    describe('when the text of a todo is clicked', () => {
      it('fires the callback with appropriate todo', ()=> {
        const { getByText } = renderedResult;
        fireEvent.click(getByText(todos[1].task));

        expect(markAsCompleteCallback).toBeCalledWith(todos[1]);
      });
    });

    describe('when the trash can of a todo is clicked', () => {
      it('fires the callback with appropriate todo', ()=> {
        const { getByLabelText } = renderedResult;
        fireEvent.click(getByLabelText('Remove ' + todos[1].task));

        expect(removeTodoCallback).toBeCalledWith(todos[1]);
      });
    });
  });
});