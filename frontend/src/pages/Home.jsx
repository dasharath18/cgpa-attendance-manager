import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to the CGPA & Attendance Manager</h1>
      <div className="links">


        <Link to="/attendance-goal">
          <button>Attendance Goal</button>
        </Link>

        <Link to="/cgpa">
          <button>CGPA Calculator</button>
        </Link>
        <Link to="/cgpa-booster">
          <button>Target CGPA Planner</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
