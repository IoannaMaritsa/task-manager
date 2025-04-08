import React, { useState } from 'react'
import {format, parseISO, isToday, isPast} from 'date-fns'
import icon from '../assets/dots-icon.png'
import Popup from './popup'
import './showcase.css'

const Showcase = ({tasks, updateStatus, updateTask, deleteTask}) => {

  const [selectedTask, setSelectedTask] = useState(null);

  const openPopup = (task) => setSelectedTask(task);
  const closePopup = () => setSelectedTask(null);

  const groupTasksByDate = () => {
    const grouped = {};
  
    tasks.forEach(task => {
      const date = parseISO(task.date);
      let label = format(date, 'PPP');
  
      if (isToday(date)) label = 'Today';
      else if (isPast(date)) label = 'Overdue';
  
      if (!grouped[label]) grouped[label] = [];
      grouped[label].push(task);
    });
  
    return grouped;
  };
  
  const groupedTasks = groupTasksByDate();

  return (
    <div className='showcase-container'>
      <div className='task-list'>
        {!tasks.length && (
          <h3>No tasks with this status have been registered yet!</h3>
        )}
        {Object.entries(groupedTasks).map(([label, tasks]) => (
          <div key={label}>
            <div className='label'>{label}</div>
            {tasks.map(task => (
              <li className='taskItem'>
                {task.status === 'complete' && (
                <input
                    key={task.id}
                    type="checkbox"
                    checked
                    onChange={() => updateStatus(task.id)}  // Toggle status
                    className='checkbox'
                />
                )}

                {/* If the task is not completed, render a checkbox to mark as complete */}
                {task.status !== 'complete' && (
                <input
                    key={task.id}
                    type="checkbox"
                    onChange={() => updateStatus(task.id)}  // Toggle status
                    className='checkbox'
                />
                )}
                <div className='task-title'>{task.title}</div>
                <div className='task-description'>{task.description}</div>
                <img src={icon} alt="edit" className="button-icon" onClick={() => openPopup(task)}/>
              </li>
            ))}
          </div>
        ))}
      </div>
      {selectedTask && (
        <Popup
          task={selectedTask}
          disable={closePopup}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
      )}
    </div>
  );
};

export default Showcase;