import React from 'react'
import { Link } from 'react-router-dom'
import { Listing } from '../types' // Assuming I need to import Listing from types

// Use an inline type or import from types if it exists
interface PropertyCardProps {
    listing: any;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ listing }) => {
    return (
        <Link to={`/property/${listing.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="listing-card">
                <div className="listing-image-container">
                    <img src={listing.image} alt={listing.title} />
                    {listing.badge && <div className="listing-badge">{listing.badge}</div>}
                    
                    {/* Heart button */}
                    <button className="heart-btn" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
                        <i className="fa-regular fa-heart"></i>
                    </button>

                    {/* Image navigation arrows (mock) */}
                    <div className="img-nav-arrows">
                         <button className="img-nav-btn left" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
                             <i className="fa-solid fa-chevron-left"></i>
                         </button>
                         <button className="img-nav-btn right" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
                             <i className="fa-solid fa-chevron-right"></i>
                         </button>
                    </div>

                    {/* Carousel dots (mock) */}
                    <div className="carousel-dots">
                        <span className="dot active"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </div>
                </div>
                <div className="listing-details">
                    <div className="listing-header">
                        <span className="listing-location-bold">{listing.location}</span>
                        <div className="listing-rating">
                            <i className="fa-solid fa-star"></i>
                            <span>{listing.rating}</span>
                        </div>
                    </div>
                    <div className="listing-secondary-info">{listing.title}</div>
                    <div className="listing-dates-info">Available now</div>
                    <div className="listing-price-row">
                        <span className="listing-price-val">{listing.currency || '₹'}{listing.price.toLocaleString()}</span>
                        <span className="listing-price-label">night</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default PropertyCard
