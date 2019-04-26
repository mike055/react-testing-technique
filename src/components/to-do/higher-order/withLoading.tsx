import React, { Component } from 'react';

export interface Props {
  loadingComplete: () => void;
}

const withApplicationState = (ComposedComponent: React.ComponentType<any>) => {
  return class WithOverrideValues extends Component<Props> {
    timeoutId: number = 0;

    componentDidMount() {
      this.timeoutId = setTimeout(()=> {
        this.props.loadingComplete();
      }, 1000);
    };

    componentWillUnmount() {
      clearTimeout(this.timeoutId);
    }
  
    render() {
      return <ComposedComponent
        {...this.props}
      />;
    }
  };
};

export default withApplicationState;