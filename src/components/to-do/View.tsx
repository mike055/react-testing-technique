import React from 'react';
import { Container } from './styles';

import ToDoInput from './components/to-do-input';
import ToDoList from './components/to-do-list';
import Loading from '../../components/loading';

export interface Props {
  isLoading: boolean,
};

const View = ({ isLoading }: Props) => {
  
  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <ToDoInput />
      <ToDoList />
    </Container>      
  );
};

export default View;