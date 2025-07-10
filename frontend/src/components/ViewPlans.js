// ViewPlans.js
import React, { useState } from 'react';
import axios from 'axios';

function ViewPlans() {
  const [email, setEmail] = useState('');
  const [plans, setPlans] = useState([]);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://127.0.0.1:5000/getplans/${email}`);
      setPlans(response.data.plans);
      setMessage('');
    } catch (error) {
      console.error(error);
      setPlans([]);
      setMessage('No plans found or error fetching plans.');
    }
  };

  return (
    <div>
      <h2 id="view">View My Revision Plans</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="User Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        /><br />
        <button type="submit">Fetch Plans</button>
      </form>

      <p>{message}</p>

      {plans.length > 0 && (
        <div>
          {plans.map((plan, index) => (
            <div key={index}>
              <h3>
                Plan {index + 1} (
                Generated on{" "}
                {plan.generated_on && plan.generated_on.seconds
                    ? new Date(plan.generated_on.seconds * 1000).toLocaleString()
                    : "Unknown"}
                )
              </h3>
              <ul>
                {plan.plan_details.map((day, i) => (
                  <li key={i}>
                    <strong>Day {day.day}:</strong>
                    <ul>
                      {day.topics.map((t, j) => (
                        <li key={j}>{t.subject} - {t.topic}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewPlans;
