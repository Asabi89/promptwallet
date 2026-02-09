import React from 'react';
import '../styles/Pages.css';

const Cgu = () => {
  return (
    <div className="page-container">
      <h1 className="page-title">Terms of Use</h1>
      
      <section className="page-section">
        <h2>Features</h2>
        <ul>
          <li>Create and manage a personal library of prompts</li>
          <li>Use dynamic placeholders in prompts for customization</li>
          <li>Copy prompts to clipboard for use in LLM applications</li>
          <li>Dark mode support for comfortable viewing</li>
          <li>Keyboard shortcuts for improved productivity</li>
          <li>Drag & drop text files to create new prompts</li>
          <li>Offline functionality - all data stored locally</li>
        </ul>
      </section>

      <section className="page-section">
        <h2>Developers</h2>
        <p>
          Prompt Wallet is developed by students at L'École Multimédia as part of 
          the CDA 2ème année program (2025).
        </p>
      </section>

      <section className="page-section">
        <h2>Data Management</h2>
        <p>
          All your prompts are stored locally on your device using browser localStorage.
          No data is transmitted to external servers. You have complete control over 
          your data and can delete it at any time by clearing your browser storage.
        </p>
        <p>
          <strong>Privacy:</strong> We do not collect, store, or share any personal information.
          Your prompts remain private and accessible only on your device.
        </p>
      </section>
    </div>
  );
};

export default Cgu;
