// GeneratePlan.js
import React, { useState } from 'react';
import axios from 'axios';

function GeneratePlan() {
  const [email, setEmail] = useState('');
  const [days, setDays] = useState('');
  const [plan, setPlan] = useState([]);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://ai-revision-platform.onrender.com/generateplan', {
        email,
        days: parseInt(days)
      });
      setPlan(response.data.plan);
      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setMessage('Error generating plan.');
    }
  };

  return (
    <div>
      <h2 id="generate">Generate Revision Plan</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="User Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        /><br />
        <input
          type="number"
          placeholder="Number of Days"
          value={days}
          onChange={e => setDays(e.target.value)}
          required
        /><br />
        <button type="submit">Generate Plan</button>
      </form>

      <p>{message}</p>

      {plan.length > 0 && (
        <div>
          <h3>Your Revision Plan</h3>
          <ul>
            {plan.map((day, index) => (
              <li key={index}>
                <strong>Day {day.day}:</strong>
                <ul>
                  {day.topics.map((t, i) => (
                    <li key={i}>{t.subject} - {t.topic}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default GeneratePlan;
