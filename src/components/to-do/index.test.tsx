import React from 'react';
import { render, cleanup, fireEvent, RenderResult, getByText } from 'react-testing-library';

import Todos from './index';

describe('todos', () => {
  let renderedResult: RenderResult;
  
  beforeEach(()=> {
    renderedResult = render(<Todos />);
  });

  afterEach(()=> {
    cleanup();
  });
});