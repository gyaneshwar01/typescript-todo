import { Todo } from "../model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdOutlineDone } from "react-icons/md";
import "./SingleTodo.css";
import { useState, useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { doneTodo, editTodo, removeTodo } from "../features/todo/todoSlice";

type SingleTodoProps = {
  todo: Todo;
};

export function SingleTodo({ todo }: SingleTodoProps) {
  const [edit, setEdit] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(todo.todo);

  const dispatch = useAppDispatch();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleDone = (id: number) => {
    dispatch(doneTodo(id));
  };

  const handleDelete = (id: number) => {
    dispatch(removeTodo(id));
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    id: number
  ) => {
    event.preventDefault();
    dispatch(editTodo({ id, editText }));
    setEdit(false);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <form
      className="todos__single"
      onSubmit={(event) => handleSubmit(event, todo.id)}
    >
      {edit ? (
        <input
          type="text"
          value={editText}
          onChange={(event) => setEditText(event.target.value)}
          className="todos__single--text"
          ref={inputRef}
        />
      ) : !todo.isCompleted ? (
        <span className="todos__single--text">{todo.todo}</span>
      ) : (
        <s className="todos__single--text">{todo.todo}</s>
      )}

      <div>
        <span
          className="icon"
          onClick={() => {
            if (!edit && !todo.isCompleted) {
              setEdit(true);
            }
          }}
        >
          <AiFillEdit />
        </span>
        <span className="icon" onClick={() => handleDelete(todo.id)}>
          <AiFillDelete />
        </span>
        <span className="icon" onClick={() => handleDone(todo.id)}>
          <MdOutlineDone />
        </span>
      </div>
    </form>
  );
}
