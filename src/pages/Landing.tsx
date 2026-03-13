import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { philippineListings, indiaListings } from '../utils/listings'
import PropertyCard from '../components/PropertyCard'
import Footer from '../components/Footer'
import { useAuth } from '../context/AuthContext'
import hostIcon from '../assets/host.png'

const Landing: React.FC = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [scrolled, setScrolled] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [whereValue, setWhereValue] = useState('')
  const [whenValue, setWhenValue] = useState('')
  const [whoValue, setWhoValue] = useState('Add guests')
  const [showMenuDropdown, setShowMenuDropdown] = useState(false)
  const [searchParams] = useSearchParams()
  const [isHostingMode, setIsHostingMode] = useState(searchParams.get('mode') === 'host')

  const menuRef = useRef<HTMLDivElement>(null)

  const [guestCounts, setGuestCounts] = useState({ adults: 0, children: 0, infants: 0, pets: 0 })
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  
  const allListings = [...indiaListings, ...philippineListings]
  const [filteredListings, setFilteredListings] = useState(allListings)

  // Group listings by city
  const groupedListings = filteredListings.reduce((acc, listing) => {
    const city = listing.city || 'Other'
    if (!acc[city]) acc[city] = []
    acc[city].push(listing)
    return acc
  }, {} as { [key: string]: typeof allListings })

  // For horizontal scroll
  const scrollRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const [scrollState, setScrollState] = useState<{ [key: string]: { start: boolean, end: boolean } }>({})

  const updateScrollState = (city: string) => {
    const el = scrollRefs.current[city]
    if (el) {
      const isAtStart = el.scrollLeft <= 5
      const isAtEnd = el.scrollLeft + el.offsetWidth >= el.scrollWidth - 5
      setScrollState(prev => ({
        ...prev,
        [city]: { start: isAtStart, end: isAtEnd }
      }))
    }
  }

  useEffect(() => {
    // Initial state for all cities
    Object.keys(groupedListings).forEach(city => {
      updateScrollState(city)
    })
  }, [groupedListings])

  const scroll = (city: string, direction: 'left' | 'right') => {
    const el = scrollRefs.current[city]
    if (el) {
      // Move by 6 items (the full width of the container)
      const scrollAmount = direction === 'left' ? -el.offsetWidth : el.offsetWidth
      el.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

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
      setIsHostingMode(!isHostingMode)
    } else {
      navigate('/login?intent=host&redirect=/')
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
              {user ? (isHostingMode ? 'Switch to travelling' : 'Switch to hosting') : 'Become a host'}
            </button>
            <div className={`user-menu ${!user ? 'logged-out' : ''}`} ref={menuRef} onClick={() => setShowMenuDropdown(!showMenuDropdown)}>
              <i className="fa-solid fa-bars"></i>
              {user && (
                <div className="user-avatar-circle">{user.name?.[0]?.toUpperCase() || 'U'}</div>
              )}

              {/* Dropdown Menu */}
              {showMenuDropdown && (
                <div className="menu-dropdown">
                  {user ? (
                    <>
                      <a href="#" onClick={() => setShowMenuDropdown(false)}>
                        <div style={{ width: '20px', textAlign: 'center' }}><i className="fa-regular fa-heart"></i></div> Wishlists
                      </a>
                      <a href="#" onClick={() => setShowMenuDropdown(false)}>
                        <div style={{ width: '20px', textAlign: 'center' }}><i className="fa-brands fa-airbnb"></i></div> Trips
                      </a>
                      <a href="#" onClick={() => setShowMenuDropdown(false)}>
                        <div style={{ width: '20px', textAlign: 'center' }}><i className="fa-regular fa-message"></i></div> Messages
                      </a>
                      <a href="#" onClick={() => setShowMenuDropdown(false)}>
                        <div style={{ width: '20px', textAlign: 'center' }}><i className="fa-regular fa-circle-user"></i></div> Profile
                      </a>
                      <hr />
                      <a href="#" onClick={() => setShowMenuDropdown(false)}>
                        <div style={{ width: '20px', textAlign: 'center' }}><i className="fa-solid fa-gear"></i></div> Account settings
                      </a>
                      <a href="#" onClick={() => setShowMenuDropdown(false)}>
                        <div style={{ width: '20px', textAlign: 'center' }}><i className="fa-solid fa-globe"></i></div> Languages & currency
                      </a>
                      <a href="#" onClick={() => setShowMenuDropdown(false)}>
                        <div style={{ width: '20px', textAlign: 'center' }}><i className="fa-regular fa-circle-question"></i></div> Help Centre
                      </a>
                      <hr />
                      <Link to="/" className="menu-host-banner" onClick={() => { setShowMenuDropdown(false); handleBecomeHost() }}>
                        <div className="menu-host-text-group">
                          <b style={{ fontWeight: 600, color: '#222', fontSize: '0.95rem' }}>{isHostingMode ? 'Switch to travelling' : 'Switch to hosting'}</b>
                          <span style={{ fontSize: '0.85rem', color: '#717171', display: 'block', marginTop: '2px', lineHeight: '1.3' }}>It's easy to start hosting and<br/>earn extra income.</span>
                        </div>
                        <img src={hostIcon} alt="Mascot" style={{ height: '40px', objectFit: 'contain' }} />
                      </Link>
                      <a href="#" onClick={() => setShowMenuDropdown(false)} style={{ paddingTop: '8px', paddingBottom: '8px', fontWeight: 400 }}>
                        <div style={{ width: '20px' }}></div> Refer a host
                      </a>
                      <a href="#" onClick={() => setShowMenuDropdown(false)} style={{ paddingTop: '8px', paddingBottom: '8px', fontWeight: 400 }}>
                        <div style={{ width: '20px' }}></div> Find a co-host
                      </a>
                      <a href="#" onClick={() => setShowMenuDropdown(false)} style={{ paddingTop: '8px', paddingBottom: '16px', fontWeight: 400 }}>
                        <div style={{ width: '20px' }}></div> Gift cards
                      </a>
                      <hr style={{ margin: '0' }} />
                      <button className="menu-logout" onClick={handleLogout} style={{ paddingTop: '16px', paddingBottom: '16px', fontWeight: 400, border: 'none', background: 'transparent', textAlign: 'left', width: '100%', cursor: 'pointer', paddingLeft: '18px', fontSize: '0.95rem' }}>
                        Log out
                      </button>
                    </>
                  ) : (
                    <>
                      <a href="#" className="menu-help-item" onClick={() => setShowMenuDropdown(false)}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                           <i className="fa-regular fa-circle-question" style={{ fontSize: '1.2rem' }}></i>
                           <b style={{ fontWeight: 500, color: '#222' }}>Help Centre</b>
                        </div>
                      </a>
                      <hr style={{ margin: '8px 0' }} />
                      <Link to="/host" className="menu-host-banner" onClick={() => { setShowMenuDropdown(false); handleBecomeHost() }}>
                        <div className="menu-host-text-group">
                          <b style={{ fontWeight: 600, color: '#222', fontSize: '0.95rem' }}>Become a host</b>
                          <span style={{ fontSize: '0.85rem', color: '#717171', display: 'block', marginTop: '2px', lineHeight: '1.3' }}>It's easy to start hosting and<br/>earn extra income.</span>
                        </div>
                        <img src={hostIcon} alt="Mascot" style={{ height: '40px', objectFit: 'contain' }} />
                      </Link>
                      <a href="#" onClick={() => setShowMenuDropdown(false)} style={{ paddingTop: '8px', paddingBottom: '8px', fontWeight: 400 }}>
                        Find a co-host
                      </a>
                      <a href="#" onClick={() => setShowMenuDropdown(false)} style={{ paddingTop: '8px', paddingBottom: '16px', fontWeight: 400 }}>
                        Gift cards
                      </a>
                      <hr style={{ margin: '0' }} />
                      <Link to="/login" onClick={() => setShowMenuDropdown(false)} style={{ paddingTop: '16px', paddingBottom: '16px', fontWeight: 400 }}>
                        Log in or sign up
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
      <div className="categories-wrapper">
        <div className="categories">
          {categories.map((cat, idx) => (
            <div key={idx} className={idx === 0 ? 'category-item active' : 'category-item'}>
              <i className={`fa-solid ${cat.icon}`}></i>
              <span>{cat.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="main-content">
        {/* We'll focus on the specific city sections as requested */}

        {Object.entries(groupedListings).length > 0 ? (
          Object.entries(groupedListings).map(([city, listings], idx) => {
            const getTitle = (cityName: string, index: number) => {
              if (cityName === 'Other') return 'More places to stay';
              const prefixes = [
                'Popular homes in',
                'Available in',
                'Places in',
                'Stay in',
                'Check out',
                'Home to stay in'
              ];
              return `${prefixes[index % prefixes.length]} ${cityName}`;
            };
            
            return (
              <section key={city} className="city-section">
                <div className="section-header">
                  <Link to={`/category/${city}`} style={{ textDecoration: 'none' }}>
                    <h2 className="section-title">
                      {getTitle(city, idx)}
                      <i className="fa-solid fa-chevron-right section-arrow"></i>
                    </h2>
                  </Link>
                <div className="scroll-controls">
                  <button 
                    className="scroll-btn-arrow" 
                    onClick={() => scroll(city, 'left')}
                    style={{ 
                      opacity: scrollState[city]?.start ? 0.2 : 1,
                      transition: 'opacity 0.2s'
                    }}
                  >
                    <i className="fa-solid fa-chevron-left"></i>
                  </button>
                  <button 
                    className="scroll-btn-arrow" 
                    onClick={() => scroll(city, 'right')}
                    style={{ 
                      opacity: scrollState[city]?.end ? 0.2 : 1,
                      transition: 'opacity 0.2s'
                    }}
                  >
                    <i className="fa-solid fa-chevron-right"></i>
                  </button>
                </div>
              </div>
              
              <div 
                className="listing-scroll-container" 
                ref={el => scrollRefs.current[city] = el}
                onScroll={() => updateScrollState(city)}
              >
                {listings.slice(0, 9).map(listing => (
                  <div key={listing.id} className="scroll-item">
                    <PropertyCard listing={listing} />
                  </div>
                ))}
                
                {/* See All Card - Always show after 9 listings or if less */}
                <div className="scroll-item see-all-card-item">
                  <Link to={`/category/${city}`} className="see-all-card">
                    <div className="see-all-content">
                      <div className="see-all-icons">
                         {listings.slice(0, 3).map((l, i) => (
                           <img key={i} src={l.image} alt="prev" className={`prev-img img-${i}`} />
                         ))}
                      </div>
                      <span className="see-all-text">See all</span>
                    </div>
                  </Link>
                </div>
              </div>
            </section>
            );
          })
        ) : (
           whereValue !== 'Anywhere' && (
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
           )
        )}
      </main>

      {/* Map functionality removed per user request */}

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
        
        .menu-dropdown a {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 18px;
          text-decoration: none;
          color: #222;
          font-size: 0.95rem;
          font-weight: 500;
          transition: background 0.15s;
        }
        
        .menu-dropdown a:hover {
          background: #f5f5f5;
        }

        .menu-login-link {
          font-weight: 700 !important;
        }

        .menu-dropdown a.menu-help-item {
          border: 1px solid #222;
          margin: 12px 16px;
          border-radius: 8px;
          padding: 10px 16px;
          transition: transform 0.1s, box-shadow 0.1s;
        }

        .menu-dropdown a.menu-help-item:hover {
          background: #f7f7f7;
        }

        .menu-dropdown a.menu-host-banner {
          justify-content: space-between;
          padding: 16px 20px;
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

        .categories-wrapper {
           padding: 0 80px;
           border-bottom: 1px solid #f1f1f1;
         }

         .categories {
            display: flex;
            align-items: center;
            justify-content: flex-start; /* Move back to left */
            gap: 20px;
            overflow-x: auto;
            scrollbar-width: none;
            padding: 8px 0;
            background: white;
         }
         
         .category-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 6px;
            opacity: 0.6;
            cursor: pointer;
            min-width: fit-content;
            transition: opacity 0.2s, color 0.2s;
            font-size: 0.75rem;
            padding-bottom: 8px;
         }

         .category-item i {
            font-size: 1.1rem;
         }

         .category-item:hover, .category-item.active {
            opacity: 1;
            color: #000;
         }

         .category-item.active {
            border-bottom: 2px solid #000;
         }
        .main-grid-container {
           padding: 0 80px;
           margin-bottom: 0;
        }

        .main-grid-title {
           font-size: 1.5rem;
           font-weight: 700;
           color: #222;
           margin-bottom: 32px;
           letter-spacing: -0.02em;
        }

        .listing-grid {
           display: grid;
           grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
           gap: 40px 24px;
        }

        .section-title-main {
           font-size: 1.5rem;
           font-weight: 700;
           color: #222;
           letter-spacing: -0.02em;
        }

        .city-section {
          margin-bottom: 0px; /* Gap removed */
          padding: 0 80px;
        }

          .section-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: -4px; /* Slightly negative or zero to pull cards up */
            padding-bottom: 0;
          }

        .section-title {
          font-size: 1.4rem;
          font-weight: 700;
          color: #222;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          letter-spacing: -0.01em;
          margin: 0; /* Remove default h2 margins */
        }

        .section-arrow {
          font-size: 0.8rem;
          width: 28px;
          height: 28px;
          background: #f1f1f1;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #222;
        }

        .scroll-controls {
          display: flex;
          gap: 16px;
        }

        .scroll-btn-arrow {
          background: transparent;
          color: #222;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border: none;
          font-size: 1rem;
          transition: opacity 0.2s;
          padding: 0;
          width: auto;
          height: auto;
        }

        .scroll-btn-arrow:first-child {
          border-right: none;
        }

        .scroll-btn-arrow:hover {
          opacity: 0.7;
          background: transparent;
        }

        .listing-scroll-container {
          display: flex;
          gap: 0px; /* No gap as requested */
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          padding-top: 0px; /* Flush with header */
          padding-bottom: 0px;
          scrollbar-width: none;
          -ms-overflow-style: none;
          margin-top: 0px;
        }

        .listing-scroll-container::-webkit-scrollbar {
          display: none;
        }

        .scroll-item {
          flex: 0 0 calc(100% / 7); /* Divide evenly with no gaps */
          scroll-snap-align: start;
          min-width: 180px;
        }

        @media (max-width: 1400px) {
          .scroll-item { flex: 0 0 calc(20% - 18px); }
        }

        @media (max-width: 1100px) {
          .scroll-item { flex: 0 0 calc(25% - 16px); }
          .city-section { padding: 0 40px; }
        }

        @media (max-width: 768px) {
          .scroll-item { flex: 0 0 calc(50% - 12px); }
          .city-section { padding: 0 24px; }
        }

        /* Listing Card Styles */
        .listing-card {
          display: flex;
          flex-direction: column;
          gap: 4px; /* Reduced gap */
          cursor: pointer;
          width: 100%;
          min-width: 0;
        }

        .listing-image-container {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          border-radius: 12px;
          overflow: hidden;
          background: #f1f1f1;
        }

        .listing-image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .listing-card:hover .listing-image-container img {
          transform: scale(1.05);
        }

        .listing-badge-overlay {
          position: absolute;
          top: 10px;
          left: 10px;
          background: rgba(255, 255, 255, 0.95);
          color: #222;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 0.72rem;
          font-weight: 700;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          z-index: 2;
        }

        .heart-btn-overlay {
          position: absolute;
          top: 10px;
          right: 10px;
          background: none;
          border: none;
          color: white;
          font-size: 1.15rem;
          cursor: pointer;
          filter: drop-shadow(0 0 2px rgba(0,0,0,0.8));
          padding: 0;
          z-index: 2;
          transition: transform 0.2s;
        }

        .heart-btn-overlay:hover {
          transform: scale(1.1);
        }

        .listing-details {
          display: flex;
          flex-direction: column;
          gap: 0;
          padding-top: 4px;
        }

        .listing-title-bold {
          font-weight: 700;
          color: #222;
          font-size: 0.82rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-bottom: 2px;
        }

        .listing-info-summary {
          display: flex;
          align-items: center;
          gap: 4px;
          color: #555;
          font-size: 0.78rem;
        }

        .price-details {
          white-space: nowrap;
        }

        .rating-summary {
          display: flex;
          align-items: center;
          gap: 3px;
          color: #222;
        }

        .rating-summary::before {
          content: '·';
          margin-right: 3px;
          color: #717171;
        }

        .rating-summary i {
          font-size: 0.65rem;
          margin-top: -1px;
        }

        /* Card Carousel Overlay */
        .img-nav-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 8px;
          opacity: 0;
          transition: opacity 0.2s;
          pointer-events: none;
          z-index: 1;
        }

        .listing-card:hover .img-nav-overlay {
          opacity: 1;
        }

        .nav-arrow-btn {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 1px solid #ddd;
          background: rgba(255, 255, 255, 0.9);
          color: #222;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 0.65rem;
          pointer-events: all;
          transition: transform 0.15s;
        }

        .nav-arrow-btn:hover {
          background: white;
          transform: scale(1.05);
        }

        .carousel-indicators-dots {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 5px;
          z-index: 2;
        }

        .dot-indicator {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.6);
        }

        .dot-indicator.active {
          background: white;
        }

        .listing-price-val {
          font-weight: 600;
          color: #222;
          font-size: 0.95rem;
        }

        .listing-price-label {
          color: #222;
          font-size: 0.9rem;
        }

        .listing-price-label::before {
          content: '· ';
        }

        /* See All Card */
        .see-all-card {
          display: block;
          height: 100%;
          text-decoration: none;
          color: inherit;
        }

        .see-all-content {
          height: 100%;
          min-height: 200px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: white;
          border: 1px solid #ddd;
          border-radius: 12px;
          gap: 12px;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .see-all-content:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .see-all-icons {
          position: relative;
          width: 60px;
          height: 60px;
        }

        .prev-img {
          position: absolute;
          width: 45px;
          height: 45px;
          border-radius: 8px;
          object-fit: cover;
          border: 2px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .img-0 { transform: translate(0, 0) rotate(-10deg); z-index: 1; }
        .img-1 { transform: translate(15px, 8px) rotate(5deg); z-index: 2; }
        .img-2 { transform: translate(8px, 15px) rotate(0deg); z-index: 3; }

        .see-all-text {
          font-weight: 600;
          color: #222;
          font-size: 0.85rem;
        }
      `}</style>
    </div>
  )
}

export default Landing
