import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import hostIcon from '../assets/host.png'

interface MainHeaderProps {
  scrolledInitial?: boolean
  expandedInitial?: boolean
  onSearch?: (term: string) => void
  showSearch?: boolean
  miniSearchOnly?: boolean
}

const MainHeader: React.FC<MainHeaderProps> = ({ 
  scrolledInitial = false, 
  expandedInitial = false, 
  onSearch,
  showSearch = true,
  miniSearchOnly = false
}) => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [scrolled, setScrolled] = useState(scrolledInitial)
  const [expanded, setExpanded] = useState(expandedInitial)
  const [whereValue, setWhereValue] = useState('')
  const [whenValue, setWhenValue] = useState('')
  const [whoValue, setWhoValue] = useState('Add guest')
  const [showMenuDropdown, setShowMenuDropdown] = useState(false)
  const [isHostingMode] = useState(searchParams.get('mode') === 'host')

  const menuRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)

  const [guestCounts, setGuestCounts] = useState({ adults: 0, children: 0, infants: 0, pets: 0 })
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenuDropdown(false)
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setActiveDropdown(null)
        // If clicking completely outside the search area, collapse it if we are scrolled or miniSearchOnly
        if (scrolled || miniSearchOnly) {
          setExpanded(false)
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (!showSearch || miniSearchOnly) {
      if (miniSearchOnly) setScrolled(true)
      return;
    }

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
  }, [showSearch, miniSearchOnly])

  const handleBecomeHost = () => {
    window.location.href = 'https://github.com/jolinajavier02/Metrolodges-Host-dashboard.git'
  }

  const handleLogout = () => {
    logout()
    setShowMenuDropdown(false)
  }

  const handleSearchClick = (term: string) => {
    setActiveDropdown(null)
    setExpanded(false)
    if (onSearch) onSearch(term)
    else navigate(`/?search=${encodeURIComponent(term)}`)
  }

  const updateGuestCounts = (type: keyof typeof guestCounts, operation: 'inc' | 'dec') => {
    setGuestCounts(prev => {
      const newCounts = { ...prev }
      if (operation === 'inc') newCounts[type]++
      else if (newCounts[type] > 0) newCounts[type]--

      const total = newCounts.adults + newCounts.children
      const parts = []
      if (total > 0) parts.push(`${total} guest${total > 1 ? 's' : ''}`)
      if (newCounts.infants > 0) parts.push(`${newCounts.infants} infant${newCounts.infants > 1 ? 's' : ''}`)
      if (newCounts.pets > 0) parts.push(`${newCounts.pets} pet${newCounts.pets > 1 ? 's' : ''}`)

      setWhoValue(parts.length > 0 ? parts.join(', ') : 'Add guest')
      return newCounts
    })
  }

  const handleDateSelect = (day: number, monthOffset: number) => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth() + monthOffset
    const selectedDate = new Date(year, month, day)

    if (!startDate || (startDate && endDate)) {
      setStartDate(selectedDate)
      setEndDate(null)
    } else if (selectedDate < startDate) {
      setStartDate(selectedDate)
    } else if (selectedDate.getTime() === startDate.getTime()) {
      setStartDate(null)
    } else {
      setEndDate(selectedDate)
      const startStr = startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      const endStr = selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      setWhenValue(`${startStr} – ${endStr}`)
    }
  }

  const renderCalendarDays = (monthOffset: number) => {
    const monthDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + monthOffset)
    const daysInMonth = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0).getDate()
    const firstDay = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1).getDay()
    const days = []

    for (let i = 0; i < firstDay; i++) days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>)

    for (let day = 1; day <= daysInMonth; day++) {
      const thisDate = new Date(monthDate.getFullYear(), monthDate.getMonth(), day)
      const isSelected = (startDate?.getTime() === thisDate.getTime()) || (endDate?.getTime() === thisDate.getTime())
      const isInRange = startDate && endDate && thisDate > startDate && thisDate < endDate
      days.push(
        <div key={day} className={`calendar-day ${isSelected ? 'selected' : ''} ${isInRange ? 'in-range' : ''}`} 
          onClick={() => handleDateSelect(day, monthOffset)}>{day}</div>
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

  return (
    <>
      {showSearch && !miniSearchOnly && <div ref={sentinelRef} id="scrollSentinel"></div>}
      <header ref={headerRef} id="mainHeader" className={`${scrolled || miniSearchOnly ? 'scrolled' : ''} ${expanded ? 'expanded' : ''} ${!showSearch ? 'no-search' : ''}`}>
        <div className="header-row-1">
          <Link to="/" className="logo-container" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <img src="/logo.png" alt="Metrolodges Logo" style={{ objectFit: 'contain', height: '40px', width: 'auto' }} />
            <div className="logo-text-group">
              <span className="logo-name" style={{ margin: 0, fontWeight: 800 }}>Metrolodges</span>
              <span className="logo-tagline" style={{ display: 'block', margin: 0, fontWeight: 600, color: 'var(--brand-blue, #71b7e1)' }}>Your Gateway to Great Stays</span>
            </div>
          </Link>

          {showSearch && (
            <div className="mini-search-bar" id="miniSearchBar" onClick={() => { setExpanded(true); setActiveDropdown('where'); }}>
              <button className="mini-search-item" onClick={(e) => { e.stopPropagation(); setExpanded(true); setActiveDropdown('where'); }}>
                {whereValue || 'Anywhere'}
              </button>
              <span className="mini-divider"></span>
              <button className="mini-search-item" onClick={(e) => { e.stopPropagation(); setExpanded(true); setActiveDropdown('when'); }}>
                {whenValue || 'When'}
              </button>
              <span className="mini-divider"></span>
              <button className="mini-search-item mini-guests" onClick={(e) => { e.stopPropagation(); setExpanded(true); setActiveDropdown('who'); }}>
                {whoValue}
              </button>
              <button className="mini-search-btn" onClick={(e) => { e.stopPropagation(); setExpanded(true); handleSearchClick(whereValue); }}>
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          )}

          <div className="header-right">
            <button className="become-host" onClick={handleBecomeHost}>
              {user ? (isHostingMode ? 'Switch to travelling' : 'Switch to hosting') : 'Become a host'}
            </button>
            <div className={`user-menu ${!user ? 'logged-out' : ''}`} ref={menuRef} onClick={() => setShowMenuDropdown(!showMenuDropdown)}>
              <i className="fa-solid fa-bars"></i>
              {user && (
                <div className="user-avatar-circle">{user.name?.[0]?.toUpperCase() || 'U'}</div>
              )}

              {showMenuDropdown && (
                <div className="menu-dropdown">
                  {user ? (
                    <>
                      <Link to="/saved" onClick={() => setShowMenuDropdown(false)}>
                        <div style={{ width: '20px', textAlign: 'center' }}><i className="fa-regular fa-heart"></i></div> Saved
                      </Link>
                      <a href="#" onClick={() => setShowMenuDropdown(false)}>
                        <div style={{ width: '20px', textAlign: 'center' }}><i className="fa-brands fa-airbnb"></i></div> Trips
                      </a>
                      <hr />
                      <a href="https://github.com/jolinajavier02/Metrolodges-Host-dashboard.git" className="menu-host-banner" onClick={() => setShowMenuDropdown(false)}>
                        <div className="menu-host-text-group">
                          <b style={{ fontWeight: 600, color: '#222', fontSize: '0.95rem' }}>{isHostingMode ? 'Switch to travelling' : 'Switch to hosting'}</b>
                          <span style={{ fontSize: '0.85rem', color: '#717171', display: 'block', marginTop: '2px', lineHeight: '1.3' }}>It's easy to start hosting and<br/>earn extra income.</span>
                        </div>
                        <img src={hostIcon} alt="Mascot" style={{ height: '40px', objectFit: 'contain' }} />
                      </a>
                      <hr style={{ margin: '0' }} />
                      <button className="menu-logout" onClick={handleLogout} style={{ paddingTop: '16px', paddingBottom: '16px', border: 'none', background: 'transparent', textAlign: 'left', width: '100%', cursor: 'pointer', paddingLeft: '18px', fontSize: '0.95rem' }}>
                        Log out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" onClick={() => setShowMenuDropdown(false)} style={{ fontWeight: 600 }}>Log in or sign up</Link>
                      <hr />
                      <a href="https://github.com/jolinajavier02/Metrolodges-Host-dashboard.git" className="menu-host-banner" onClick={() => setShowMenuDropdown(false)}>
                        <div className="menu-host-text-group">
                          <b style={{ fontWeight: 600, color: '#222', fontSize: '0.95rem' }}>Become a host</b>
                          <span style={{ fontSize: '0.85rem', color: '#717171', display: 'block', marginTop: '2px', lineHeight: '1.3' }}>It's easy to start hosting and<br/>earn extra income.</span>
                        </div>
                        <img src={hostIcon} alt="Mascot" style={{ height: '40px', objectFit: 'contain' }} />
                      </a>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {showSearch && (
          <div className="header-search-row" id="headerSearchRow">
            <h1 className="hero-title">Book Anywhere, <span>Stay Anywhere</span> <img src="/emoji.png" alt="Emoji" className="hero-mascot" /></h1>
            <div className={`search-container${activeDropdown ? ' search-active' : ''}`} ref={searchRef}>
              <div className={`search-item${activeDropdown === 'where' ? ' active' : ''}`} onClick={() => setActiveDropdown('where')}>
                <label>Where</label>
                <input type="text" placeholder="Search destinations" value={whereValue} readOnly />
                {activeDropdown === 'where' && (
                  <div className="dropdown-menu where-dropdown active">
                    <p className="suggested-title">Suggested destinations</p>
                    {destinations.map((dest, idx) => (
                      <div key={idx} className="destination-item" onClick={() => { setWhereValue(dest.name); handleSearchClick(dest.name); }}>
                        <div className="dest-icon"><i className={`fa-solid ${dest.icon}`}></i></div>
                        <div className="dest-info"><b>{dest.name}</b><span>{dest.desc}</span></div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

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
                            <h3 className="month-label">{new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h3>
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

              <div className={`search-item${activeDropdown === 'who' ? ' active' : ''}`} onClick={() => setActiveDropdown('who')}>
                <label>Add guest</label>
                <input type="text" placeholder="Add guest" value={whoValue} readOnly />
                {activeDropdown === 'who' && (
                  <div className="dropdown-menu who-dropdown active" onClick={e => e.stopPropagation()}>
                    {['adults', 'children', 'infants', 'pets'].map(type => (
                      <div key={type} className="guest-row">
                        <div className="guest-info"><b>{type.charAt(0).toUpperCase() + type.slice(1)}</b></div>
                        <div className="guest-controls">
                          <button className="control-btn minus" disabled={guestCounts[type as keyof typeof guestCounts] === 0} onClick={e => { e.stopPropagation(); updateGuestCounts(type as keyof typeof guestCounts, 'dec') }}>-</button>
                          <span className="guest-count">{guestCounts[type as keyof typeof guestCounts]}</span>
                          <button className="control-btn plus" onClick={e => { e.stopPropagation(); updateGuestCounts(type as keyof typeof guestCounts, 'inc') }}>+</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button className="search-btn" onClick={() => handleSearchClick(whereValue)}>
                <i className="fa-solid fa-magnifying-glass"></i> Search
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  )
}

export default MainHeader
