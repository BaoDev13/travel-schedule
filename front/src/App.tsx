import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import TravelDetails from './components/TravelDetails';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/travel/:id" element={<TravelDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
