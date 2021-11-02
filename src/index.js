import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import undoable from "redux-undo";
import { v4 as uuidv4 } from "uuid";
import { createStore } from "redux";
import { Provider } from "react-redux";

const reducer = (state = [], action) => {
  switch (action.type) {
    case "ADD":
      return [...state, { name: action.payload, id: uuidv4() }];
    default:
      return state;
  }
};

const store = createStore(undoable(reducer));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
