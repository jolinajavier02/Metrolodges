import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

interface PropertyCardProps {
    listing: any;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ listing }) => {
    const { toggleFavorite, isFavorite } = useAuth()
    const active = isFavorite(listing.id)

    return (
        <Link to={`/property/${listing.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="listing-card">
                <div className="listing-image-container">
                    <img src={listing.image} alt={listing.title} onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600' }} />
                    {listing.badge && <div className="listing-badge-overlay">{listing.badge}</div>}
                    
                    <button 
                        className="heart-btn-overlay" 
                        onClick={(e) => { 
                            e.preventDefault(); 
                            e.stopPropagation(); 
                            toggleFavorite(listing.id);
                        }}
                        style={{ color: active ? '#71b7e1' : 'white' }}
                    >
                        <i className={`${active ? 'fa-solid' : 'fa-regular'} fa-heart`}></i>
                    </button>

                    <div className="img-nav-overlay">
                         <button className="nav-arrow-btn left" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
                             <i className="fa-solid fa-chevron-left"></i>
                         </button>
                         <button className="nav-arrow-btn right" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
                             <i className="fa-solid fa-chevron-right"></i>
                         </button>
                    </div>

                    <div className="carousel-indicators-dots">
                        <span className="dot-indicator active"></span>
                        <span className="dot-indicator"></span>
                        <span className="dot-indicator"></span>
                        <span className="dot-indicator"></span>
                    </div>
                </div>
                <div className="listing-details">
                    <div className="listing-title-bold">{listing.title}</div>
                    <div className="listing-info-summary">
                        <span className="price-details">
                            ${(listing.price * 2).toLocaleString()} NZD for 2 nights
                        </span>
                        <span className="rating-summary">
                            <i className="fa-solid fa-star" style={{ color: 'var(--brand-blue, #71b7e1)' }}></i>
                            {listing.rating}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default PropertyCard
