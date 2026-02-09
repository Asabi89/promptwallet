import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CopyIcon, CheckIcon } from '../components/Icons';
import '../styles/UsePrompt.css';

const UsePrompt = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState(null);
  const [dynamicValues, setDynamicValues] = useState({});
  const [copied, setCopied] = useState(false);
  
  const [options, setOptions] = useState({
    type: '',
    audience: '',
    theme: '',
    ton: ''
  });

  useEffect(() => {
    const savedPrompts = JSON.parse(localStorage.getItem('prompts') || '[]');
    const found = savedPrompts.find(p => p.id === id);
    if (found) {
      setPrompt(found);
      const placeholders = extractPlaceholders(found.text);
      const initialValues = {};
      placeholders.forEach(p => {
        initialValues[p] = '';
      });
      setDynamicValues(initialValues);
    } else {
      navigate('/use');
    }
  }, [id, navigate]);

  const extractPlaceholders = (text) => {
    const regex = /\[\s*([^\]]+)\s*\]/g;
    const matches = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
      const placeholder = match[1].trim();
      if (!matches.includes(placeholder)) {
        matches.push(placeholder);
      }
    }
    return matches;
  };

  const getFilledPrompt = () => {
    if (!prompt) return '';
    let filledText = prompt.text;
    Object.entries(dynamicValues).forEach(([key, value]) => {
      const regex = new RegExp(`\\[\\s*${key}\\s*\\]`, 'g');
      filledText = filledText.replace(regex, value || `[ ${key} ]`);
    });
    
    // Add personalization options
    let personalizations = [];
    if (options.type) personalizations.push(`Type: ${options.type}`);
    if (options.audience) personalizations.push(`Audience: ${options.audience}`);
    if (options.theme) personalizations.push(`Theme: ${options.theme}`);
    if (options.ton) personalizations.push(`Tone: ${options.ton}`);
    
    if (personalizations.length > 0) {
      filledText = `[Context: ${personalizations.join(' | ')}]\n\n${filledText}`;
    }
    
    return filledText;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getFilledPrompt());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleOptionChange = (field, value) => {
    setOptions({ ...options, [field]: value });
  };

  if (!prompt) {
    return <div className="loading">Loading...</div>;
  }

  const placeholders = extractPlaceholders(prompt.text);

  return (
    <div className="use-prompt-page">
      <h1 className="use-prompt-title">{prompt.title}</h1>

      <div className="personalization-section">
        <h3>Personalization Options</h3>
        <div className="personalization-grid">
          <div className="personalization-field">
            <label htmlFor="type">Type</label>
            <select
              id="type"
              value={options.type}
              onChange={(e) => handleOptionChange('type', e.target.value)}
            >
              <option value="">Select type...</option>
              <option value="Email">Email</option>
              <option value="Blog Post">Blog Post</option>
              <option value="Social Media">Social Media</option>
              <option value="Code">Code</option>
              <option value="Documentation">Documentation</option>
              <option value="Creative">Creative</option>
            </select>
          </div>

          <div className="personalization-field">
            <label htmlFor="audience">Audience</label>
            <select
              id="audience"
              value={options.audience}
              onChange={(e) => handleOptionChange('audience', e.target.value)}
            >
              <option value="">Select audience...</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Expert">Expert</option>
              <option value="General Public">General Public</option>
              <option value="Professional">Professional</option>
              <option value="Student">Student</option>
            </select>
          </div>

          <div className="personalization-field">
            <label htmlFor="theme">Theme</label>
            <select
              id="theme"
              value={options.theme}
              onChange={(e) => handleOptionChange('theme', e.target.value)}
            >
              <option value="">Select theme...</option>
              <option value="Technical">Technical</option>
              <option value="Business">Business</option>
              <option value="Educational">Educational</option>
              <option value="Marketing">Marketing</option>
              <option value="Personal">Personal</option>
              <option value="Creative">Creative</option>
            </select>
          </div>

          <div className="personalization-field">
            <label htmlFor="ton">Tone</label>
            <select
              id="ton"
              value={options.ton}
              onChange={(e) => handleOptionChange('ton', e.target.value)}
            >
              <option value="">Select tone...</option>
              <option value="Formal">Formal</option>
              <option value="Casual">Casual</option>
              <option value="Friendly">Friendly</option>
              <option value="Professional">Professional</option>
              <option value="Humorous">Humorous</option>
              <option value="Serious">Serious</option>
            </select>
          </div>
        </div>
      </div>

      {placeholders.length > 0 && (
        <div className="dynamic-fields">
          <h3>Fill in the dynamic fields:</h3>
          {placeholders.map((placeholder) => (
            <div key={placeholder} className="dynamic-field">
              <label htmlFor={placeholder}>{placeholder}</label>
              <input
                type="text"
                id={placeholder}
                value={dynamicValues[placeholder] || ''}
                onChange={(e) =>
                  setDynamicValues({ ...dynamicValues, [placeholder]: e.target.value })
                }
                placeholder={`Enter ${placeholder}...`}
              />
            </div>
          ))}
        </div>
      )}

      <div className="prompt-preview">
        <h3>Prompt Preview:</h3>
        <pre className="prompt-text">{getFilledPrompt()}</pre>
      </div>

      <button className="btn-copy" onClick={handleCopy}>
        {copied ? <><CheckIcon size={18} /> Copied!</> : <><CopyIcon size={18} /> Copy to Clipboard</>}
      </button>
    </div>
  );
};

export default UsePrompt;
