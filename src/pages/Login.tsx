import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [inputVal, setInputVal] = useState('');
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [phoneCode, setPhoneCode] = useState('+91');
  
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isNewUser, setIsNewUser] = useState(true);

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

  const checkUserExists = (val: string) => {
    const stored = localStorage.getItem('metrolodges_users');
    if (!stored) return null;
    try {
      const users = JSON.parse(stored);
      return users.find((u: any) => u.email === val || u.phone === val) || null;
    } catch {
      return null;
    }
  }

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal) {
      setError('Please enter email or phone number');
      return;
    }
    setError('');
    
    const foundUser = checkUserExists(inputVal);
    
    if (foundUser) {
      setIsNewUser(false);
      setEmail(foundUser.email);
      setStep(3);
    } else {
      setIsNewUser(true);
      if (inputVal.includes('@')) {
        setEmail(inputVal);
      } else {
        setPhone(inputVal);
      }
      setStep(2);
    }
  }

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || (!phone && !email)) {
      setError('Please fill all required fields');
      return;
    }
    setError('');
    setStep(3);
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
      if (isNewUser) {
        // Mock password for OTP-based accounts
        const secretPass = 'otp-verified-pass123';
        const result = await register(name, email || `${phone}@temp.com`, secretPass);
        if (!result.success) {
          setError(result.error || 'Registration failed.');
          setLoading(false);
          return;
        }
      } else {
        // Authenticate existing user by extracting their old password
        const foundUser = checkUserExists(inputVal);
        if (foundUser) {
          const result = await login(foundUser.email, foundUser.password);
          if (!result.success) {
            setError(result.error || 'Login failed.');
            setLoading(false);
            return;
          }
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
              <i className="fa-solid fa-house"></i>
            </div>
            <div className="otp-brand-text">
              <span className="otp-brand-name">Metrolodges</span>
              <span className="otp-brand-tag">Make memories</span>
            </div>
          </div>
          
          <div className="otp-welcome-text">
            {step === 1 && (
              <>
                <h1>Welcome back to Metrolodges!</h1>
                <p>Your next adventure awaits. Log in to continue exploring unique travel experiences and memorable stays.</p>
              </>
            )}
            {step === 2 && (
              <>
                <h1>Your Privacy Matters to Us!</h1>
                <p>We handle your personal information and address with the highest data protection standards. At Metrolodges, we prioritize your privacy, and we will never share your information with any third parties. Your trust is our top priority.</p>
              </>
            )}
            {step === 3 && (
              <>
                <h1>Welcome back to Metrolodges!</h1>
                <p>Congratulations on taking the first step towards discovering a world of unique travel experiences and making memories. We're excited to have you join our vibrant community of hosts and guests.</p>
              </>
            )}
          </div>
          
          {/* House Illustration (Pure CSS/Icon mock) */}
          <div className="otp-illustration">
             <div className="cloud cloud-1"></div>
             <div className="cloud cloud-2"></div>
             <div className="house-vector">
               <div className="tree-1"></div>
               <div className="tree-2"></div>
               <div className="house-base">
                 <div className="roof-1"></div>
                 <div className="roof-2"></div>
                 <div className="window"></div>
                 <div className="door"></div>
               </div>
             </div>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="otp-right-col">
        {step === 1 && (
          <form className="otp-form-box" onSubmit={handleStep1Submit}>
            <h2>Sign Up / Sign In</h2>
            {error && <div className="otp-error">{error}</div>}
            
            <div className="otp-input-group">
              <input 
                type="text" 
                placeholder="Enter Email / Phone Number *"
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                required
              />
            </div>
            
            <button type="submit" className="otp-primary-btn" disabled={loading}>
              Continue
            </button>
          </form>
        )}

        {step === 2 && (
          <form className="otp-form-box" onSubmit={handleStep2Submit}>
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
                placeholder="Email *"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required={!phone}
              />
            </div>
            
            <div className="otp-phone-group">
              <select value={phoneCode} onChange={e => setPhoneCode(e.target.value)} className="phone-code-select">
                <option value="+91">+91</option>
                <option value="+63">+63</option>
                <option value="+1">+1</option>
              </select>
              <input 
                type="text" 
                placeholder="Phone Number"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="phone-input"
                required={!email}
              />
            </div>
            
            <button type="submit" className="otp-primary-btn" disabled={loading}>
              Sign up
            </button>
            
            <div className="otp-links">
              <p>Sign up using <a href="#">{email ? 'Phone Number' : 'Email'}</a></p>
              <p>Already have an account? <span onClick={() => setStep(1)} style={{color: '#ff3800', cursor: 'pointer', fontWeight: 600}}>Login</span></p>
              <p className="terms-text">By signing up, you agree to <Link to="/terms">Terms & Conditions</Link></p>
            </div>
          </form>
        )}

        {step === 3 && (
          <div className="otp-form-box otp-modal-wrapper">
             {/* Simulating the Modal overlay effect from Image 4 within the right col constraints or as a centered card */}
             <div className="otp-modal">
               <div className="otp-modal-header">
                 <h3>Enter OTP</h3>
                 <button onClick={() => setStep(1)} className="close-btn"><i className="fa-solid fa-xmark"></i></button>
               </div>
               <p className="otp-modal-desc">Please enter the OTP sent to {email || phone || inputVal}</p>
               
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
                 
                 <p className="resend-text">Resend OTP <span style={{color: '#ff3800', fontWeight: 600}}>(51 sec)</span></p>
                 
                 <button type="submit" className="otp-primary-btn" disabled={loading}>
                   Submit
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
          background: #faece5; /* The peach background */
        }
        
        .otp-left-col {
          width: 40%;
          background: #ffffff;
          padding: 40px 60px;
          display: flex;
          flex-direction: column;
          position: relative;
          z-index: 2;
          border-right: 1px solid #faece5; /* seamless */
        }
        
        .otp-right-col {
          width: 60%;
          background: #faece5;
          border-top-left-radius: 120px;
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: -10px 0 30px rgba(0,0,0,0.02);
          margin-left: -50px;
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
          color: #ff3800;
          font-size: 2rem;
        }
        
        .otp-brand-text {
          display: flex;
          flex-direction: column;
        }
        
        .otp-brand-name {
          font-size: 1.5rem;
          font-weight: 800;
          color: #ff3800;
          line-height: 1;
        }
        
        .otp-brand-tag {
          font-size: 0.8rem;
          color: #ff8a66;
          font-family: 'Brush Script MT', cursive;
          margin-top: 2px;
        }
        
        .otp-welcome-text {
          text-align: center;
          max-width: 360px;
          margin: 0 auto 60px;
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
          margin-top: auto;
          position: relative;
          height: 200px;
          background: url('/house_illustration.png') center bottom no-repeat;
          background-size: contain;
          opacity: 0.8;
        }
        
        /* Form box on right */
        .otp-form-box {
          width: 100%;
          max-width: 440px;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
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
          background: #fff;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        
        .otp-input-group input:focus, .otp-phone-group input:focus {
          border-color: #ff3800;
          outline: none;
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
          background: #fff;
          outline: none;
        }
        
        .otp-primary-btn {
          background: #ff3800;
          color: white;
          border: none;
          padding: 14px 40px;
          border-radius: 30px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          margin-top: 10px;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .otp-primary-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(255, 56, 0, 0.3);
        }
        
        .otp-links {
          margin-top: 24px;
          text-align: center;
          font-size: 0.85rem;
          color: #444;
          line-height: 1.8;
        }
        
        .otp-links a {
          color: #ff3800;
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
          background: rgba(0,0,0,0.4);
          z-index: 100;
          max-width: none !important;
        }
        
        .otp-modal {
          background: white;
          padding: 30px 40px;
          border-radius: 12px;
          width: 440px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.15);
          text-align: center;
          position: relative;
        }
        
        .otp-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        
        .otp-modal-header h3 {
          font-size: 1.25rem;
          margin: 0;
        }
        
        .close-btn {
          background: transparent;
          border: none;
          font-size: 1.2rem;
          cursor: pointer;
          color: #666;
        }
        
        .otp-modal-desc {
          font-size: 0.9rem;
          color: #444;
          margin-bottom: 24px;
          line-height: 1.5;
        }
        
        .otp-boxes {
          display: flex;
          gap: 12px;
          justify-content: center;
          margin-bottom: 20px;
        }
        
        .otp-boxes input {
          width: 50px;
          height: 60px;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 1.5rem;
          text-align: center;
          color: #333;
        }
        
        .otp-boxes input:focus {
          border-color: #ff3800;
          outline: none;
          box-shadow: 0 0 0 3px rgba(255, 56, 0, 0.1);
        }
        
        .resend-text {
          font-size: 0.85rem;
          color: #666;
          margin-bottom: 24px;
        }
      `}</style>
    </div>
  )
}
