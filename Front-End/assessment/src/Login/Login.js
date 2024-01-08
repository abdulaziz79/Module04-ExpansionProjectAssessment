// Login.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { userContext } from '../UserContext';
import { Link, useNavigate } from 'react-router-dom';
import Styles from './Login.module.css'; // Import your CSS module

const Login = () => {
  const { setUser } = useContext(userContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/user/login', formData);

      if (response) {
        setUser(response.data.existingUser);
        localStorage.setItem('token', response.data.token);
        navigate('/');
      
  
      } else {
        console.log('Login failed:', response.data);

  
      }
    } catch (error) {
      console.error('Login failed:', error.message);
      
 
    }
  };

  return (
    <div className={Styles.body}>
      <form className={Styles.form} onSubmit={handleSubmit}>
        <label className={Styles.label}>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={Styles.input}
          />
        </label>
        <br />
        <label className={Styles.label}>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className={Styles.input}
          />
        </label>
        <br />
        <button type="submit" className={Styles.button}>
          Login
        </button>
        <p>dont have an account? <Link to="/register">register</Link></p>
      </form>
    </div>
  );
};

export default Login;
