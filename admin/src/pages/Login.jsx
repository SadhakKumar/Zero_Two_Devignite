import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Import CSS file for styling

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === 'admin@123' && password === 'admin@123') {
      // Navigate to the homepage
      navigate('/homepage');
    } else {
      // Display an alert for invalid credentials
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <h1>Login Page</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="login-input"
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="login-input"
      />
      <br />
      <button onClick={handleLogin} className="login-button">Login</button>
    </div>
    
  );
}

export default LoginPage;
