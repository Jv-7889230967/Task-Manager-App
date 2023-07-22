"use client"
import React, { useState } from 'react';
import { AiOutlinePlus, AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { todoobject } from '../Models/todoobject';
import { v4 as uuid } from 'uuid';

const AddTodo: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [descrp, setDescrp] = useState<string>('');
  const [status, setStatus] = useState<boolean>(false);
  const [todos, setTodos] = useState<todoobject[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<todoobject | null>(null);

  const addTodo = () => {
    const newTodo: todoobject = { id: uuid(), title, descrp, status };
    setTodos([newTodo, ...todos]);
    setTitle('');
    setDescrp('');
    setStatus(false);
  };

  const deleteTodo = (id: string) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  const updateTodo = (id: string) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, title, descrp, status };
      }
      return todo;
    });
    setTodos(updatedTodos);
    setSelectedTodo(null);
    setTitle('');
    setDescrp('');
    setStatus(false);
  };

  const editTodo = (todo: todoobject) => {
    setSelectedTodo(todo);
    setTitle(todo.title);
    setDescrp(todo.descrp);
    setStatus(todo.status);
  };

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Add Title"
          className="p-2 rounded mr-5 text-slate-900"
          onChange={e => setTitle(e.target.value)}
          value={title}
        />
        <input
          type="text"
          placeholder="Add Description"
          className="p-2 rounded mr-5 text-slate-900"
          onChange={e => setDescrp(e.target.value)}
          value={descrp}
        />
        {!selectedTodo ? (
          <button
            className={`btn btn-primary ${title ? '' : 'disabled'}`}
            onClick={addTodo}
            disabled={!title}
          >
            Add Todo <AiOutlinePlus className="ml-2" />
          </button>
        ) : (
          <button
            className={`btn btn-primary ${title ? '' : 'disabled'}`}
            onClick={() => updateTodo(selectedTodo.id)}
            disabled={!title}
          >
            Update Todo
          </button>
        )}
      </div>
      {todos.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '1rem' }}>
          <table>
            <thead>
              <tr>
                <th style={{ paddingRight: '1rem' }}>Title</th>
                <th style={{ paddingRight: '1rem' }}>Description</th>
                <th style={{ paddingRight: '1rem' }}>Status</th>
                <th style={{ paddingLeft: '4rem' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {todos.map(todo => (
                <tr key={todo.id}>
                  <td>{todo.title}</td>
                  <td>{todo.descrp}</td>
                  <td>
                    <input type="checkbox" className="checkbox checkbox-success" />
                  </td>
                  <td>
                    <button
                      className="ml-10 p-4"
                      onClick={() => editTodo(todo)}
                    >
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
    </>
  );
};

export default AddTodo;
