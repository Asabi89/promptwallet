import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SaveIcon } from '../components/Icons';
import '../styles/Form.css';

const Form = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    if (id) {
      const savedPrompts = JSON.parse(localStorage.getItem('prompts') || '[]');
      const prompt = savedPrompts.find(p => p.id === id);
      if (prompt) {
        setTitle(prompt.title);
        setText(prompt.text);
      }
    }
  }, [id]);

  const handleSave = () => {
    if (!title.trim() || !text.trim()) {
      alert('Please fill in all fields');
      return;
    }

    const savedPrompts = JSON.parse(localStorage.getItem('prompts') || '[]');
    
    if (id) {
      const index = savedPrompts.findIndex(p => p.id === id);
      if (index !== -1) {
        savedPrompts[index] = { ...savedPrompts[index], title, text };
      }
    } else {
      const newPrompt = {
        id: Date.now().toString(),
        title,
        text,
        createdAt: new Date().toISOString()
      };
      savedPrompts.push(newPrompt);
    }

    localStorage.setItem('prompts', JSON.stringify(savedPrompts));
    navigate('/');
  };

  return (
    <div className="form-page">
      <h1 className="form-title">{id ? 'Edit Prompt' : 'New Prompt'}</h1>
      
      <div className="form-container">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter prompt title..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="text">Prompt Text</label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your prompt text... Use [ placeholder ] for dynamic fields"
            rows={10}
          />
          <p className="form-hint">
            Tip: Use [ placeholder ] syntax for dynamic fields (e.g., [ language ], [ topic ])
          </p>
        </div>

        <button className="btn-save" onClick={handleSave}>
          <SaveIcon size={18} /> Save Prompt
        </button>
      </div>
    </div>
  );
};

export default Form;
