import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { allListings } from '../utils/listings'

const PropertyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const listing = allListings.find(l => l.id === parseInt(id || '0'))

  if (!listing) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Property not found</h2>
        <Link to="/">Back to Home</Link>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <header style={{ background: 'white', position: 'sticky', top: 0, zIndex: 1000, borderBottom: '1px solid #ddd', padding: '1rem 5%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <span style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#71b7e1' }}>Metrolodges</span>
          </Link>
          <button style={{ padding: '8px 16px', borderRadius: '4px', border: '1px solid #ddd', cursor: 'pointer' }}>
            Share
          </button>
        </div>
      </header>

      {/* Property Gallery */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr',
            gridTemplateRows: '300px 300px',
            gap: '8px',
            borderRadius: '12px',
            overflow: 'hidden'
          }}>
            <img src={listing.image} alt="Main" style={{ gridRow: '1/3', width: '100%', height: '100%', objectFit: 'cover' }} />
            <img src={listing.image} alt="View 2" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <img src={listing.image} alt="View 3" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <img src={listing.image} alt="View 4" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <img src={listing.image} alt="View 5" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>

        {/* Property Info */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{listing.title}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
              <span>
                <i className="fa-solid fa-star"></i> {listing.rating}
              </span>
              <span>{listing.location}</span>
              {listing.badge && <span style={{ background: '#f0f0f0', padding: '4px 8px', borderRadius: '4px' }}>{listing.badge}</span>}
            </div>

            <hr style={{ margin: '2rem 0' }} />

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ marginBottom: '1rem' }}>About this place</h3>
              <p>
                Discover this beautiful {listing.title} location in {listing.location}. Perfect for travelers looking for authentic experiences and comfortable accommodations. This property offers excellent amenities and great hospitality.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              <div>
                <h4>🌟 Highlights</h4>
                <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                  <li>Free Wi-Fi</li>
                  <li>Air Conditioning</li>
                  <li>Parking Available</li>
                </ul>
              </div>
              <div>
                <h4>🏠 Amenities</h4>
                <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                  <li>Kitchen</li>
                  <li>Bathroom</li>
                  <li>Living Room</li>
                </ul>
              </div>
            </div>

            <hr style={{ margin: '2rem 0' }} />

            <div>
              <h3>Reviews</h3>
              <div style={{ marginTop: '1rem' }}>
                <div style={{ padding: '1rem', borderBottom: '1px solid #f0f0f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <strong>Guest Review</strong>
                    <span>⭐⭐⭐⭐⭐</span>
                  </div>
                  <p>"Amazing experience! Highly recommended for anyone visiting the area."</p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div style={{
            background: 'white',
            border: '1px solid #ddd',
            borderRadius: '12px',
            padding: '2rem',
            height: 'fit-content',
            position: 'sticky',
            top: '100px'
          }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>
                {listing.currency || '₱'}{listing.price.toLocaleString()}
              </div>
              <div style={{ color: '#717171' }}>per night</div>
            </div>

            <button style={{
              width: '100%',
              padding: '12px',
              background: '#FF385C',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '0.95rem',
              fontWeight: '600',
              cursor: 'pointer',
              marginBottom: '1rem',
              transition: 'background 0.2s'
            }} onMouseOver={(e) => (e.currentTarget.style.background = '#E61E50')} onMouseOut={(e) => (e.currentTarget.style.background = '#FF385C')}>
              Reserve
            </button>

            <div style={{
              padding: '1rem',
              background: '#f9f9f9',
              borderRadius: '8px',
              fontSize: '0.85rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid #eee' }}>
                <span>Check-in</span>
                <span>—</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid #eee' }}>
                <span>Checkout</span>
                <span>—</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '600' }}>
                <span>Total</span>
                <span>{listing.currency || '₱'}{listing.price.toLocaleString()}</span>
              </div>
            </div>

            <div style={{
              background: '#F5E6E6',
              padding: '0.75rem',
              borderRadius: '6px',
              fontSize: '0.8rem',
              color: '#C5192D',
              textAlign: 'center',
              marginBottom: '1rem'
            }}>
              <strong>Free cancellation</strong> before check-in
            </div>

            <button style={{
              width: '100%',
              padding: '12px',
              background: 'white',
              border: '1px solid #ddd',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}>
              Contact Host
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background: '#f9f9f9', padding: '3rem 5%', marginTop: '4rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p>&copy; 2026 Metrolodges, Inc. &middot; Privacy &middot; Terms &middot; Sitemap</p>
        </div>
      </footer>
    </div>
  )
}

export default PropertyDetail
