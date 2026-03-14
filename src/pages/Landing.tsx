import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { philippineListings, indiaListings } from '../utils/listings'
import PropertyCard from '../components/PropertyCard'
import Footer from '../components/Footer'
import { useAuth } from '../context/AuthContext'
import hostIcon from '../assets/host.png'

import MainHeader from '../components/MainHeader'

const Landing: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [whereValue, setWhereValue] = useState('')
  const [searchParams] = useSearchParams()
  
  const allListings = [...indiaListings, ...philippineListings]
  const [filteredListings, setFilteredListings] = useState(allListings)

  // Group listings by city
  const groupedListings = React.useMemo(() => {
    return filteredListings.reduce((acc, listing) => {
      const city = listing.city || 'Other'
      if (!acc[city]) acc[city] = []
      acc[city].push(listing)
      return acc
    }, {} as { [key: string]: typeof allListings })
  }, [filteredListings])

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
    Object.keys(groupedListings).forEach(city => {
      updateScrollState(city)
    })
  }, [groupedListings])

  const scroll = (city: string, direction: 'left' | 'right') => {
    const el = scrollRefs.current[city]
    if (el) {
      const scrollAmount = direction === 'left' ? -el.offsetWidth : el.offsetWidth
      el.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  const handleSearch = (searchTerm: string) => {
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


  return (
    <div>
      <MainHeader onSearch={handleSearch} />

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
                           <img 
                             key={i} 
                             src={l.image} 
                             alt="prev" 
                             className={`prev-img img-${i}`}
                             onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                           />
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
          max-height: 250px;
          opacity: 1;
          pointer-events: all;
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
