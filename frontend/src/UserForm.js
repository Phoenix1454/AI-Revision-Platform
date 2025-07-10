// UserForm.js
import React, { useState } from 'react';
import axios from 'axios';

function UserForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subjectInput, setSubjectInput] = useState('');
  const [topicInput, setTopicInput] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [message, setMessage] = useState('');

  const addSubject = () => {
    if (subjectInput && topicInput) {
      const newSubject = {
        subject_name: subjectInput,
        topics: topicInput.split(',').map(t => t.trim())
      };
      setSubjects([...subjects, newSubject]);
      setSubjectInput('');
      setTopicInput('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/adduser', {
        name,
        email,
        subjects
      });
      setMessage(response.data.message);
      setName('');
      setEmail('');
      setSubjects([]);
    } catch (error) {
      console.error(error);
      setMessage('Error adding user.');
    }
  };

  return (
    <div>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Name" 
          value={name}
          onChange={e => setName(e.target.value)}
          required
        /><br />
        <input 
          type="email" 
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        /><br />
        <input
          type="text"
          placeholder="Subject Name"
          value={subjectInput}
          onChange={e => setSubjectInput(e.target.value)}
        /><br />
        <input
          type="text"
          placeholder="Topics (comma separated)"
          value={topicInput}
          onChange={e => setTopicInput(e.target.value)}
        /><br />
        <button type="button" onClick={addSubject}>Add Subject</button><br />

        <ul>
          {subjects.map((s, index) => (
            <li key={index}>{s.subject_name}: {s.topics.join(', ')}</li>
          ))}
        </ul>

        <button type="submit">Submit User</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default UserForm;
