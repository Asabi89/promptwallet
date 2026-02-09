import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlayIcon, SearchIcon } from '../components/Icons';
import '../styles/UsePage.css';

const UsePage = () => {
  const navigate = useNavigate();
  const [prompts, setPrompts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const savedPrompts = JSON.parse(localStorage.getItem('prompts') || '[]');
    setPrompts(savedPrompts);
  }, []);

  const filteredPrompts = prompts.filter(prompt =>
    prompt.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="use-page">
      <h1 className="use-page-title">Select a Prompt to Use</h1>
      
      <div className="use-page-search">
        <SearchIcon size={18} />
        <input
          type="text"
          placeholder="Search prompts..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      {filteredPrompts.length === 0 ? (
        <div className="use-page-empty">
          <p>No prompts found. Create some prompts first!</p>
        </div>
      ) : (
        <div className="use-page-grid">
          {filteredPrompts.map((prompt) => (
            <div
              key={prompt.id}
              className="use-prompt-card"
              onClick={() => navigate(`/use/${prompt.id}`)}
            >
              <h3 className="use-prompt-card-title">{prompt.title}</h3>
              <p className="use-prompt-card-preview">
                {prompt.text.substring(0, 100)}...
              </p>
              <button className="use-prompt-card-btn">
                <PlayIcon size={14} /> Use Prompt
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UsePage;
