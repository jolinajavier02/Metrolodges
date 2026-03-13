import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function HostDashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'overview' | 'listings' | 'bookings' | 'earnings'>('overview')

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const stats = [
    { icon: 'fa-house', label: 'Active Listings', value: '0', color: '#71b7e1' },
    { icon: 'fa-calendar-check', label: 'Total Bookings', value: '0', color: '#00A699' },
    { icon: 'fa-star', label: 'Avg. Rating', value: '—', color: '#FFB400' },
    { icon: 'fa-peso-sign', label: 'Total Earned', value: '₱0', color: '#E91E8C' },
  ]

  return (
    <div className="host-dashboard">
      {/* Sidebar */}
      <aside className="host-sidebar">
        <Link to="/" className="host-logo">
          <img src="/logo.png" alt="Metrolodges" style={{ height: '32px', objectFit: 'contain' }} />
          <span>Metrolodges</span>
        </Link>

        <nav className="host-nav">
          <button
            className={`host-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <i className="fa-solid fa-gauge-high"></i> Overview
          </button>
          <button
            className={`host-nav-item ${activeTab === 'listings' ? 'active' : ''}`}
            onClick={() => setActiveTab('listings')}
          >
            <i className="fa-solid fa-house"></i> My Listings
          </button>
          <button
            className={`host-nav-item ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            <i className="fa-solid fa-calendar-days"></i> Bookings
          </button>
          <button
            className={`host-nav-item ${activeTab === 'earnings' ? 'active' : ''}`}
            onClick={() => setActiveTab('earnings')}
          >
            <i className="fa-solid fa-chart-line"></i> Earnings
          </button>
        </nav>

        <div className="host-sidebar-footer">
          <Link to="/" className="host-nav-item">
            <i className="fa-solid fa-arrow-left"></i> Back to Metrolodges
          </Link>
          <button className="host-logout-btn" onClick={handleLogout}>
            <i className="fa-solid fa-right-from-bracket"></i> Log out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="host-main">
        {/* Top Bar */}
        <div className="host-topbar">
          <div>
            <h1 className="host-page-title">
              {activeTab === 'overview' && 'Host Dashboard'}
              {activeTab === 'listings' && 'My Listings'}
              {activeTab === 'bookings' && 'Bookings'}
              {activeTab === 'earnings' && 'Earnings'}
            </h1>
            <p className="host-page-subtitle">
              {activeTab === 'overview' && `Welcome back, ${user?.name?.split(' ')[0] || 'Host'}! 👋`}
              {activeTab === 'listings' && 'Manage your properties'}
              {activeTab === 'bookings' && 'Track your reservations'}
              {activeTab === 'earnings' && 'Your financial overview'}
            </p>
          </div>
          <div className="host-user-pill">
            <div className="host-avatar">{user?.name?.[0]?.toUpperCase() || 'H'}</div>
            <div>
              <div className="host-username">{user?.name || 'Host'}</div>
              <div className="host-user-email">{user?.email}</div>
            </div>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="host-overview">
            {/* Stats */}
            <div className="host-stats-grid">
              {stats.map((stat, i) => (
                <div className="host-stat-card" key={i}>
                  <div className="host-stat-icon" style={{ background: `${stat.color}1a`, color: stat.color }}>
                    <i className={`fa-solid ${stat.icon}`}></i>
                  </div>
                  <div className="host-stat-value">{stat.value}</div>
                  <div className="host-stat-label">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Get Started CTA */}
            <div className="host-cta-banner">
              <div className="host-cta-content">
                <div className="host-cta-badge">🚀 Get Started</div>
                <h2 className="host-cta-title">List your first property</h2>
                <p className="host-cta-desc">
                  Turn your space into income. Listing on Metrolodges is free and easy — it takes
                  less than 10 minutes to get started.
                </p>
                <button className="host-cta-btn" onClick={() => setActiveTab('listings')}>
                  <i className="fa-solid fa-plus"></i> Add a listing
                </button>
              </div>
              <div className="host-cta-illustration">
                <i className="fa-solid fa-house-chimney" style={{ fontSize: '5rem', color: 'rgba(113,183,225,0.3)' }}></i>
              </div>
            </div>

            {/* Quick Links */}
            <div className="host-quick-links">
              <h3 className="host-section-title">Quick Actions</h3>
              <div className="host-quick-grid">
                {[
                  { icon: 'fa-plus', label: 'Add Listing', color: '#71b7e1', action: () => setActiveTab('listings') },
                  { icon: 'fa-calendar', label: 'View Bookings', color: '#00A699', action: () => setActiveTab('bookings') },
                  { icon: 'fa-chart-line', label: 'Check Earnings', color: '#E91E8C', action: () => setActiveTab('earnings') },
                  { icon: 'fa-star', label: 'Read Reviews', color: '#FFB400', action: () => {} },
                ].map((item, i) => (
                  <button key={i} className="host-quick-btn" onClick={item.action}>
                    <div className="host-quick-icon" style={{ background: `${item.color}1a`, color: item.color }}>
                      <i className={`fa-solid ${item.icon}`}></i>
                    </div>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Listings Tab */}
        {activeTab === 'listings' && (
          <div className="host-listings">
            <div className="host-empty-state">
              <div className="host-empty-icon">
                <i className="fa-solid fa-house-circle-plus"></i>
              </div>
              <h3>No listings yet</h3>
              <p>Start earning by listing your property on Metrolodges.</p>
              <button className="host-cta-btn" style={{ margin: '0 auto', display: 'inline-flex' }}>
                <i className="fa-solid fa-plus"></i> Add your first listing
              </button>
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="host-listings">
            <div className="host-empty-state">
              <div className="host-empty-icon" style={{ background: '#00A6991a', color: '#00A699' }}>
                <i className="fa-solid fa-calendar-xmark"></i>
              </div>
              <h3>No bookings yet</h3>
              <p>Once guests book your listings, they'll appear here.</p>
            </div>
          </div>
        )}

        {/* Earnings Tab */}
        {activeTab === 'earnings' && (
          <div className="host-listings">
            <div className="host-empty-state">
              <div className="host-empty-icon" style={{ background: '#E91E8C1a', color: '#E91E8C' }}>
                <i className="fa-solid fa-chart-bar"></i>
              </div>
              <h3>No earnings yet</h3>
              <p>Your earnings summary will appear here once you start hosting.</p>
            </div>
          </div>
        )}
      </main>

      <style>{`
        .host-dashboard {
          display: flex;
          min-height: 100vh;
          background: #f7f8fc;
          font-family: 'Inter', sans-serif;
        }

        /* Sidebar */
        .host-sidebar {
          width: 260px;
          background: white;
          border-right: 1px solid #ebebeb;
          display: flex;
          flex-direction: column;
          padding: 28px 16px;
          position: sticky;
          top: 0;
          height: 100vh;
          overflow-y: auto;
          flex-shrink: 0;
        }

        .host-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          margin-bottom: 36px;
          padding: 0 8px;
        }

        .host-logo span {
          font-size: 1.2rem;
          font-weight: 800;
          color: var(--brand-blue, #71b7e1);
        }

        .host-nav {
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex: 1;
        }

        .host-nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 12px;
          border: none;
          background: transparent;
          color: #717171;
          font-size: 0.95rem;
          font-weight: 500;
          cursor: pointer;
          text-decoration: none;
          font-family: 'Inter', sans-serif;
          text-align: left;
          transition: all 0.2s;
          width: 100%;
        }

        .host-nav-item:hover {
          background: #f7f8fc;
          color: #222;
        }

        .host-nav-item.active {
          background: rgba(113, 183, 225, 0.12);
          color: var(--brand-blue, #71b7e1);
          font-weight: 700;
        }

        .host-nav-item i { width: 20px; text-align: center; }

        .host-sidebar-footer {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding-top: 16px;
          border-top: 1px solid #ebebeb;
        }

        .host-logout-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 12px;
          border: none;
          background: transparent;
          color: #e53935;
          font-size: 0.95rem;
          font-weight: 500;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          text-align: left;
          transition: all 0.2s;
          width: 100%;
        }

        .host-logout-btn:hover { background: #fff3f3; }
        .host-logout-btn i { width: 20px; text-align: center; }

        /* Main */
        .host-main {
          flex: 1;
          padding: 36px 40px;
          overflow-y: auto;
          max-width: 1100px;
        }

        .host-topbar {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 36px;
        }

        .host-page-title {
          font-size: 1.75rem;
          font-weight: 800;
          color: #1a1a1a;
          margin: 0 0 4px;
        }

        .host-page-subtitle {
          font-size: 0.95rem;
          color: #717171;
          margin: 0;
        }

        .host-user-pill {
          display: flex;
          align-items: center;
          gap: 12px;
          background: white;
          border: 1px solid #ebebeb;
          padding: 10px 16px;
          border-radius: 50px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }

        .host-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--brand-blue, #71b7e1), #3a9fd1);
          color: white;
          font-size: 1rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .host-username { font-size: 0.9rem; font-weight: 700; color: #222; }
        .host-user-email { font-size: 0.78rem; color: #aaa; }

        /* Stats */
        .host-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 28px;
        }

        .host-stat-card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          text-align: center;
          border: 1px solid #f0f0f0;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          transition: all 0.2s;
        }

        .host-stat-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
        }

        .host-stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          margin: 0 auto 12px;
        }

        .host-stat-value {
          font-size: 1.8rem;
          font-weight: 800;
          color: #1a1a1a;
          margin-bottom: 4px;
        }

        .host-stat-label {
          font-size: 0.82rem;
          color: #aaa;
          font-weight: 500;
        }

        /* CTA Banner */
        .host-cta-banner {
          background: linear-gradient(135deg, #e8f4fd, #d4ecf7);
          border: 1.5px solid rgba(113, 183, 225, 0.3);
          border-radius: 20px;
          padding: 36px 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 28px;
          overflow: hidden;
          position: relative;
        }

        .host-cta-content { max-width: 480px; }

        .host-cta-badge {
          display: inline-block;
          background: white;
          border-radius: 20px;
          padding: 4px 14px;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--brand-blue, #71b7e1);
          margin-bottom: 12px;
        }

        .host-cta-title {
          font-size: 1.5rem;
          font-weight: 800;
          color: #1a1a1a;
          margin: 0 0 10px;
        }

        .host-cta-desc {
          font-size: 0.9rem;
          color: #555;
          line-height: 1.6;
          margin: 0 0 20px;
        }

        .host-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, var(--brand-blue, #71b7e1), #3a9fd1);
          color: white;
          border: none;
          padding: 13px 24px;
          border-radius: 12px;
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          transition: all 0.2s;
        }

        .host-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(113, 183, 225, 0.4);
        }

        .host-cta-illustration {
          opacity: 0.6;
          padding-right: 20px;
        }

        /* Quick Links */
        .host-section-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 16px;
        }

        .host-quick-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }

        .host-quick-btn {
          background: white;
          border: 1px solid #f0f0f0;
          border-radius: 14px;
          padding: 20px 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          color: #444;
          transition: all 0.2s;
        }

        .host-quick-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.08);
          border-color: transparent;
        }

        .host-quick-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
        }

        /* Empty State */
        .host-empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 80px 40px;
          background: white;
          border-radius: 20px;
          text-align: center;
          border: 1px solid #f0f0f0;
        }

        .host-empty-icon {
          width: 64px;
          height: 64px;
          background: rgba(113, 183, 225, 0.12);
          color: var(--brand-blue, #71b7e1);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.6rem;
          margin-bottom: 8px;
        }

        .host-empty-state h3 {
          font-size: 1.2rem;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0;
        }

        .host-empty-state p {
          font-size: 0.9rem;
          color: #aaa;
          margin: 0;
          max-width: 300px;
        }

        @media (max-width: 1024px) {
          .host-stats-grid { grid-template-columns: repeat(2, 1fr); }
          .host-quick-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 768px) {
          .host-sidebar { display: none; }
          .host-main { padding: 24px 20px; }
          .host-cta-illustration { display: none; }
        }
      `}</style>
    </div>
  )
}
