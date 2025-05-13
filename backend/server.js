
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());



//  1. Attendance Goal (Unknown Total)
app.post('/api/attendance/goal/unknown-total', (req, res) => {
  const { attended, absent, goalPercent } = req.body;
  const total = attended + absent;
  const needed = Math.ceil((goalPercent * total - 100 * attended) / (100 - goalPercent));
  res.json({ needed: needed > 0 ? needed : 0 });
});

//  2. Attendance Goal (Known Total)
app.post('/api/attendance/goal/known-total', (req, res) => {
  const { attended, total, goalPercent } = req.body;
  const needed = Math.ceil((goalPercent * total - 100 * attended) / 100);
  res.json({ needed: needed > 0 ? needed : 0 });
});

//  3. Calculate CGPA
app.post('/api/cgpa/calculate', (req, res) => {
  const { subjects } = req.body;
  let totalCredits = 0, totalPoints = 0;
  subjects.forEach(sub => {
    totalCredits += sub.credits;
    totalPoints += sub.credits * sub.grade;
  });
  const cgpa = totalCredits === 0 ? 0 : (totalPoints / totalCredits).toFixed(2);
  res.json({ cgpa });
});

//  4. CGPA Booster
app.post('/api/cgpa/booster', (req, res) => {
  const { prevCgpa, prevCredits, goalCgpa, currentCredits } = req.body;
  const totalCredits = +prevCredits + +currentCredits;
  const requiredSgpa = ((goalCgpa * totalCredits - prevCgpa * prevCredits) / currentCredits).toFixed(2);
  res.json({ requiredSgpa });
});

//  Start Server
app.listen(5000, () => {
  console.log('Backend running at http://localhost:5000');
});
