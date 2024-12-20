import React, { useState, useEffect } from "react";

function TodoList() {
  // Load todos from local storage or initialize with an empty array
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [input, setInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);

  // Save todos to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
      setInput("");
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const startEditing = (todo) => {
    setIsEditing(true);
    setInput(todo.text);
    setCurrentTodo(todo);
  };

  const editTodo = () => {
    setTodos(
      todos.map((todo) =>
        todo.id === currentTodo.id ? { ...todo, text: input } : todo
      )
    );
    setInput("");
    setIsEditing(false);
    setCurrentTodo(null);
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="App" style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Todo List</h1>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Write a task..."
      />
      {isEditing ? (
        <button onClick={editTodo} style={{ marginLeft: "5px" }}>
          Update
        </button>
      ) : (
        <button onClick={addTodo} style={{ marginLeft: "5px" }}>
          Add
        </button>
      )}

      <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              margin: "10px 0",
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />
            {todo.text}
            <button
              onClick={() => startEditing(todo)}
              style={{ marginLeft: "10px" }}
            >
              Edit
            </button>
            <button
              onClick={() => deleteTodo(todo.id)}
              style={{ marginLeft: "5px" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;