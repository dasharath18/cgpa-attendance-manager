import React from 'react';
import AttendanceGoal from '../components/AttendanceGoal';
import CGPACalculator from '../components/CGPACalculator';
import CGPABooster from '../components/CGPABooster';

const Dashboard = () => (
  <div>
    <h2>Dashboard</h2>
    <AttendanceGoal />
    <CGPACalculator />
    <CGPABooster />
  </div>
);

export default Dashboard;
