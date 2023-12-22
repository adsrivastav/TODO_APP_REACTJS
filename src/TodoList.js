import React, { useState, useEffect } from 'react';
import './TodoList.css';

const TodoApp = () => {
  const [todos, setTodos] = useState(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    return storedTodos.map((todo) => ({
      ...todo,
      createdTime: todo.createdTime || Date.now(),
      completedTime: todo.completedTime || null,
    }));
  });

  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    if (text.trim() !== '') {
      const newTodoItem = {
        id: Date.now(),
        text: text,
        completed: false,
        createdTime: Date.now(),
        completedTime: null,
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo('');
    }
  };

  const markComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: true, completedTime: Date.now() } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const resetTodos = () => {
    setTodos([]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo(newTodo);
    }
  };

  const activeTodos = todos.filter((todo) => !todo.completed);

  const completedTodos = todos
    .filter((todo) => todo.completed)
    .sort((a, b) => b.completedTime - a.completedTime);

  return (
    <div className="todo-app">
      <div className="todo-app-header">
        <h1 className="app-title">TODO App</h1>
      </div>
      <div className="input-container">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter your task..."
          className="task-input"
        />
        <button onClick={() => addTodo(newTodo)} className="add-button">
          Add
        </button>
      </div>

      <div className="todos-container">
        <ul className="active-todos">
          {activeTodos.map((todo, index) => (
            <li key={todo.id}>
              <span>{index + 1}. </span>
              <span>{todo.text}</span>
              <button onClick={() => markComplete(todo.id)}>Mark as Complete</button>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>

        <hr className="divider" />

        <ul className="completed-todos">
          {completedTodos.map((todo, index) => (
            <li key={todo.id} className="completed">
              <span>{index + 1}. </span>
              <span>{todo.text}</span>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={resetTodos} className="reset-button">
        Reset
      </button>
    </div>
  );
};

export default TodoApp;
