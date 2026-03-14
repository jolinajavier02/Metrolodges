import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { allListings } from '../utils/listings'
import MainHeader from '../components/MainHeader'
import Footer from '../components/Footer'
import PropertyCard from '../components/PropertyCard'
import { useAuth } from '../context/AuthContext'
import { indiaListings, philippineListings } from '../utils/listings'

const PropertyDetail: React.FC = () => {
  const { toggleFavorite, isFavorite, user } = useAuth()
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const listing = allListings.find(l => l.id === parseInt(id || '0'))
  const active = listing ? isFavorite(listing.id) : false

  // Booking State
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [guestCount, setGuestCount] = useState(1)
  const [showAllPhotos, setShowAllPhotos] = useState(false)
  const [showMoreDescription, setShowMoreDescription] = useState(false)
  const [isBooked, setIsBooked] = useState(false)
  const [showBottomBar, setShowBottomBar] = useState(false)

  // Local storage for booked dates (simplified simulation)
  const [unavailableDates, setUnavailableDates] = useState<string[]>([])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 800) {
        setShowBottomBar(true)
      } else {
        setShowBottomBar(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (listing) {
      const stored = localStorage.getItem(`booked_dates_${listing.id}`)
      if (stored) {
        setUnavailableDates(JSON.parse(stored))
      }
    }
  }, [listing])

  const handleReserve = () => {
    if (!user) {
      navigate('/login')
      return
    }
    if (!startDate || !endDate) {
      alert('Please select check-in and check-out dates.')
      return
    }

    // Add selected range to unavailable dates
    const newUnavailable = [...unavailableDates]
    let current = new Date(startDate)
    while (current <= endDate) {
      newUnavailable.push(current.toDateString())
      current.setDate(current.getDate() + 1)
    }

    localStorage.setItem(`booked_dates_${listing?.id}`, JSON.stringify(newUnavailable))
    setUnavailableDates(newUnavailable)
    setIsBooked(true)
    setStartDate(null)
    setEndDate(null)
    alert('Reservation successful! These dates are now unavailable for others.')
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: listing?.title,
        url: window.location.href
      }).catch(() => {
        navigator.clipboard.writeText(window.location.href)
        alert('Link copied to clipboard!')
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  const isDateUnavailable = (date: Date) => {
    return unavailableDates.includes(date.toDateString())
  }

  if (!listing) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Property not found</h2>
        <Link to="/">Back to Home</Link>
      </div>
    )
  }

  return (
    <div style={{ background: '#fff', paddingBottom: '100px' }}>
      <MainHeader showSearch={false} />

      <div style={{ maxWidth: '1120px', margin: '0 auto', display: 'flex', justifyContent: 'flex-end', padding: '12px 24px 0' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <button 
            onClick={handleShare}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'underline', fontWeight: '600' }}
          >
            <i className="fa-solid fa-arrow-up-from-bracket"></i> Share
          </button>
          <button
            onClick={() => toggleFavorite(listing.id)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              textDecoration: 'underline',
              fontWeight: '600',
              color: active ? 'var(--brand-blue, #71b7e1)' : 'inherit'
            }}
          >
            <i className={`${active ? 'fa-solid' : 'fa-regular'} fa-heart`}></i> {active ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>

      <main style={{ maxWidth: '1120px', margin: '0 auto', padding: '24px 24px 80px' }}>
        {/* Title */}
        <h1 style={{ fontSize: '1.65rem', fontWeight: '600', marginBottom: '24px' }}>{listing.title}</h1>

        {/* Gallery */}
        <div className="property-gallery-grid">
          <img src={listing.image} alt="Main" className="gallery-main" />
          <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=600" alt="Vista 2" className="gallery-item" />
          <img src="https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=600" alt="Vista 3" className="gallery-item" />
          <img src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=600" alt="Vista 4" className="gallery-item" />
          <img src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=600" alt="Vista 5" className="gallery-item" />
          <button className="show-all-photos">
            <i className="fa-solid fa-grip"></i> Show all photos
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '80px', marginTop: '32px' }}>
          {/* Main Content */}
          <div>
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '1.35rem', fontWeight: '600', marginBottom: '4px' }}>
                Entire rental unit in {listing.location}
              </h2>
              <div style={{ fontSize: '1rem', color: '#222' }}>
                6 guests &middot; 2 bedrooms &middot; 3 beds &middot; 1 bath
              </div>
            </div>

            {/* Guest Favorite Badge */}
            <div className="guest-favorite-badge">
              <div className="badge-left">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <i className="fa-solid fa-award" style={{ fontSize: '1.5rem', marginBottom: '4px' }}></i>
                  <span style={{ fontSize: '0.75rem', fontWeight: '600' }}>Guest favourite</span>
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: '500', maxWidth: '180px' }}>
                  One of the most loved homes on Metrolodges, according to guests
                </div>
              </div>
              <div className="badge-right">
                <div style={{ fontSize: '1.2rem', fontWeight: '600' }}>{listing.rating}</div>
                <div style={{ display: 'flex', gap: '2px', fontSize: '0.7rem', color: 'var(--brand-blue, #71b7e1)' }}>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </div>
                <div style={{ fontSize: '0.85rem', textDecoration: 'underline', marginTop: '4px' }}>23 Reviews</div>
              </div>
            </div>

            {/* Host Section Small */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '32px 0' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(45deg, #71b7e1, #9b59b6)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                {listing.title[0]}
              </div>
              <div>
                <div style={{ fontWeight: '600' }}>Hosted by Sophia Suites {listing.city}</div>
                <div style={{ fontSize: '0.85rem', color: '#717171' }}>Superhost &middot; 7 years hosting</div>
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #DDDDDD', margin: '32px 0' }} />

            {/* Highlights */}
            <div className="highlight-item">
              <div className="highlight-icon"><i className="fa-solid fa-door-open"></i></div>
              <div className="highlight-text">
                <h4>Self check-in</h4>
                <p>You can check in with the building staff.</p>
              </div>
            </div>
            <div className="highlight-item">
              <div className="highlight-icon"><i className="fa-solid fa-house-chimney-window"></i></div>
              <div className="highlight-text">
                <h4>Extra spacious</h4>
                <p>Guests love this home's spaciousness for a comfortable stay.</p>
              </div>
            </div>
            <div className="highlight-item">
              <div className="highlight-icon"><i className="fa-solid fa-location-dot"></i></div>
              <div className="highlight-text">
                <h4>Lots to do nearby</h4>
                <p>Guests say this area has plenty to explore.</p>
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #DDDDDD', margin: '32px 0' }} />

            {/* Description */}
            <div style={{ position: 'relative' }}>
              <p style={{
                lineHeight: '1.6',
                color: '#222',
                maxHeight: showMoreDescription ? 'none' : '150px',
                overflow: 'hidden',
                whiteSpace: 'pre-line'
              }}>
                Sophia Suites {listing.city} stands out for several key reasons that appeal to both local and international travelers:{"\n\n"}
                1. Strategic Locations Across {listing.city}{"\n\n"}
                Sophia Suites operates units in highly sought-after areas such as Session Road, Burnham Park and many more...{"\n\n"}
                The property is meticulously maintained with high-end furniture and modern appliances to ensure you have a premium stay experience. Whether you're here for business or leisure, our space is designed to be your perfect home away from home.
              </p>
              {!showMoreDescription && (
                <button
                  onClick={() => setShowMoreDescription(true)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    marginTop: '8px',
                    fontWeight: '600',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    fontSize: '1rem'
                  }}
                >
                  Show more <i className="fa-solid fa-chevron-right" style={{ fontSize: '0.8rem' }}></i>
                </button>
              )}
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #DDDDDD', margin: '32px 0' }} />

            {/* Amenities */}
            <div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: '600', marginBottom: '24px' }}>What this place offers</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '1rem' }}><i className="fa-solid fa-kitchen-set" style={{ width: '24px' }}></i> Kitchen</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '1rem' }}><i className="fa-solid fa-wifi" style={{ width: '24px' }}></i> Wifi</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '1rem' }}><i className="fa-solid fa-car" style={{ width: '24px' }}></i> Free parking on premises</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '1rem' }}><i className="fa-solid fa-tv" style={{ width: '32px' }}></i> TV</div>
              </div>
              <button style={{
                marginTop: '32px',
                padding: '13px 23px',
                borderRadius: '8px',
                border: '1px solid var(--brand-blue, #71b7e1)',
                background: 'white',
                color: 'var(--brand-blue, #71b7e1)',
                fontWeight: '600',
                cursor: 'pointer'
              }}>
                Show all 10 amenities
              </button>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #DDDDDD', margin: '32px 0' }} />

            {/* Calendar Section */}
            <div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: '600' }}>
                2 nights in {listing.city}
              </h2>
              <div style={{ fontSize: '0.9rem', color: '#717171', margin: '8px 0 24px' }}>
                {startDate && endDate ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}` : 'Select your dates'}
              </div>

              {/* Dynamic Calendar */}
              <div style={{ display: 'flex', gap: '40px', overflowX: 'auto' }}>
                {[0, 1].map(offset => {
                  const viewDate = new Date();
                  viewDate.setMonth(viewDate.getMonth() + offset);
                  const year = viewDate.getFullYear();
                  const month = viewDate.getMonth();
                  const monthName = viewDate.toLocaleDateString('default', { month: 'long', year: 'numeric' });
                  const daysInMonth = new Date(year, month + 1, 0).getDate();
                  const firstDay = new Date(year, month, 1).getDay();
                  const emptyCells = firstDay === 0 ? 6 : firstDay - 1; // Assuming Monday start

                  return (
                    <div key={offset} style={{ flex: 1, minWidth: '300px' }}>
                      <div style={{ fontWeight: '600', marginBottom: '16px', textAlign: 'center' }}>{monthName}</div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px' }}>
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => <div key={d} style={{ fontSize: '0.75rem', textAlign: 'center', color: '#717171', paddingBottom: '8px' }}>{d}</div>)}
                        {Array.from({ length: emptyCells >= 0 ? emptyCells : 0 }).map((_, i) => <div key={`empty-${i}`} />)}
                        {Array.from({ length: daysInMonth }, (_, i) => {
                          const day = i + 1;
                          const date = new Date(year, month, day);
                          const unavailable = isDateUnavailable(date) || date < new Date(new Date().setHours(0,0,0,0));
                          const isSelected = (startDate && date.toDateString() === startDate.toDateString()) || (endDate && date.toDateString() === endDate.toDateString());
                          const inRange = startDate && endDate && date > startDate && date < endDate;

                          return (
                            <div
                              key={day}
                              onClick={() => !unavailable && (startDate && !endDate ? (date < startDate ? (setStartDate(date), setEndDate(null)) : setEndDate(date)) : (setStartDate(date), setEndDate(null)))}
                              style={{
                                padding: '12px 0',
                                textAlign: 'center',
                                cursor: unavailable ? 'not-allowed' : 'pointer',
                                background: isSelected ? 'var(--brand-blue, #71b7e1)' : (inRange ? 'var(--brand-blue-light, #e1f0fd)' : 'transparent'),
                                color: isSelected ? 'white' : (unavailable ? '#ccc' : '#222'),
                                textDecoration: unavailable ? 'line-through' : 'none',
                                fontSize: '0.9rem',
                                fontWeight: isSelected ? '600' : '400',
                                borderRadius: isSelected ? '50%' : '0'
                              }}
                            >
                              {day}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '16px', gap: '8px' }}>
                <i className="fa-regular fa-calendar" style={{ color: 'var(--brand-blue, #71b7e1)' }}></i>
                <button onClick={() => { setStartDate(null); setEndDate(null); }} style={{ background: 'none', border: 'none', textDecoration: 'underline', fontWeight: '600', cursor: 'pointer' }}>Clear dates</button>
              </div>
            </div>
          </div>

          {/* Sidebar / Booking Card */}
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'sticky',
              top: '100px',
              padding: '24px',
              borderRadius: '12px',
              border: '1px solid #DDDDDD',
              boxShadow: 'rgba(0, 0, 0, 0.12) 0px 6px 16px',
              background: 'white'
            }}>
              <div className="booking-card-rare">
                <i className="fa-solid fa-gem" style={{ color: 'var(--brand-blue, #71b7e1)', fontSize: '1.2rem' }}></i>
                <div style={{ fontSize: '0.9rem', fontWeight: '500' }}>Rare find! This place is usually booked</div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: '600' }}>{listing.currency || '₱'}{listing.price.toLocaleString()}</span>
                <span style={{ fontSize: '1rem', color: '#717171' }}> night</span>
              </div>

              <div style={{ border: '1px solid #717171', borderRadius: '8px', overflow: 'hidden', marginBottom: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid #717171' }}>
                  <div style={{ padding: '10px', borderRight: '1px solid #717171' }}>
                    <div style={{ fontSize: '0.65rem', fontWeight: 'bold' }}>CHECK-IN</div>
                    <div style={{ fontSize: '0.9rem' }}>{startDate ? startDate.toLocaleDateString() : 'Add date'}</div>
                  </div>
                  <div style={{ padding: '10px' }}>
                    <div style={{ fontSize: '0.65rem', fontWeight: 'bold' }}>CHECKOUT</div>
                    <div style={{ fontSize: '0.9rem' }}>{endDate ? endDate.toLocaleDateString() : 'Add date'}</div>
                  </div>
                </div>
                <div style={{ padding: '10px', position: 'relative' }}>
                  <div style={{ fontSize: '0.65rem', fontWeight: 'bold' }}>GUESTS</div>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(parseInt(e.target.value))}
                    style={{ width: '100%', border: 'none', background: 'none', fontSize: '0.9rem', outline: 'none', cursor: 'pointer', color: 'var(--brand-blue, #71b7e1)', fontWeight: '600' }}
                  >
                    <option value={1}>1 guest</option>
                    <option value={2}>2 guests</option>
                    <option value={3}>3 guests</option>
                    <option value={4}>4 guests</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleReserve}
                style={{
                  width: '100%',
                  padding: '14px',
                  background: 'var(--brand-blue, #71b7e1)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  marginBottom: '8px'
                }}
              >
                Reserve
              </button>
              <div style={{ textAlign: 'center', fontSize: '0.85rem', color: '#717171', marginTop: '12px' }}>
                You won't be charged yet
              </div>

              <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '12px' }}>
                <div style={{ textDecoration: 'underline' }}>{listing.currency || '₱'}{listing.price.toLocaleString()} x 2 nights</div>
                <div>{listing.currency || '₱'}{(listing.price * 2).toLocaleString()}</div>
              </div>
              <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', fontWeight: '600', fontSize: '1.1rem' }}>
                <div>Total before taxes</div>
                <div>{listing.currency || '₱'}{(listing.price * 2).toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #DDDDDD', margin: '64px 0' }} />

        {/* Reviews Breakdown Section */}
        <section>
          <div className="review-large-total">
            <i className="fa-solid fa-leaf fa-left" style={{ transform: 'scaleX(-1)', color: 'var(--brand-blue, #71b7e1)' }}></i>
            <h2>{listing.rating}</h2>
            <i className="fa-solid fa-leaf fa-right" style={{ color: 'var(--brand-blue, #71b7e1)' }}></i>
            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: '600' }}>Guest favourite</div>
              <div style={{ color: '#717171', maxWidth: '350px', margin: '8px auto' }}>
                This home is a guest favourite based on ratings, reviews and reliability
              </div>
            </div>
          </div>

          <div className="review-category-grid">
            <div className="review-cat">
              <div className="review-cat-name">Overall rating</div>
              <div style={{ position: 'relative', width: '100%', height: '4px', background: 'var(--brand-blue-light, #e1f0fd)', borderRadius: '2px' }}>
                <div style={{ position: 'absolute', width: '95%', height: '100%', background: 'var(--brand-blue, #71b7e1)', borderRadius: '2px' }}></div>
              </div>
              <div style={{ fontSize: '0.75rem', marginTop: '8px' }}>5: 90%</div>
            </div>
            <div className="review-cat">
              <div className="review-cat-name">Cleanliness</div>
              <div className="review-cat-val">4.8</div>
              <i className="fa-solid fa-broom"></i>
            </div>
            <div className="review-cat">
              <div className="review-cat-name">Accuracy</div>
              <div className="review-cat-val">5.0</div>
              <i className="fa-solid fa-circle-check"></i>
            </div>
            <div className="review-cat">
              <div className="review-cat-name">Check-in</div>
              <div className="review-cat-val">5.0</div>
              <i className="fa-solid fa-key"></i>
            </div>
            <div className="review-cat">
              <div className="review-cat-name">Communication</div>
              <div className="review-cat-val">4.9</div>
              <i className="fa-solid fa-message"></i>
            </div>
            <div className="review-cat">
              <div className="review-cat-name">Location</div>
              <div className="review-cat-val">5.0</div>
              <i className="fa-solid fa-map-location-dot"></i>
            </div>
          </div>
        </section>

        <hr style={{ border: 'none', borderTop: '1px solid #DDDDDD', margin: '64px 0' }} />

        {/* Map Section */}
        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: '600', marginBottom: '24px' }}>Where you'll be</h2>
          <div style={{ marginBottom: '16px', fontWeight: '500' }}>{listing.location}, Philippines</div>
          <div className="map-container">
            <iframe
              title="Property Location"
              className="map-iframe"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY_PLACEHOLDER&q=${encodeURIComponent(listing.location + ', ' + listing.city)}`}
            ></iframe>
            {/* Fallback to simple embed if API key is missing (Google allows some public embeds without key via search URL) */}
            <iframe
              title="Property Location View"
              className="map-iframe"
              width="100%"
              height="100%"
              style={{ border: 0, position: 'absolute', top: 0, left: 0 }}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(listing.location + ', ' + (listing.city || ''))}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
            ></iframe>
          </div>
          <div style={{ marginTop: '24px', fontSize: '0.9rem' }}>Exact location will be provided after booking.</div>
        </section>

        <hr style={{ border: 'none', borderTop: '1px solid #DDDDDD', margin: '64px 0' }} />

        {/* Detailed Host Section */}
        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: '600', marginBottom: '32px' }}>Meet your host</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '80px' }}>
            <div style={{ padding: '32px', borderRadius: '24px', boxShadow: 'rgba(0, 0, 0, 0.12) 0px 6px 16px', background: 'white', textAlign: 'center' }}>
              <div style={{ position: 'relative', width: '104px', height: '104px', margin: '0 auto 16px' }}>
                <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200" alt="Host" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', bottom: '0', right: '0', background: 'var(--brand-blue, #71b7e1)', color: 'white', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid white' }}>
                  <i className="fa-solid fa-shield-check" style={{ fontSize: '0.8rem' }}></i>
                </div>
              </div>
              <h3 style={{ fontSize: '1.8rem', margin: '0' }}>Sophia Suites</h3>
              <div style={{ fontSize: '0.9rem', fontWeight: '600', margin: '4px 0 24px' }}><i className="fa-solid fa-award"></i> Superhost</div>

              <div style={{ display: 'flex', borderTop: '1px solid #eee', paddingTop: '24px' }}>
                <div style={{ flex: 1, borderRight: '1px solid #eee' }}>
                  <div style={{ fontWeight: '700', fontSize: '1.1rem' }}>912</div>
                  <div style={{ fontSize: '0.65rem', color: '#717171' }}>Reviews</div>
                </div>
                <div style={{ flex: 1, borderRight: '1px solid #eee' }}>
                  <div style={{ fontWeight: '700', fontSize: '1.1rem' }}>4.69<i className="fa-solid fa-star" style={{ fontSize: '0.7rem' }}></i></div>
                  <div style={{ fontSize: '0.65rem', color: '#717171' }}>Rating</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '700', fontSize: '1.1rem' }}>7</div>
                  <div style={{ fontSize: '0.65rem', color: '#717171' }}>Years hosting</div>
                </div>
              </div>
            </div>

            <div>
              <div style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '8px' }}>Sophia Suites {listing.city} is a Superhost</div>
              <p style={{ color: '#222', lineHeight: '1.6' }}>
                Superhosts are experienced, highly-rated hosts who are committed to providing great stays for guests.
              </p>
              <div style={{ marginTop: '32px' }}>
                <h4 style={{ marginBottom: '16px' }}>Host details</h4>
                <div style={{ marginBottom: '8px' }}>Response rate: 96%</div>
                <div>Responds within an hour</div>
              </div>
              <button style={{
                marginTop: '32px',
                padding: '13px 23px',
                borderRadius: '8px',
                border: 'none',
                background: 'var(--brand-blue, #71b7e1)',
                color: 'white',
                fontWeight: '600',
                cursor: 'pointer'
              }}>
                Message host
              </button>
            </div>
          </div>
        </section>

        <hr style={{ border: 'none', borderTop: '1px solid #DDDDDD', margin: '64px 0' }} />

        {/* Things to know */}
        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: '600', marginBottom: '32px' }}>Things to know</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
            <div>
              <h4 style={{ marginBottom: '16px' }}>House rules</h4>
              <p style={{ fontSize: '0.9rem', marginBottom: '12px' }}>Check-in after 2:00 pm</p>
              <p style={{ fontSize: '0.9rem', marginBottom: '12px' }}>Checkout before 11:00 am</p>
              <p style={{ fontSize: '0.9rem', marginBottom: '12px' }}>6 guests maximum</p>
              <button style={{ background: 'none', border: 'none', textDecoration: 'underline', fontWeight: '600', padding: 0, cursor: 'pointer' }}>Show more</button>
            </div>
            <div>
              <h4 style={{ marginBottom: '16px' }}>Safety & property</h4>
              <p style={{ fontSize: '0.9rem', marginBottom: '12px' }}>Carbon monoxide alarm</p>
              <p style={{ fontSize: '0.9rem', marginBottom: '12px' }}>Smoke alarm</p>
              <button style={{ background: 'none', border: 'none', textDecoration: 'underline', fontWeight: '600', padding: 0, cursor: 'pointer' }}>Show more</button>
            </div>
            <div>
              <h4 style={{ marginBottom: '16px' }}>Cancellation policy</h4>
              <p style={{ fontSize: '0.9rem', marginBottom: '12px' }}>Free cancellation for 48 hours.</p>
              <p style={{ fontSize: '0.9rem', color: '#717171' }}>Review the Host&apos;s full cancellation policy for details.</p>
              <button style={{ background: 'none', border: 'none', textDecoration: 'underline', fontWeight: '600', padding: 0, cursor: 'pointer', marginTop: '12px' }}>Show more</button>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Sticky Bottom Reserve Bar */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'white',
        borderTop: '1px solid #ddd',
        padding: '16px 24px',
        display: showBottomBar ? 'flex' : 'none',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 2000,
        boxShadow: '0 -2px 10px rgba(0,0,0,0.05)'
      }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>{listing.currency || '₱'}{listing.price.toLocaleString()} <span style={{ fontWeight: '400', fontSize: '0.9rem', color: '#717171' }}>night</span></div>
            <div style={{ fontSize: '0.85rem', color: '#222', textDecoration: 'underline' }}>
              {startDate && endDate ? `${startDate.toLocaleDateString()} – ${endDate.toLocaleDateString()}` : 'Select dates'}
            </div>
          </div>
          <button
            onClick={handleReserve}
            style={{
              padding: '14px 24px',
              background: 'var(--brand-blue, #71b7e1)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Reserve
          </button>
        </div>
      </div>
    </div>
  )
}

export default PropertyDetail
