import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import loginIcon from '../assets/Loginicon.png'

export default function Login() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [showOtp, setShowOtp] = useState(false);
  
  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneCode, setPhoneCode] = useState('+91');
  const [loginIdentifier, setLoginIdentifier] = useState(''); // Email or Phone for login
  
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, register, user } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const redirect = searchParams.get('redirect') || '/'
  const intent = searchParams.get('intent') || ''

  useEffect(() => {
    if (user) {
      if (intent === 'host') navigate('/?mode=host')
      else navigate(redirect)
    }
  }, [user, redirect, intent, navigate])

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !loginIdentifier) {
      setError('Please enter your Full Name and Email/Phone Number');
      return;
    }
    setError('');
    
    // Check if user exists before sending OTP
    const stored = localStorage.getItem('metrolodges_users');
    let found = false;
    if (stored) {
      try {
        const users = Array.isArray(JSON.parse(stored)) ? JSON.parse(stored) : Object.values(JSON.parse(stored));
        const record = users.find((u: any) => 
          u.user.name.toLowerCase() === name.trim().toLowerCase() && 
          (u.user.email === loginIdentifier.toLowerCase() || u.user.phone === loginIdentifier)
        );
        if (record) found = true;
      } catch {}
    }

    if (!found) {
      setError('No matching account found. Please check your details or Sign up.');
      return;
    }

    setShowOtp(true);
  }

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      setError('Please fill in all required fields (Name, Email, and Phone Number).');
      return;
    }
    setError('');
    
    // Check if user already exists
    const stored = localStorage.getItem('metrolodges_users');
    let found = false;
    if (stored) {
      try {
        const users = Array.isArray(JSON.parse(stored)) ? JSON.parse(stored) : Object.values(JSON.parse(stored));
        const record = users.find((u: any) => 
          u.user.email === email.toLowerCase() || u.user.phone === phone
        );
        if (record) found = true;
      } catch {}
    }

    if (found) {
      setError('An account with this Email or Phone already exists. Please Log in.');
      return;
    }

    setShowOtp(true);
  }

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);
    // auto-focus next
    if (val && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  }

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalOtp = otp.join('');
    if (finalOtp.length < 4) {
      setError('Please enter the full 4-digit OTP');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      if (mode === 'register') {
        const result = await register(name, email, phone, phoneCode, 'otp-verified-pass123');
        if (!result.success) {
          setError(result.error || 'Registration failed.');
          setLoading(false);
          return;
        }
      } else {
        const isPhone = !loginIdentifier.includes('@');
        const result = await login(name, loginIdentifier, isPhone);
        if (!result.success) {
          setError(result.error || 'Login failed.');
          setLoading(false);
          return;
        }
      }
      
      if (intent === 'host') {
        navigate('/?mode=host');
      } else {
        navigate(redirect);
      }
    } catch (err: any) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="otp-login-layout">
      {/* Left Column */}
      <div className="otp-left-col">
        <div className="otp-back">
          <Link to="/" style={{ textDecoration: 'none', color: '#000', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <i className="fa-solid fa-chevron-left" style={{ fontSize: '0.8rem' }}></i> Back
          </Link>
        </div>
        
        <div className="otp-left-content">
          <div className="otp-brand">
            <div className="otp-brand-icon">
              <img src="/logo.png" alt="Metrolodges Logo" style={{ height: '90px', objectFit: 'contain' }} />
            </div>
            <div className="otp-brand-text">
              <span className="otp-brand-name">Metrolodges</span>
              <span className="otp-brand-tag">Your Gateway to Great Stays.</span>
            </div>
          </div>
          
          <div className="otp-welcome-text">
            {!showOtp ? (
              <>
                <h1>Your Privacy Matters to Us!</h1>
                <p>We handle your personal information and address with the highest data protection standards. At Metrolodges, we prioritize your privacy, and we will never share your information with any third parties.</p>
              </>
            ) : (
              <>
                <h1>Welcome to Metrolodges!</h1>
                <p>Congratulations on taking the first step towards discovering a world of unique travel experiences and making memories.</p>
              </>
            )}
          </div>
          
          {/* House Illustration */}
          <div className="otp-illustration">
             <img src={loginIcon} alt="House Illustration" style={{ width: '100%', maxWidth: '440px', objectFit: 'contain' }} />
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="otp-right-col">
        {!showOtp && mode === 'login' && (
          <form className="otp-form-box" onSubmit={handleLoginSubmit}>
            <h2>Log In</h2>
            {error && <div className="otp-error">{error}</div>}
            
            <div className="otp-input-group">
              <input 
                type="text" 
                placeholder="Full Name *"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>

            <div className="otp-input-group">
              <input 
                type="text" 
                placeholder="Email or Phone Number *"
                value={loginIdentifier}
                onChange={e => setLoginIdentifier(e.target.value)}
                required
              />
            </div>
            
            <button type="submit" className="otp-primary-btn" disabled={loading}>
              Login
            </button>

            <div className="otp-links">
              <p>Don't have an account? <span onClick={() => { setMode('register'); setError(''); }} style={{color: '#71b7e1', cursor: 'pointer', fontWeight: 600}}>Sign Up here</span></p>
            </div>
          </form>
        )}

        {!showOtp && mode === 'register' && (
          <form className="otp-form-box" onSubmit={handleRegisterSubmit}>
            <h2>Sign Up</h2>
            {error && <div className="otp-error">{error}</div>}
            
            <div className="otp-input-group">
              <input 
                type="text" 
                placeholder="Full Name *"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="otp-input-group">
              <input 
                type="email" 
                placeholder="Email Address *"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="otp-phone-group">
              <select value={phoneCode} onChange={e => setPhoneCode(e.target.value)} className="phone-code-select">
                <option value="+91">+91 (India)</option>
                <option value="+63">+63 (Philippines)</option>
                <option value="+1">+1 (US)</option>
                <option value="+44">+44 (UK)</option>
                <option value="+61">+61 (Australia)</option>
              </select>
              <input 
                type="text" 
                placeholder="Phone Number *"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="phone-input"
                required
              />
            </div>
            
            <button type="submit" className="otp-primary-btn" disabled={loading}>
              Sign up
            </button>
            
            <div className="otp-links">
              <p>Already have an account? <span onClick={() => { setMode('login'); setError(''); }} style={{color: '#71b7e1', cursor: 'pointer', fontWeight: 600}}>Login</span></p>
              <p className="terms-text">By signing up, you agree to <Link to="/terms">Terms & Conditions</Link></p>
            </div>
          </form>
        )}

        {showOtp && (
          <div className="otp-form-box otp-modal-wrapper">
             {/* Simulating the Modal overlay effect from Image 4 */}
             <div className="otp-modal">
               <div className="otp-modal-header">
                 <h3>Enter OTP</h3>
                 <button onClick={() => setShowOtp(false)} className="close-btn"><i className="fa-solid fa-xmark"></i></button>
               </div>
               <p className="otp-modal-desc">Please enter the OTP sent to {mode === 'login' ? loginIdentifier : phone}</p>
               
               <form onSubmit={handleOtpSubmit}>
                {error && <div className="otp-error">{error}</div>}
                 <div className="otp-boxes">
                   {otp.map((digit, i) => (
                     <input 
                       key={i}
                       id={`otp-${i}`}
                       type="text" 
                       maxLength={1}
                       value={digit}
                       onChange={e => handleOtpChange(i, e.target.value)}
                     />
                   ))}
                 </div>
                 
                 <p className="resend-text">Resend OTP <span style={{color: '#71b7e1', fontWeight: 600}}>(51 sec)</span></p>
                 
                 <button type="submit" className="otp-primary-btn" disabled={loading}>
                   {mode === 'login' ? 'Confirm & Login' : 'Verify & Register'}
                 </button>
               </form>
             </div>
          </div>
        )}
      </div>

      <style>{`
        .otp-login-layout {
          display: flex;
          height: 100vh;
          width: 100vw;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
          background: #ffffff; /* White background to let curve show through */
        }
        
        .otp-left-col {
          width: 45%;
          background: #ffffff;
          padding: 40px 60px;
          display: flex;
          flex-direction: column;
          position: relative;
          z-index: 2;
          border-right: none;
        }
        
        .otp-right-col {
          width: 55%;
          background: linear-gradient(135deg, #71b7e1 0%, #badef3 100%); /* Faded Brand Blue gradient */
          border-top-left-radius: 240px;
          border-bottom-left-radius: 40px;
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: -15px 0 40px rgba(0,0,0,0.08);
          margin-left: -30px;
        }

        .otp-back {
          margin-bottom: 80px;
        }
        
        .otp-left-content {
          margin-top: 20px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        
        .otp-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 40px;
          justify-content: center;
        }
        
        .otp-brand-icon {
          color: #71b7e1;
          display: flex;
          align-items: center;
        }
        
        .otp-brand-text {
          display: flex;
          flex-direction: column;
        }
        
        .otp-brand-name {
          font-size: 2.8rem;
          font-weight: 800;
          color: #71b7e1;
          line-height: 1;
        }
        
        .otp-brand-tag {
          font-size: 1.1rem;
          color: #3a9fd1;
          font-weight: 600;
          margin-top: 6px;
        }
        
        .otp-welcome-text {
          text-align: center;
          max-width: 420px;
          margin: 0 auto;
        }
        
        .otp-welcome-text h1 {
          font-size: 1.8rem;
          font-weight: 800;
          color: #1a1a1a;
          margin-bottom: 16px;
          line-height: 1.3;
        }
        
        .otp-welcome-text p {
          font-size: 0.95rem;
          color: #666;
          line-height: 1.6;
        }
        
        .otp-illustration {
          margin-top: 20px;
          position: relative;
          display: flex;
          align-items: flex-start;
          justify-content: center;
        }
        
        /* Form box on right */
        .otp-form-box {
          width: 100%;
          max-width: 460px;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 40px;
          background: #ffffff;
          border-radius: 20px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.1);
        }
        
        .otp-form-box h2 {
          font-size: 1.8rem;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 30px;
        }
        
        .otp-input-group {
          width: 100%;
          margin-bottom: 20px;
        }
        
        .otp-input-group input, .otp-phone-group input {
          width: 100%;
          padding: 16px 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 0.95rem;
          font-family: 'Inter', sans-serif;
          background: #fcfcfc;
          box-sizing: border-box;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        
        .otp-input-group input:focus, .otp-phone-group input:focus {
          border-color: #71b7e1;
          outline: none;
          box-shadow: 0 0 0 3px rgba(113, 183, 225, 0.15);
        }
        
        .otp-phone-group {
          width: 100%;
          display: flex;
          gap: 12px;
          margin-bottom: 20px;
        }
        
        .phone-code-select {
          padding: 16px 12px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 0.95rem;
          background: #fcfcfc;
          outline: none;
          min-width: 120px;
          cursor: pointer;
        }
        
        .otp-primary-btn {
          background: linear-gradient(135deg, #71b7e1, #3a9fd1);
          color: white;
          border: none;
          padding: 14px 40px;
          border-radius: 30px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          margin-top: 10px;
          width: 100%;
          max-width: 260px;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .otp-primary-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(113, 183, 225, 0.4);
        }
        
        .otp-links {
          margin-top: 24px;
          text-align: center;
          font-size: 0.85rem;
          color: #444;
          line-height: 1.8;
        }
        
        .otp-links a {
          color: #71b7e1;
          text-decoration: none;
          font-weight: 600;
        }
        
        .terms-text {
          font-size: 0.75rem;
          color: #888;
          margin-top: 12px;
        }
        
        .otp-error {
          width: 100%;
          padding: 12px;
          background: #fff0f0;
          color: #d32f2f;
          border-radius: 8px;
          margin-bottom: 16px;
          font-size: 0.9rem;
          text-align: center;
        }
        
        /* Modal styling */
        .otp-modal-wrapper {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(4px);
          z-index: 100;
          max-width: none !important;
          border-radius: 0;
        }
        
        .otp-modal {
          background: white;
          padding: 40px;
          border-radius: 20px;
          width: 440px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.15);
          text-align: center;
          position: relative;
        }
        
        .otp-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        
        .otp-modal-header h3 {
          font-size: 1.4rem;
          margin: 0;
        }
        
        .close-btn {
          background: #f0f0f0;
          border-radius: 50%;
          width: 32px; height: 32px;
          display: flex; align-items: center; justify-content: center;
          border: none;
          font-size: 1rem;
          cursor: pointer;
          color: #333;
          transition: background 0.2s;
        }
        .close-btn:hover {
          background: #e0e0e0;
        }
        
        .otp-modal-desc {
          font-size: 0.95rem;
          color: #555;
          margin-bottom: 30px;
          line-height: 1.5;
        }
        
        .otp-boxes {
          display: flex;
          gap: 16px;
          justify-content: center;
          margin-bottom: 24px;
        }
        
        .otp-boxes input {
          width: 60px;
          height: 70px;
          border: 1px solid #ddd;
          border-radius: 12px;
          font-size: 1.8rem;
          text-align: center;
          color: #333;
          background: #fcfcfc;
          transition: all 0.2s;
        }
        
        .otp-boxes input:focus {
          border-color: #71b7e1;
          background: #fff;
          outline: none;
          box-shadow: 0 0 0 3px rgba(113, 183, 225, 0.15);
        }
        
        .resend-text {
          font-size: 0.85rem;
          color: #666;
          margin-bottom: 30px;
        }
      `}</style>
    </div>
  )
}
