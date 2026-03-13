import React from 'react'
import { Link } from 'react-router-dom'

export default function SimpleHeader({ children }: { children?: React.ReactNode }) {
    return (
        <header style={{ background: 'white', position: 'sticky', top: 0, zIndex: 1000, borderBottom: '1px solid #ddd', padding: '1rem 5%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
                <Link to="/" className="logo-container" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
                    <img src="/logo.png" alt="Metrolodges Logo" style={{ objectFit: 'contain', height: '40px', width: 'auto' }} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '1.4rem', fontWeight: '800', color: '#222', lineHeight: 1 }}>Metrolodges</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--brand-blue, #71b7e1)', fontWeight: '600', marginTop: '2px' }}>Your Gateway to Great Stays</span>
                    </div>
                </Link>
                {children && <div>{children}</div>}
            </div>
        </header>
    )
}
