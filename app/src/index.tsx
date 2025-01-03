// FILEPATH: d:/github/marscode/app/src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './index.css';
import Login from './pages/Login.tsx';
import Home from './pages/Home.tsx';
import User from './pages/User.tsx';
import Control from './pages/Control.tsx';

const handleLogin = (username: string, password: string) => {
  // 在这里处理登录逻辑
  console.log('登录尝试', username, password);
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route path="/control" element={<Control />} /> 
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
