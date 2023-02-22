import "./App.css";
import InputField from "./components/InputField";
import { TodoList } from "./components/TodoList";

function App() {
  return (
    <div className="App">
      <span className="heading">Taskify</span>
      <InputField />
      <TodoList />
    </div>
  );
}

export default App;
