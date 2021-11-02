import { React, useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { ActionCreators } from "redux-undo";
import * as yup from "yup";

const validationSchema = yup.object({
  todo: yup
    .string()
    .matches(/[^\s\\]/, "Please add your todo")
    .required("Please add your todo"),
});

function App() {
  const [disablePast, setDisablePast] = useState(true);
  const [disableFuture, setDisableFuture] = useState(true);

  const todos = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(check, [todos]);

  function check() {
    if (todos.past.length > 0) {
      setDisablePast(false);
    } else if (todos.past.length <= 1) {
      setDisablePast(true);
    }

    if (todos.future.length > 0) {
      setDisableFuture(false);
    } else {
      setDisableFuture(true);
    }
  }

  return (
    <div className="container">
      <Formik
        initialValues={{ todo: "" }}
        onSubmit={(data, { resetForm }) => {
          dispatch({ type: "ADD", payload: data.todo });
          resetForm();
        }}
        validateOnBlur={false}
        validationSchema={validationSchema}
      >
        {(props) => (
          <Form>
            <Field
              className="input"
              type="text"
              name="todo"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.todo}
            ></Field>
            {props.errors.todo && props.touched.todo ? (
              <div>{props.errors.todo}</div>
            ) : null}
          </Form>
        )}
      </Formik>
      {todos.present
        ? todos.present.map((items) => (
            <div className="todo" key={items.id}>
              {items.name}
            </div>
          ))
        : ""}
      <div className="btn-container">
        <button
          disabled={disablePast}
          onClick={() => dispatch(ActionCreators.undo())}
        >
          undo
        </button>
        <button
          disabled={disableFuture}
          onClick={() => dispatch(ActionCreators.redo())}
        >
          redo
        </button>
      </div>
    </div>
  );
}

export default App;
