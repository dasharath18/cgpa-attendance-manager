import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Style.css';

const AttendanceGoal = () => {
  const [attended, setAttended] = useState('');
  const [absent, setAbsent] = useState('');
  const [goal, setGoal] = useState('');
  const [total, setTotal] = useState('');
  const [result, setResult] = useState('');

  const isValid = () => {
    const a = +attended;
    const b = +absent;
    const g = +goal;
    if (
      isNaN(a) || isNaN(b) || isNaN(g) ||
      a < 0 || b < 0 || g <= 0 || g > 100
    ) {
      setResult('Enter valid numbers: Attended, Absent (≥ 0) and Goal % (1-100).');
      return false;
    }
    return true;
  };

  const handleUnknownTotal = async () => {
    if (!isValid()) return;
    try {
      const { data } = await axios.post('/api/attendance/goal/unknown-total', {
        attended: +attended,
        absent: +absent,
        goalPercent: +goal,
      });
      setResult(`You need to attend at least ${data.needed} more classes to reach your goal.`);
    } catch {
      setResult('Error calculating goal (without total).');
    }
  };

  const handleKnownTotal = async () => {
    const t = +total;
    if (!isValid() || isNaN(t) || t < +attended) {
      setResult('Enter a valid total (≥ attended).');
      return;
    }
    try {
      const { data } = await axios.post('/api/attendance/goal/known-total', {
        attended: +attended,
        total: t,
        goalPercent: +goal,
      });
      setResult(`You need to attend at least ${data.needed} classes more to reach your goal.`);
    } catch {
      setResult('Error calculating goal (with total).');
    }
  };

  return (
    <div className="cgpa-calculator">
      <h2>Attendance Goal Planner</h2>

      <div className="form-row">
        <label>Attended Classes:</label>
        <input
          type="number"
          placeholder="Attended Classes"
          value={attended}
          onChange={(e) => setAttended(e.target.value)}
          min="0"
        />
      </div>

      <div className="form-row">
        <label>Absent Classes:</label>
        <input
          type="number"
          placeholder="Absent Classes"
          value={absent}
          onChange={(e) => setAbsent(e.target.value)}
          min="0"
        />
      </div>

      <div className="form-row">
        <label>Attendance Goal (%):</label>
        <input
          type="number"
          placeholder="Goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          min="1"
          max="100"
        />
      </div>

      <div className="form-row">
        <label>Total Classes (optional):</label>
        <input
          type="number"
          placeholder="Total Classes"
          value={total}
          onChange={(e) => setTotal(e.target.value)}
          min="0"
        />
      </div>

      <div className="button-group">
        <button onClick={handleUnknownTotal}>Estimate Without Total Classes</button>
        <button onClick={handleKnownTotal}>Estimate Using Total Classes</button>
      </div>

      {result && <p className="result-message">{result}</p>}
       <div className="navigation-links">
        <Link to="/cgpa-booster">
          <button>Go to Target CGPA Planner</button>
        </Link>
        <Link to="/cgpa">
          <button>Go to SGPA Calculator</button>
        </Link>
      </div>
    </div>
  );
};

export default AttendanceGoal;
