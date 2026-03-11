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
                    {listing.badge && <div className="badge">{listing.badge}</div>}
                    <i className="fa-regular fa-heart heart-icon"></i>
                </div>
                <div className="listing-info">
                    <div className="listing-title">{listing.title}</div>
                    <div className="listing-rating">
                        <i className="fa-solid fa-star"></i>
                        {listing.rating}
                    </div>
                </div>
                <div className="listing-meta">{listing.location}</div>
                <div className="listing-price">
                    {listing.currency || '₹'}{listing.price.toLocaleString()} <span>per night</span>
                </div>
            </div>
        </Link>
    )
}

export default PropertyCard
