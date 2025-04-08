import { useState } from 'react'
import plus from '/plus-icon.png'
import Header from './components/header.jsx'
import Showcase from './components/showcase.jsx'
import './App.css'

function App() {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [tasks, setTasks] = useState(() => {
    // Load tasks from localStorage on initial load
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [addingTask, setAddingTask] = useState(false);
  const [filter, setFilter] = useState('all'); 

  const ToggleAddTask = () => {
    setAddingTask(!addingTask);
  };

  const getNextId = (tasks) => {
    if (!tasks.length) return 1;
    return Math.max(...tasks.map(task => task.id)) + 1;
  };

  // Create a new task object
  const handleAddTask = () => {
    if (!title) {
      alert('Please fill in the title')
      return false;
    }
    const newTask = { id: getNextId(tasks), title, description: description ||'-', date, status:'incomplete' };

    const updatedTasks = [...tasks, newTask];

    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    setTasks(updatedTasks);

    setTitle('');
    setDescription('');
    setDate(() => new Date().toISOString().split('T')[0]);
    setAddingTask(false);
  };

  //remove all tasks
  const clearTasks = () => {
    localStorage.removeItem('tasks');
    setTasks([]);
  };

  //change filter
  const handleFilterChange = (option) => {
    setFilter(option);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'complete') return task.status === 'complete';
    if (filter === 'incomplete') return task.status === 'incomplete';
    return true;
  });

  // update the status of a task
  const updateStatus = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, status: task.status === 'complete' ? 'incomplete' : 'complete' } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  //delete a specific task
  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
  
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    setTasks(updatedTasks);
  };

  //edit a specific task
  const updateTask = (taskId, newTitle, newDescription, newDate) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId
        ? { ...task, title: newTitle, description: newDescription, date: newDate }
        : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  return (
    <>
      <Header/>
      <div className='main'>
        <div className='options'>
          <h3> Task Board </h3>
          <button onClick={clearTasks} className='clear-button'>Clear All</button>
        </div>
      </div>
      <div className='main'>
        <div className='filter-buttons'>
          <button onClick={() => handleFilterChange('all') } className={`filter-button ${filter === 'all' ? 'active' : ''}`} >All Tasks</button>
          <button onClick={() => handleFilterChange('complete')} className={`filter-button ${filter === 'complete' ? 'active' : ''}`} >Completed Tasks</button>
          <button onClick={() => handleFilterChange('incomplete')} className={`filter-button ${filter === 'incomplete' ? 'active' : ''}`} >Incomplete Tasks</button>
        </div>       
        <Showcase tasks={filteredTasks} updateStatus={updateStatus} updateTask={updateTask} deleteTask={deleteTask}/>

        <button className='newTaskButton' onClick={ToggleAddTask}>
          <img src={plus} alt="" className="button-icon" />
          <span className="button-text">Add New Task</span>
        </button>
        <div className={`add-container ${addingTask ? 'visible' : ''}`}>
            <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input"
          />
          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input"
          />

          <button onClick={handleAddTask} className="button">Add Task</button>
        </div>
      </div>
        
    </>
  )
}

export default App
