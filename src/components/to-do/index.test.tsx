import React from 'react';
import { render, cleanup, fireEvent, RenderResult, getByLabelText } from 'react-testing-library';
import 'jest-dom/extend-expect';

import Todos from './index';

describe('todos', () => {
  let renderedResult: RenderResult;
  let renderedInput: HTMLElement;

  beforeEach(()=> {
    renderedResult = render(<Todos />);
    renderedInput = getByLabelText(renderedResult.container, 'Enter a To Do:');
  });

  afterEach(()=> {
    cleanup();
  });

  const addTodo = (text: string) => {
    fireEvent.change(renderedInput, { target: { value:  text } });
    fireEvent.keyDown(renderedInput, { keyCode: 13 });
  }

  const assertTodoInList = (todoText: string) => {
    const { queryByText } = renderedResult;
    expect(queryByText(todoText)).toBeInTheDocument();
  }

  const assertTodoNotInList = (todoText: string) => {
    const { queryByText } = renderedResult;
    expect(queryByText(todoText)).not.toBeInTheDocument();
  }

  describe('when adding a todo', () => {
    const firstTodo = "This is a test TODO!";

    beforeEach(()=>{
      addTodo(firstTodo);
    });

    it('adds it to the list', () => {
      assertTodoInList(firstTodo);
    });

    describe('when adding a second todo', () => {
      const secondTodo = "Second Todo";
  
      beforeEach(()=>{
        addTodo(secondTodo);
      });
  
      it('adds it to the top of the list', () => {
        const { getByTestId } = renderedResult;
        const todoList = getByTestId('todo-list');

        expect(todoList.childNodes[0].textContent).toBe(secondTodo);
        expect(todoList.childNodes[1].textContent).toBe(firstTodo);
      });
    });
  });

  describe('when marking a todo as complete', () => {
    const todo1 = "Todo number 1";
    const todo2 = "Todo number 2";
    const todo3 = "Todo number 3";
    
    beforeEach(()=>{
      addTodo(todo1);
      addTodo(todo2);
      addTodo(todo3);
    });

    it('it moves to the bottom of the list', () => {

      const { getByTestId } = renderedResult;
      const todoList = getByTestId('todo-list');

      expect(todoList.childNodes[0].textContent).toBe(todo3);
      expect(todoList.childNodes[1].textContent).toBe(todo2);
      expect(todoList.childNodes[2].textContent).toBe(todo1);

      const { getByText } = renderedResult;
      fireEvent.click(getByText(todo3));

      expect(todoList.childNodes[0].textContent).toBe(todo2);
      expect(todoList.childNodes[1].textContent).toBe(todo1);
      expect(todoList.childNodes[2].textContent).toBe(todo3);
    });
  });

  describe('when removing a todo', () => {
    const todo1 = "Todo number 1";
    const todo2 = "Todo number 2";
    
    beforeEach(()=>{
      addTodo(todo1);
      addTodo(todo2);
    });

    it('it is removed from the list', () => {
      assertTodoInList(todo1);
      assertTodoInList(todo2);

      const { getByLabelText } = renderedResult;
      fireEvent.click(getByLabelText('Remove ' + todo2));

      assertTodoInList(todo1);
      assertTodoNotInList(todo2);
    });
  });
});