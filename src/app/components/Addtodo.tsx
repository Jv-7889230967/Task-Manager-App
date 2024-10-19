"use client"
import React, { useState, useEffect } from 'react';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { todoobject } from '../Models/todoobject';
import { v4 as uuid } from 'uuid';

const AddTodo: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [descrp, setDescrp] = useState<string>('');
  const [status, setStatus] = useState<boolean>(false);
  const [priority, setPriority] = useState<string>('low');
  const [todos, setTodos] = useState<todoobject[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<todoobject | null>(null);

  // Load todos from localStorage on mount
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    const newTodo: todoobject = { id: uuid(), title, descrp, status, priority };
    const updatedTodos = [newTodo, ...todos].sort(sortTodos);
    setTodos(updatedTodos);
    resetForm();
  };

  const deleteTodo = (id: string) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  const updateTodo = (id: string) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, title, descrp, status, priority };
      }
      return todo;
    }).sort(sortTodos);
    setTodos(updatedTodos);
    resetForm();
  };

  const editTodo = (todo: todoobject) => {
    setSelectedTodo(todo);
    setTitle(todo.title);
    setDescrp(todo.descrp);
    setStatus(todo.status);
    setPriority(todo.priority);
  };

  const toggleStatus = (id: string) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, status: !todo.status };
      }
      return todo;
    }).sort(sortTodos);
    setTodos(updatedTodos);
  };

  const resetForm = () => {
    setTitle('');
    setDescrp('');
    setStatus(false);
    setPriority('low');
    setSelectedTodo(null);
  };

  const sortTodos = (a: todoobject, b: todoobject) => {
    // Sort by status: incomplete tasks first, completed tasks at the bottom
    if (a.status !== b.status) {
      return a.status ? 1 : -1;
    }
    // If both are incomplete or both are completed, sort by priority
    const priorities = ['high', 'moderate', 'low'];
    return priorities.indexOf(a.priority) - priorities.indexOf(b.priority);
  };

  return (
    <div className='size-screen flex flex-col gap-[50px]'>
      <div className='h-fit w-full flex flex-row flex-wrap justify-center items-center gap-[15px]'>
        <input
          type="text"
          placeholder="Add Title"
          onChange={e => setTitle(e.target.value)}
          value={title}
        />
        <input
          type="text"
          placeholder="Add Description"
          onChange={e => setDescrp(e.target.value)}
          value={descrp}
        />
        <select
          className='h-[40px] w-[100px] rounded-[7px] border-[1px] border-solid border-black bg-inherit'
          onChange={e => setPriority(e.target.value)}
          value={priority}
        >
          <option value="low">low</option>
          <option value="moderate">moderate</option>
          <option value="high">high</option>
        </select>
        {!selectedTodo ? (
          <button
            className={`h-[40px] w-[150px] text-white text-xl font-semibold rounded-[7px] bg-[#0284c7] cursor-pointer ${title ? '' : 'disabled'}`}
            onClick={addTodo}
            disabled={!title}
          >
            Add Task
          </button>
        ) : (
          <button
            className={`h-[40px] w-[150px] text-white text-xl font-semibold rounded-[7px] bg-[#0284c7] cursor-pointer ${title ? '' : 'disabled'}`}
            onClick={() => updateTodo(selectedTodo.id)}
            disabled={!title}
          >
            Update Todo
          </button>
        )}
      </div>
      {todos.length > 0 && (
        <div className='h-fit w-full flex justify-center bg-white'>
          <table>
            <thead>
              <tr>
                <th style={{ paddingRight: '1rem' }}>Title</th>
                <th style={{ paddingRight: '1rem' }}>Description</th>
                <th style={{ paddingRight: '1rem' }}>Priority</th>
                <th style={{ paddingRight: '1rem' }}>Status</th>
                <th style={{ paddingLeft: '4rem' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {todos.map(todo => (
                <tr key={todo.id}>
                  <td>{todo.title}</td>
                  <td>{todo.descrp}</td>
                  <td>{todo.priority}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={todo.status}
                      onChange={() => toggleStatus(todo.id)}
                      className="checkbox checkbox-success"
                    />
                  </td>
                  <td>
                    <button className="ml-10 p-4" onClick={() => editTodo(todo)}>
                      <AiFillEdit size={25} style={{ color: 'green' }} />
                    </button>
                    <button onClick={() => deleteTodo(todo.id)}>
                      <AiFillDelete size={25} style={{ color: 'red' }} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AddTodo;
