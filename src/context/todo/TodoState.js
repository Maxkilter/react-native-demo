import React, { useReducer } from "react";
import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from "../types";
import { TodoContext } from "./todoContext";
import { todoReducer } from "./todoReducer";

const initialState = {
  todos: [{ id: 33, title: "Tada-dada" }],
};

export const TodoState = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const addTodo = (title) =>
    dispatch({
      type: ADD_TODO,
      title,
    });

  const removeTodo = (id) =>
    dispatch({
      type: REMOVE_TODO,
      id,
    });

  const updateTodo = (id, title) => dispatch({ type: UPDATE_TODO, id, title });

  return (
    <TodoContext.Provider
      value={{ todos: state.todos, addTodo, updateTodo, removeTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};
