import React from 'react';
import '../styles/Pages.css';

const About = () => {
  return (
    <div className="page-container">
      <h1 className="page-title">About Prompt Wallet</h1>
      
      <section className="page-section">
        <h2>Developers</h2>
        <p>
          Prompt Wallet is developed by students at L'École Multimédia, Paris.
        </p>
        <p>
          CDA 2ème année - 2025
        </p>
      </section>

      <section className="page-section">
        <h2>Development Context</h2>
        <p>
          This application was developed as part of the CDA (Concepteur Développeur 
          d'Applications) certification program. The project demonstrates competencies 
          in:
        </p>
        <ul>
          <li>Setting up and configuring development environments</li>
          <li>Developing user interfaces with React</li>
          <li>Building desktop applications with Electron</li>
          <li>Managing software projects using Agile methodology</li>
          <li>Defining software architecture</li>
        </ul>
      </section>

      <section className="page-section">
        <h2>Company</h2>
        <p>
          <strong>EverydayLLM</strong> - A startup dedicated to developing tools 
          around artificial intelligence technologies.
        </p>
        <p>
          <strong>Team:</strong>
        </p>
        <ul>
          <li>Albertine - Director</li>
          <li>Joanne - Commercial</li>
          <li>Development Team - Application Developers</li>
        </ul>
      </section>

      <section className="page-section">
        <h2>Technology Stack</h2>
        <ul>
          <li>React - User Interface</li>
          <li>Electron - Desktop Application Framework</li>
          <li>Vite - Build Tool</li>
          <li>LocalStorage - Data Persistence</li>
        </ul>
      </section>

      <section className="page-section">
        <h2>Version</h2>
        <p>Version 1.0.0</p>
      </section>
    </div>
  );
};

export default About;
