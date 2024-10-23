import { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const [todoValue, setTodoValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  function persistData(newList) {
    localStorage.setItem("todos", JSON.stringify({ todos: newList }));
  }

  function handleAddTodos(newTodo) {
    const trimmedTodo = newTodo.trim();
    if (!trimmedTodo) {
      return;
    }
    if (editIndex !== null) {
      const newTodoList = todos.map((todo, index) =>
        index === editIndex ? trimmedTodo : todo
      );
      setTodos(newTodoList);
      persistData(newTodoList);
      setEditIndex(null);
    } else {
      const newTodoList = [...todos, trimmedTodo];
      setTodos(newTodoList);
      persistData(newTodoList);
    }
    setTodoValue("");
  }

  function handleDeleteTodos(index) {
    const newTodoList = todos.filter((_, todoIndex) => todoIndex !== index);
    setTodos(newTodoList);
    persistData(newTodoList);
  }

  function handleEditTodos(index) {
    const valueToEdit = todos[index];
    setTodoValue(valueToEdit);
    setEditIndex(index);
  }

  useEffect(() => {
    if (!localStorage) {
      return;
    }
    let localTodos = localStorage.getItem("todos");
    if (!localTodos) {
      return;
    }
    localTodos = JSON.parse(localTodos).todos;
    setTodos(localTodos);
  }, []);

  return (
    <>
      <TodoInput
        todoValue={todoValue}
        setTodoValue={setTodoValue}
        handleAddTodos={handleAddTodos}
      />
      <TodoList
        handleDeleteTodos={handleDeleteTodos}
        handleEditTodos={handleEditTodos}
        todos={todos}
      />
    </>
  );
}

export default App;
