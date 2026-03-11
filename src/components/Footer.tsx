import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                <div>
                    <h4>Support</h4>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li><a href="#">Help Center</a></li>
                        <li><a href="#">AirCover</a></li>
                        <li><a href="#">Supporting people with disabilities</a></li>
                        <li><a href="#">Cancellation options</a></li>
                    </ul>
                </div>
                <div>
                    <h4>Hosting</h4>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li><a href="#">Metrolodges your home</a></li>
                        <li><a href="#">AirCover for Hosts</a></li>
                        <li><a href="#">Hosting resources</a></li>
                        <li><a href="#">Community forum</a></li>
                    </ul>
                </div>
                <div>
                    <h4>Metrolodges</h4>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li><a href="#">Newsroom</a></li>
                        <li><a href="#">New features</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Investors</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2026 Metrolodges, Inc. &middot; <Link to="/privacy">Privacy</Link> &middot; <Link to="/terms">Terms</Link> &middot; Sitemap</p>
                <div className="social-icons">
                    <i className="fa-brands fa-facebook"></i>
                    <i className="fa-brands fa-twitter"></i>
                    <i className="fa-brands fa-instagram"></i>
                </div>
            </div>
        </footer>
    )
}
