import React, { useState, useEffect } from 'react';

export default function List() {
    const [list, setList] = useState([]);
    const [input, setInput] = useState('');
  
    // Load todo list from local storage when component mounts
    useEffect(() => {
      const storedList = localStorage.getItem('todoList');
      if (storedList) {
        setList(JSON.parse(storedList));
      }
    }, []); // Empty dependency array to run this effect only once when component mounts
  
    // Function to update local storage and state with new list
    function updateList(newList) {
      localStorage.setItem('todoList', JSON.stringify(newList));
      setList(newList);
    }
  
    function addTodo(todo) {
      setInput(todo);
    }
  
    function handleSubmit(e) {
      e.preventDefault();
      if(input.length > 0) {
        const newTodo = { id: Date.now(), value: input, completed: false };
        updateList([...list, newTodo]);
        setInput('');
      }
    }
  
    function handleDelete(id) {
      const updatedList = list.filter(todo => todo.id !== id);
      updateList(updatedList);
    }
  
    function handleCompleted(id, completed) {
      const updatedList = list.map(todo => {
        if(todo.id === id) {
          todo.completed = completed;
        }
        return todo;
      });
      updateList(updatedList);
    }
  
    return (
      <>
        <div className='main'>
          <h2>Todo List</h2>
          <form className='form' onSubmit={handleSubmit}>
            <input value={input} type='text' className='user-input' onChange={e => addTodo(e.target.value)}/>
            <button className='button'>Submit</button>
          </form>
  
          <ol className='list'>
            {list.map((todo) => (
              <li key={todo.id} className={todo.completed ? 'completed' : ''}>
                <input 
                  type='checkbox' 
                  checked={todo.completed} 
                  onChange={(e) => handleCompleted(todo.id, e.target.checked)}
                />
                {todo.value}
                <button variant="outlined" color='error' className='delete-button' onClick={() => handleDelete(todo.id)}>Delete</button>
              </li>
            ))}
          </ol>
        </div>
      </>
    )
  }