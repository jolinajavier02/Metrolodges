import { Listing } from '../types'

export const philippineListings: Listing[] = [
  { id: 101, title: "QBEE Hostel Manila", price: 550, rating: 4.7, nights: 1, badge: "Popular", image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=600", location: "Makati, Manila", city: "Manila" },
  { id: 102, title: "Z Hostel Rooftop", price: 780, rating: 4.8, nights: 1, badge: "Guest favorite", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=600", location: "Poblacion, Makati", city: "Manila" }
]

export const indiaListings: Listing[] = [
  { id: 201, title: "Zostel Mumbai", price: 599, rating: 4.5, nights: 1, badge: "Popular", image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&q=80&w=600", location: "Colaba, Mumbai", city: "Mumbai", currency: "₹" }
]

export const allListings: Listing[] = [...philippineListings, ...indiaListings]
