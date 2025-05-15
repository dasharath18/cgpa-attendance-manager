import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Style.css';

const CGPACalculator = () => {
  const [subjects, setSubjects] = useState([{ credits: '', grade: '' }]);
  const [cgpa, setCgpa] = useState(null);

  const handleChange = (i, key, value) => {
    const updated = [...subjects];
    if (key === 'credits') {
      // Only allow positive numbers
      if (value === '' || (/^\d+$/.test(value) && +value > 0)) {
        updated[i][key] = value;
      }
    } else if (key === 'grade') {
      // Only allow 0 to 10
      if (value === '' || (/^\d{1,2}$/.test(value) && +value >= 0 && +value <= 10)) 
      {
        updated[i][key] = value;
      }
    }
    setSubjects(updated);
  };

  const addSubject = () => {
    setSubjects([...subjects, { credits: '', grade: '' }]);
  };

  const removeSubject = (i) => {
    const updated = [...subjects];
    updated.splice(i, 1);
    setSubjects(updated);
  };

  const handleSubmit = async () => {
    const parsedSubjects = subjects.map(s => ({
      credits: +s.credits,
      grade: +s.grade,
    }));
    const { data } = await axios.post('/api/cgpa/calculate', { subjects: parsedSubjects });
    setCgpa(data.cgpa);
  };

  return (
    <div className="cgpa-calculator">
      <h2>SGPA Calculator</h2>

      <div className="heading-row">
        <span>Credits</span>
        <span>Grade (Point)</span>
        {subjects.length > 1 && <span>Action</span>}
      </div>

      {subjects.map((s, i) => (
        <div className="subject-row" key={i}>
          <input
            type="number"
            placeholder="Credits e.g. 3"
            value={s.credits}
            onChange={e => handleChange(i, 'credits', e.target.value)}
            min="1"
          />
          <input
            type="number"
            placeholder="Grade e.g. 9"
            value={s.grade}
            onChange={e => handleChange(i, 'grade', e.target.value)}
            min="0"
            max="10"
          />
          {subjects.length > 1 && (
            <button className="remove-btn" onClick={() => removeSubject(i)}>Remove</button>
          )}
        </div>
      ))}

      <div style={{ marginTop: '10px' }}>
        <button onClick={addSubject} style={{ marginRight: '10px' }}>Add Subject</button>
        <button onClick={handleSubmit}>Calculate CGPA</button>
      </div>

      {cgpa !== null && <p style={{ marginTop: '10px' }}>CGPA: {cgpa}</p>}

       <div className="navigation-links">
        <Link to="/cgpa-booster">
          <button>Go to Target CGPA Planner</button>
        </Link>
        <Link to="/attendance-goal">
          <button>Go to Attendance Goal</button>
        </Link>
      </div>
    </div>
  );
};

export default CGPACalculator;
