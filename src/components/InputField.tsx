import "./InputField.css";
import { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Todo } from "../model";
import { addTodo } from "../features/todo/todoSlice";

function InputField() {
  const inputRef = useRef<HTMLInputElement>(null);

  const { todos } = useAppSelector((state) => state.todo);

  const dispatch = useAppDispatch();

  const [todo, setTodo] = useState<string>("");

  const handleAdd = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newTodo: Todo = {
      isCompleted: false,
      todo,
      id: todos.length,
    };
    dispatch(addTodo(newTodo));
    setTodo("");
  };

  return (
    <form
      className="input"
      onSubmit={(event) => {
        handleAdd(event);
        inputRef.current?.blur();
      }}
    >
      <input
        ref={inputRef}
        type="text"
        className="input__box"
        placeholder="Enter a task"
        onChange={(e) => setTodo(e.target.value)}
        value={todo}
      />
      <button type="submit" className="input__submit">
        Go
      </button>
    </form>
  );
}

export default InputField;
