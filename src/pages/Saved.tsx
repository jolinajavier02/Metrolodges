import React from 'react'
import { Link } from 'react-router-dom'
import { allListings } from '../utils/listings'
import { useAuth } from '../context/AuthContext'
import SimpleHeader from '../components/SimpleHeader'
import Footer from '../components/Footer'
import PropertyCard from '../components/PropertyCard'

const Saved: React.FC = () => {
    const { user } = useAuth()
    
    // Filter listings that are in the user's savedProperties
    const savedListings = allListings.filter(l => user?.savedProperties?.includes(l.id))

    return (
        <div style={{ background: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <SimpleHeader />
            
            <div style={{ borderBottom: '1px solid #ddd', padding: '16px 80px', background: '#fff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#222' }}>
                        Saved
                    </h1>
                </div>
            </div>

            <main style={{ flex: 1, padding: '40px 80px' }}>
                {!user ? (
                    <div style={{ textAlign: 'center', padding: '100px 0' }}>
                        <i className="fa-solid fa-lock" style={{ fontSize: '3rem', opacity: 0.2, marginBottom: '20px' }}></i>
                        <h2>Please log in to see your saved properties</h2>
                        <Link to="/login" style={{ color: '#71b7e1', textDecoration: 'none', fontWeight: '600' }}>Log in / Sign up</Link>
                    </div>
                ) : savedListings.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '100px 0' }}>
                        <i className="fa-regular fa-heart" style={{ fontSize: '3rem', opacity: 0.2, marginBottom: '20px' }}></i>
                        <h2>No saved properties yet</h2>
                        <p style={{ color: '#717171', marginTop: '10px' }}>As you browse, click the heart icon to save your favorite homes.</p>
                        <Link to="/" style={{ color: '#71b7e1', textDecoration: 'none', fontWeight: '600', marginTop: '20px', display: 'inline-block' }}>Start exploring</Link>
                    </div>
                ) : (
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '40px 24px'
                    }}>
                        {savedListings.map(listing => (
                            <PropertyCard key={listing.id} listing={listing} />
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    )
}

export default Saved
