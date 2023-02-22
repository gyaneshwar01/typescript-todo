import { SingleTodo } from "./SingleTodo";
import "./TodoList.css";
import { useAppSelector } from "../app/hooks";

export function TodoList() {
  const { todos } = useAppSelector((state) => state.todo);

  return (
    <div className="todos">
      {todos.map((todo) => (
        <SingleTodo key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
