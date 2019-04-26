import React from "react";
import { Provider } from "react-redux";
import newReduxStore from "../../state/reduxStore";

import View from "./View";
import connected from "./higher-order/connected";
import withLoading from "./higher-order/withLoading";

const ConnectedView = connected(withLoading(View));

const ReduxedTodos = () => {
  return (
    <Provider store={newReduxStore()}>
      <ConnectedView />
    </Provider>
  );
};

export default ReduxedTodos;
