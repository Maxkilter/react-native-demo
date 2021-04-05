import React, { useReducer } from "react";
import {
  ADD_TODO,
  CLEAR_ERROR,
  FETCH_TODOS,
  HIDE_LOADER,
  REMOVE_TODO,
  SHOW_ERROR,
  SHOW_LOADER,
  UPDATE_TODO,
} from "../types";
import { TodoContext } from "./todoContext";
import { todoReducer } from "./todoReducer";
import { Http } from "../../http";

const initialState = {
  todos: [],
  loading: false,
  error: null,
};

export const TodoState = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const addTodo = async (title) => {
    showLoader();
    clearError();
    try {
      const data = await Http.post(
        "https://react-native-demo-b4426-default-rtdb.europe-west1.firebasedatabase.app/todos.json",
        { title }
      );

      dispatch({
        type: ADD_TODO,
        title,
        id: data.name,
      });
    } catch (e) {
      showError("Your entry wasn't created, please try more or try later.");
      console.log(e);
    } finally {
      hideLoader();
    }
  };

  const fetchTodos = async () => {
    showLoader();
    clearError();
    try {
      const data = await Http.get(
        "https://react-native-demo-b4426-default-rtdb.europe-west1.firebasedatabase.app/todos.json"
      );
      const todos = Object.keys(data).map((key) => ({ ...data[key], id: key }));

      dispatch({ type: FETCH_TODOS, todos });
    } catch (e) {
      showError("Something vent wrong...");
      console.log(e);
    } finally {
      hideLoader();
    }
  };

  const removeTodo = async (id) => {
    showLoader();
    clearError();
    try {
      await fetch(
        `https://react-native-demo-b4426-default-rtdb.europe-west1.firebasedatabase.app/todos/${id}.json`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      await Http.delete(
        `https://react-native-demo-b4426-default-rtdb.europe-west1.firebasedatabase.app/todos/${id}.json`
      );

      dispatch({
        type: REMOVE_TODO,
        id,
      });
    } catch (e) {
      showError("Something vent wrong...");
      console.log(e);
    } finally {
      hideLoader();
    }
  };
  const showLoader = () => dispatch({ type: SHOW_LOADER });
  const hideLoader = () => dispatch({ type: HIDE_LOADER });

  const showError = (error) => dispatch({ type: SHOW_ERROR, error });
  const clearError = () => dispatch({ type: CLEAR_ERROR });

  // strait method example
  const updateTodo = async (id, title) => {
    showLoader();
    clearError();
    try {
      const response = await fetch(
        `https://react-native-demo-b4426-default-rtdb.europe-west1.firebasedatabase.app/todos/${id}.json`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title }),
        }
      );
      dispatch({ type: UPDATE_TODO, id, title });
    } catch (e) {
      showError("Something vent wrong...");
      console.log(e);
    } finally {
      hideLoader();
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        addTodo,
        updateTodo,
        removeTodo,
        fetchTodos,
        loading: state.loading,
        error: state.error,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
