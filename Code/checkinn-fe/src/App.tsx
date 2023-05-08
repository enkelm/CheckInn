import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './features/authentication/Login/Login';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;
