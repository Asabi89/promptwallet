import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Form from './pages/Form';
import UsePage from './pages/UsePage';
import UsePrompt from './pages/UsePrompt';
import Cgu from './pages/Cgu';
import About from './pages/About';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="form" element={<Form />} />
        <Route path="form/:id" element={<Form />} />
        <Route path="use" element={<UsePage />} />
        <Route path="use/:id" element={<UsePrompt />} />
        <Route path="cgu" element={<Cgu />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  );
};

export default App;
