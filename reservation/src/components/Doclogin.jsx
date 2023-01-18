import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import useAuth from '../hooks/useAuth';
import axios from '../api/axios';
import LoginImage from './LoginImage';
import './Login.css';


function Doclogin() {
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await axios.get(
      //   `/account/username=${user}&password=${pwd}`
      // );
    //   sessionStorage.setItem('app-token', response.data.token);
      const response = await axios.get('http://localhost:3500/doc_account');
      console.log(response.data)
      setUser('');
      setPwd('');
      setSuccess(true);
    } catch (err) {
      if (!err.response) {
        setErrMsg('No Server Response');
      } else if (err.response.status === 400) {
        setErrMsg('Missing Username or Password');
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="login-main">
      <LoginImage />
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <Link to="/home">Go to Homepage</Link>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? 'errmsg' : 'offscreen'}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <p className="welcome-text">Welcome back! Thank you for your contribution to the MCIT Program!</p>
          <p className="signin-text">Sign In</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">
              Username:
              <input
                type="text"
                id="username"
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
              />
            </label>
            <label htmlFor="password">
              Password:
              <input
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
              />
            </label>
            <button type="submit"> Sign In </button>
          </form>
        </section>
      )}
    </div>
  );
}

export default Doclogin;