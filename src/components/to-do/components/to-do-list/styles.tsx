import styled, { keyframes } from 'styled-components';

const rolldown = keyframes`
  0% {
    visibility: visible;
    transform: rotateX(180deg) perspective(500px);
  }
  70% {
    visibility: visible;
    transform: rotateX(-20deg);
  }
  100% {
    visibility: visible;
    transform: rotateX(0deg);
  }
`;

export const Container = styled.div`
  padding: 10px 0;
`;

export const ToDoList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const ToDoListItem = styled.li`
  padding: 1em;
  margin-bottom: .125em;
  display: block;
  list-style: none;
  text-transform: uppercase;
  color: #fff;
  font-weight: bold;
  cursor: pointer;

  visibility: hidden;
  animation: ${rolldown} 2s 1;
  transform-origin: 50% 0;
  animation-fill-mode: forwards;

  &:nth-child(2n) {
    background-color: #444;
  }
  
  &:nth-child(2n+1) {
    background-color: #333;
  }
`;