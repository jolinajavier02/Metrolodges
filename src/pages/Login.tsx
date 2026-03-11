import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock login, redirect to home
    console.log('Logging in with', email, password)
    navigate('/')
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <Link to="/" className="login-logo">
            <img src="/logo.png" alt="Metrolodges Logo" style={{ height: '40px', objectFit: 'contain' }} />
            <span style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--brand-blue)' }}>Metrolodges</span>
          </Link>
          <h2>Welcome back</h2>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-submit-btn">Log in</button>
        </form>

        <div className="login-footer">
          <p>Don't have an account? <a href="#">Sign up</a></p>
        </div>
      </div>

      <style>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f7f7f7;
          padding: 20px;
        }

        .login-card {
          background: white;
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          width: 100%;
          max-width: 450px;
        }

        .login-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .login-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          text-decoration: none;
          margin-bottom: 20px;
        }

        .login-header h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--primary-color, #222222);
          margin: 0;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-group label {
          display: block;
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 8px;
          color: var(--text-color, #222222);
        }

        .form-group input {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #DDDDDD;
          border-radius: 12px;
          font-size: 1rem;
          outline: none;
          transition: border-color 0.2s;
          box-sizing: border-box;
        }

        .form-group input:focus {
          border-color: var(--brand-blue, #007aff);
        }

        .login-submit-btn {
          background: var(--brand-blue, #007aff);
          color: white;
          border: none;
          padding: 14px;
          font-size: 1rem;
          font-weight: 600;
          border-radius: 12px;
          cursor: pointer;
          margin-top: 10px;
          transition: background 0.2s;
        }

        .login-submit-btn:hover {
          background: #0055dd;
        }

        .login-footer {
          margin-top: 24px;
          text-align: center;
          font-size: 0.9rem;
        }

        .login-footer p {
          color: var(--text-light, #717171);
          margin: 0;
        }

        .login-footer a {
          color: var(--brand-blue, #007aff);
          font-weight: 600;
          text-decoration: none;
        }

        .login-footer a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  )
}
