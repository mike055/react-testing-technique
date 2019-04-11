import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import 'jest-dom/extend-expect';

import ToDoList from './index';
 
import { ToDo } from "../../types";

describe('to-do-list', () => {
  let removeToDoCallback, renderedResult;

  const todos: ToDo[] = [
    { id: 1, task: 'Do stuff 1', completed: false },
    { id: 2, task: 'Do stuff 2', completed: false },
  ];

  beforeEach(()=> {
    removeToDoCallback = jest.fn();
    renderedResult = render(<ToDoList todos={todos} removeTodo={removeToDoCallback} />);
  });

  afterEach(()=> {
    cleanup();
  });

  describe('renders list of todos', ()=> {

    todos.forEach((t) => {
      it(`renders item ${t.id}`, () => {
        const { getByText } = renderedResult;
        expect(getByText(t.task)).toBeInTheDocument();
      });

      it('fires the callback with appropriate todo', ()=> {
        const { getByText } = renderedResult;
        fireEvent.click(getByText(t.task));

        expect(removeToDoCallback).toBeCalledWith(t);
      });
    })
  });

});