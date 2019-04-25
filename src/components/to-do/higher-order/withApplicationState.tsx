import React, { Component } from 'react';

import { ToDo } from '../types';

interface ApplicationState {
  isLoading: boolean;
  lastTodoId: number;
  todos: Array<ToDo>;
}

const withApplicationState = (ComposedComponent: React.ComponentType<any>) => {
  return class WithOverrideValues extends Component<any, ApplicationState> {
    state: ApplicationState = {
      isLoading: true,
      todos: [],
      lastTodoId: 0,
    };

    componentDidMount() {
      setTimeout(()=> {
        this.setState(prevState => {
          return {
            ...prevState,
            isLoading: false,
          };
        });
      }, 1000);
    };
  
    getNextTodoId = () => {
      const nextTodoId = this.state.lastTodoId + 1;
      this.setState(prevState => {
        return {
          ...prevState,
          lastTodoId: nextTodoId,
        };
      });
  
      return nextTodoId;
    }
  
    addTodo = (task: string) => {
      const newTodo = {
        id: this.getNextTodoId(),
        task,
        completed: false
      }

      this.setState(prevState => {
        return {
          ...prevState,
          todos: [
            ...this.state.todos,
            newTodo,
          ],
        };
      });
    };
  
    markTodoAsComplete = (todo: ToDo) => {
      const updatedTodos = this.state.todos.map( (t: ToDo) => {
        let completed = t.completed;
  
        if(t.id === todo.id) {
          completed = true;
        }
  
        return {
          id: t.id,
          task: t.task,
          completed,
        };
      });

      this.setState(prevState => {
        return {
          ...prevState,
          todos: updatedTodos,
        }
      });
    };
  
    removeTodo = (todo: ToDo) => {
      const filteredTodos = this.state.todos.filter((t: ToDo)=> t.id !== todo.id);
  
      const updatedTodos = filteredTodos.map( (t: ToDo) => {
        return {
          id: t.id,
          task: t.task,
          completed: t.completed,
        };
      });
  
      this.setState(prevState => {
        return {
          ...prevState,
          todos: updatedTodos,
        }
      });
    };

    render() {
      return <ComposedComponent
        {...this.props} 
        markTodoAsComplete={ this.markTodoAsComplete }
        removeTodo={ this.removeTodo }
        addTodo={ this.addTodo }
        isLoading={ this.state.isLoading }
        todos={ this.state.todos }
      />;
    }
  };
};

export default withApplicationState;
