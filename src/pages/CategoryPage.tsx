import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { allListings } from '../utils/listings'
import SimpleHeader from '../components/SimpleHeader'
import Footer from '../components/Footer'
import PropertyCard from '../components/PropertyCard'

const CategoryPage: React.FC = () => {
    const { city } = useParams<{ city: string }>()
    const cityName = city || 'Everywhere'
    const listings = allListings.filter(l => l.city?.toLowerCase() === cityName.toLowerCase())

    return (
        <div style={{ background: '#fff' }}>
            <SimpleHeader />
            
            <div style={{ borderBottom: '1px solid #ddd', padding: '16px 80px', background: '#fff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h1 style={{ fontSize: '1.25rem', fontWeight: '600' }}>
                        Over {listings.length * 10}+ homes in {cityName}
                    </h1>
                </div>
            </div>

            <main style={{ minHeight: '80vh' }}>
                {/* List of properties */}
                <div style={{ padding: '24px 80px' }}>
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '24px'
                    }}>
                        {listings.map(listing => (
                            <PropertyCard key={listing.id} listing={listing} />
                        ))}
                        {listings.length === 0 && (
                            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '100px 0' }}>
                                <i className="fa-solid fa-magnifying-glass" style={{ fontSize: '3rem', opacity: 0.2 }}></i>
                                <h3 style={{ marginTop: '20px' }}>No properties found in this area</h3>
                                <Link to="/" style={{ color: '#71b7e1' }}>Back to home</Link>
                            </div>
                        )}
                    </div>

                    {listings.length > 0 && (
                         <div style={{ marginTop: '40px', textAlign: 'center' }}>
                            <hr style={{ border: 'none', borderTop: '1px solid #eee', marginBottom: '30px' }} />
                            <div className="pagination" style={{ display: 'flex', justifyContent: 'center', gap: '8px', alignItems: 'center' }}>
                                <button style={pageBtnStyle}>&lt;</button>
                                <button style={{...pageBtnStyle, background: '#222', color: '#fff'}}>1</button>
                                <button style={pageBtnStyle}>2</button>
                                <button style={pageBtnStyle}>3</button>
                                <button style={pageBtnStyle}>4</button>
                                <span>...</span>
                                <button style={pageBtnStyle}>15</button>
                                <button style={pageBtnStyle}>&gt;</button>
                            </div>
                         </div>
                    )}
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
