import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusIcon, EditIcon, TrashIcon, SearchIcon } from '../components/Icons';
import '../styles/Dashboard.css';

const examplePrompts = [
  {
    id: '1',
    title: 'Code Explanation',
    text: 'You are an experienced [ language ] developer. Please explain the following code snippet in simple terms:\n\n[ code ]\n\nProvide a step-by-step breakdown of what the code does.',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Bug Finder',
    text: 'You are a senior software engineer specialized in debugging. Analyze the following [ language ] code and identify any bugs, potential issues, or improvements:\n\n[ code ]\n\nList each issue with an explanation and suggested fix.',
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Learning Assistant',
    text: 'You are an experienced [ language ] instructor. I am learning web development and need help understanding [ topic ].\n\nPlease explain this concept with:\n1. A simple definition\n2. Real-world examples\n3. Code snippets\n4. Common mistakes to avoid',
    createdAt: new Date().toISOString()
  },
  {
    id: '4',
    title: 'Code Refactoring',
    text: 'You are an expert in clean code practices. Please refactor the following [ language ] code to improve:\n- Readability\n- Performance\n- Best practices\n\n[ code ]\n\nExplain each change you make.',
    createdAt: new Date().toISOString()
  },
  {
    id: '5',
    title: 'API Documentation',
    text: 'Generate comprehensive API documentation for the following [ language ] function/endpoint:\n\n[ code ]\n\nInclude:\n- Description\n- Parameters\n- Return values\n- Usage examples\n- Error handling',
    createdAt: new Date().toISOString()
  }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [prompts, setPrompts] = useState([]);
  const [filter, setFilter] = useState('');
  const [deleteModal, setDeleteModal] = useState({ show: false, promptId: null });

  useEffect(() => {
    loadPrompts();
  }, []);

  const loadPrompts = () => {
    const savedPrompts = localStorage.getItem('prompts');
    if (savedPrompts) {
      setPrompts(JSON.parse(savedPrompts));
    } else {
      setPrompts(examplePrompts);
      localStorage.setItem('prompts', JSON.stringify(examplePrompts));
    }
  };

  const filteredPrompts = prompts.filter(prompt =>
    prompt.title.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDelete = (id) => {
    setDeleteModal({ show: true, promptId: id });
  };

  const confirmDelete = () => {
    const updatedPrompts = prompts.filter(p => p.id !== deleteModal.promptId);
    setPrompts(updatedPrompts);
    localStorage.setItem('prompts', JSON.stringify(updatedPrompts));
    setDeleteModal({ show: false, promptId: null });
  };

  const cancelDelete = () => {
    setDeleteModal({ show: false, promptId: null });
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">My Prompt</h1>
        <div className="dashboard-actions">
          <input
            type="text"
            className="filter-input"
            placeholder="Filter prompts..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <button className="btn-new" onClick={() => navigate('/form')}>
            <PlusIcon size={18} /> New Prompt
          </button>
        </div>
      </div>

      {filteredPrompts.length === 0 ? (
        <div className="empty-state">
          <h3>No prompts yet</h3>
          <p>Create your first prompt to get started</p>
          <button className="btn-new" onClick={() => navigate('/form')}>
            <PlusIcon size={18} /> New Prompt
          </button>
        </div>
      ) : (
        <div className="prompts-grid">
          {filteredPrompts.map((prompt) => (
            <div key={prompt.id} className="prompt-card">
              <div className="prompt-card-header">
                <h3
                  className="prompt-card-title"
                  onClick={() => navigate(`/use/${prompt.id}`)}
                >
                  {prompt.title}
                </h3>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(prompt.id)}
                  title="Delete"
                >
                  <TrashIcon size={16} />
                </button>
              </div>
              <p className="prompt-card-description">
                {prompt.text.substring(0, 100)}...
              </p>
              <div className="prompt-card-actions">
                <button
                  className="btn-edit"
                  onClick={() => navigate(`/form/${prompt.id}`)}
                >
                  <EditIcon size={14} /> Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {deleteModal.show && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this prompt?</p>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={cancelDelete}>
                Cancel
              </button>
              <button className="btn-confirm" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
