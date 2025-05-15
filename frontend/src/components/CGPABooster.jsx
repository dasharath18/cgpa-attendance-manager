import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Style.css';

const CGPABooster = () => {
  const [prevCgpa, setPrevCgpa] = useState('');
  const [prevCredits, setPrevCredits] = useState('');
  const [goalCgpa, setGoalCgpa] = useState('');
  const [currentCredits, setCurrentCredits] = useState('');
  const [requiredSgpa, setRequiredSgpa] = useState(null);
  const [error, setError] = useState('');

  const isValid = () => {
    const pc = +prevCgpa;
    const pcr = +prevCredits;
    const gc = +goalCgpa;
    const cc = +currentCredits;
    if (
      isNaN(pc) || isNaN(pcr) || isNaN(gc) || isNaN(cc) ||
      pc < 0 || pcr < 0 || gc < 0 || cc < 0
    ) {
      setError('Enter valid (≥ 0) numbers in all fields.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async () => {
    if (!isValid()) return;
    try {
      const { data } = await axios.post('api/cgpa/booster', {
        prevCgpa: +prevCgpa,
        prevCredits: +prevCredits,
        goalCgpa: +goalCgpa,
        currentCredits: +currentCredits,
      });
      setRequiredSgpa(data.requiredSgpa);
    } catch {
      setError('Failed to calculate required SGPA.');
    }
  };

  return (
    <div className="cgpa-calculator">
      <h2>Target CGPA Planner</h2>

      <div className="form-row">
        <label>Previous CGPA:</label>
        <input
          type="number"
          placeholder="e.g. 7.5"
          value={prevCgpa}
          onChange={e => setPrevCgpa(e.target.value)}
          min="0"
        />
      </div>

      <div className="form-row">
        <label>Total Credits Completed:</label>
        <input
          type="number"
          placeholder="e.g. 100"
          value={prevCredits}
          onChange={e => setPrevCredits(e.target.value)}
          min="0"
        />
      </div>

      <div className="form-row">
        <label>Target CGPA:</label>
        <input
          type="number"
          placeholder="e.g. 8.0"
          value={goalCgpa}
          onChange={e => setGoalCgpa(e.target.value)}
          min="0"
        />
      </div>

      <div className="form-row">
        <label>Current Semester Credits:</label>
        <input
          type="number"
          placeholder="e.g. 24"
          value={currentCredits}
          onChange={e => setCurrentCredits(e.target.value)}
          min="0"
        />
      </div>

      <div className="button-group">
        <button onClick={handleSubmit}>Calculate SGPA Needed</button>
      </div>

      {error && <p className="result-message">{error}</p>}
      {requiredSgpa !== null && !error && (
        <p className="result-message">You need an SGPA of <strong>{requiredSgpa}</strong> this semester to reach your CGPA goal.</p>
      )}


       <div className="navigation-links">
        <Link to="/attendance-goal">
          <button>Go to Attendence Goal</button>
        </Link>
        <Link to="/cgpa">
          <button>Go to SGPA Calculator</button>
        </Link>
      </div>
    </div>
  );
};

export default CGPABooster;
