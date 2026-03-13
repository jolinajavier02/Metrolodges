import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [tab, setTab] = useState<'login' | 'register'>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const { login, register, user } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  // Where to redirect after login
  const redirect = searchParams.get('redirect') || '/'
  const intent = searchParams.get('intent') || ''
  const tabParam = searchParams.get('tab')

  // Auto-switch tab based on URL param
  useEffect(() => {
    if (tabParam === 'register') setTab('register')
  }, [tabParam])

  // If already logged in, redirect immediately
  useEffect(() => {
    if (user) {
      if (intent === 'host' || redirect === '/host') {
        navigate('/host')
      } else {
        navigate(redirect)
      }
    }
  }, [user, redirect, intent, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (tab === 'register') {
      if (password !== confirmPassword) {
        setError('Passwords do not match.')
        setLoading(false)
        return
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters.')
        setLoading(false)
        return
      }
      const result = await register(name, email, password)
      if (!result.success) {
        setError(result.error || 'Registration failed.')
        setLoading(false)
        return
      }
    } else {
      const result = await login(email, password)
      if (!result.success) {
        setError(result.error || 'Login failed.')
        setLoading(false)
        return
      }
    }

    // After success, redirect
    if (intent === 'host' || redirect === '/host') {
      navigate('/host')
    } else {
      navigate(redirect)
    }
    setLoading(false)
  }

  const switchTab = (t: 'login' | 'register') => {
    setTab(t)
    setError('')
    setName('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
  }

  return (
    <div className="login-page">
      <div className="login-card">
        {/* Header */}
        <div className="login-card-header">
          <Link to="/" className="login-logo">
            <img src="/logo.png" alt="Metrolodges Logo" style={{ height: '36px', objectFit: 'contain' }} />
            <span className="login-brand-name">Metrolodges</span>
          </Link>
          <p className="login-subtitle">
            {intent === 'host'
              ? '🏠 Create an account or log in to become a host'
              : tab === 'login' ? 'Welcome back! Log in to continue.' : 'Join Metrolodges today — it\'s free!'}
          </p>
        </div>

        {/* Tabs */}
        <div className="login-tabs">
          <button
            className={`login-tab-btn ${tab === 'login' ? 'active' : ''}`}
            onClick={() => switchTab('login')}
          >
            Log in
          </button>
          <button
            className={`login-tab-btn ${tab === 'register' ? 'active' : ''}`}
            onClick={() => switchTab('register')}
          >
            Sign up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="login-form">
          {tab === 'register' && (
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <div className="input-wrapper">
                <i className="fa-solid fa-user input-icon"></i>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  autoComplete="name"
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <div className="input-wrapper">
              <i className="fa-solid fa-envelope input-icon"></i>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <i className="fa-solid fa-lock input-icon"></i>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder={tab === 'register' ? 'Create a password (min 6 chars)' : 'Enter your password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete={tab === 'register' ? 'new-password' : 'current-password'}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
          </div>

          {tab === 'register' && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-wrapper">
                <i className="fa-solid fa-lock input-icon"></i>
                <input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                />
              </div>
            </div>
          )}

          {error && (
            <div className="login-error">
              <i className="fa-solid fa-circle-exclamation"></i> {error}
            </div>
          )}

          <button type="submit" className="login-submit-btn" disabled={loading}>
            {loading
              ? <><i className="fa-solid fa-spinner fa-spin"></i> Please wait...</>
              : tab === 'login' ? 'Log in' : 'Create account'
            }
          </button>

          {tab === 'login' && (
            <p className="forgot-password"><a href="#">Forgot password?</a></p>
          )}
        </form>

        <div className="login-divider"><span>or</span></div>

        {/* Social login */}
        <div className="social-login">
          <button className="social-btn google-btn" type="button">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
          <button className="social-btn facebook-btn" type="button">
            <i className="fa-brands fa-facebook-f"></i>
            Continue with Facebook
          </button>
        </div>

        <p className="login-switch">
          {tab === 'login'
            ? <>Don't have an account? <button type="button" className="link-btn" onClick={() => switchTab('register')}>Sign up</button></>
            : <>Already have an account? <button type="button" className="link-btn" onClick={() => switchTab('login')}>Log in</button></>
          }
        </p>

        <p className="login-terms">
          By continuing, you agree to Metrolodges' <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>.
        </p>
      </div>

      <style>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #e8f4fd 0%, #f0f7ff 50%, #e1f0fd 100%);
          padding: 24px 16px;
          font-family: 'Inter', sans-serif;
        }

        .login-card {
          background: white;
          padding: 40px 44px;
          border-radius: 24px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1), 0 4px 16px rgba(113, 183, 225, 0.15);
          width: 100%;
          max-width: 480px;
          animation: loginSlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes loginSlideIn {
          from { opacity: 0; transform: translateY(30px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }

        .login-card-header {
          text-align: center;
          margin-bottom: 28px;
        }

        .login-logo {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          margin-bottom: 14px;
        }

        .login-brand-name {
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--brand-blue, #71b7e1);
          letter-spacing: -0.5px;
        }

        .login-subtitle {
          font-size: 0.9rem;
          color: #717171;
          margin: 0;
          line-height: 1.5;
        }

        /* Tabs */
        .login-tabs {
          display: flex;
          background: #f5f5f5;
          border-radius: 14px;
          padding: 4px;
          margin-bottom: 28px;
          gap: 4px;
        }

        .login-tab-btn {
          flex: 1;
          padding: 10px 0;
          border: none;
          border-radius: 10px;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          background: transparent;
          color: #717171;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .login-tab-btn.active {
          background: white;
          color: var(--brand-blue, #71b7e1);
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        /* Form */
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .form-group label {
          font-size: 0.85rem;
          font-weight: 600;
          color: #222;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 14px;
          color: #aaa;
          font-size: 0.9rem;
          pointer-events: none;
        }

        .input-wrapper input {
          width: 100%;
          padding: 13px 44px 13px 40px;
          border: 1.5px solid #e0e0e0;
          border-radius: 12px;
          font-size: 0.95rem;
          font-family: 'Inter', sans-serif;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          background: #fafafa;
          color: #222;
          box-sizing: border-box;
        }

        .input-wrapper input:focus {
          border-color: var(--brand-blue, #71b7e1);
          box-shadow: 0 0 0 3px rgba(113,183,225,0.15);
          background: white;
        }

        .password-toggle {
          position: absolute;
          right: 12px;
          background: none;
          border: none;
          cursor: pointer;
          color: #aaa;
          padding: 4px;
          font-size: 0.9rem;
          transition: color 0.2s;
        }

        .password-toggle:hover { color: #555; }

        .login-error {
          background: #fff3f3;
          border: 1px solid #ffd5d5;
          color: #e53935;
          border-radius: 10px;
          padding: 11px 14px;
          font-size: 0.875rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 8px;
          animation: shake 0.3s ease;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        .login-submit-btn {
          background: linear-gradient(135deg, var(--brand-blue, #71b7e1), #3a9fd1);
          color: white;
          border: none;
          padding: 14px;
          font-size: 1rem;
          font-weight: 700;
          border-radius: 12px;
          cursor: pointer;
          margin-top: 4px;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          letter-spacing: 0.3px;
        }

        .login-submit-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(113, 183, 225, 0.45);
        }

        .login-submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .forgot-password {
          text-align: right;
          font-size: 0.85rem;
          margin: -8px 0 -4px;
        }

        .forgot-password a {
          color: var(--brand-blue, #71b7e1);
          text-decoration: none;
          font-weight: 500;
        }

        .forgot-password a:hover { text-decoration: underline; }

        /* Divider */
        .login-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 24px 0 20px;
          color: #bbb;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .login-divider::before,
        .login-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #eee;
        }

        /* Social */
        .social-login {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 22px;
        }

        .social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 12px;
          border-radius: 12px;
          border: 1.5px solid #e0e0e0;
          background: white;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          font-family: 'Inter', sans-serif;
        }

        .social-btn:hover {
          background: #f7f7f7;
          border-color: #ccc;
          transform: translateY(-1px);
        }

        .facebook-btn .fa-facebook-f {
          color: #1877f2;
          font-size: 1rem;
        }

        /* Switch + Terms */
        .login-switch {
          text-align: center;
          font-size: 0.875rem;
          color: #717171;
          margin-bottom: 16px;
        }

        .link-btn {
          background: none;
          border: none;
          color: var(--brand-blue, #71b7e1);
          font-weight: 700;
          cursor: pointer;
          font-size: 0.875rem;
          padding: 0;
          text-decoration: none;
        }

        .link-btn:hover { text-decoration: underline; }

        .login-terms {
          text-align: center;
          font-size: 0.78rem;
          color: #aaa;
          line-height: 1.6;
        }

        .login-terms a {
          color: #717171;
          text-decoration: underline;
        }

        .login-terms a:hover { color: #222; }
      `}</style>
    </div>
  )
}
