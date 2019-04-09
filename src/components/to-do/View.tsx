import React from 'react';
import { Container } from './styles';

import ToDoInput from './components/to-do-input';

const View = () => {
  return (
    <Container>
      <ToDoInput onSubmit={ console.log } />
    </Container>
  )
};

export default View;