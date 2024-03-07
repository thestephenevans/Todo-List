import React, { useState, useEffect } from 'react';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';

import { blue } from '@mui/material/colors';
import { red } from '@mui/material/colors';

export default function List() {
    const [list, setList] = useState([]);
    const [input, setInput] = useState('');
    const [showingCompleted, setShowingCompleted] = useState(false);

  
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
        const newTodo = { id: Date.now(), value: input, category: '', completed: false };
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

    function showCompletedTodos() {
      if (showingCompleted) {
        const storedList = JSON.parse(localStorage.getItem('todoList'));
        setList(storedList);
        setShowingCompleted(false);
      } else {
        const completedList = list.filter(todo => todo.completed);
        if (completedList.length > 0) {
          setList(completedList);
          setShowingCompleted(true);
        } else {
          alert('No Completed Todos');
        }
      }
    }
  
    return (
      <>
        <div className='main'>
          <Typography variant = "h2" component="h1" mb={4}> Todo List </Typography>
          <form className='form' onSubmit={handleSubmit}>
            <TextField id="outlined-basic" label="Enter Task" variant="filled" value={input} onChange={e => addTodo(e.target.value)} 
              sx={{backgroundColor: blue[400]}}
            />
            <button className='button'>Submit</button>

            <button className='completed-button' onClick={showCompletedTodos}>{showingCompleted ? "Show all tasks" : "Show all completed Tasks"}</button>
          </form>
  
          <ol className='list'>
            {list.map((todo) => (
              <li key={todo.id} className={todo.completed ? 'completed' : ''}>
                <Checkbox checked={todo.completed} color='success' sx={{color: blue[400]}} onChange={(e) => handleCompleted(todo.id, e.target.checked)}/>
                {todo.value}
                <Tooltip title="Delete">
                  <IconButton onClick={() => handleDelete(todo.id)}>
                    <DeleteIcon color="primary" sx={{color: red[400]}} />
                  </IconButton>
                </Tooltip>
              </li>
            ))}
          </ol>
        </div>
      </>
    )
  }