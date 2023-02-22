import { Todo } from "./../../model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SliceState = {
  todos: Todo[];
};

type EditTodo = {
  id: number;
  editText: string;
};

const getTodosFromLocalStorage = (): Todo[] => {
  const todosString = localStorage.getItem("todos");
  if (todosString) {
    return JSON.parse(todosString);
  } else {
    return [];
  }
};

const initialState: SliceState = {
  todos: getTodosFromLocalStorage(),
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos = [...state.todos, action.payload];
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    doneTodo: (state, action: PayloadAction<number>) => {
      for (let i = 0; i < state.todos.length; i++) {
        if (state.todos[i].id === action.payload) {
          state.todos[i].isCompleted = !state.todos[i].isCompleted;
        }
      }
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    editTodo: (state, action: PayloadAction<EditTodo>) => {
      state.todos = state.todos.map((todo) =>
        todo.id !== action.payload.id
          ? todo
          : { ...todo, todo: action.payload.editText }
      );
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
  },
});

export default todoSlice.reducer;
export const { addTodo, doneTodo, removeTodo, editTodo } = todoSlice.actions;
