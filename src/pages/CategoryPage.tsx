import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { allListings } from '../utils/listings'
import MainHeader from '../components/MainHeader'
import Footer from '../components/Footer'
import PropertyCard from '../components/PropertyCard'

const CategoryPage: React.FC = () => {
    const { city } = useParams<{ city: string }>()
    const cityName = city || 'Everywhere'
    const listings = allListings.filter(l => l.city?.toLowerCase() === cityName.toLowerCase())

    return (
        <div style={{ background: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Header with search enabled */}
            <MainHeader miniSearchOnly={true} />
            
            <main style={{ flex: 1, display: 'flex', position: 'relative' }}>
                {/* Left Side: Property List */}
                <div style={{ width: '60%', padding: '24px 40px', overflowY: 'auto' }}>
                    <div style={{ marginBottom: '24px' }}>
                        <span style={{ fontSize: '0.9rem', color: '#717171' }}>Over {listings.length * 10}+ homes in {cityName}</span>
                        <h1 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '8px' }}>Stays in {cityName}</h1>
                    </div>

                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '40px 24px'
                    }}>
                        {listings.map(listing => (
                            <PropertyCard key={listing.id} listing={listing} />
                        ))}
                    </div>

                    {listings.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '100px 0' }}>
                            <i className="fa-solid fa-magnifying-glass" style={{ fontSize: '3rem', opacity: 0.2 }}></i>
                            <h3 style={{ marginTop: '20px' }}>No properties found in this area</h3>
                            <Link to="/" style={{ color: '#71b7e1' }}>Back to home</Link>
                        </div>
                    )}

                    {listings.length > 10 && (
                         <div style={{ marginTop: '60px', textAlign: 'center' }}>
                            <hr style={{ border: 'none', borderTop: '1px solid #eee', marginBottom: '30px' }} />
                            <div className="pagination" style={{ display: 'flex', justifyContent: 'center', gap: '8px', alignItems: 'center' }}>
                                <button style={pageBtnStyle}>&lt;</button>
                                <button style={{...pageBtnStyle, background: '#222', color: '#fff'}}>1</button>
                                <button style={pageBtnStyle}>2</button>
                                <span>...</span>
                                <button style={pageBtnStyle}>&gt;</button>
                            </div>
                         </div>
                    )}
                </div>

                {/* Right Side: Sticky Map */}
                <div style={{ width: '40%', height: 'calc(100vh - 80px)', position: 'sticky', top: '80px', borderLeft: '1px solid #ddd' }}>
                    <iframe
                        title="City Map"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY_PLACEHOLDER&q=${encodeURIComponent(cityName)}`}
                    ></iframe>
                    {/* Fallback Public Embed */}
                    <iframe
                        title="Public City Map"
                        width="100%"
                        height="100%"
                        style={{ border: 0, position: 'absolute', top: 0, left: 0 }}
                        src={`https://maps.google.com/maps?q=${encodeURIComponent(cityName)}&t=&z=12&ie=UTF8&iwloc=&output=embed`}
                    ></iframe>
                </div>
            </main>

            <Footer />
        </div>
    )
}

const pageBtnStyle: React.CSSProperties = {
    padding: '8px 12px',
    borderRadius: '50%',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '500',
    minWidth: '40px',
    minHeight: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}

export default CategoryPage
