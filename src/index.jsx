import React from 'react'
import './index.css';
import App from './App';
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import ClassComponent from './Pages/ClassComponent';
import FunctionalComponent from './Pages/FunctionalComponent';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);

function Main() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/ClassComponent" element={<ClassComponent />} />
        <Route path="/FunctionalComponent" element={<FunctionalComponent />} />
      </Routes>
    </Router>
  );
}
