import React from 'react';
import { render, cleanup, fireEvent, RenderResult, getByLabelText, waitForElement } from 'react-testing-library';
import 'jest-dom/extend-expect';

import Todos from './index';

describe('todos', () => {

  afterEach(()=> {
    cleanup();
  });

  const addTodo = (renderedResult: RenderResult, text: string) => {
    const renderedInput = getByLabelText(renderedResult.container, 'Enter a To Do:');
    fireEvent.change(renderedInput, { target: { value:  text } });
    fireEvent.keyDown(renderedInput, { keyCode: 13 });
  };

  const assertTodoInList = (renderedResult: RenderResult, todoText: string) => {
    const { queryByText } = renderedResult;
    expect(queryByText(todoText)).toBeInTheDocument();
  };

  const assertTodoNotInList = (renderedResult: RenderResult, todoText: string) => {
    const { queryByText } = renderedResult;
    expect(queryByText(todoText)).not.toBeInTheDocument();
  };

  describe('when component loaded', () => {

    describe('when loading is complete', () => {
      it('the loading overlay is shown and then removed', async () => {
        const renderedResult = render(<Todos />);
        const { getByLabelText, queryByLabelText } = renderedResult;

        expect(queryByLabelText('Loading')).toBeInTheDocument();
        expect(queryByLabelText('Todos')).not.toBeInTheDocument();

        await waitForElement(() =>
        getByLabelText('List of Todos'),
        );

        expect(queryByLabelText('Loading')).not.toBeInTheDocument();
      });
    });
  });

  describe('when adding a todo', () => {
    const firstTodo = "This is a test TODO!";

    it('adds it to the list', async () => {
      const renderedResult = render(<Todos />);
      const { getByLabelText } = renderedResult;

      await waitForElement(() =>
        getByLabelText('List of Todos'),
      );

      addTodo(renderedResult, firstTodo);

      assertTodoInList(renderedResult, firstTodo);
    });

    describe('when adding a second todo', () => {

      const secondTodo = "Second Todo";
  
      it('adds it to the top of the list', async () => {
        const renderedResult = render(<Todos />);
        const { getByLabelText } = renderedResult;
  
        await waitForElement(() =>
          getByLabelText('List of Todos'),
        );

        addTodo(renderedResult, firstTodo);
        addTodo(renderedResult, secondTodo);

        const todoList = getByLabelText('List of Todos');

        expect(todoList.childNodes[0].textContent).toBe(secondTodo);
        expect(todoList.childNodes[1].textContent).toBe(firstTodo);
      });
    });
  });

  describe('when marking a todo as complete', () => {
    const todo1 = "Todo number 1";
    const todo2 = "Todo number 2";
    const todo3 = "Todo number 3";

    it('it moves to the bottom of the list', async () => {
      const renderedResult = render(<Todos />);
      const { getByLabelText } = renderedResult;

      await waitForElement(() =>
        getByLabelText('List of Todos'),
      );

      addTodo(renderedResult, todo1);
      addTodo(renderedResult, todo2);
      addTodo(renderedResult, todo3);

      const todoList = getByLabelText('List of Todos');

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
    
    it('it is removed from the list', async () => {
      const renderedResult = render(<Todos />);
      const { getByLabelText, getByTestId } = renderedResult;

      await waitForElement(() =>
        getByLabelText('List of Todos'),
      );

      addTodo(renderedResult, todo1);
      addTodo(renderedResult, todo2);

      assertTodoInList(renderedResult, todo1);
      assertTodoInList(renderedResult, todo2);

      fireEvent.click(getByLabelText('Remove ' + todo2));

      assertTodoInList(renderedResult, todo1);
      assertTodoNotInList(renderedResult, todo2);
    });
  });
});