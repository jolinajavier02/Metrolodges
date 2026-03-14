import React, { useState } from 'react'
import MainHeader from '../components/MainHeader'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

const BecomeHost: React.FC = () => {
    const [numListings, setNumListings] = useState(1)
    const [activeFaq, setActiveFaq] = useState<number | null>(null)

    const faqs = [
        {
            q: "How do I start listing my property?",
            a: "Getting started is easy! You can choose between two models: 'Host It Like a Pro' which gives you full control and takes just 5 minutes to set up, or 'Managed by Metrolodges' where our expert team handles everything for you within 24-48 hours."
        },
        {
            q: "What's the difference between Metrolodges and other channel managers?",
            a: "Traditional managers are often complex and expensive (₹2,000-₹5,000/month). Metrolodges is built specifically for boutique stays and homestays. We are affordable (starting at ₹490/listing) and offer a unified app for channel management, direct bookings, and guest verification."
        },
        {
            q: "How does the 0% Commission + Channel Manager work?",
            a: "With Metrolodges, you pay a flat monthly subscription instead of a percentage-based commission. This means you keep 100% of your earnings. Our built-in channel manager automatically syncs your property details and pricing across all major OTAs like Airbnb, Agoda, and Booking.com."
        },
        {
            q: "What documents do I need to list my property?",
            a: "To list your property, you'll need standard KYC documents (Aadhar, Voter ID, or Passport), proof of property ownership or a lease agreement, and any local business licenses required for vacation rentals in your area."
        },
        {
            q: "What are the quality and hygiene requirements?",
            a: "Metrolodges maintains a high standard for all listings. Properties must be clean, well-maintained, have fully functional amenities (WiFi, power, water), and provide accurate photos that reflect the current state of the home."
        }
    ]

    const toggleFaq = (index: number) => {
        setActiveFaq(activeFaq === index ? null : index)
    }

    return (
        <div style={{ background: '#fff' }}>
            <MainHeader showSearch={false} />

            {/* Hero Section */}
            <section style={{ padding: '80px 24px', textAlign: 'center', background: '#f8f9fa' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <h1 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '16px' }}>Host Like a Pro</h1>
                    <p style={{ fontSize: '1.5rem', color: '#555', marginBottom: '32px' }}>
                        Expert hosts, list your property in 5 minutes
                    </p>
                    <p style={{ fontSize: '1.1rem', color: '#717171', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>
                        Metrolodges is the premier Channel Manager and OTA for boutique stays. Manage Airbnb, Agoda, and more from one app. Maximize your bookings and peace of mind with 0% commission.
                    </p>
                </div>
            </section>

            {/* Subscription Section */}
            <section style={{ padding: '80px 24px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'minmax(400px, 1fr) 1.5fr',
                        gap: '40px',
                        background: '#f1ede9',
                        borderRadius: '24px',
                        padding: '60px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
                    }}>
                        <div style={{ textAlign: 'center' }}>
                            <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '12px' }}>All-in-One Hosting</h2>
                            <p style={{ color: '#555', marginBottom: '40px' }}>Manage all OTAs, calendars, pricing, and bookings from a single app</p>
                            
                            <div style={{ marginBottom: '40px' }}>
                                <input 
                                    type="range" 
                                    min="1" 
                                    max="50" 
                                    value={numListings} 
                                    onChange={(e) => setNumListings(parseInt(e.target.value))} 
                                    style={{ width: '100%', accentColor: '#ff385c' }}
                                />
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#717171', marginTop: '10px' }}>
                                    <span>1</span>
                                    <span>10</span>
                                    <span>20</span>
                                    <span>30</span>
                                    <span>40</span>
                                    <span>50+</span>
                                </div>
                            </div>

                            <div style={{ fontSize: '1.5rem', fontWeight: 600, color: '#ff385c', marginBottom: '8px' }}>
                                ₹490 <span style={{ fontSize: '1rem', color: '#555', fontWeight: 400 }}>per month per listing</span>
                            </div>
                            <div style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '32px' }}>
                                Total: ₹{(numListings * 490).toLocaleString()} <span style={{ fontSize: '1rem', color: '#555', fontWeight: 400 }}>per month</span>
                            </div>

                            <button style={{
                                width: '100%',
                                padding: '16px',
                                background: '#ff385c',
                                color: 'white',
                                border: 'none',
                                borderRadius: '12px',
                                fontSize: '1.1rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                marginBottom: '16px'
                            }}>
                                Continue Listing
                            </button>
                            <p style={{ fontSize: '0.9rem', color: '#717171' }}>Try free for 14 days. Save 20% on annual plans.</p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                            {[
                                "Increase revenue by 20-30% in 3-6 months.",
                                "Perfect for professional hosts - zero commissions.",
                                "Automatic calendar and pricing sync across all OTAs.",
                                "Zero commissions — keep 100% of your earnings.",
                                "Direct guest connection via WhatsApp.",
                                "Track all your direct and manual bookings in one place.",
                                "Multi-listing auto-sync with Magic Cluster.",
                                "Exclusive travel agent network integration.",
                                "Built-in channel manager saves ₹20,000/year.",
                                "Custom website for your homestay business.",
                                "Cancel anytime — no lock-in, no questions asked.",
                                "Professional support whenever you need it."
                            ].map((feature, i) => (
                                <div key={i} style={{ display: 'flex', gap: '12px', fontSize: '0.9rem', color: '#333' }}>
                                    <i className="fa-solid fa-circle-check" style={{ color: '#ff385c', marginTop: '3px' }}></i>
                                    {feature}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Step Procedure Section */}
                    <div style={{ marginTop: '60px', textAlign: 'center' }}>
                        <h3 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '40px' }}>How to get started</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
                            <div style={{ padding: '32px', background: '#fff', borderRadius: '16px', border: '1px solid #eee' }}>
                                <div style={{ width: '50px', height: '50px', background: '#e1f0fd', color: '#71b7e1', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 800, margin: '0 auto 20px' }}>1</div>
                                <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '12px' }}>List Property</h4>
                                <p style={{ color: '#717171', lineHeight: 1.6 }}>Fill in your property details and upload high-quality photos in just 5 minutes.</p>
                            </div>
                            <div style={{ padding: '32px', background: '#fff', borderRadius: '16px', border: '1px solid #eee' }}>
                                <div style={{ width: '50px', height: '50px', background: '#e1f0fd', color: '#71b7e1', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 800, margin: '0 auto 20px' }}>2</div>
                                <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '12px' }}>Sync Calendars</h4>
                                <p style={{ color: '#717171', lineHeight: 1.6 }}>Connect your Airbnb, Booking.com, and Agoda accounts to sync availability instantly.</p>
                            </div>
                            <div style={{ padding: '32px', background: '#fff', borderRadius: '16px', border: '1px solid #eee' }}>
                                <div style={{ width: '50px', height: '50px', background: '#e1f0fd', color: '#71b7e1', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 800, margin: '0 auto 20px' }}>3</div>
                                <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '12px' }}>Earn More</h4>
                                <p style={{ color: '#717171', lineHeight: 1.6 }}>Receive direct bookings via WhatsApp and keep 100% of your earnings with 0% commission.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Metrolodges Section */}
            <section style={{ padding: '80px 24px', background: '#f8f9fa' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '16px' }}>Why Property Owners Love ❤️ Metrolodges</h2>
                    <p style={{ color: '#717171', marginBottom: '60px', fontSize: '1.1rem' }}>The #1 choice for boutique stays and professional hosts</p>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
                        {[
                            { title: "Direct Bookings", icon: "fa-whatsapp", desc: "Connect directly with guests via WhatsApp for better communication." },
                            { title: "Zero Commission", icon: "fa-percent", desc: "Keep everything you earn. We never take a cut of your booking revenue." },
                            { title: "Smart Sync", icon: "fa-rotate", desc: "Never worry about double bookings again with real-time calendar syncing." },
                            { title: "Expert Support", icon: "fa-headset", desc: "Our team of hospitality experts is here to help you grow your business." }
                        ].map((item, i) => (
                            <div key={i} style={{ padding: '32px', background: '#fff', borderRadius: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                                <div style={{ fontSize: '2.5rem', color: '#71b7e1', marginBottom: '20px' }}>
                                    <i className={`fa-solid ${item.icon}`}></i>
                                </div>
                                <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '12px' }}>{item.title}</h4>
                                <p style={{ color: '#717171', fontSize: '0.9rem', lineHeight: 1.6 }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section style={{ padding: '100px 24px' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '60px', textAlign: 'center' }}>Frequently Asked Questions</h2>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {faqs.map((faq, i) => (
                            <div key={i} style={{ border: '1px solid #eee', borderRadius: '16px', overflow: 'hidden' }}>
                                <button
                                    onClick={() => toggleFaq(i)}
                                    style={{
                                        width: '100%',
                                        padding: '24px',
                                        background: activeFaq === i ? '#f8f9fa' : '#fff',
                                        border: 'none',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                        textAlign: 'left'
                                    }}
                                >
                                    <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#222' }}>{faq.q}</span>
                                    <i className={`fa-solid ${activeFaq === i ? 'fa-minus' : 'fa-plus'}`} style={{ color: '#717171' }}></i>
                                </button>
                                {activeFaq === i && (
                                    <div style={{ padding: '0 24px 24px', background: '#f8f9fa', color: '#555', lineHeight: 1.6, fontSize: '1rem' }}>
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default BecomeHost
