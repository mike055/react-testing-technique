import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import ToDoInput from './index';
 

describe('to-do-input', () => {
  let callback, renderedInput;

  beforeEach(()=> {
    callback = jest.fn();
    const { getByLabelText } = render(<ToDoInput onSubmit={callback} />);
    renderedInput = getByLabelText('Enter a To Do:');
  });

  afterEach(()=> {
    cleanup();
  })

  describe('when pressing enter in the input field', ()=> {

    describe('with no value', ()=> {
      it('does not fire the callback', ()=> {
        fireEvent.keyDown(renderedInput, { keyCode: 13 });
        expect(callback).not.toBeCalled();
      });
    });

    describe('with a value', ()=> {
      let inputValue = "Do all the stuff";
      
      beforeEach(()=> {
        fireEvent.change(renderedInput, { target: { value:  inputValue } });
        fireEvent.keyDown(renderedInput, { keyCode: 13 });
      });

      it('fires the callback with the field value', ()=> {
        expect(callback).toBeCalledWith(inputValue);
      });

      it('clears the field value', ()=> {
        expect(renderedInput.value).toBe('')
      });
    });

  });

});