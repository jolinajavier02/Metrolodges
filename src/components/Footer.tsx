import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer>
            <div className="footer-container">
                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: '3rem', paddingBottom: '3rem', paddingTop: '3rem' }}>
                    {/* Logo & Info */}
                    <div>
                        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '1.5rem' }}>
                            <img src="/logo.png" alt="Metrolodges Logo" style={{ objectFit: 'contain', height: '32px', width: 'auto' }} />
                            <div>
                                <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--brand-blue, #71b7e1)', display: 'block', lineHeight: 1 }}>Metrolodges</span>
                                <span style={{ fontSize: '0.7rem', color: '#717171', display: 'block', marginTop: '2px' }}>Your Gateway to Great Stays</span>
                            </div>
                        </Link>
                        <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: '1.6', maxWidth: '280px' }}>
                            Connecting travelers with premium destinations across India and the Philippines. We prioritize comfort, safety, and authentic local experiences in every stay.
                        </p>
                    </div>

                    {/* Support Column */}
                    <div>
                        <h4 style={{ marginBottom: '1.2rem', fontSize: '0.95rem', fontWeight: '600' }}>Support</h4>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <li><a href="#" style={footerLinkStyle}>Assistance Hub</a></li>
                            <li><a href="#" style={footerLinkStyle}>Safety & Security Guidance</a></li>
                            <li><a href="#" style={footerLinkStyle}>Inclusive Hosting Policies</a></li>
                            <li><a href="#" style={footerLinkStyle}>Accessibility Accommodations</a></li>
                            <li><a href="#" style={footerLinkStyle}>Flexible Booking Policies</a></li>
                            <li><a href="#" style={footerLinkStyle}>Community Integrity Report</a></li>
                        </ul>
                    </div>

                    {/* Hosting Column */}
                    <div>
                        <h4 style={{ marginBottom: '1.2rem', fontSize: '0.95rem', fontWeight: '600' }}>Hosting</h4>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <li><a href="https://github.com/jolinajavier02/Metrolodges-Host-dashboard.git" style={footerLinkStyle}>Become a Host</a></li>
                            <li><a href="#" style={footerLinkStyle}>Listing Education Center</a></li>
                            <li><a href="#" style={footerLinkStyle}>Ethical Hosting Guidelines</a></li>
                            <li><a href="#" style={footerLinkStyle}>Hosting Dashboard Presets</a></li>
                            <li><a href="#" style={footerLinkStyle}>Partner Success Tools</a></li>
                            <li><a href="#" style={footerLinkStyle}>Co-hosting Network</a></li>
                            <li><a href="#" style={footerLinkStyle}>Host Referral Program</a></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2rem 0' }}>
                    <p style={{ fontSize: '0.85rem', color: '#717171' }}>
                        &copy; 2026 Metrolodges, Inc. &middot; <Link to="/privacy" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy</Link> &middot; <Link to="/terms" style={{ color: 'inherit', textDecoration: 'none' }}>Terms</Link> &middot; Sitemap
                    </p>
                    <div className="social-icons" style={{ display: 'flex', gap: '20px', fontSize: '1.2rem', color: '#222' }}>
                        <i className="fa-brands fa-facebook" style={{ cursor: 'pointer' }}></i>
                        <i className="fa-brands fa-medium" style={{ cursor: 'pointer' }}></i>
                        <i className="fa-brands fa-twitter" style={{ cursor: 'pointer' }}></i>
                        <i className="fa-brands fa-instagram" style={{ cursor: 'pointer' }}></i>
                    </div>
                </div>
            </div>
        </footer>
    )
}

const footerLinkStyle = {
    textDecoration: 'none',
    color: '#444',
    fontSize: '0.88rem',
    transition: 'color 0.2s'
}
