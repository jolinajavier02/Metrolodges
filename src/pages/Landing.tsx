import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { philippineListings, indiaListings } from '../utils/listings'
import PropertyCard from '../components/PropertyCard'
import Footer from '../components/Footer'
import { useAuth } from '../context/AuthContext'

const Landing: React.FC = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [scrolled, setScrolled] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [whereValue, setWhereValue] = useState('')
  const [whenValue, setWhenValue] = useState('')
  const [whoValue, setWhoValue] = useState('Add guests')
  const [showMenuDropdown, setShowMenuDropdown] = useState(false)

  const menuRef = useRef<HTMLDivElement>(null)

  const [guestCounts, setGuestCounts] = useState({ adults: 0, children: 0, infants: 0, pets: 0 })
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  
  const allListings = [...indiaListings, ...philippineListings]
  const [filteredListings, setFilteredListings] = useState(allListings)

  const handleSearch = (searchTerm: string) => {
    setActiveDropdown(null)
    if (!searchTerm || searchTerm === 'Nearby' || searchTerm === 'Anywhere') {
      setFilteredListings(allListings)
      return
    }
    
    const term = searchTerm.toLowerCase()
    const filtered = allListings.filter(listing => 
      listing.city?.toLowerCase().includes(term) ||
      listing.location?.toLowerCase().includes(term) ||
      listing.title.toLowerCase().includes(term)
    )
    setFilteredListings(filtered)
  }

  const headerRef = useRef<HTMLDivElement>(null)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)

  // Close menu dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenuDropdown(false)
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleBecomeHost = () => {
    if (user) {
      navigate('/host')
    } else {
      navigate('/login?intent=host&redirect=/host')
    }
  }

  const handleLogout = () => {
    logout()
    setShowMenuDropdown(false)
  }

  // Scroll observer for header behavior
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setScrolled(false)
          setExpanded(false)
        } else {
          setScrolled(true)
        }
      })
    }, { threshold: 0 })

    if (sentinelRef.current) observer.observe(sentinelRef.current)
    return () => observer.disconnect()
  }, [])

  // Update guest counts
  const updateGuestCounts = (type: keyof typeof guestCounts, operation: 'inc' | 'dec') => {
    setGuestCounts(prev => {
      const newCounts = { ...prev }
      if (operation === 'inc') {
        newCounts[type]++
      } else if (newCounts[type] > 0) {
        newCounts[type]--
      }

      const total = newCounts.adults + newCounts.children
      const parts = []
      if (total > 0) parts.push(`${total} guest${total > 1 ? 's' : ''}`)
      if (newCounts.infants > 0) parts.push(`${newCounts.infants} infant${newCounts.infants > 1 ? 's' : ''}`)
      if (newCounts.pets > 0) parts.push(`${newCounts.pets} pet${newCounts.pets > 1 ? 's' : ''}`)

      setWhoValue(parts.length > 0 ? parts.join(', ') : 'Add guests')
      return newCounts
    })
  }

  // Calendar rendering
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const handleDateSelect = (day: number, monthOffset: number) => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth() + monthOffset
    const selectedDate = new Date(year, month, day)

    if (!startDate || (startDate && endDate)) {
      // Start fresh selection
      setStartDate(selectedDate)
      setEndDate(null)
    } else if (selectedDate < startDate) {
      setStartDate(selectedDate)
    } else if (selectedDate.getTime() === startDate.getTime()) {
      setStartDate(null)
    } else {
      // Both dates selected — update display but keep calendar open
      setEndDate(selectedDate)
      const startStr = startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      const endStr = selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      setWhenValue(`${startStr} – ${endStr}`)
      // Do NOT auto-close — user closes by clicking elsewhere
    }
  }

  const renderCalendarDays = (monthOffset: number) => {
    const monthDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + monthOffset)
    const daysInMonth = getDaysInMonth(monthDate)
    const firstDay = getFirstDayOfMonth(monthDate)
    const days = []

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const thisDate = new Date(monthDate.getFullYear(), monthDate.getMonth(), day)
      const isSelected = (startDate?.getTime() === thisDate.getTime()) || (endDate?.getTime() === thisDate.getTime())
      const isInRange = startDate && endDate && thisDate > startDate && thisDate < endDate

      days.push(
        <div
          key={day}
          className={`calendar-day ${isSelected ? 'selected' : ''} ${isInRange ? 'in-range' : ''}`}
          onClick={() => handleDateSelect(day, monthOffset)}
        >
          {day}
        </div>
      )
    }

    return days
  }

  const destinations = [
    { icon: 'fa-location-crosshairs', name: 'Nearby', desc: "Find what's around you" },
    { icon: 'fa-mountain-city', name: 'Baguio, Philippines', desc: 'Great for a weekend getaway' },
    { icon: 'fa-volcano', name: 'Tagaytay, Philippines', desc: 'For nature-lovers' },
    { icon: 'fa-city', name: 'Makati, Philippines', desc: 'For business and leisure' },
    { icon: 'fa-umbrella-beach', name: 'Mumbai, India', desc: 'City of Dreams' },
    { icon: 'fa-fort-awesome', name: 'Delhi, India', desc: 'Historic capital' },
    { icon: 'fa-laptop-code', name: 'Bangalore, India', desc: 'Garden City' },
  ]

  const categories = [
    { icon: 'fa-house-chimney', name: 'Homes' },
    { icon: 'fa-mountain-sun', name: 'Amazing Pools' },
    { icon: 'fa-campground', name: 'Camping' },
    { icon: 'fa-snowflake', name: 'Arctic' },
    { icon: 'fa-umbrella-beach', name: 'Beachfront' },
    { icon: 'fa-city', name: 'Iconic Cities' },
  ]

  return (
    <div>
      <div ref={sentinelRef} id="scrollSentinel"></div>

      {/* Header */}
      <header ref={headerRef} id="mainHeader" className={`${scrolled ? 'scrolled' : ''} ${expanded ? 'expanded' : ''}`}>
        <div className="header-row-1">
          <Link to="/" className="logo-container" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <img src="/logo.png" alt="Metrolodges Logo" style={{ objectFit: 'contain', height: '40px', width: 'auto' }} />
            <div className="logo-text-group">
              <span className="logo-name" style={{ margin: 0 }}>Metrolodges</span>
              <span className="logo-tagline" style={{ display: 'block', margin: 0 }}>Your Gateway to Great Stays</span>
            </div>
          </Link>

          {/* Mini Search Bar */}
          <div className="mini-search-bar" id="miniSearchBar">
            <button className="mini-search-item">{whereValue || 'Anywhere'}</button>
            <span className="mini-divider"></span>
            <button className="mini-search-item">{whenValue || 'Anytime'}</button>
            <span className="mini-divider"></span>
            <button className="mini-search-item mini-guests">{whoValue}</button>
            <button className="mini-search-btn"><i className="fa-solid fa-magnifying-glass"></i></button>
          </div>

          <div className="header-right">
            <button className="become-host" onClick={handleBecomeHost}>
              {user ? '🏠 Host dashboard' : 'Become a host'}
            </button>
            <div className="user-menu" ref={menuRef} onClick={() => setShowMenuDropdown(!showMenuDropdown)}>
              <i className="fa-solid fa-bars"></i>
              {user ? (
                <div className="user-avatar-circle">{user.name?.[0]?.toUpperCase() || 'U'}</div>
              ) : (
                <i className="fa-solid fa-circle-user" style={{ fontSize: '1.8rem' }}></i>
              )}

              {/* Dropdown Menu */}
              {showMenuDropdown && (
                <div className="menu-dropdown">
                  {user ? (
                    <>
                      <div className="menu-user-info">
                        <div className="menu-user-avatar">{user.name?.[0]?.toUpperCase() || 'U'}</div>
                        <div>
                          <div className="menu-user-name">{user.name}</div>
                          <div className="menu-user-email">{user.email}</div>
                        </div>
                      </div>
                      <hr />
                      <Link to="/host" onClick={() => setShowMenuDropdown(false)}>
                        <i className="fa-solid fa-gauge-high"></i> Host Dashboard
                      </Link>
                      <Link to="/about" onClick={() => setShowMenuDropdown(false)}>
                        <i className="fa-solid fa-circle-info"></i> About
                      </Link>
                      <a href="#" onClick={() => setShowMenuDropdown(false)}>
                        <i className="fa-solid fa-gear"></i> Account Settings
                      </a>
                      <a href="#" onClick={() => setShowMenuDropdown(false)}>
                        <i className="fa-solid fa-circle-question"></i> Help Center
                      </a>
                      <hr />
                      <button className="menu-logout" onClick={handleLogout}>
                        <i className="fa-solid fa-right-from-bracket"></i> Log out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" onClick={() => setShowMenuDropdown(false)} className="menu-login-link">
                        <i className="fa-solid fa-right-to-bracket"></i> Log in
                      </Link>
                      <Link to="/login?tab=register" onClick={() => setShowMenuDropdown(false)}>
                        <i className="fa-solid fa-user-plus"></i> Sign up
                      </Link>
                      <hr />
                      <Link to="/host" onClick={() => { setShowMenuDropdown(false); handleBecomeHost() }}>
                        <i className="fa-solid fa-house-chimney"></i> Become a host
                      </Link>
                      <Link to="/about" onClick={() => setShowMenuDropdown(false)}>
                        <i className="fa-solid fa-circle-info"></i> About
                      </Link>
                      <a href="#" onClick={() => setShowMenuDropdown(false)}>
                        <i className="fa-solid fa-circle-question"></i> Help Center
                      </a>
                      <Link to="/terms" onClick={() => setShowMenuDropdown(false)}>
                        <i className="fa-solid fa-file-contract"></i> Terms of Service
                      </Link>
                      <Link to="/privacy" onClick={() => setShowMenuDropdown(false)}>
                        <i className="fa-solid fa-shield-halved"></i> Privacy Policy
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Full Search Bar */}
        <div className="header-search-row" id="headerSearchRow">
          <h1 className="hero-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            Book Anywhere, <span>Stay Anywhere</span> <img src="/emoji.png" alt="Emoji Mascot" className="hero-mascot" />
          </h1>
          <div className={`search-container${activeDropdown ? ' search-active' : ''}`} ref={searchRef}>
            {/* Where */}
            <div className={`search-item${activeDropdown === 'where' ? ' active' : ''}`} onClick={() => setActiveDropdown('where')}>
              <label>Where</label>
              <input type="text" placeholder="Search destinations" value={whereValue} readOnly />

              {activeDropdown === 'where' && (
                <div className="dropdown-menu where-dropdown active">
                  <p className="suggested-title">Suggested destinations</p>
                  <div className="destination-list">
                    {destinations.map((dest, idx) => (
                      <div key={idx} className="destination-item" onClick={() => { 
                        setWhereValue(dest.name); 
                        handleSearch(dest.name);
                      }}>
                        <div className="dest-icon"><i className={`fa-solid ${dest.icon}`}></i></div>
                        <div className="dest-info"><b>{dest.name}</b><span>{dest.desc}</span></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* When */}
            <div className={`search-item${activeDropdown === 'when' ? ' active' : ''}`} onClick={() => setActiveDropdown('when')}>
              <label>When</label>
              <input type="text" placeholder="Add dates" value={whenValue} readOnly />

              {activeDropdown === 'when' && (
                <div className="dropdown-menu calendar-dropdown active" onClick={e => e.stopPropagation()}>

                  <div className="calendar-months-container">
                    {[0, 1].map(offset => (
                      <div key={offset} className="calendar-month">
                        <div className="calendar-header">
                          {offset === 0 && <button className="control-btn" onClick={e => { e.stopPropagation(); setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)) }}><i className="fa-solid fa-chevron-left"></i></button>}
                          <h3 className="month-label">
                            {new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                          </h3>
                          {offset === 1 && <button className="control-btn" onClick={e => { e.stopPropagation(); setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)) }}><i className="fa-solid fa-chevron-right"></i></button>}
                        </div>
                        <div className="calendar-grid">
                          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => <div key={idx} className="day-name">{day}</div>)}
                          {renderCalendarDays(offset)}
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              )}
            </div>

            {/* Who */}
            <div className={`search-item${activeDropdown === 'who' ? ' active' : ''}`} onClick={() => setActiveDropdown('who')}>
              <label>Who</label>
              <input type="text" placeholder="Add guests" value={whoValue} readOnly />

              {activeDropdown === 'who' && (
                <div className="dropdown-menu who-dropdown active" onClick={e => e.stopPropagation()}>
                  {[
                    { type: 'adults' as const, label: 'Adults', desc: 'Ages 13 or above' },
                    { type: 'children' as const, label: 'Children', desc: 'Ages 2 – 12' },
                    { type: 'infants' as const, label: 'Infants', desc: 'Under 2' },
                    { type: 'pets' as const, label: 'Pets', desc: '' },
                  ].map(item => (
                    <div key={item.type} className="guest-row">
                      <div className="guest-info"><b>{item.label}</b><span>{item.desc}</span></div>
                      <div className="guest-controls">
                        <button className="control-btn minus" disabled={guestCounts[item.type] === 0}
                          onClick={e => { e.stopPropagation(); updateGuestCounts(item.type, 'dec') }}>-</button>
                        <span className="guest-count">{guestCounts[item.type]}</span>
                        <button className="control-btn plus"
                          onClick={e => { e.stopPropagation(); updateGuestCounts(item.type, 'inc') }}>+</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button className="search-btn" onClick={() => handleSearch(whereValue)}>
              <i className="fa-solid fa-magnifying-glass"></i>
              Search
            </button>
          </div>
        </div>
      </header>

      {/* Categories */}
      <div className="categories">
        {categories.map((cat, idx) => (
          <div key={idx} className={idx === 0 ? 'category-item active' : 'category-item'}>
            <i className={`fa-solid ${cat.icon}`}></i>
            <span>{cat.name}</span>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <main className="main-content">
        <h2 className="section-title">
          <i className="fa-solid fa-location-dot" style={{ color: 'var(--brand-blue)' }}></i> 
          {whereValue && whereValue !== 'Nearby' && whereValue !== 'Anywhere' 
            ? `Places to stay in ${whereValue.split(',')[0]}`
            : 'Explore all places to stay'}
        </h2>
        
        {filteredListings.length > 0 ? (
          <div className="listing-grid">
            {filteredListings.map(listing => (
              <PropertyCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-light)' }}>
            <i className="fa-solid fa-magnifying-glass" style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}></i>
            <h3>No places found</h3>
            <p>Try searching for a different destination or adjusting your filters.</p>
            <button 
              onClick={() => { setWhereValue('Anywhere'); handleSearch('Anywhere'); }}
              style={{ marginTop: '1rem', padding: '8px 16px', background: 'var(--brand-blue)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
            >
              Clear search
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      <style>{`
        .menu-dropdown {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          background: white;
          border: 1px solid #e8e8e8;
          border-radius: 16px;
          min-width: 260px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.14);
          z-index: 1001;
          overflow: hidden;
          animation: menuDropIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes menuDropIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        .menu-dropdown a,
        .menu-dropdown .menu-login-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 18px;
          text-decoration: none;
          color: #222;
          font-size: 0.9rem;
          font-weight: 500;
          transition: background 0.15s;
        }
        
        .menu-dropdown a:hover {
          background: #f5f5f5;
        }

        .menu-login-link {
          font-weight: 700 !important;
        }
        
        .menu-dropdown hr {
          margin: 6px 0;
          border: none;
          border-top: 1px solid #f0f0f0;
        }

        .menu-user-info {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 18px;
          background: linear-gradient(135deg, #e8f4fd, #f0f7ff);
        }

        .menu-user-avatar {
          width: 38px;
          height: 38px;
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

        .menu-user-name {
          font-size: 0.9rem;
          font-weight: 700;
          color: #1a1a1a;
        }

        .menu-user-email {
          font-size: 0.78rem;
          color: #aaa;
        }

        .menu-logout {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 18px;
          background: none;
          border: none;
          color: #e53935;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          width: 100%;
          text-align: left;
          transition: background 0.15s;
        }

        .menu-logout:hover { background: #fff3f3; }

        .user-avatar-circle {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--brand-blue, #71b7e1), #3a9fd1);
          color: white;
          font-size: 0.85rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .user-menu {
          position: relative;
          cursor: pointer;
        }

        .header-search-row {
          max-height: ${expanded ? '250px' : '250px'};
          opacity: ${scrolled && !expanded ? '0' : '1'};
          pointer-events: ${scrolled && !expanded ? 'none' : 'all'};
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        header.scrolled .header-search-row {
          max-height: 0;
          opacity: 0;
          pointer-events: none;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}

export default Landing
