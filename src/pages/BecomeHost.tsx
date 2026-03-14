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

    const inclusions = [
        "Automatic calendar & dynamic pricing sync across all OTAs – prevents double bookings, auto-adjusts rates for festivals, holidays, and peak seasons (Diwali, Sinulog, etc.).",
        "Zero commissions – keep 100% of guest payments (only standard payment gateway fees).",
        "Direct guest connections – verified guests message you instantly via WhatsApp Business or Viber.",
        "Track ALL bookings centrally – direct, OTA, walk-ins, and agent bookings in one dashboard.",
        "Flexi pricing + Magic Cluster – auto-sync multiple listings/properties with smart pricing rules for weekdays, weekends, and local events.",
        "Watch Demo Video",
        "Exclusive agent networks – tap into 5,000+ Indian travel agents + PH tour operators for more bookings.",
        "Total control – set INR/PHP pricing, blackout dates, minimum stays, and house rules easily.",
        "Built-in channel manager – save ₹15,000-25,000/year (India) or ₱30,000/year (PH) vs third-party tools.",
        "Free local payouts – instant transfers to Indian banks/UPI, PH banks/GCash/Maya with no FX fees.",
        "Professional listing tools – AI photo enhancer, local language descriptions (Hindi, Tagalog), and SEO for more visibility.",
        "Be your own boss – custom homestay website connected to all OTAs (launching Q2 2026).",
        "Cancel anytime – no contracts, no lock-in, full data export.",
        "Smart marketing – featured listings, email campaigns, and social boosts bring more guests with less effort.",
        "24/7 local support – India/PH teams via WhatsApp/call/email + free 1:1 onboarding session.",
        "Welcome bonus – First 10 bookings commission-free + ₹2,000/₱5,000 listing credit."
    ]

    const toggleFaq = (index: number) => {
        setActiveFaq(activeFaq === index ? null : index)
    }

    // Helper for slider position percentage
    const getSliderPercent = () => {
        const min = 1;
        const max = 50;
        return ((numListings - min) / (max - min)) * 100;
    }

    return (
        <div style={{ background: '#fff' }}>
            <MainHeader showSearch={false} />

            {/* Hero Section */}
            <section style={{ padding: '60px 24px 20px', textAlign: 'center' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <h1 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '16px' }}>Host Like a Pro</h1>
                    <p style={{ fontSize: '1.5rem', color: '#555', marginBottom: '24px' }}>
                        Expert hosts, list your property in 5 minutes
                    </p>
                    <p style={{ fontSize: '1.1rem', color: '#717171', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>
                        Metrolodges is the premier Channel Manager and OTA for boutique stays. Manage Airbnb, Agoda, and more from one app. Maximize your bookings and peace of mind with 0% commission.
                    </p>
                </div>
            </section>

            {/* Subscription Section */}
            <section style={{ padding: '40px 24px 20px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'minmax(400px, 1fr) 1.5fr',
                        background: '#fff',
                        borderRadius: '24px',
                        border: '1px solid #eee',
                        boxShadow: '0 4px 30px rgba(0,0,0,0.05)',
                        overflow: 'hidden'
                    }}>
                        {/* Left Side Calculator */}
                        <div style={{ 
                            background: '#f1ede9', 
                            padding: '60px 40px', 
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center'
                        }}>
                            <h2 style={{ fontSize: '2.2rem', fontWeight: 700, marginBottom: '16px' }}>All-in-One Hosting (Subscription)</h2>
                            <p style={{ color: '#555', marginBottom: '60px', fontSize: '1.1rem', lineHeight: 1.4 }}>Manage all OTAs, calendars, pricing, bookings, and direct bookings from a single app</p>
                            
                            <div style={{ marginBottom: '60px', position: 'relative' }}>
                                {/* Floating Number Box */}
                                <div style={{ 
                                    position: 'absolute', 
                                    left: `${getSliderPercent()}%`, 
                                    top: '-45px', 
                                    transform: 'translateX(-50%)',
                                    background: '#fff',
                                    border: '1px solid #ddd',
                                    padding: '4px 12px',
                                    borderRadius: '8px',
                                    fontSize: '0.9rem',
                                    fontWeight: 800,
                                    color: '#222',
                                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                                    pointerEvents: 'none',
                                    zIndex: 2
                                }}>
                                    {numListings}
                                </div>

                                <input 
                                    type="range" 
                                    min="1" 
                                    max="50" 
                                    value={numListings} 
                                    onChange={(e) => setNumListings(parseInt(e.target.value))} 
                                    style={{ 
                                        width: '100%', 
                                        accentColor: 'var(--brand-blue, #71b7e1)',
                                        cursor: 'pointer',
                                        height: '8px',
                                        borderRadius: '4px'
                                    }}
                                />
                                <div style={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between', 
                                    fontSize: '0.85rem', 
                                    color: '#717171', 
                                    marginTop: '16px',
                                    padding: '0 5px'
                                }}>
                                    <span>1</span>
                                    <span>10</span>
                                    <span>20</span>
                                    <span>30</span>
                                    <span>40</span>
                                    <span>50+</span>
                                </div>
                                <div style={{ fontSize: '0.8rem', color: '#999', marginTop: '4px' }}>
                                    Move the slider to see your discounted price based on the number of listings.
                                </div>
                            </div>

                            <div style={{ fontSize: '1.6rem', fontWeight: 600, color: '#ff385c', marginBottom: '8px' }}>
                                ₹490 <span style={{ fontSize: '1rem', color: '#555', fontWeight: 400 }}>per month per property listing</span>
                            </div>
                            <div style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '40px', color: '#222' }}>
                                Total: ₹{(numListings * 490).toLocaleString()} <span style={{ fontSize: '1.1rem', color: '#555', fontWeight: 400 }}>per month</span>
                            </div>

                            <button style={{
                                width: '100%',
                                padding: '20px',
                                background: '#ff385c',
                                color: 'white',
                                border: 'none',
                                borderRadius: '14px',
                                fontSize: '1.2rem',
                                fontWeight: 800,
                                cursor: 'pointer',
                                marginBottom: '20px',
                            }}>
                                Continue Listing
                            </button>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <p style={{ fontSize: '0.95rem', color: '#717171' }}>Try free for 14 days. Save 20% on annual plans.</p>
                                <a href="#" style={{ color: '#222', fontSize: '1rem', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                    <i className="fa-solid fa-circle-play"></i>
                                    Never miss a booking - sync all your OTAs
                                </a>
                            </div>
                        </div>

                        {/* Right Side Inclusions */}
                        <div style={{ padding: '60px 50px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {inclusions.map((feature, i) => (
                                <div key={i} style={{ display: 'flex', gap: '14px', fontSize: '0.95rem', color: '#333', lineHeight: 1.4 }}>
                                    {feature === "Watch Demo Video" ? (
                                        <a href="#" style={{ color: 'var(--brand-blue, #71b7e1)', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <i className="fa-solid fa-circle-play"></i> [Watch Demo Video]
                                        </a>
                                    ) : (
                                        <>
                                            <i className="fa-solid fa-circle-check" style={{ color: 'var(--brand-blue, #71b7e1)', marginTop: '4px', fontSize: '1.1rem' }}></i>
                                            <span style={{ fontWeight: feature.includes('Welcome bonus') || feature.includes('Zero commissions') ? 700 : 400 }}>{feature}</span>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Step Procedure Section */}
                    <div style={{ marginTop: '60px', padding: '20px 0', textAlign: 'center' }}>
                        <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '40px' }}>How to get started</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
                            <div style={{ padding: '40px 32px', background: '#fff', borderRadius: '24px', border: '1px solid #eee' }}>
                                <div style={{ width: '60px', height: '60px', background: 'rgba(113, 183, 225, 0.1)', color: '#71b7e1', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', fontWeight: 900, margin: '0 auto 24px' }}>1</div>
                                <h4 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '12px' }}>List Property</h4>
                                <p style={{ color: '#717171', lineHeight: 1.6, fontSize: '0.95rem' }}>Fill in your property details and upload high-quality photos in just 5 minutes.</p>
                            </div>
                            <div style={{ padding: '40px 32px', background: '#fff', borderRadius: '24px', border: '1px solid #eee' }}>
                                <div style={{ width: '60px', height: '60px', background: 'rgba(113, 183, 225, 0.1)', color: '#71b7e1', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', fontWeight: 900, margin: '0 auto 24px' }}>2</div>
                                <h4 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '12px' }}>Sync Calendars</h4>
                                <p style={{ color: '#717171', lineHeight: 1.6, fontSize: '0.95rem' }}>Connect your Airbnb, Booking.com, and Agoda accounts to sync availability instantly.</p>
                            </div>
                            <div style={{ padding: '40px 32px', background: '#fff', borderRadius: '24px', border: '1px solid #eee' }}>
                                <div style={{ width: '60px', height: '60px', background: 'rgba(113, 183, 225, 0.1)', color: '#71b7e1', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', fontWeight: 900, margin: '0 auto 24px' }}>3</div>
                                <h4 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '12px' }}>Earn More</h4>
                                <p style={{ color: '#717171', lineHeight: 1.6, fontSize: '0.95rem' }}>Receive direct bookings via WhatsApp and keep 100% of your earnings with 0% commission.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Metrolodges Section */}
            <section style={{ padding: '60px 24px 20px', background: '#fff' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '12px' }}>Why choose metrolodges?</h2>
                    <p style={{ color: '#717171', marginBottom: '60px', fontSize: '1.1rem' }}>The #1 choice for boutique stays and professional hosts</p>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
                        {[
                            { title: "Direct Bookings", icon: "fa-whatsapp", desc: "Connect directly with guests via WhatsApp for better communication." },
                            { title: "Zero Commission", icon: "fa-percent", desc: "Keep everything you earn. We never take a cut of your booking revenue." },
                            { title: "Smart Sync", icon: "fa-rotate", desc: "Never worry about double bookings again with real-time calendar syncing." },
                            { title: "Expert Support", icon: "fa-headset", desc: "Our team of hospitality experts is here to help you grow your business." }
                        ].map((item, i) => (
                            <div key={i} style={{ padding: '40px 32px', background: '#fff', borderRadius: '24px', border: '1px solid #eee', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
                                <div style={{ fontSize: '2.8rem', color: 'var(--brand-blue, #71b7e1)', marginBottom: '24px' }}>
                                    <i className={`fa-solid ${item.icon}`}></i>
                                </div>
                                <h4 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '12px', color: '#222' }}>{item.title}</h4>
                                <p style={{ color: '#717171', fontSize: '0.92rem', lineHeight: 1.6 }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section style={{ padding: '40px 24px 80px' }}>
                <div style={{ maxWidth: '850px', margin: '0 auto' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '60px', textAlign: 'center' }}>Frequently Asked Questions</h2>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {faqs.map((faq, i) => (
                            <div key={i} style={{ border: '1px solid #eee', borderRadius: '20px', overflow: 'hidden', background: activeFaq === i ? '#fcfdff' : '#fff' }}>
                                <button
                                    onClick={() => toggleFaq(i)}
                                    style={{
                                        width: '100%',
                                        padding: '28px 32px',
                                        background: 'transparent',
                                        border: 'none',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                        textAlign: 'left'
                                    }}
                                >
                                    <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#222' }}>{faq.q}</span>
                                    <div style={{ 
                                        width: '32px', 
                                        height: '32px', 
                                        borderRadius: '50%', 
                                        background: activeFaq === i ? 'var(--brand-blue, #71b7e1)' : '#f5f5f5',
                                        color: activeFaq === i ? '#fff' : '#717171',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.8rem',
                                        transition: 'all 0.3s'
                                    }}>
                                        <i className={`fa-solid ${activeFaq === i ? 'fa-minus' : 'fa-plus'}`}></i>
                                    </div>
                                </button>
                                {activeFaq === i && (
                                    <div style={{ padding: '0 32px 32px', color: '#555', lineHeight: 1.7, fontSize: '1rem' }}>
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
