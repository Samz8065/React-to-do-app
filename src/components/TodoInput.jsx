export default function TodoInput(props) {
  const { handleAddTodos, todoValue, setTodoValue } = props;

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && todoValue.trim()) {
      handleAddTodos(todoValue.trim());
      setTodoValue("");
    }
  };

  return (
    <header>
      <input
        value={todoValue}
        onChange={(event) => {
          setTodoValue(event.target.value);
        }}
        onKeyDown={handleKeyDown}
        maxLength={60}
        placeholder="Enter task..."
      />
      <button
        onClick={() => {
          handleAddTodos(todoValue.trim());
          setTodoValue('')
        }}
      >
        Add
      </button>
    </header>
  );
}
