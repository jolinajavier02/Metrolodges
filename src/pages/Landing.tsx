import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { philippineListings, indiaListings } from '../utils/listings'

const Landing: React.FC = () => {
  const [scrolled, setScrolled] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [whereValue, setWhereValue] = useState('')
  const [whenValue, setWhenValue] = useState('')
  const [whoValue, setWhoValue] = useState('Add guests')
  const [showMenuDropdown, setShowMenuDropdown] = useState(false)
  
  const [guestCounts, setGuestCounts] = useState({ adults: 0, children: 0, infants: 0, pets: 0 })
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  
  const headerRef = useRef<HTMLDivElement>(null)
  const sentinelRef = useRef<HTMLDivElement>(null)

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
      setTimeout(() => setActiveDropdown(null), 500)
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

  const allListings = [...indiaListings, ...philippineListings]

  return (
    <div>
      <div ref={sentinelRef} id="scrollSentinel"></div>

      {/* Header */}
      <header ref={headerRef} id="mainHeader" className={scrolled ? 'scrolled' : ''} style={{ expanded: expanded ? 'true' : 'false' }}>
        <div className="header-row-1">
          <Link to="/" className="logo-container">
            <div className="logo-text-group">
              <span className="logo-name">Metrolodges</span>
              <span className="logo-tagline">Your Gateway to Great Stays</span>
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
            <button className="become-host">Become a host</button>
            <div className="user-menu" onClick={() => setShowMenuDropdown(!showMenuDropdown)}>
              <i className="fa-solid fa-bars"></i>
              <i className="fa-solid fa-circle-user" style={{ fontSize: '1.8rem' }}></i>
              
              {/* Dropdown Menu */}
              {showMenuDropdown && (
                <div className="menu-dropdown">
                  <Link to="/about">About</Link>
                  <Link to="/terms">Terms of Service</Link>
                  <Link to="/privacy">Privacy Policy</Link>
                  <hr />
                  <a href="#">Settings</a>
                  <a href="#">Help Center</a>
                  <a href="#">Log out</a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Full Search Bar */}
        <div className="header-search-row" id="headerSearchRow">
          <h1 className="hero-title">
            Book Anywhere, <span>Stay Anywhere</span>
          </h1>
          <div className="search-container">
            {/* Where */}
            <div className="search-item" onClick={() => setActiveDropdown(activeDropdown === 'where' ? null : 'where')}>
              <label>Where</label>
              <input type="text" placeholder="Search destinations" value={whereValue} readOnly />
              
              {activeDropdown === 'where' && (
                <div className="dropdown-menu where-dropdown active">
                  <p className="suggested-title">Suggested destinations</p>
                  <div className="destination-list">
                    {destinations.map((dest, idx) => (
                      <div key={idx} className="destination-item" onClick={() => { setWhereValue(dest.name); setActiveDropdown(null) }}>
                        <div className="dest-icon"><i className={`fa-solid ${dest.icon}`}></i></div>
                        <div className="dest-info"><b>{dest.name}</b><span>{dest.desc}</span></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* When */}
            <div className="search-item" onClick={() => setActiveDropdown(activeDropdown === 'when' ? null : 'when')}>
              <label>When</label>
              <input type="text" placeholder="Add dates" value={whenValue} readOnly />
              
              {activeDropdown === 'when' && (
                <div className="dropdown-menu calendar-dropdown active">
                  <div className="calendar-tabs">
                    <div className="calendar-tab active">Dates</div>
                    <div className="calendar-tab">Months</div>
                    <div className="calendar-tab">Flexible</div>
                  </div>

                  <div className="calendar-months-container">
                    {[0, 1].map(offset => (
                      <div key={offset} className="calendar-month">
                        <div className="calendar-header">
                          {offset === 0 && <button className="control-btn" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}><i className="fa-solid fa-chevron-left"></i></button>}
                          <h3 className="month-label">
                            {new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                          </h3>
                          {offset === 1 && <button className="control-btn" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}><i className="fa-solid fa-chevron-right"></i></button>}
                        </div>
                        <div className="calendar-grid">
                          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => <div key={idx} className="day-name">{day}</div>)}
                          {renderCalendarDays(offset)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flexibility-options">
                    <button className="flex-btn active">Exact dates</button>
                    <button className="flex-btn">± 1 day</button>
                    <button className="flex-btn">± 2 days</button>
                    <button className="flex-btn">± 3 days</button>
                    <button className="flex-btn">± 7 days</button>
                  </div>
                </div>
              )}
            </div>

            {/* Who */}
            <div className="search-item" onClick={() => setActiveDropdown(activeDropdown === 'who' ? null : 'who')}>
              <label>Who</label>
              <input type="text" placeholder="Add guests" value={whoValue} readOnly />
              
              {activeDropdown === 'who' && (
                <div className="dropdown-menu who-dropdown active">
                  {[
                    { type: 'adults' as const, label: 'Adults', desc: 'Ages 13 or above' },
                    { type: 'children' as const, label: 'Children', desc: 'Ages 2 – 12' },
                    { type: 'infants' as const, label: 'Infants', desc: 'Under 2' },
                    { type: 'pets' as const, label: 'Pets', desc: '' },
                  ].map(item => (
                    <div key={item.type} className="guest-row">
                      <div className="guest-info"><b>{item.label}</b><span>{item.desc}</span></div>
                      <div className="guest-controls">
                        <button className="control-btn minus" disabled={guestCounts[item.type] === 0} onClick={() => updateGuestCounts(item.type, 'dec')}>-</button>
                        <span className="guest-count">{guestCounts[item.type]}</span>
                        <button className="control-btn plus" onClick={() => updateGuestCounts(item.type, 'inc')}>+</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button className="search-btn">
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
        <h2 className="section-title"><i className="fa-solid fa-location-dot" style={{ color: 'var(--brand-blue)' }}></i> Places to stay in India</h2>
        <div className="listing-grid">
          {indiaListings.map(listing => (
            <Link key={listing.id} to={`/property/${listing.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="listing-card">
                <div className="listing-image-container">
                  <img src={listing.image} alt={listing.title} />
                  {listing.badge && <div className="badge">{listing.badge}</div>}
                  <i className="fa-regular fa-heart heart-icon"></i>
                </div>
                <div className="listing-info">
                  <div className="listing-title">{listing.title}</div>
                  <div className="listing-rating">
                    <i className="fa-solid fa-star"></i>
                    {listing.rating}
                  </div>
                </div>
                <div className="listing-meta">{listing.location}</div>
                <div className="listing-price">{listing.currency || '₹'}{listing.price.toLocaleString()} <span>per night</span></div>
              </div>
            </Link>
          ))}
        </div>

        <h2 className="section-title" style={{ marginTop: '4rem' }}><i className="fa-solid fa-location-dot" style={{ color: 'var(--brand-blue)' }}></i> Places to stay in the Philippines</h2>
        <div className="listing-grid">
          {philippineListings.map(listing => (
            <Link key={listing.id} to={`/property/${listing.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="listing-card">
                <div className="listing-image-container">
                  <img src={listing.image} alt={listing.title} />
                  {listing.badge && <div className="badge">{listing.badge}</div>}
                  <i className="fa-regular fa-heart heart-icon"></i>
                </div>
                <div className="listing-info">
                  <div className="listing-title">{listing.title}</div>
                  <div className="listing-rating">
                    <i className="fa-solid fa-star"></i>
                    {listing.rating}
                  </div>
                </div>
                <div className="listing-meta">{listing.location}</div>
                <div className="listing-price">{listing.currency || '₱'}{listing.price.toLocaleString()} <span>per night</span></div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
          <div>
            <h4>Support</h4>
            <ul style={{ listStyle: 'none' }}>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">AirCover</a></li>
              <li><a href="#">Supporting people with disabilities</a></li>
              <li><a href="#">Cancellation options</a></li>
            </ul>
          </div>
          <div>
            <h4>Hosting</h4>
            <ul style={{ listStyle: 'none' }}>
              <li><a href="#">Metrolodges your home</a></li>
              <li><a href="#">AirCover for Hosts</a></li>
              <li><a href="#">Hosting resources</a></li>
              <li><a href="#">Community forum</a></li>
            </ul>
          </div>
          <div>
            <h4>Metrolodges</h4>
            <ul style={{ listStyle: 'none' }}>
              <li><a href="#">Newsroom</a></li>
              <li><a href="#">New features</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Investors</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Metrolodges, Inc. &middot; Privacy &middot; Terms &middot; Sitemap</p>
          <div className="social-icons">
            <i className="fa-brands fa-facebook"></i>
            <i className="fa-brands fa-twitter"></i>
            <i className="fa-brands fa-instagram"></i>
          </div>
        </div>
      </footer>

      <style>{`
        .menu-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          background: white;
          border: 1px solid #ddd;
          border-radius: 8px;
          min-width: 250px;
          box-shadow: 0 6px 16px rgba(0,0,0,0.12);
          z-index: 1001;
          margin-top: 8px;
        }
        
        .menu-dropdown a {
          display: block;
          padding: 12px 16px;
          text-decoration: none;
          color: #222;
          border-bottom: 1px solid #f0f0f0;
          transition: background 0.2s;
        }
        
        .menu-dropdown a:hover {
          background: #f5f5f5;
        }
        
        .menu-dropdown hr {
          margin: 6px 0;
          border: none;
          border-top: 1px solid #f0f0f0;
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
