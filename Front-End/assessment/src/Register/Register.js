// Register.js
import React, { useEffect, useState } from 'react';
import Styles from './Register.module.css';
import { Link } from 'react-router-dom';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
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
      const response = await axios.post(`http://localhost:5000/user/register`, formData);
      if (response) {
        console.log('Registration successful:', response.data);



        navigate('/'); 
      } else {
        console.log('Registration failed:', response.data);
      

      }
    } catch (error) {
      console.error('Registration failed:', error.message);
    }

    console.log('Registration data:', formData);

    setFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <div className={Styles.body}>
      <form className={Styles.form} onSubmit={handleSubmit}>
        <label className={Styles.label}>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className={Styles.input}
          />
        </label>
        <br />
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
          Register
        </button>
        <p>already have an account ? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
};

export default Register;
