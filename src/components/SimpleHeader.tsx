import React from 'react'
import { Link } from 'react-router-dom'

export default function SimpleHeader({ children }: { children?: React.ReactNode }) {
    return (
        <header style={{ background: 'white', position: 'sticky', top: 0, zIndex: 1000, borderBottom: '1px solid #ddd', padding: '1rem 5%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
                <Link to="/" className="logo-container" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
                    <img src="/logo.png" alt="Metrolodges Logo" style={{ objectFit: 'contain', height: '40px', width: 'auto' }} />
                    <span style={{ fontSize: '1.6rem', fontWeight: 'bold', color: 'var(--brand-blue, #71b7e1)', margin: 0 }}>Metrolodges</span>
                </Link>
                {children && <div>{children}</div>}
            </div>
        </header>
    )
}
