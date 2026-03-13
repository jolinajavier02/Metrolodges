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

    const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid')

    return (
        <div style={{ background: '#fff' }}>
            <SimpleHeader />
            
            <div style={{ borderBottom: '1px solid #ddd', padding: '16px 80px', background: '#fff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h1 style={{ fontSize: '1.25rem', fontWeight: '600' }}>
                        Over {listings.length * 10}+ homes in {cityName}
                    </h1>
                    <div style={{ display: 'flex', gap: '12px' }}>
                         <button 
                            onClick={() => setViewMode(prev => prev === 'grid' ? 'map' : 'grid')}
                            style={{ 
                                padding: '8px 16px', 
                                borderRadius: '8px', 
                                border: '1px solid #ddd', 
                                background: '#fff', 
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                fontWeight: '500'
                            }}
                         >
                            <i className={`fa-solid ${viewMode === 'grid' ? 'fa-map' : 'fa-list'}`}></i>
                            {viewMode === 'grid' ? 'Show map' : 'Show list'}
                         </button>
                    </div>
                </div>
            </div>

            <main style={{ display: 'flex', minHeight: '80vh' }}>
                {/* List of properties */}
                <div style={{ 
                    width: viewMode === 'grid' ? '100%' : '60%', 
                    padding: '24px 80px',
                    transition: 'width 0.3s ease'
                }}>
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(280px, 1fr))' : 'repeat(auto-fill, minmax(280px, 1fr))',
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

                {/* Map Section */}
                {viewMode === 'map' && (
                    <div style={{ 
                        width: '40%', 
                        background: '#f1f1f1', 
                        position: 'sticky', 
                        top: '144px', 
                        height: 'calc(100vh - 144px)',
                        overflow: 'hidden'
                    }}>
                        {/* Mock Map Image Background */}
                        <div style={{
                            width: '100%',
                            height: '100%',
                            background: `url('https://maps.googleapis.com/maps/api/staticmap?center=${cityName}&zoom=12&size=640x640&scale=2&key=')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            position: 'relative'
                        }}>
                             {/* Map pins mock */}
                             {listings.map((l, idx) => (
                                <div 
                                    key={l.id} 
                                    style={{
                                        position: 'absolute',
                                        top: `${20 + idx * 10}%`,
                                        left: `${30 + (idx % 3) * 15}%`,
                                        background: 'white',
                                        padding: '4px 8px',
                                        borderRadius: '20px',
                                        boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
                                        fontWeight: '700',
                                        fontSize: '0.85rem',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        zIndex: 10
                                    }}
                                >
                                    {l.currency || '₱'}{l.price.toLocaleString()}
                                </div>
                             ))}

                             <div style={{ 
                                position: 'absolute', 
                                bottom: '20px', 
                                left: '20px', 
                                background: 'white', 
                                padding: '12px', 
                                borderRadius: '8px', 
                                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                                fontSize: '0.8rem'
                             }}>
                                Terms | Report a map error
                             </div>
                        </div>
                    </div>
                )}
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
