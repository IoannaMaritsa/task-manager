import React, { useState } from 'react';
import './popup.css'

const Popup = ({ task, disable, updateTask, deleteTask }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [date, setDate] = useState(task.date);

  const handleClosePopup = (e) => {
    if (e.target === e.currentTarget) disable();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'title') setTitle(value);
    else if (name === 'description') setDescription(value);
    else if (name === 'date') setDate(value);
  };

  const handleSaveTask = () => {
    updateTask(task.id, title, description, date);
    disable();
  };

  const handleDeleteTask = () => {
    deleteTask(task.id);
    disable();
  };

  return (
    <div className="overlay" onClick={handleClosePopup}>
      <div className="popup" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={disable}>X</button>
        <h2>Edit Task</h2>
        <input
          className='popup-input'
          type="text"
          name="title"
          value={title}
          onChange={handleInputChange}
        />
        <textarea
          className='popup-textarea'
          name="description"
          value={description}
          onChange={handleInputChange}
        />
        <input
          className='popup-input'
          type="date"
          name="date"
          value={date}
          onChange={handleInputChange}
        />
        <div className="popup-buttons">
          <button onClick={handleSaveTask}>Save Changes</button>
          <button onClick={handleDeleteTask}>Delete Task</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;