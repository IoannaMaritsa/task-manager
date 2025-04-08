import React, { useState, useEffect } from 'react';
import './header.css'
import icon from '/task-icon.png'

const Header = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    const savedText = localStorage.getItem('headerText');
    if (savedText) {
      setText(savedText);
    }
  }, []);

  useEffect(() => {
    if (text) {
      localStorage.setItem('headerText', text);
    }
  }, [text]);

  const handleDoubleClick = () => setIsEditing(true);

  const handleChange = (e) => setText(e.target.value);

  const handleBlur = () => setIsEditing(false);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') setIsEditing(false);
  };

  return (
    <div className='header'>
      <img src={icon} alt="task-icon" className='header-image' />
      <span>
        {isEditing ? (
          <input
            autoFocus
            value={text}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className='header-input'
          />
        ) : (
          <h1 onDoubleClick={handleDoubleClick} className='header-text'>
            {text || 'My Personal Task Manager'}
          </h1>
        )}
      </span>
    </div>
  );
};

export default Header;