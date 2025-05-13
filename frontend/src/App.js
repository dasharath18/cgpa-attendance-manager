import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import AttendanceGoal from './components/AttendanceGoal';
import CGPACalculator from './components/CGPACalculator';
import CGPABooster from './components/CGPABooster';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/attendance-goal" element={<AttendanceGoal />} />
        <Route path="/cgpa" element={<CGPACalculator />} />
        <Route path="/cgpa-booster" element={<CGPABooster />} />
      </Routes>
    </div>
  );
};

export default App;
