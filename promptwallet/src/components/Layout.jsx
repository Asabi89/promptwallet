import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { SunIcon, MoonIcon, HomeIcon, FileIcon, PlayIcon, ShieldIcon, InfoIcon } from './Icons';
import '../styles/Layout.css';

const Layout = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true') {
      setDarkMode(true);
      document.body.classList.add('dark-mode');
    }

    // Keyboard shortcuts
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case 'l':
            e.preventDefault();
            navigate('/');
            break;
          case 'n':
            e.preventDefault();
            navigate('/form');
            break;
          case 'd':
            e.preventDefault();
            toggleDarkMode();
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', !darkMode);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const text = event.target.result;
          const title = file.name.replace('.txt', '');
          
          // Save the new prompt
          const savedPrompts = JSON.parse(localStorage.getItem('prompts') || '[]');
          const newPrompt = {
            id: Date.now().toString(),
            title: title,
            text: text,
            createdAt: new Date().toISOString()
          };
          savedPrompts.push(newPrompt);
          localStorage.setItem('prompts', JSON.stringify(savedPrompts));
          
          // Navigate to edit the new prompt
          navigate(`/form/${newPrompt.id}`);
        };
        reader.readAsText(file);
      } else {
        alert('Please drop a text file (.txt)');
      }
    }
  };

  return (
    <div 
      className={`app-layout ${isDragging ? 'dragging' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {isDragging && (
        <div className="drop-overlay">
          <div className="drop-message">
            <FileIcon size={48} />
            <p>Drop text file to create new prompt</p>
          </div>
        </div>
      )}
      <nav className="navbar">
        <div className="navbar-brand">Prompt Wallet</div>
        <ul className="navbar-menu">
          <li><NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''} end><HomeIcon size={16} /> Dashboard</NavLink></li>
          <li><NavLink to="/form" className={({ isActive }) => isActive ? 'active' : ''}><FileIcon size={16} /> Form</NavLink></li>
          <li><NavLink to="/use" className={({ isActive }) => isActive ? 'active' : ''}><PlayIcon size={16} /> Use</NavLink></li>
          <li><NavLink to="/cgu" className={({ isActive }) => isActive ? 'active' : ''}><ShieldIcon size={16} /> CGU</NavLink></li>
          <li><NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}><InfoIcon size={16} /> About</NavLink></li>
        </ul>
        <div className="navbar-actions">
          <button className="dark-mode-toggle" onClick={toggleDarkMode} title={darkMode ? 'Light mode (Ctrl+D)' : 'Dark mode (Ctrl+D)'}>
            {darkMode ? <SunIcon size={18} /> : <MoonIcon size={18} />}
          </button>
        </div>
      </nav>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
