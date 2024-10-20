import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', { fullName, email, password, gender });
      alert('User registered successfully');
    } catch (error) {
      alert('User already exists');
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select onChange={(e) => setGender(e.target.value)} value={gender}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
