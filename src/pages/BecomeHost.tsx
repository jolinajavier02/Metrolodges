import React, { useState, useEffect } from 'react'
import MainHeader from '../components/MainHeader'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Assets
import hostStep1Room from '../assets/host_step_1_room.png'
import hostStep2Photos from '../assets/host_step_2_photos.png'
import hostStep3Finish from '../assets/host_step_3_finish.png'
import hostStepIntro from '../assets/host_step_intro.png'

const hostelRoom1 = "/Users/abhijeetanand/.gemini/antigravity/brain/50b31ca4-74e8-4fa2-831f-d8b880465402/hostel_room_1_1773469061412.png"
const hostelRoom2 = "/Users/abhijeetanand/.gemini/antigravity/brain/50b31ca4-74e8-4fa2-831f-d8b880465402/hostel_room_2_1773469075801.png"
const countryCodes = [
    { code: '+91', format: '93694 18559' },
    { code: '+63', format: '912 345 6789' },
    { code: '+1', format: '201 555 0123' },
    { code: '+44', format: '7700 900123' },
    { code: '+971', format: '50 123 4567' },
    { code: '+65', format: '8123 4567' },
    { code: '+61', format: '412 345 678' }
]

const currencies = [
    { code: 'INR', symbol: '₹', rate: 1 },
    { code: 'PHP', symbol: '₱', rate: 0.67 }, 
    { code: 'USD', symbol: '$', rate: 0.012 },
    { code: 'EUR', symbol: '€', rate: 0.011 },
    { code: 'JPY', symbol: '¥', rate: 1.8 },
    { code: 'CNY', symbol: '¥', rate: 0.086 }
]

const faqs = [
    {
        q: "How do I start listing my property?",
        intro: "To begin your journey as a Metrolodges host, you can choose from these two flexible options:",
        points: [
            { title: "Host It Like a Pro", desc: "Perfect for hands-on owners who want complete control over their listing. Set up in just 5 minutes." },
            { title: "Managed by Metrolodges", desc: "Our expert team handles everything for you, from professional photography tips to listing optimization." },
            { title: "Property Verification", desc: "Once submitted, our team reviews your property within 24-48 hours to ensure it meets our quality standards." }
        ]
    },
    {
        q: "What's the difference between Metrolodges and other channel managers?",
        intro: "Unlike traditional complex systems, Metrolodges is designed specifically for boutique stays and homestays:",
        points: [
            { title: "Cost-Effective Solution", desc: "Save significantly with subscriptions starting at ₹490, compared to others charging ₹2,000-₹5,000/month." },
            { title: "Direct Guest Connection", desc: "We facilitate direct communication via WhatsApp/Viber, unlike most OTAs that hide guest details." },
            { title: "User-Friendly App", desc: "Manage everything from your phone with a simple, intuitive dashboard built for independent hosts." }
        ]
    },
    {
        q: "How does the 0% Commission + Channel Manager work?",
        intro: "Our unique business model is designed to maximize your profit and simplify your operations:",
        points: [
            { title: "Subscription over Commission", desc: "You pay a flat monthly fee based on your listings, meaning you keep 100% of your booking revenue." },
            { title: "Real-time OTA Sync", desc: "Automatically updates availability on Airbnb, Agoda, and Booking.com to eliminate the risk of double bookings." },
            { title: "Centralized Management", desc: "Update prices and block dates across all platforms simultaneously from a single master calendar." }
        ]
    },
    {
        q: "What documents do I need to list my property?",
        intro: "To list your property on Metrolodges, you'll need:",
        points: [
            { title: "Your KYC documents", desc: "A government-issued ID card and Address proof (Aadhar, Voter ID, or Passport etc.)." },
            { title: "Property ownership proof or lease agreement", desc: "Documentation verifying your right to host at the property as applicable." },
            { title: "Applicable local licenses", desc: "Any specific business or homestay licenses required to operate the property as a vacation rental business." }
        ]
    },
    {
        q: "What are the quality and hygiene requirements?",
        intro: "All properties listed on Metrolodges must meet our basic quality and hygiene standards, including:",
        points: [
            { title: "Clean and well-maintained spaces", desc: "With proper bedding and good quality furniture for maximum guest comfort." },
            { title: "Fully functional amenities", desc: "Reliable access to WiFi, water, electricity, and essential security features." },
            { title: "Regular housekeeping & sanitization", desc: "Consistent professional cleaning standards maintained for every guest stay." },
            { title: "Clear and accurate property photos", desc: "High-quality images with detailed descriptions to provide realistic guest expectations." }
        ]
    }
]

const inclusions = [
    "Automatic calendar & dynamic pricing sync across all OTAs – prevents double bookings, auto-adjusts rates for festivals, holidays, and peak seasons (Diwali, Sinulog, etc.).",
    "Zero commissions – keep 100% of guest payments (only standard payment gateway fees).",
    "Direct guest connections – verified guests message you instantly via WhatsApp Business or Viber.",
    "Track ALL bookings centrally – direct, OTA, walk-ins, and agent bookings in one dashboard.",
    "Total control – set INR/PHP pricing, blackout dates, minimum stays, and house rules easily.",
    "Built-in channel manager – save ₹15,000-25,000/year (India) or ₱30,000/year (PH) vs third-party tools.",
    "Free local payouts – instant transfers to Indian banks/UPI, PH banks/GCash/Maya with no FX fees.",
    "Be your own boss – custom homestay website connected to all OTAs (launching Q2 2026).",
    "Cancel anytime – no contracts, no lock-in, full data export.",
    "Smart marketing – featured listings, email campaigns, and social boosts bring more guests with less effort.",
    "Welcome bonus – First 10 bookings commission-free + ₹2,000/₱5,000 listing credit."
]

const midPoint = Math.ceil(inclusions.length / 2)
const set1 = inclusions.slice(0, midPoint)
const set2 = inclusions.slice(midPoint)

const propertyTypes = [
    { name: 'House', icon: 'fa-house' },
    { name: 'Apartment', icon: 'fa-building' },
    { name: 'Barn', icon: 'fa-tractor' },
    { name: 'Bed & breakfast', icon: 'fa-mug-hot' },
    { name: 'Boat', icon: 'fa-ship' },
    { name: 'Cabin', icon: 'fa-mountain-sun' },
    { name: 'Campervan/RV', icon: 'fa-caravan' },
    { name: 'Casa particular', icon: 'fa-house-user' },
    { name: 'Castle', icon: 'fa-fort-awesome' },
    { name: 'Cave', icon: 'fa-mountain' },
    { name: 'Container', icon: 'fa-box' },
    { name: 'Cycladic home', icon: 'fa-monument' },
    { name: 'Dammuso', icon: 'fa-igloo' },
    { name: 'Dome', icon: 'fa-circle-dot' },
    { name: 'Earth home', icon: 'fa-leaf' },
    { name: 'Farm', icon: 'fa-wheat-awn' },
    { name: 'Guesthouse', icon: 'fa-hotel' },
    { name: 'Hotel', icon: 'fa-building-columns' },
    { name: 'Houseboat', icon: 'fa-anchor' },
    { name: 'Minsu', icon: 'fa-house-chimney-window' },
    { name: 'Riad', icon: 'fa-warehouse' },
    { name: 'Ryokan', icon: 'fa-torii-gate' },
    { name: 'Shepherd\'s hut', icon: 'fa-campground' },
    { name: 'Tent', icon: 'fa-tent' },
    { name: 'Tiny home', icon: 'fa-house-chimney' },
    { name: 'Tower', icon: 'fa-tower-observation' },
    { name: 'Tree house', icon: 'fa-tree' },
    { name: 'Trullo', icon: 'fa-chess-rook' },
    { name: 'Windmill', icon: 'fa-wind' },
    { name: 'Yurt', icon: 'fa-tent-arrow-down' }
]

const placeTypes = [
    { 
        id: 'entire', 
        title: 'An entire place', 
        desc: 'Guests have the whole place to themselves.',
        icon: 'fa-house'
    },
    { 
        id: 'room', 
        title: 'A room', 
        desc: 'Guests have their own room in a home, plus access to shared spaces.',
        icon: 'fa-door-open'
    },
    { 
        id: 'shared', 
        title: 'A shared room in a hostel', 
        desc: 'Guests sleep in a shared room in a professionally managed hostel with staff onsite 24/7.',
        icon: 'fa-people-roof'
    }
]

const BecomeHost: React.FC = () => {
    const navigate = useNavigate()
    const { user } = useAuth()
    
    const [step, setStep] = useState<number>(0) // 0: Main Info, 1: Registration Form
    const [numListings, setNumListings] = useState(1)
    const [currency, setCurrency] = useState('INR')
    const [activeFaq, setActiveFaq] = useState<number | null>(null)
    const [showTerms, setShowTerms] = useState(false)
    const [showOtp, setShowOtp] = useState(false)
    const [otp, setOtp] = useState(['', '', '', '', '', ''])
    const [resendTimer, setResendTimer] = useState(60)

    // Form State
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        countryCode: '+91'
    })

    // Auto-fill form if user is logged in
    useEffect(() => {
        if (user) {
            setFormData({
                fullName: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                countryCode: user.phoneCode || '+91'
            })
        }
    }, [user])

    // Resend timer logic
    useEffect(() => {
        let interval: any;
        if (showOtp && resendTimer > 0) {
            interval = setInterval(() => {
                setResendTimer(prev => prev - 1)
            }, 1000)
        }
        return () => clearInterval(interval)
    }, [showOtp, resendTimer])

    const [errors, setErrors] = useState<{ [key: string]: string }>({})
    const [agreedToTerms, setAgreedToTerms] = useState(false)

    const selectedCurrency = currencies.find(c => c.code === currency) || currencies[0]

    // Listing Creation State
    const [listingData, setListingData] = useState({
        propertyType: '',
        placeType: '',
        address: '',
        addressDetails: {
            country: 'Philippines - PH',
            unit: '',
            building: '',
            street: '',
            barangay: '',
            city: '',
            postcode: '',
            province: ''
        },
        showSpecificLocation: false,
        title: '',
        description: '',
        highlights: [] as string[],
        bookingSetting: 'approve', // 'approve' or 'instant'
        basePrice: 597,
        weekendPrice: 630,
        weekendPremium: 5, // percentage
        discounts: {
            newListing: true,
            lastMinute: true,
            weekly: true,
            monthly: true
        },
        safetyDetails: {
            exteriorCamera: false,
            noiseMonitor: false,
            weapons: false
        },
        residentialAddress: {
            country: 'Philippines',
            unit: '',
            building: '',
            street: '2 Ortigas',
            barangay: '',
            city: 'Pasay City',
            postcode: '1302',
            province: 'Kalakhang Maynila'
        },
        isBusiness: false,
        verificationStatus: {
            idVerified: false,
            phoneConfirmed: false
        }
    })

    const [showSpecificLocationState, setShowSpecificLocation] = useState(false)
    const [showPhotoUploadModal, setShowPhotoUploadModal] = useState(false)
    const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([])
    const [isUploading, setIsUploading] = useState(false)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files) return

        setIsUploading(true)
        // Simulate a brief delay to show "Uploading..."
        setTimeout(() => {
            const newPhotos = Array.from(files).map(file => URL.createObjectURL(file))
            setUploadedPhotos(prev => [...prev, ...newPhotos])
            setIsUploading(false)
            setShowPhotoUploadModal(false)
            // If they just added photos for the first time or reached 5, stay in current view but allow navigation
            // or navigate to gallery if they were in the setup view
            if (step === 13) {
                setStep(14)
            }
        }, 2000)
    }

    const handlePhotoUpload = () => {
        // Trigger the hidden file input
        document.getElementById('photo-input')?.click()
    }

    const removePhoto = (index: number) => {
        setUploadedPhotos(prev => prev.filter((_, i) => i !== index))
    }

    const [basics, setBasics] = useState({
        guests: 4,
        beds: 1,
        bathrooms: 1
    })

    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])

    const amenityCategories = [
        {
            title: 'What about these guest favourites?',
            items: [
                { id: 'wifi', name: 'Wifi', icon: 'fa-wifi' },
                { id: 'tv', name: 'TV', icon: 'fa-tv' },
                { id: 'kitchen', name: 'Kitchen', icon: 'fa-kitchen-set' },
                { id: 'washing_machine', name: 'Washing machine', icon: 'fa-soap' },
                { id: 'free_parking', name: 'Free parking on premises', icon: 'fa-car' },
                { id: 'paid_parking', name: 'Paid parking on premises', icon: 'fa-square-parking' },
                { id: 'ac', name: 'Air conditioning', icon: 'fa-snowflake' },
                { id: 'workspace', name: 'Dedicated workspace', icon: 'fa-laptop-code' }
            ]
        },
        {
            title: 'Do you have any standout amenities?',
            items: [
                { id: 'pool', name: 'Pool', icon: 'fa-person-swimming' },
                { id: 'hottub', name: 'Hot tub', icon: 'fa-hot-tub-person' },
                { id: 'patio', name: 'Patio', icon: 'fa-sun' },
                { id: 'bbq', name: 'BBQ grill', icon: 'fa-drumstick-bite' },
                { id: 'outdoor_dining', name: 'Outdoor dining area', icon: 'fa-utensils' },
                { id: 'firepit', name: 'Fire pit', icon: 'fa-fire' },
                { id: 'pool_table', name: 'Pool table', icon: 'fa-bowling-ball' },
                { id: 'fireplace', name: 'Indoor fireplace', icon: 'fa-fire-burner' },
                { id: 'piano', name: 'Piano', icon: 'fa-music' },
                { id: 'gym', name: 'Exercise equipment', icon: 'fa-dumbbell' },
                { id: 'lake', name: 'Lake access', icon: 'fa-water' },
                { id: 'beach', name: 'Beach access', icon: 'fa-umbrella-beach' },
                { id: 'ski', name: 'Ski-in/Ski-out', icon: 'fa-person-skiing' },
                { id: 'outdoor_shower', name: 'Outdoor shower', icon: 'fa-shower' }
            ]
        },
        {
            title: 'Do you have any of these safety items?',
            items: [
                { id: 'smoke_alarm', name: 'Smoke alarm', icon: 'fa-bullhorn' },
                { id: 'first_aid', name: 'First aid kit', icon: 'fa-kit-medical' },
                { id: 'fire_extinguisher', name: 'Fire extinguisher', icon: 'fa-fire-extinguisher' },
                { id: 'carbon_monoxide', name: 'Carbon monoxide alarm', icon: 'fa-triangle-exclamation' }
            ]
        }
    ]

    const toggleAmenity = (id: string) => {
        setSelectedAmenities(prev => 
            prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
        )
    }

    const handleNext = () => {
        setStep(prev => prev + 1)
        window.scrollTo(0, 0)
    }

    const handleBack = () => {
        setStep(prev => prev - 1)
        window.scrollTo(0, 0)
    }

    const toggleFaq = (index: number) => {
        setActiveFaq(activeFaq === index ? null : index)
    }

    const getSliderPercent = () => {
        const min = 1;
        const max = 51; 
        return ((numListings - min) / (max - min)) * 100;
    }

    const getPricePerListing = (count: number) => {
        if (count === 1) return 490;
        if (count === 2) return 450;
        if (count === 3) return 400;
        if (count === 4) return 325;
        if (count === 5) return 285;
        if (count === 6) return 240;
        if (count === 7) return 210;
        if (count === 8) return 185;
        if (count === 9) return 175;
        if (count === 10) return 155;
        if (count >= 11 && count <= 50) return 150;
        if (count >= 51) return 145;
        return 490;
    }

    const currentPricePerListing = getPricePerListing(numListings);
    const totalPrice = numListings * currentPricePerListing * selectedCurrency.rate;

    const handleContinue = () => {
        if (step === 0) {
            setStep(1)
            window.scrollTo(0, 0)
        } else {
            // Validation
            const newErrors: { [key: string]: string } = {}
            if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
            if (!formData.email.trim()) {
                newErrors.email = 'Email is required'
            } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
                newErrors.email = 'Email is invalid'
            }
            if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
            if (!agreedToTerms) newErrors.terms = 'You must agree to the terms and conditions'

            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors)
                return
            }

            setErrors({})
            // Show OTP Modal
            setShowOtp(true)
            setResendTimer(60)
        }
    }

    const handleOtpSubmit = () => {
        const otpCode = otp.join('')
        if (otpCode.length < 6) {
            alert('Please enter the complete 6-digit OTP')
            return
        }

        // Final Registration Logic
        localStorage.setItem('metrolodges_host_user', JSON.stringify(formData))
        setShowOtp(false)
        setStep(2)
        window.scrollTo(0, 0)
    }

    const handleOtpChange = (index: number, value: string) => {
        if (value.length > 1) value = value.slice(-1)
        if (!/^\d*$/.test(value)) return

        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)

        // Focus next input
        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`)
            nextInput?.focus()
        }
    }

    const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`)
            prevInput?.focus()
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div style={{ background: '#fff', minHeight: '100vh' }}>
            <MainHeader showSearch={false} />

            {step === 0 && (
                <>
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
                        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1.2fr 1fr',
                                background: '#fff',
                                borderRadius: '24px',
                                border: '1px solid #eee',
                                boxShadow: '0 4px 30px rgba(0,0,0,0.05)',
                                overflow: 'hidden'
                            }}>
                                {/* LEFT SIDE: Inclusions (2 columns) */}
                                <div style={{ 
                                    padding: '60px 40px', 
                                    display: 'grid', 
                                    gridTemplateColumns: '1fr 1fr', 
                                    gap: '30px',
                                    background: '#fff'
                                }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                                        {set1.map((feature: string, i: number) => (
                                            <div key={i} style={{ display: 'flex', gap: '12px', fontSize: '0.92rem', color: '#444', lineHeight: 1.4 }}>
                                                <i className="fa-solid fa-circle-check" style={{ color: 'var(--brand-blue, #71b7e1)', marginTop: '3px', fontSize: '1rem' }}></i>
                                                <span style={{ fontWeight: feature.includes('Welcome bonus') || feature.includes('Zero commissions') ? 700 : 400 }}>{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                                        {set2.map((feature: string, i: number) => (
                                            <div key={i} style={{ display: 'flex', gap: '12px', fontSize: '0.92rem', color: '#444', lineHeight: 1.4 }}>
                                                <i className="fa-solid fa-circle-check" style={{ color: 'var(--brand-blue, #71b7e1)', marginTop: '3px', fontSize: '1rem' }}></i>
                                                <span style={{ fontWeight: feature.includes('Welcome bonus') || feature.includes('Zero commissions') ? 700 : 400 }}>{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* RIGHT SIDE: Calculator */}
                                <div style={{ 
                                    background: '#f1ede9', 
                                    padding: '60px 50px', 
                                    textAlign: 'center',
                                    borderLeft: '1px solid #eee'
                                }}>
                                    <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '16px' }}>All-in-One Hosting (Subscription)</h2>
                                    <p style={{ color: '#555', marginBottom: '50px', fontSize: '1rem' }}>Manage all OTAs, calendars, pricing, bookings, and direct bookings from a single app</p>
                                    
                                    <div style={{ marginBottom: '60px', position: 'relative' }}>
                                        {/* Floating Number Box */}
                                        <div style={{ 
                                            position: 'absolute', 
                                            left: `${getSliderPercent()}%`, 
                                            top: '-45px', 
                                            transform: 'translateX(-50%)',
                                            background: '#fff',
                                            border: '1px solid var(--brand-blue, #71b7e1)',
                                            padding: '4px 12px',
                                            borderRadius: '8px',
                                            fontSize: '0.9rem',
                                            fontWeight: 800,
                                            color: 'var(--brand-blue, #71b7e1)',
                                            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                                            pointerEvents: 'none',
                                            zIndex: 2,
                                            transition: 'left 0.1s ease-out'
                                        }}>
                                            {numListings === 51 ? '51+' : numListings}
                                        </div>

                                        <input 
                                            type="range" 
                                            min="1" 
                                            max="51" 
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
                                        
                                        <div style={{ position: 'relative', marginTop: '12px', height: '20px' }}>
                                            {[1, 10, 20, 30, 40, 50, 51].map((val) => {
                                                const leftPercent = ((val - 1) / 50) * 100;
                                                return (
                                                    <span key={val} style={{ 
                                                        position: 'absolute', 
                                                        left: `${leftPercent}%`, 
                                                        transform: 'translateX(-50%)',
                                                        fontSize: '0.8rem',
                                                        fontWeight: 700,
                                                        color: '#717171'
                                                     }}>
                                                        {val === 51 ? '51+' : val}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Currency Selector */}
                                    <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '32px', flexWrap: 'wrap' }}>
                                        {currencies.map(c => (
                                            <button 
                                                key={c.code}
                                                onClick={() => setCurrency(c.code)}
                                                style={{
                                                    padding: '6px 12px',
                                                    borderRadius: '6px',
                                                    border: '1px solid',
                                                    borderColor: currency === c.code ? 'var(--brand-blue, #71b7e1)' : '#ddd',
                                                    background: currency === c.code ? 'var(--brand-blue, #71b7e1)' : '#fff',
                                                    color: currency === c.code ? '#fff' : '#555',
                                                    fontSize: '0.85rem',
                                                    fontWeight: 700,
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s'
                                                }}
                                            >
                                                {c.code}
                                            </button>
                                        ))}
                                    </div>

                                    <div style={{ fontSize: '1.4rem', fontWeight: 600, color: '#222', marginBottom: '8px' }}>
                                        <span style={{ color: 'var(--brand-blue, #71b7e1)', fontWeight: 800 }}>
                                            {selectedCurrency.symbol}{Math.round(currentPricePerListing * selectedCurrency.rate).toLocaleString()}
                                        </span> 
                                        <span style={{ fontSize: '0.9rem', color: '#555', fontWeight: 400 }}> per month per property listing</span>
                                    </div>
                                    <div style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '32px', color: '#222' }}>
                                        Total: {selectedCurrency.symbol}{Math.round(totalPrice).toLocaleString()} <span style={{ fontSize: '1.1rem', color: '#555', fontWeight: 400 }}>/ month</span>
                                    </div>

                                    <button 
                                        onClick={handleContinue}
                                        style={{
                                            width: '100%',
                                            padding: '20px',
                                            background: 'var(--brand-blue, #71b7e1)',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '14px',
                                            fontSize: '1.2rem',
                                            fontWeight: 800,
                                            cursor: 'pointer',
                                            boxShadow: '0 4px 15px rgba(113, 183, 225, 0.3)'
                                        }}
                                    >
                                        Continue Listing
                                    </button>
                                    
                                    <p style={{ fontSize: '0.9rem', color: '#717171', marginTop: '16px' }}>Try free for 14 days. Save 20% on annual plans.</p>
                                </div>
                            </div>

                            {/* Step Procedure Section */}
                            <div style={{ marginTop: '80px', textAlign: 'center' }}>
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
                            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, textTransform: 'lowercase' }}>why choose metrolodges?</h2>
                            <p style={{ color: '#717171', marginBottom: '60px', fontSize: '1.1rem' }}>The #1 choice for boutique stays and professional hosts</p>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
                                {[
                                    { title: "Direct Bookings", icon: "fa-whatsapp", desc: "Connect directly with guests via WhatsApp for better communication." },
                                    { title: "Zero Commission", icon: "fa-percent", desc: "Keep everything you earn. We never take a cut of your booking revenue." },
                                    { title: "Smart Sync", icon: "fa-rotate", desc: "Never worry about double bookings again with real-time calendar syncing." },
                                    { title: "Expert Support", icon: "fa-headset", desc: "Our team of hospitality experts is help you grow your business." }
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
                                            <div style={{ padding: '0 32px 32px', color: '#555', lineHeight: 1.7, fontSize: '0.95rem' }}>
                                                <div style={{ marginBottom: '16px' }}>{faq.intro}</div>
                                                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                                    {faq.points.map((pt, idx) => (
                                                        <li key={idx} style={{ display: 'flex', gap: '10px' }}>
                                                            <div style={{ fontSize: '1.2rem', color: '#222', marginTop: '-4px' }}>•</div>
                                                            <div>
                                                                <span style={{ fontWeight: 800, color: '#222' }}>{pt.title}</span> — {pt.desc}
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </>
            )}

            {step === 1 && (
                /* Registration View */
                <section style={{ padding: '80px 24px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ maxWidth: '800px', width: '100%', textAlign: 'center' }}>
                        <h1 style={{ fontSize: '2.8rem', fontWeight: 800, marginBottom: '12px' }}>All-in-One Hosting (Subscription)</h1>
                        <p style={{ fontSize: '1.2rem', color: '#555', marginBottom: '40px' }}>
                            You can make the subscription payment from your account's Billing & Settings section. 
                            <span style={{ fontWeight: 700 }}> (14 days free trial)</span>
                        </p>

                        <div style={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            gap: '20px', 
                            maxWidth: '600px', 
                            margin: '0 auto',
                            textAlign: 'left'
                        }}>
                            {/* Full Name */}
                            <div style={{ position: 'relative' }}>
                                <div style={{ 
                                    padding: '12px 20px', 
                                    border: errors.fullName ? '1px solid #ff385c' : '1px solid #ddd', 
                                    borderRadius: '12px',
                                    background: '#fff'
                                }}>
                                    <label style={{ fontSize: '0.75rem', color: '#717171', display: 'block', marginBottom: '4px' }}>Full Name <span style={{ color: '#ff385c' }}>*</span></label>
                                    <input 
                                        type="text" 
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        placeholder="Enter your full name"
                                        style={{ width: '100%', border: 'none', outline: 'none', fontSize: '1.1rem', fontWeight: 500 }} 
                                    />
                                </div>
                                {errors.fullName && <p style={{ color: '#ff385c', fontSize: '0.75rem', marginTop: '4px', paddingLeft: '4px' }}>{errors.fullName}</p>}
                            </div>

                            {/* Email ID */}
                            <div style={{ position: 'relative' }}>
                                <div style={{ 
                                    padding: '12px 20px', 
                                    border: errors.email ? '1px solid #ff385c' : '1px solid #ddd', 
                                    borderRadius: '12px',
                                    background: '#fff'
                                }}>
                                    <label style={{ fontSize: '0.75rem', color: '#717171', display: 'block', marginBottom: '4px' }}>Email ID <span style={{ color: '#ff385c' }}>*</span></label>
                                    <input 
                                        type="email" 
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="example@gmail.com"
                                        style={{ width: '100%', border: 'none', outline: 'none', fontSize: '1.1rem', fontWeight: 500 }} 
                                    />
                                </div>
                                {errors.email && <p style={{ color: '#ff385c', fontSize: '0.75rem', marginTop: '4px', paddingLeft: '4px' }}>{errors.email}</p>}
                            </div>

                            {/* Phone Number */}
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <div style={{ 
                                    border: '1px solid #ddd', 
                                    borderRadius: '12px',
                                    background: '#fff',
                                    width: '120px',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}>
                                    <label style={{ fontSize: '0.7rem', color: '#717171', display: 'block', padding: '12px 12px 0', marginBottom: '-4px' }}>Code</label>
                                    <select 
                                        name="countryCode"
                                        value={formData.countryCode}
                                        onChange={handleInputChange}
                                        style={{ 
                                            width: '100%', 
                                            border: 'none', 
                                            outline: 'none', 
                                            fontSize: '1.1rem', 
                                            fontWeight: 500,
                                            padding: '4px 12px 12px',
                                            background: 'transparent',
                                            appearance: 'none',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {countryCodes.map(c => (
                                            <option key={c.code} value={c.code}>{c.code}</option>
                                        ))}
                                    </select>
                                    <div style={{ position: 'absolute', right: '12px', bottom: '15px', pointerEvents: 'none', color: '#717171' }}>
                                        <i className="fa-solid fa-chevron-down" style={{ fontSize: '0.8rem' }}></i>
                                    </div>
                                </div>
                                <div style={{ 
                                    flex: 1,
                                    padding: '12px 20px', 
                                    border: errors.phone ? '1px solid #ff385c' : '1px solid #ddd', 
                                    borderRadius: '12px',
                                    background: '#fff'
                                }}>
                                    <label style={{ fontSize: '0.75rem', color: '#717171', display: 'block', marginBottom: '4px' }}>Phone Number <span style={{ color: '#ff385c' }}>*</span></label>
                                    <input 
                                        type="tel" 
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder={countryCodes.find(c => c.code === formData.countryCode)?.format || "93694 18559"}
                                        style={{ width: '100%', border: 'none', outline: 'none', fontSize: '1.1rem', fontWeight: 500 }} 
                                    />
                                </div>
                            </div>
                            {errors.phone && <p style={{ color: '#ff385c', fontSize: '0.75rem', marginTop: '-16px', paddingLeft: '132px' }}>{errors.phone}</p>}

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '10px' }}>
                                <input 
                                    type="checkbox" 
                                    id="terms-check" 
                                    checked={agreedToTerms}
                                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                                    style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--brand-blue, #71b7e1)' }}
                                />
                                <label htmlFor="terms-check" style={{ fontSize: '0.95rem', color: '#222', cursor: 'pointer' }}>
                                    I agree to the <span onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowTerms(true); }} style={{ color: 'var(--brand-blue, #71b7e1)', textDecoration: 'underline', fontWeight: 700 }}>Service Terms and Conditions</span>
                                </label>
                            </div>
                            {errors.terms && <p style={{ color: '#ff385c', fontSize: '0.75rem', textAlign: 'center', marginTop: '4px' }}>{errors.terms}</p>}

                            <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                                <button 
                                    onClick={() => setStep(0)}
                                    style={{
                                        flex: 1,
                                        padding: '18px',
                                        background: 'transparent',
                                        color: 'var(--brand-blue, #71b7e1)',
                                        border: '1px solid var(--brand-blue, #71b7e1)',
                                        borderRadius: '40px',
                                        fontSize: '1.1rem',
                                        fontWeight: 800,
                                        cursor: 'pointer'
                                    }}
                                >
                                    Back
                                </button>
                                <button 
                                    onClick={handleContinue}
                                    style={{
                                        flex: 1,
                                        padding: '18px',
                                        background: 'var(--brand-blue, #71b7e1)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '40px',
                                        fontSize: '1.1rem',
                                        fontWeight: 800,
                                        cursor: 'pointer'
                                    }}
                                >
                                    Continue
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {step === 2 && (
                /* Start Listing View */
                <section style={{ padding: '80px 24px', display: 'flex', justifyContent: 'center' }}>
                    <div style={{ maxWidth: '800px', width: '100%' }}>
                        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '60px', color: '#222' }}>Start a new listing</h1>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0', borderTop: '1px solid #eee' }}>
                            {/* Option 1 */}
                            <div 
                                onClick={() => {
                                    setStep(3)
                                    window.scrollTo(0, 0)
                                }}
                                style={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'space-between',
                                    padding: '40px 0',
                                    borderBottom: '1px solid #eee',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                                onMouseOver={(e) => e.currentTarget.style.background = '#f9f9f9'}
                                onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                                    <div style={{ 
                                        width: '48px', 
                                        height: '48px', 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center',
                                        color: 'var(--brand-blue, #71b7e1)',
                                        fontSize: '2.4rem'
                                    }}>
                                        <i className="fa-solid fa-house-medical"></i>
                                    </div>
                                    <span style={{ fontSize: '1.4rem', fontWeight: 500, color: '#222' }}>Create a new listing</span>
                                </div>
                                <i className="fa-solid fa-chevron-right" style={{ color: '#222', fontSize: '1.2rem', marginRight: '8px' }}></i>
                            </div>

                            {/* Option 2 */}
                            <div 
                                onClick={() => navigate('/become-a-host/existing-listing')}
                                style={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'space-between',
                                    padding: '40px 0',
                                    borderBottom: '1px solid #eee',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                                onMouseOver={(e) => e.currentTarget.style.background = '#f9f9f9'}
                                onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                                    <div style={{ 
                                        width: '48px', 
                                        height: '48px', 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center',
                                        color: 'var(--brand-blue, #71b7e1)',
                                        fontSize: '2.4rem'
                                    }}>
                                         <div style={{ position: 'relative' }}>
                                            <i className="fa-regular fa-clone"></i>
                                         </div>
                                    </div>
                                    <span style={{ fontSize: '1.4rem', fontWeight: 500, color: '#222' }}>Create from an existing listing</span>
                                </div>
                                <i className="fa-solid fa-chevron-right" style={{ color: '#222', fontSize: '1.2rem', marginRight: '8px' }}></i>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {step === 3 && (
                /* Easy Start Overview View */
                <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fff' }}>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 40px' }}>
                        <div style={{ maxWidth: '1200px', width: '100%', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '100px', alignItems: 'center' }}>
                            {/* Left Side: Large Heading */}
                            <div style={{ paddingRight: '40px' }}>
                                <h1 style={{ fontSize: '4.8rem', fontWeight: 800, lineHeight: 1.1, color: '#222' }}>
                                    It's easy to get<br />started on<br /><span style={{ color: 'var(--brand-blue, #71b7e1)' }}>Metrolodges</span>
                                </h1>
                            </div>

                            {/* Right Side: 3 Steps */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                                {/* Step 1 */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '40px 0', borderBottom: '1px solid #eee' }}>
                                    <div style={{ display: 'flex', gap: '24px' }}>
                                        <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#222', marginTop: '4px' }}>1</span>
                                        <div>
                                            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '8px', color: '#222' }}>Tell us about your place</h3>
                                            <p style={{ fontSize: '1.1rem', color: '#717171', lineHeight: 1.4, maxWidth: '350px' }}>
                                                Share some basic info, like where it is and how many guests can stay.
                                            </p>
                                        </div>
                                    </div>
                                    <img src={hostStep1Room} alt="Step 1" style={{ width: '120px', height: '120px', objectFit: 'contain' }} />
                                </div>

                                {/* Step 2 */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '40px 0', borderBottom: '1px solid #eee' }}>
                                    <div style={{ display: 'flex', gap: '24px' }}>
                                        <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#222', marginTop: '4px' }}>2</span>
                                        <div>
                                            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '8px', color: '#222' }}>Make it stand out</h3>
                                            <p style={{ fontSize: '1.1rem', color: '#717171', lineHeight: 1.4, maxWidth: '350px' }}>
                                                Add 5 or more photos plus a title and description—we'll help you out.
                                            </p>
                                        </div>
                                    </div>
                                    <img src={hostStep2Photos} alt="Step 2" style={{ width: '120px', height: '120px', objectFit: 'contain' }} />
                                </div>

                                {/* Step 3 */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '40px 0' }}>
                                    <div style={{ display: 'flex', gap: '24px' }}>
                                        <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#222', marginTop: '4px' }}>3</span>
                                        <div>
                                            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '8px', color: '#222' }}>Finish up and publish</h3>
                                            <p style={{ fontSize: '1.1rem', color: '#717171', lineHeight: 1.4, maxWidth: '350px' }}>
                                                Choose a starting price, verify a few details, then publish your listing.
                                            </p>
                                        </div>
                                    </div>
                                    <img src={hostStep3Finish} alt="Step 3" style={{ width: '120px', height: '120px', objectFit: 'contain' }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer for Step 3 */}
                    <div style={{ 
                        position: 'sticky', bottom: 0, padding: '24px 80px', 
                        background: '#fff', borderTop: '1px solid #eee', 
                        display: 'flex', justifyContent: 'flex-end', alignItems: 'center',
                        zIndex: 100
                    }}>
                        <button 
                            onClick={() => {
                                setStep(4)
                                window.scrollTo(0, 0)
                            }}
                            style={{ 
                                padding: '16px 40px', 
                                background: 'var(--brand-blue, #71b7e1)', 
                                color: '#fff', 
                                border: 'none', 
                                borderRadius: '12px', 
                                fontSize: '1.2rem', 
                                fontWeight: 800, 
                                cursor: 'pointer' 
                            }}
                        >
                            Get started
                        </button>
                    </div>
                </div>
            )}

            {step === 4 && (
                /* Step 1 Intro View */
                <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fff' }}>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 40px' }}>
                        <div style={{ maxWidth: '1200px', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
                            <div>
                                <p style={{ fontSize: '1.2rem', fontWeight: 600, color: '#222', marginBottom: '16px' }}>Step 1</p>
                                <h1 style={{ fontSize: '4.2rem', fontWeight: 800, marginBottom: '24px', color: '#222' }}>Tell us about your place</h1>
                                <p style={{ fontSize: '1.25rem', color: '#484848', lineHeight: 1.6 }}>
                                    In this step, we'll ask you which type of property you have and if guests will book the entire place or just a room. Then let us know the location and how many guests can stay.
                                </p>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <img src={hostStepIntro} alt="Step 1 Intro" style={{ width: '100%', maxWidth: '600px', objectFit: 'contain' }} />
                            </div>
                        </div>
                    </div>
                    {/* Progress Footer */}
                    <div style={{ position: 'sticky', bottom: 0, padding: '20px 80px', background: '#fff', borderTop: '6px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100 }}>
                        <button onClick={handleBack} style={{ background: 'none', border: 'none', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}>Back</button>
                        <button onClick={handleNext} style={{ padding: '14px 32px', background: 'var(--brand-blue, #71b7e1)', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer' }}>Next</button>
                    </div>
                </div>
            )}

            {step === 5 && (
                /* Property Type Selection View */
                <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fff' }}>
                    <div style={{ flex: 1, padding: '80px 40px' }}>
                        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                            <h1 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '48px', textAlign: 'center' }}>Which of these best describes your place?</h1>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                                 {propertyTypes.map((pType) => (
                                     <div 
                                         key={pType.name}
                                         onClick={() => setListingData({ ...listingData, propertyType: pType.name })}
                                         style={{
                                             padding: '28px 20px',
                                             border: listingData.propertyType === pType.name ? '2px solid #71b7e1' : '1px solid #ddd',
                                             borderRadius: '16px',
                                             cursor: 'pointer',
                                             background: listingData.propertyType === pType.name ? 'rgba(113, 183, 225, 0.05)' : '#fff',
                                             transition: 'all 0.2s',
                                             display: 'flex',
                                             flexDirection: 'column',
                                             alignItems: 'center',
                                             justifyContent: 'center',
                                             gap: '12px',
                                             textAlign: 'center'
                                         }}
                                         onMouseOver={(e) => !listingData.propertyType.includes(pType.name) && (e.currentTarget.style.borderColor = '#71b7e1')}
                                         onMouseOut={(e) => listingData.propertyType !== pType.name && (e.currentTarget.style.borderColor = '#ddd')}
                                     >
                                         <i className={`fa-solid ${pType.icon}`} style={{ fontSize: '2.2rem', color: listingData.propertyType === pType.name ? '#71b7e1' : '#222' }}></i>
                                         <span style={{ fontSize: '1rem', fontWeight: 700, color: '#222' }}>{pType.name}</span>
                                     </div>
                                 ))}
                            </div>
                        </div>
                    </div>
                    {/* Progress Footer */}
                    <div style={{ position: 'sticky', bottom: 0, padding: '20px 80px', background: '#fff', borderTop: '6px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100 }}>
                        <div style={{ position: 'absolute', top: '-6px', left: 0, height: '6px', background: 'var(--brand-blue, #71b7e1)', width: '33%', transition: 'width 0.3s ease' }}></div>
                        <button onClick={handleBack} style={{ background: 'none', border: 'none', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}>Back</button>
                        <button 
                            onClick={handleNext} 
                            disabled={!listingData.propertyType}
                            style={{ 
                                padding: '14px 32px', 
                                background: listingData.propertyType ? 'var(--brand-blue, #71b7e1)' : '#eee', 
                                color: listingData.propertyType ? '#fff' : '#999', 
                                border: 'none', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 700, cursor: listingData.propertyType ? 'pointer' : 'not-allowed' 
                            }}
                        >Next</button>
                    </div>
                </div>
            )}

            {step === 6 && (
                /* Place Type Selection View */
                <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fff' }}>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 40px' }}>
                        <div style={{ maxWidth: '800px', width: '100%' }}>
                            <h1 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '48px', textAlign: 'center' }}>What type of place will guests have?</h1>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {placeTypes.map((type) => (
                                    <div 
                                        key={type.id}
                                        onClick={() => setListingData({ ...listingData, placeType: type.id })}
                                        style={{
                                            padding: '32px',
                                            border: listingData.placeType === type.id ? '2px solid var(--brand-blue, #71b7e1)' : '1px solid #ddd',
                                            borderRadius: '16px',
                                            cursor: 'pointer',
                                            background: listingData.placeType === type.id ? 'rgba(113, 183, 225, 0.05)' : '#fff',
                                            transition: 'all 0.2s',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}
                                        onMouseOver={(e) => !listingData.placeType.includes(type.id) && (e.currentTarget.style.borderColor = 'var(--brand-blue, #71b7e1)')}
                                        onMouseOut={(e) => listingData.placeType !== type.id && (e.currentTarget.style.borderColor = '#ddd')}
                                    >
                                        <div style={{ flex: 1 }}>
                                            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '4px' }}>{type.title}</h3>
                                            <p style={{ fontSize: '1.1rem', color: '#717171' }}>{type.desc}</p>
                                        </div>
                                        <i className={`fa-solid ${type.icon}`} style={{ fontSize: '2rem', marginLeft: '24px' }}></i>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* Progress Footer */}
                    <div style={{ position: 'sticky', bottom: 0, padding: '20px 80px', background: '#fff', borderTop: '6px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100 }}>
                        <div style={{ position: 'absolute', top: '-6px', left: 0, height: '6px', background: 'var(--brand-blue, #71b7e1)', width: '66%', transition: 'width 0.3s ease' }}></div>
                        <button onClick={handleBack} style={{ background: 'none', border: 'none', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}>Back</button>
                        <button 
                            onClick={handleNext} 
                            disabled={!listingData.placeType}
                            style={{ 
                                padding: '14px 32px', 
                                background: listingData.placeType ? 'var(--brand-blue, #71b7e1)' : '#eee', 
                                color: listingData.placeType ? '#fff' : '#999', 
                                border: 'none', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 700, cursor: listingData.placeType ? 'pointer' : 'not-allowed' 
                            }}
                        >Next</button>
                    </div>
                </div>
            )}

            {step === 7 && (
                /* Location Map View */
                <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fff' }}>
                    <div style={{ flex: 1, padding: '60px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '8px', textAlign: 'center' }}>Where's your place located?</h1>
                        <p style={{ fontSize: '1.1rem', color: '#717171', marginBottom: '48px' }}>Your address is only shared with guests after they've made a reservation.</p>
                        
                        <div style={{ maxWidth: '800px', width: '100%', height: '550px', position: 'relative', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
                            <iframe 
                                title="Location Map"
                                width="100%" 
                                height="100%" 
                                frameBorder="0" 
                                scrolling="no" 
                                marginHeight={0} 
                                marginWidth={0} 
                                src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=Metrolodges%20Hom stays&t=&z=14&ie=UTF8&iwloc=B&output=embed"
                            ></iframe>
                            <div style={{ position: 'absolute', top: '24px', left: '24px', right: '24px' }}>
                                <div style={{ background: '#fff', padding: '16px 24px', borderRadius: '40px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                                    <i className="fa-solid fa-location-dot" style={{ fontSize: '1.2rem', color: '#222' }}></i>
                                    <input 
                                        type="text"
                                        placeholder="Enter your address"
                                        value={listingData.address}
                                        onChange={(e) => setListingData({ ...listingData, address: e.target.value })}
                                        style={{ width: '100%', border: 'none', outline: 'none', fontSize: '1.1rem' }}
                                    />
                                </div>
                            </div>
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }}>
                                <div style={{ width: '20px', height: '20px', background: '#000', borderRadius: '50%', border: '3px solid #fff', boxShadow: '0 0 10px rgba(0,0,0,0.5)' }}></div>
                            </div>
                        </div>
                    </div>
                    {/* Progress Footer */}
                    <div style={{ position: 'sticky', bottom: 0, padding: '20px 80px', background: '#fff', borderTop: '6px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100 }}>
                        <div style={{ position: 'absolute', top: '-6px', left: 0, height: '6px', background: 'var(--brand-blue, #71b7e1)', width: '100%', transition: 'width 0.3s ease' }}></div>
                        <button onClick={handleBack} style={{ background: 'none', border: 'none', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}>Back</button>
                        <button 
                            onClick={handleNext} 
                            style={{ padding: '14px 32px', background: 'var(--brand-blue, #71b7e1)', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer' }}
                        >Next</button>
                    </div>
                </div>
            )}

            {step === 8 && (
                /* Detailed Address Confirmation View */
                <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fff' }}>
                    <div style={{ flex: 1, padding: '60px 40px', display: 'flex', justifyContent: 'center' }}>
                        <div style={{ maxWidth: '1200px', width: '100%', display: 'flex', gap: '80px' }}>
                            {/* Left Side: Map Preview */}
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                <div style={{ height: '400px', width: '100%', position: 'relative', borderRadius: '24px', overflow: 'hidden', border: '1px solid #eee' }}>
                                    <iframe 
                                        title="Address Confirmation Map"
                                        width="100%" 
                                        height="100%" 
                                        frameBorder="0" 
                                        scrolling="no" 
                                        marginHeight={0} 
                                        marginWidth={0} 
                                        src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=Pasay%20City&t=&z=14&ie=UTF8&iwloc=B&output=embed"
                                    ></iframe>
                                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }}>
                                        <div style={{ width: '50px', height: '50px', background: '#ff385c', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid #fff', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}>
                                            <i className="fa-solid fa-house" style={{ color: '#fff', fontSize: '1.4rem' }}></i>
                                        </div>
                                    </div>
                                    <div style={{ position: 'absolute', top: '150px', left: '50%', transform: 'translateX(-50%)', background: '#fff', padding: '12px 24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '0.9rem', fontWeight: 600, border: '1px solid #eee' }}>
                                        We'll share your approximate location.
                                    </div>
                                </div>
                                
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                        <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Show your specific location</h3>
                                        <div 
                                            onClick={() => setListingData({ ...listingData, showSpecificLocation: !listingData.showSpecificLocation })}
                                            style={{ 
                                                width: '50px', height: '30px', background: listingData.showSpecificLocation ? '#222' : '#ddd', 
                                                borderRadius: '30px', position: 'relative', cursor: 'pointer', transition: 'all 0.3s' 
                                            }}
                                        >
                                            <div style={{ 
                                                width: '24px', height: '24px', background: '#fff', borderRadius: '50%', 
                                                position: 'absolute', top: '3px', left: listingData.showSpecificLocation ? '23px' : '3px', 
                                                transition: 'all 0.3s', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' 
                                            }}></div>
                                        </div>
                                    </div>
                                    <p style={{ color: '#717171', lineHeight: 1.5 }}>
                                        Make it clear to guests where your place is located. We'll only share your address after they've made a reservation. <span style={{ textDecoration: 'underline', color: '#222', fontWeight: 600, cursor: 'pointer' }}>Learn more</span>
                                    </p>
                                </div>
                            </div>

                            {/* Right Side: Form */}
                            <div style={{ flex: 1, maxWidth: '500px' }}>
                                <h1 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '8px' }}>Confirm your address</h1>
                                <p style={{ fontSize: '1rem', color: '#717171', marginBottom: '32px' }}>Your address is only shared with guests after they've made a reservation.</p>
                                
                                <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid #ddd', borderRadius: '12px', overflow: 'hidden' }}>
                                    <div style={{ padding: '12px 16px', borderBottom: '1px solid #ddd' }}>
                                        <label style={{ fontSize: '0.75rem', color: '#717171', display: 'block' }}>Country / region</label>
                                        <select 
                                            value={listingData.addressDetails.country}
                                            onChange={(e) => setListingData({ ...listingData, addressDetails: { ...listingData.addressDetails, country: e.target.value }})}
                                            style={{ width: '100%', border: 'none', background: 'none', outline: 'none', fontSize: '1rem', marginTop: '4px' }}
                                        >
                                            <option>Philippines - PH</option>
                                            <option>India - IN</option>
                                            <option>USA - US</option>
                                        </select>
                                    </div>
                                    <input 
                                        placeholder="Unit, level, etc. (if applicable)"
                                        value={listingData.addressDetails.unit}
                                        onChange={(e) => setListingData({ ...listingData, addressDetails: { ...listingData.addressDetails, unit: e.target.value }})}
                                        style={{ padding: '18px 16px', border: 'none', borderBottom: '1px solid #ddd', fontSize: '1rem', outline: 'none' }} 
                                    />
                                    <input 
                                        placeholder="Building name (if applicable)"
                                        value={listingData.addressDetails.building}
                                        onChange={(e) => setListingData({ ...listingData, addressDetails: { ...listingData.addressDetails, building: e.target.value }})}
                                        style={{ padding: '18px 16px', border: 'none', borderBottom: '1px solid #ddd', fontSize: '1rem', outline: 'none' }} 
                                    />
                                    <input 
                                        placeholder="Street address"
                                        value={listingData.addressDetails.street}
                                        onChange={(e) => setListingData({ ...listingData, addressDetails: { ...listingData.addressDetails, street: e.target.value }})}
                                        style={{ padding: '18px 16px', border: 'none', borderBottom: '1px solid #ddd', fontSize: '1rem', outline: 'none' }} 
                                    />
                                    <input 
                                        placeholder="Barangay / district (if applicable)"
                                        value={listingData.addressDetails.barangay}
                                        onChange={(e) => setListingData({ ...listingData, addressDetails: { ...listingData.addressDetails, barangay: e.target.value }})}
                                        style={{ padding: '18px 16px', border: 'none', borderBottom: '1px solid #ddd', fontSize: '1rem', outline: 'none' }} 
                                    />
                                    <input 
                                        placeholder="City / municipality"
                                        value={listingData.addressDetails.city}
                                        onChange={(e) => setListingData({ ...listingData, addressDetails: { ...listingData.addressDetails, city: e.target.value }})}
                                        style={{ padding: '18px 16px', border: 'none', borderBottom: '1px solid #ddd', fontSize: '1rem', outline: 'none' }} 
                                    />
                                    <input 
                                        placeholder="Postcode"
                                        value={listingData.addressDetails.postcode}
                                        onChange={(e) => setListingData({ ...listingData, addressDetails: { ...listingData.addressDetails, postcode: e.target.value }})}
                                        style={{ padding: '18px 16px', border: 'none', borderBottom: '1px solid #ddd', fontSize: '1rem', outline: 'none' }} 
                                    />
                                    <input 
                                        placeholder="Province"
                                        value={listingData.addressDetails.province}
                                        onChange={(e) => setListingData({ ...listingData, addressDetails: { ...listingData.addressDetails, province: e.target.value }})}
                                        style={{ padding: '18px 16px', border: 'none', fontSize: '1rem', outline: 'none' }} 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Progress Footer */}
                    <div style={{ position: 'sticky', bottom: 0, padding: '20px 80px', background: '#fff', borderTop: '6px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100 }}>
                        <div style={{ position: 'absolute', top: '-6px', left: 0, height: '6px', background: 'var(--brand-blue, #71b7e1)', width: '100%', transition: 'width 0.3s ease' }}></div>
                        <button onClick={handleBack} style={{ background: 'none', border: 'none', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}>Back</button>
                        <button 
                            onClick={handleNext} 
                            style={{ padding: '14px 32px', background: 'var(--brand-blue, #71b7e1)', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer' }}
                        >Next</button>
                    </div>
                </div>
            )}

            {step === 9 && (
                /* Map Pin Verification View */
                <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fff' }}>
                    <div style={{ flex: 1, padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '8px', textAlign: 'center' }}>Is the pin in the right spot?</h1>
                        <p style={{ fontSize: '1.1rem', color: '#717171', marginBottom: '40px' }}>Your address is only shared with guests after they've made a reservation.</p>
                        
                        <div style={{ maxWidth: '900px', width: '100%', height: '600px', position: 'relative', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
                            <iframe 
                                title="Pin Verification Map"
                                width="100%" 
                                height="100%" 
                                frameBorder="0" 
                                scrolling="no" 
                                marginHeight={0} 
                                marginWidth={0} 
                                src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=Pasay%20City&t=&z=16&ie=UTF8&iwloc=B&output=embed"
                            ></iframe>
                            
                            {/* Floating Address Overlay */}
                            <div style={{ position: 'absolute', top: '24px', left: '50%', transform: 'translateX(-50%)', width: '80%', maxWidth: '500px' }}>
                                <div style={{ background: '#fff', padding: '16px 24px', borderRadius: '16px', display: 'flex', gap: '16px', alignItems: 'flex-start', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
                                    <i className="fa-solid fa-location-dot" style={{ fontSize: '1.4rem', color: '#222', marginTop: '4px' }}></i>
                                    <div>
                                        <p style={{ fontSize: '1rem', fontWeight: 700, color: '#222', lineHeight: 1.4 }}>
                                            {listingData.addressDetails.unit && `${listingData.addressDetails.unit}, `} 
                                            {listingData.addressDetails.street}, {listingData.addressDetails.barangay}, {listingData.addressDetails.city}, {listingData.addressDetails.postcode}, {listingData.addressDetails.province}, Philippines
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Center Pin Overlay */}
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }}>
                                <div style={{ width: '50px', height: '50px', background: '#ff385c', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid #fff', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}>
                                    <i className="fa-solid fa-building" style={{ color: '#fff', fontSize: '1.4rem' }}></i>
                                </div>
                                <div style={{ position: 'absolute', top: 'calc(100% + 12px)', left: '50%', transform: 'translateX(-50%)', background: '#222', color: '#fff', padding: '8px 16px', borderRadius: '24px', fontSize: '0.85rem', fontWeight: 700, whiteSpace: 'nowrap' }}>
                                    Drag the map to reposition the pin
                                </div>
                            </div>

                            {/* Left Controls */}
                            <div style={{ position: 'absolute', left: '24px', bottom: '120px', display: 'flex', flexDirection: 'column', gap: '1px', background: '#fff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                                <button style={{ width: '40px', height: '40px', background: '#fff', border: 'none', borderBottom: '1px solid #eee', fontSize: '1.2rem', cursor: 'pointer' }}><i className="fa-solid fa-plus"></i></button>
                                <button style={{ width: '40px', height: '40px', background: '#fff', border: 'none', borderBottom: '1px solid #eee', fontSize: '1.2rem', cursor: 'pointer' }}><i className="fa-solid fa-minus"></i></button>
                                <button style={{ width: '40px', height: '40px', background: '#fff', border: 'none', borderBottom: '1px solid #eee', fontSize: '1.2rem', cursor: 'pointer' }}><i className="fa-solid fa-chevron-up"></i></button>
                                <button style={{ width: '40px', height: '40px', background: '#fff', border: 'none', borderBottom: '1px solid #eee', fontSize: '1.2rem', cursor: 'pointer' }}><i className="fa-solid fa-chevron-down"></i></button>
                                <button style={{ width: '40px', height: '40px', background: '#fff', border: 'none', borderBottom: '1px solid #eee', fontSize: '1.2rem', cursor: 'pointer' }}><i className="fa-solid fa-chevron-left"></i></button>
                                <button style={{ width: '40px', height: '40px', background: '#fff', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}><i className="fa-solid fa-chevron-right"></i></button>
                            </div>
                        </div>
                    </div>
                    {/* Progress Footer */}
                    <div style={{ position: 'sticky', bottom: 0, padding: '20px 80px', background: '#fff', borderTop: '6px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100 }}>
                        <div style={{ position: 'absolute', top: '-6px', left: 0, height: '6px', background: 'var(--brand-blue, #71b7e1)', width: '100%', transition: 'width 0.3s ease' }}></div>
                        <button onClick={handleBack} style={{ background: 'none', border: 'none', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}>Back</button>
                        <button 
                            onClick={handleNext} 
                            style={{ padding: '14px 32px', background: 'var(--brand-blue, #71b7e1)', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer' }}
                        >Next</button>
                    </div>
                </div>
            )}

            {step === 10 && (
                /* Property Basics View */
                <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fff' }}>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 40px' }}>
                        <div style={{ maxWidth: '600px', width: '100%' }}>
                            <h1 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '8px' }}>Share some basics about your place</h1>
                            <p style={{ fontSize: '1.1rem', color: '#717171', marginBottom: '48px' }}>You'll add more details later, like bed types.</p>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                                {/* Guests */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '24px', borderBottom: '1px solid #eee' }}>
                                    <span style={{ fontSize: '1.3rem', fontWeight: 600 }}>Guests</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                        <button 
                                            onClick={() => basics.guests > 1 && setBasics({ ...basics, guests: basics.guests - 1 })}
                                            style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #ccc', background: '#fff', fontSize: '1.2rem', cursor: basics.guests > 1 ? 'pointer' : 'not-allowed', opacity: basics.guests > 1 ? 1 : 0.3 }}
                                        >–</button>
                                        <span style={{ fontSize: '1.2rem', width: '20px', textAlign: 'center' }}>{basics.guests}</span>
                                        <button 
                                            onClick={() => setBasics({ ...basics, guests: basics.guests + 1 })}
                                            style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #ccc', background: '#fff', fontSize: '1.2rem', cursor: 'pointer' }}
                                        >+</button>
                                    </div>
                                </div>
                                {/* Beds */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '24px', borderBottom: '1px solid #eee' }}>
                                    <span style={{ fontSize: '1.3rem', fontWeight: 600 }}>Beds</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                        <button 
                                            onClick={() => basics.beds > 1 && setBasics({ ...basics, beds: basics.beds - 1 })}
                                            style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #ccc', background: '#fff', fontSize: '1.2rem', cursor: basics.beds > 1 ? 'pointer' : 'not-allowed', opacity: basics.beds > 1 ? 1 : 0.3 }}
                                        >–</button>
                                        <span style={{ fontSize: '1.2rem', width: '20px', textAlign: 'center' }}>{basics.beds}</span>
                                        <button 
                                            onClick={() => setBasics({ ...basics, beds: basics.beds + 1 })}
                                            style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #ccc', background: '#fff', fontSize: '1.2rem', cursor: 'pointer' }}
                                        >+</button>
                                    </div>
                                </div>
                                {/* Bathrooms */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '1.3rem', fontWeight: 600 }}>Bathrooms</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                        <button 
                                            onClick={() => basics.bathrooms > 1 && setBasics({ ...basics, bathrooms: basics.bathrooms - 1 })}
                                            style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #ccc', background: '#fff', fontSize: '1.2rem', cursor: basics.bathrooms > 1 ? 'pointer' : 'not-allowed', opacity: basics.bathrooms > 1 ? 1 : 0.3 }}
                                        >–</button>
                                        <span style={{ fontSize: '1.2rem', width: '20px', textAlign: 'center' }}>{basics.bathrooms}</span>
                                        <button 
                                            onClick={() => setBasics({ ...basics, bathrooms: basics.bathrooms + 1 })}
                                            style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #ccc', background: '#fff', fontSize: '1.2rem', cursor: 'pointer' }}
                                        >+</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Progress Footer */}
                    <div style={{ position: 'sticky', bottom: 0, padding: '20px 80px', background: '#fff', borderTop: '6px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100 }}>
                        <div style={{ position: 'absolute', top: '-6px', left: 0, height: '6px', background: 'var(--brand-blue, #71b7e1)', width: '100%', transition: 'width 0.3s ease' }}></div>
                        <button onClick={handleBack} style={{ background: 'none', border: 'none', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}>Back</button>
                        <button 
                            onClick={handleNext} 
                            style={{ padding: '14px 32px', background: 'var(--brand-blue, #71b7e1)', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer' }}
                        >Next</button>
                    </div>
                </div>
            )}

            {step === 11 && (
                /* Step 2 Intro View */
                <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fff' }}>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 40px' }}>
                        <div style={{ maxWidth: '1200px', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
                            <div>
                                <p style={{ fontSize: '1.2rem', fontWeight: 600, color: '#222', marginBottom: '16px' }}>Step 2</p>
                                <h1 style={{ fontSize: '4.2rem', fontWeight: 800, marginBottom: '24px', color: '#222' }}>Make your place stand out</h1>
                                <p style={{ fontSize: '1.25rem', color: '#484848', lineHeight: 1.6 }}>
                                    In this step, you'll add some of the amenities your place offers, plus 5 or more photos. Then, you'll create a title and description.
                                </p>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <img src={hostStep2Photos} alt="Step 2 Intro" style={{ width: '100%', maxWidth: '600px', objectFit: 'contain' }} />
                            </div>
                        </div>
                    </div>
                    {/* Progress Footer */}
                    <div style={{ position: 'sticky', bottom: 0, padding: '20px 80px', background: '#fff', borderTop: '6px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100 }}>
                        <button onClick={handleBack} style={{ background: 'none', border: 'none', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}>Back</button>
                        <button onClick={handleNext} style={{ padding: '14px 32px', background: 'var(--brand-blue, #71b7e1)', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer' }}>Next</button>
                    </div>
                </div>
            )}

            {step === 12 && (
                /* Amenities Selection View */
                <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fff' }}>
                    <div style={{ flex: 1, padding: '80px 40px' }}>
                        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                            <h1 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '8px' }}>Tell guests what your place has to offer</h1>
                            <p style={{ fontSize: '1.1rem', color: '#717171', marginBottom: '48px' }}>You can add more amenities after you publish your listing.</p>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
                                {amenityCategories.map((category) => (
                                    <div key={category.title}>
                                        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '24px' }}>{category.title}</h3>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                                            {category.items.map((amenity) => (
                                                <div 
                                                    key={amenity.id}
                                                    onClick={() => toggleAmenity(amenity.id)}
                                                    style={{
                                                        padding: '24px',
                                                        border: selectedAmenities.includes(amenity.id) ? '2px solid #222' : '1px solid #ddd',
                                                        borderRadius: '12px',
                                                        cursor: 'pointer',
                                                        background: selectedAmenities.includes(amenity.id) ? '#f7f7f7' : '#fff',
                                                        transition: 'all 0.2s',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        gap: '12px',
                                                        minHeight: '110px'
                                                    }}
                                                    onMouseOver={(e) => !selectedAmenities.includes(amenity.id) && (e.currentTarget.style.borderColor = '#222')}
                                                    onMouseOut={(e) => !selectedAmenities.includes(amenity.id) && (e.currentTarget.style.borderColor = '#ddd')}
                                                >
                                                    <i className={`fa-solid ${amenity.icon}`} style={{ fontSize: '2rem' }}></i>
                                                    <span style={{ fontSize: '1rem', fontWeight: 600 }}>{amenity.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* Progress Footer */}
                    <div style={{ position: 'sticky', bottom: 0, padding: '20px 80px', background: '#fff', borderTop: '6px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100 }}>
                        <div style={{ position: 'absolute', top: '-6px', left: 0, height: '6px', background: 'var(--brand-blue, #71b7e1)', width: '33%', transition: 'width 0.3s ease' }}></div>
                        <button onClick={handleBack} style={{ background: 'none', border: 'none', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}>Back</button>
                        <button 
                            onClick={handleNext} 
                            style={{ padding: '14px 32px', background: 'var(--brand-blue, #71b7e1)', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer' }}
                        >Next</button>
                    </div>
                </div>
            )}

            {step === 13 && (
                /* Initial Photo Setup View */
                <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fff' }}>
                    <div style={{ flex: 1, padding: '60px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ maxWidth: '800px', width: '100%' }}>
                            <h1 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '8px' }}>Add some photos of your {listingData.propertyType || 'hostel'}</h1>
                            <p style={{ fontSize: '1.1rem', color: '#717171', marginBottom: '48px' }}>You'll need 5 photos to get started. You can add more or make changes later.</p>
                            
                            <div 
                                onClick={() => setShowPhotoUploadModal(true)}
                                style={{ 
                                    width: '100%', 
                                    height: '450px', 
                                    border: '1px dashed #717171', 
                                    borderRadius: '16px', 
                                    display: 'flex', 
                                    flexDirection: 'column', 
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    background: '#fcfcfc',
                                    transition: 'background 0.2s'
                                }}
                                onMouseOver={(e) => e.currentTarget.style.background = '#f7f7f7'}
                                onMouseOut={(e) => e.currentTarget.style.background = '#fcfcfc'}
                            >
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
                                    <div style={{ fontSize: '4rem', color: '#222' }}>
                                        <i className="fa-solid fa-camera-retro"></i>
                                    </div>
                                    <button style={{ padding: '12px 24px', background: '#fff', border: '1px solid #222', borderRadius: '8px', fontSize: '1rem', fontWeight: 800, cursor: 'pointer' }}>Add photos</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Progress Footer */}
                    <div style={{ position: 'sticky', bottom: 0, padding: '20px 80px', background: '#fff', borderTop: '6px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100 }}>
                        <div style={{ position: 'absolute', top: '-6px', left: 0, height: '6px', background: 'var(--brand-blue, #71b7e1)', width: '66%', transition: 'width 0.3s ease' }}></div>
                        <button onClick={handleBack} style={{ background: 'none', border: 'none', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}>Back</button>
                        <button 
                            disabled={uploadedPhotos.length < 5}
                            onClick={handleNext} 
                            style={{ padding: '14px 32px', background: uploadedPhotos.length >= 5 ? 'var(--brand-blue, #71b7e1)' : '#eee', color: uploadedPhotos.length >= 5 ? '#fff' : '#999', border: 'none', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 700, cursor: uploadedPhotos.length >= 5 ? 'pointer' : 'not-allowed' }}
                        >Next</button>
                    </div>
                </div>
            )}

            {step === 14 && (
                /* Photo Gallery View - Step 2 Completion */
                <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fff' }}>
                    <div style={{ flex: 1, padding: '60px 40px', display: 'flex', justifyContent: 'center' }}>
                        <div style={{ maxWidth: '800px', width: '100%' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                                <div>
                                    <h1 style={{ fontSize: '2.4rem', fontWeight: 800 }}>Ta-da! How does this look?</h1>
                                    <p style={{ color: '#717171', fontSize: '1.2rem' }}>Drag to reorder</p>
                                </div>
                                <button 
                                    onClick={() => setShowPhotoUploadModal(true)}
                                    style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #ddd', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <i className="fa-solid fa-plus"></i>
                                </button>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                                {/* Big Cover Photo */}
                                {uploadedPhotos.length > 0 && (
                                    <div style={{ gridColumn: 'span 2', position: 'relative', borderRadius: '16px', overflow: 'hidden', height: '450px' }}>
                                        <img src={uploadedPhotos[0]} alt="Cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        <div style={{ position: 'absolute', top: '20px', left: '20px', background: '#fff', padding: '10px 16px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 800, border: '1px solid #eee', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>Cover Photo</div>
                                        <button style={{ position: 'absolute', top: '20px', right: '20px', width: '36px', height: '36px', background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                            <i className="fa-solid fa-ellipsis"></i>
                                        </button>
                                    </div>
                                )}

                                {/* Other Photos */}
                                {uploadedPhotos.slice(1).map((photo, i) => (
                                    <div key={photo + i} style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', height: '280px' }}>
                                        <img src={photo} alt={`Hostel ${i + 2}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        <button style={{ position: 'absolute', top: '16px', right: '16px', width: '32px', height: '32px', background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                            <i className="fa-solid fa-ellipsis"></i>
                                        </button>
                                    </div>
                                ))}

                                {/* Add More Slots if needed */}
                                {uploadedPhotos.length < 5 && Array.from({ length: 5 - uploadedPhotos.length }).map((_, i) => (
                                    <div 
                                        key={i}
                                        onClick={() => setShowPhotoUploadModal(true)}
                                        style={{ height: '280px', border: '1px dashed #ddd', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px', background: '#fcfcfc', cursor: 'pointer' }}
                                    >
                                        <i className="fa-regular fa-image" style={{ fontSize: '2rem', color: '#ccc' }}></i>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#999', fontSize: '0.9rem' }}>
                                            <i className="fa-solid fa-plus"></i>
                                            <span>Add more</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* Progress Footer */}
                    <div style={{ position: 'sticky', bottom: 0, padding: '20px 80px', background: '#fff', borderTop: '6px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100 }}>
                        <div style={{ position: 'absolute', top: '-6px', left: 0, height: '6px', background: 'var(--brand-blue, #71b7e1)', width: '100%', transition: 'width 0.3s ease' }}></div>
                        <button onClick={handleBack} style={{ background: 'none', border: 'none', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}>Back</button>
                        <button 
                            disabled={uploadedPhotos.length < 5}
                            onClick={handleNext} 
                            style={{ padding: '14px 32px', background: uploadedPhotos.length >= 5 ? 'var(--brand-blue, #71b7e1)' : '#eee', color: uploadedPhotos.length >= 5 ? '#fff' : '#999', border: 'none', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 700, cursor: uploadedPhotos.length >= 5 ? 'pointer' : 'not-allowed' }}
                        >Next</button>
                    </div>
                </div>
            )}

            {step === 15 && (
                /* Step 15: Give your place a title */
                <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fff' }}>
                    <div style={{ flex: 1, padding: '80px 40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ maxWidth: '650px', width: '100%' }}>
                            <h1 style={{ fontSize: '2.8rem', fontWeight: 800, marginBottom: '16px', color: '#222' }}>Now, let's give your {listingData.propertyType || 'hostel'} a title</h1>
                            <p style={{ fontSize: '1.2rem', color: '#717171', marginBottom: '40px' }}>Short titles work best. Have fun with it—you can always change it later.</p>
                            
                            <div style={{ position: 'relative' }}>
                                <textarea 
                                    value={listingData.title}
                                    onChange={(e) => e.target.value.length <= 50 && setListingData({ ...listingData, title: e.target.value })}
                                    style={{ 
                                        width: '100%', 
                                        height: '240px', 
                                        padding: '24px', 
                                        fontSize: '1.4rem', 
                                        borderRadius: '16px', 
                                        border: '1px solid #717171', 
                                        outline: 'none',
                                        resize: 'none',
                                        color: '#222',
                                        lineHeight: 1.4
                                    }}
                                />
                                <div style={{ marginTop: '12px', fontSize: '1rem', fontWeight: 700, color: '#222' }}>
                                    {listingData.title.length}/50
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Progress Footer */}
                    <div style={{ position: 'sticky', bottom: 0, padding: '20px 80px', background: '#fff', borderTop: '6px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100 }}>
                        <div style={{ position: 'absolute', top: '-6px', left: 0, height: '6px', background: 'var(--brand-blue, #71b7e1)', width: '20%', transition: 'width 0.3s ease' }}></div>
                        <button onClick={handleBack} style={{ background: 'none', border: 'none', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}>Back</button>
                        <button 
                            disabled={!listingData.title.trim()}
                            onClick={handleNext} 
                            style={{ padding: '14px 32px', background: listingData.title.trim() ? 'var(--brand-blue, #71b7e1)' : '#eee', color: listingData.title.trim() ? '#fff' : '#999', border: 'none', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 700, cursor: listingData.title.trim() ? 'pointer' : 'not-allowed' }}
                        >Next</button>
                    </div>
                </div>
            )}

            {step === 16 && (
                /* Step 16: Choose highlights */
                <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fff' }}>
                    <div style={{ flex: 1, padding: '80px 40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ maxWidth: '750px', width: '100%' }}>
                            <h1 style={{ fontSize: '2.8rem', fontWeight: 800, marginBottom: '16px', color: '#222' }}>Next, let's describe your {listingData.propertyType || 'hostel'}</h1>
                            <p style={{ fontSize: '1.2rem', color: '#717171', marginBottom: '48px' }}>Choose up to 2 highlights. We'll use these to get your description started.</p>
                            
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                                {[
                                    { id: 'peaceful', name: 'Peaceful', icon: 'fa-socks' },
                                    { id: 'unique', name: 'Unique', icon: 'fa-lighthouse' },
                                    { id: 'family_friendly', name: 'Family-friendly', icon: 'fa-horse-rocking' },
                                    { id: 'stylish', name: 'Stylish', icon: 'fa-chair' },
                                    { id: 'central', name: 'Central', icon: 'fa-location-crosshairs' },
                                    { id: 'spacious', name: 'Spacious', icon: 'fa-users-line' }
                                ].map((h) => (
                                    <div 
                                        key={h.id}
                                        onClick={() => {
                                            const current = listingData.highlights;
                                            if (current.includes(h.id)) {
                                                setListingData({ ...listingData, highlights: current.filter(id => id !== h.id) });
                                            } else if (current.length < 2) {
                                                setListingData({ ...listingData, highlights: [...current, h.id] });
                                            }
                                        }}
                                        style={{
                                            padding: '16px 32px',
                                            border: listingData.highlights.includes(h.id) ? '2px solid #222' : '1px solid #ddd',
                                            borderRadius: '30px',
                                            cursor: 'pointer',
                                            background: listingData.highlights.includes(h.id) ? '#f7f7f7' : '#fff',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            transition: 'all 0.2s',
                                            fontSize: '1.1rem',
                                            fontWeight: 600
                                        }}
                                    >
                                        <i className={`fa-solid ${h.icon}`}></i>
                                        <span>{h.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* Progress Footer */}
                    <div style={{ position: 'sticky', bottom: 0, padding: '20px 80px', background: '#fff', borderTop: '6px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100 }}>
                        <div style={{ position: 'absolute', top: '-6px', left: 0, height: '6px', background: 'var(--brand-blue, #71b7e1)', width: '40%', transition: 'width 0.3s ease' }}></div>
                        <button onClick={handleBack} style={{ background: 'none', border: 'none', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}>Back</button>
                        <button 
                            disabled={listingData.highlights.length === 0}
                            onClick={handleNext} 
                            style={{ padding: '14px 32px', background: listingData.highlights.length > 0 ? 'var(--brand-blue, #71b7e1)' : '#eee', color: listingData.highlights.length > 0 ? '#fff' : '#999', border: 'none', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 700, cursor: listingData.highlights.length > 0 ? 'pointer' : 'not-allowed' }}
                        >Next</button>
                    </div>
                </div>
            )}

            {step === 17 && (
                /* Step 17: Create description */
                <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fff' }}>
                    <div style={{ flex: 1, padding: '80px 40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ maxWidth: '650px', width: '100%' }}>
                            <h1 style={{ fontSize: '2.8rem', fontWeight: 800, marginBottom: '16px', color: '#222' }}>Create your description</h1>
                            <p style={{ fontSize: '1.2rem', color: '#717171', marginBottom: '40px' }}>Share what makes your place special.</p>
                            
                            <div style={{ position: 'relative' }}>
                                <textarea 
                                    value={listingData.description}
                                    placeholder="The whole group will enjoy easy access to everything from this centrally located place."
                                    onChange={(e) => e.target.value.length <= 500 && setListingData({ ...listingData, description: e.target.value })}
                                    style={{ 
                                        width: '100%', 
                                        height: '280px', 
                                        padding: '24px', 
                                        fontSize: '1.2rem', 
                                        borderRadius: '16px', 
                                        border: '1px solid #717171', 
                                        outline: 'none',
                                        resize: 'none',
                                        color: '#222',
                                        lineHeight: 1.6
                                    }}
                                />
                                <div style={{ marginTop: '12px', fontSize: '1rem', fontWeight: 700, color: '#222' }}>
                                    {listingData.description.length}/500
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Progress Footer */}
                    <div style={{ position: 'sticky', bottom: 0, padding: '20px 80px', background: '#fff', borderTop: '6px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100 }}>
                        <div style={{ position: 'absolute', top: '-6px', left: 0, height: '6px', background: 'var(--brand-blue, #71b7e1)', width: '60%', transition: 'width 0.3s ease' }}></div>
                        <button onClick={handleBack} style={{ background: 'none', border: 'none', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}>Back</button>
                        <button 
                            disabled={!listingData.description.trim()}
                            onClick={handleNext} 
                            style={{ padding: '14px 32px', background: listingData.description.trim() ? 'var(--brand-blue, #71b7e1)' : '#eee', color: listingData.description.trim() ? '#fff' : '#999', border: 'none', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 700, cursor: listingData.description.trim() ? 'pointer' : 'not-allowed' }}
                        >Next</button>
                    </div>
                </div>
            )}

            {step === 18 && (
                /* Step 18: Step 3 Intro */
                <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fff' }}>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 40px' }}>
                        <div style={{ maxWidth: '1200px', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
                            <div>
                                <p style={{ fontSize: '1.2rem', fontWeight: 600, color: '#222', marginBottom: '16px' }}>Step 3</p>
                                <h1 style={{ fontSize: '4.2rem', fontWeight: 800, marginBottom: '24px', color: '#222' }}>Finish up and publish</h1>
                                <p style={{ fontSize: '1.25rem', color: '#484848', lineHeight: 1.6 }}>
                                    Finally, you'll choose booking settings, set up pricing and publish your listing.
                                </p>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <img src={hostStep3Finish} alt="Step 3 Intro" style={{ width: '100%', maxWidth: '600px', objectFit: 'contain' }} />
                            </div>
                        </div>
                    </div>
                    {/* Progress Footer */}
                    <div style={{ position: 'sticky', bottom: 0, padding: '20px 80px', background: '#fff', borderTop: '6px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100 }}>
                         <div style={{ position: 'absolute', top: '-6px', left: 0, height: '6px', background: '#eee', width: '100%' }}>
                            <div style={{ height: '100%', background: 'var(--brand-blue, #71b7e1)', width: '0%', transition: 'width 0.3s ease' }}></div>
                         </div>
                        <button onClick={handleBack} style={{ background: 'none', border: 'none', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}>Back</button>
                        <button onClick={handleNext} style={{ padding: '14px 32px', background: 'var(--brand-blue, #71b7e1)', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer' }}>Next</button>
                    </div>
                </div>
            )}

            {step === 19 && (
                /* Step 19: Pick your booking settings */
                <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fff' }}>
                    <div style={{ flex: 1, padding: '80px 40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ maxWidth: '650px', width: '100%' }}>
                            <h1 style={{ fontSize: '2.8rem', fontWeight: 800, marginBottom: '8px', color: '#222' }}>Pick your booking settings</h1>
                            <p style={{ fontSize: '1.2rem', color: '#717171', marginBottom: '48px' }}>You can change this at any time. <span style={{ textDecoration: 'underline', color: '#222', cursor: 'pointer' }}>Learn more</span></p>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div 
                                    onClick={() => setListingData({ ...listingData, bookingSetting: 'approve' })}
                                    style={{
                                        padding: '24px',
                                        border: listingData.bookingSetting === 'approve' ? '2px solid #222' : '1px solid #ddd',
                                        borderRadius: '16px',
                                        cursor: 'pointer',
                                        background: listingData.bookingSetting === 'approve' ? '#f7f7f7' : '#fff',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-start',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    <div>
                                        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '4px' }}>Approve your first 5 bookings</h3>
                                        <p style={{ color: '#008a05', fontWeight: 700, fontSize: '0.9rem', marginBottom: '8px' }}>Recommended</p>
                                        <p style={{ color: '#717171', fontSize: '1rem', lineHeight: 1.4 }}>Start by reviewing reservation requests, then switch to Instant Book, so guests can book automatically.</p>
                                    </div>
                                    <i className="fa-regular fa-calendar-check" style={{ fontSize: '1.5rem', color: '#222' }}></i>
                                </div>

                                <div 
                                    onClick={() => setListingData({ ...listingData, bookingSetting: 'instant' })}
                                    style={{
                                        padding: '24px',
                                        border: listingData.bookingSetting === 'instant' ? '2px solid #222' : '1px solid #ddd',
                                        borderRadius: '16px',
                                        cursor: 'pointer',
                                        background: listingData.bookingSetting === 'instant' ? '#f7f7f7' : '#fff',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-start',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    <div>
                                        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '8px' }}>Use Instant Book</h3>
                                        <p style={{ color: '#717171', fontSize: '1rem', lineHeight: 1.4 }}>Let guests book automatically.</p>
                                    </div>
                                    <i className="fa-solid fa-bolt" style={{ fontSize: '1.5rem', color: '#222' }}></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Progress Footer */}
                    <div style={{ position: 'sticky', bottom: 0, padding: '20px 80px', background: '#fff', borderTop: '6px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100 }}>
                        <div style={{ position: 'absolute', top: '-6px', left: 0, height: '6px', background: '#eee', width: '100%' }}>
                            <div style={{ height: '100%', background: 'var(--brand-blue, #71b7e1)', width: '20%', transition: 'width 0.3s ease' }}></div>
                        </div>
                        <button onClick={handleBack} style={{ background: 'none', border: 'none', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}>Back</button>
                        <button onClick={handleNext} style={{ padding: '14px 32px', background: 'var(--brand-blue, #71b7e1)', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer' }}>Next</button>
                    </div>
                </div>
            )}

            {step === 20 && (
                /* Step 20: Weekday Price */
                <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fff' }}>
                    <div style={{ flex: 1, padding: '80px 40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ maxWidth: '700px', width: '100%', textAlign: 'center' }}>
                            <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '8px', color: '#222' }}>Now, set a weekday base price</h1>
                            <p style={{ fontSize: '1.3rem', color: '#717171', marginBottom: '60px' }}>Tip: ₱597. You'll set a weekend price next.</p>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #ddd', borderRadius: '12px', padding: '20px 40px', background: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                                    <span style={{ fontSize: '4.5rem', fontWeight: 800 }}>₱</span>
                                    <input 
                                        type="number"
                                        value={listingData.basePrice}
                                        onChange={(e) => setListingData({ ...listingData, basePrice: parseInt(e.target.value) || 0 })}
                                        style={{ border: 'none', outline: 'none', fontSize: '5rem', fontWeight: 800, width: '280px', color: '#222' }}
                                    />
                                </div>
                                <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '8px', color: '#222', fontSize: '1.1rem', fontWeight: 600 }}>
                                    <span>Guest price before taxes ₱{Math.round(listingData.basePrice * 1.14)}</span>
                                    <i className="fa-solid fa-chevron-down" style={{ fontSize: '0.8rem' }}></i>
                                </div>

                                <button style={{ marginTop: '80px', padding: '12px 24px', background: '#fff', border: '1px solid #ddd', borderRadius: '30px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', cursor: 'pointer' }}>
                                    <i className="fa-solid fa-location-dot" style={{ color: '#ff385c' }}></i>
                                    <span>View similar listings</span>
                                </button>
                                <p style={{ marginTop: '24px', color: '#717171', textDecoration: 'underline', cursor: 'pointer', fontSize: '0.9rem' }}>Learn more about pricing</p>
                            </div>
                        </div>
                    </div>
                    {/* Progress Footer */}
                    <div style={{ position: 'sticky', bottom: 0, padding: '20px 80px', background: '#fff', borderTop: '6px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100 }}>
                        <div style={{ position: 'absolute', top: '-6px', left: 0, height: '6px', background: '#eee', width: '100%' }}>
                            <div style={{ height: '100%', background: 'var(--brand-blue, #71b7e1)', width: '40%', transition: 'width 0.3s ease' }}></div>
                        </div>
                        <button onClick={handleBack} style={{ background: 'none', border: 'none', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}>Back</button>
                        <button onClick={handleNext} style={{ padding: '14px 32px', background: 'var(--brand-blue, #71b7e1)', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer' }}>Next</button>
                    </div>
                </div>
            )}

            {step === 21 && (
                /* Step 21: Weekend Price */
                <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fff' }}>
                    <div style={{ flex: 1, padding: '80px 40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ maxWidth: '700px', width: '100%', textAlign: 'center' }}>
                            <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '8px', color: '#222' }}>Set a weekend price</h1>
                            <p style={{ fontSize: '1.4rem', color: '#717171', marginBottom: '80px' }}>Add a premium for Fridays and Saturdays.</p>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '100px' }}>
                                <div style={{ fontSize: '6rem', fontWeight: 800, marginBottom: '20px' }}>
                                    ₱{Math.round(listingData.basePrice * (1 + listingData.weekendPremium / 100))}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#222', fontSize: '1.2rem', fontWeight: 600 }}>
                                    <span>Guest price before taxes ₱{Math.round(listingData.basePrice * (1 + listingData.weekendPremium / 100) * 1.14)}</span>
                                    <i className="fa-solid fa-chevron-down" style={{ fontSize: '0.9rem' }}></i>
                                </div>
                            </div>

                            <div style={{ textAlign: 'left', maxWidth: '500px', margin: '0 auto' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                                    <div>
                                        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#222' }}>Weekend premium</h3>
                                        <p style={{ color: '#717171' }}>Tip: Try 5%</p>
                                    </div>
                                    <div style={{ padding: '12px 24px', border: '1px solid #ddd', borderRadius: '12px', fontSize: '1.2rem', fontWeight: 800 }}>{listingData.weekendPremium}%</div>
                                </div>
                                <input 
                                    type="range"
                                    min="0"
                                    max="99"
                                    value={listingData.weekendPremium}
                                    onChange={(e) => setListingData({ ...listingData, weekendPremium: parseInt(e.target.value) })}
                                    style={{ 
                                        width: '100%', 
                                        accentColor: '#222',
                                        height: '6px',
                                        borderRadius: '3px',
                                        background: '#eee',
                                        appearance: 'none',
                                        outline: 'none',
                                        cursor: 'pointer'
                                    }}
                                />
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', fontSize: '0.9rem', color: '#717171' }}>
                                    <span>0%</span>
                                    <span>99%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Progress Footer */}
                    <div style={{ position: 'sticky', bottom: 0, padding: '20px 80px', background: '#fff', borderTop: '6px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100 }}>
                        <div style={{ position: 'absolute', top: '-6px', left: 0, height: '6px', background: '#eee', width: '100%' }}>
                            <div style={{ height: '100%', background: 'var(--brand-blue, #71b7e1)', width: '60%', transition: 'width 0.3s ease' }}></div>
                        </div>
                        <button onClick={handleBack} style={{ background: 'none', border: 'none', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}>Back</button>
                        <button onClick={handleNext} style={{ padding: '14px 32px', background: 'var(--brand-blue, #71b7e1)', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer' }}>Next</button>
                    </div>
                </div>
            )}

            {step === 22 && (
                /* Step 22: Add discounts */
                <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fff' }}>
                    <div style={{ flex: 1, padding: '80px 40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ maxWidth: '750px', width: '100%' }}>
                            <h1 style={{ fontSize: '2.8rem', fontWeight: 800, marginBottom: '16px', color: '#222' }}>Add discounts</h1>
                            <p style={{ fontSize: '1.25rem', color: '#717171', marginBottom: '48px' }}>Help your place stand out to get booked faster and earn your first reviews.</p>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {[
                                    { id: 'newListing', val: '20%', title: 'New listing promotion', desc: 'Offer 20% off your first 3 bookings' },
                                    { id: 'lastMinute', val: '4%', title: 'Last-minute discount', desc: 'For stays booked 14 days or less before arrival' },
                                    { id: 'weekly', val: '10%', title: 'Weekly discount', desc: 'For stays of 7 nights or more' },
                                    { id: 'monthly', val: '16%', title: 'Monthly discount', desc: 'For stays of 28 nights or more' }
                                ].map((d) => (
                                    <div 
                                        key={d.id}
                                        onClick={() => setListingData({ ...listingData, discounts: { ...listingData.discounts, [d.id]: !listingData.discounts[d.id as keyof typeof listingData.discounts] } })}
                                        style={{
                                            padding: '24px 32px',
                                            border: '1px solid #ddd',
                                            borderRadius: '16px',
                                            cursor: 'pointer',
                                            background: '#fcfcfc',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            transition: 'all 0.2s',
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                                            <div style={{ width: '60px', height: '44px', border: '1px solid #ddd', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', fontWeight: 800, background: '#fff' }}>{d.val}</div>
                                            <div>
                                                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#222', marginBottom: '4px' }}>{d.title}</h3>
                                                <p style={{ color: '#717171', fontSize: '0.95rem' }}>{d.desc}</p>
                                            </div>
                                        </div>
                                        <div style={{ 
                                            width: '24px', height: '24px', borderRadius: '4px', border: '2px solid #222', 
                                            background: (listingData.discounts as any)[d.id] ? '#222' : 'transparent',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            color: '#fff', fontSize: '0.8rem'
                                        }}>
                                            {(listingData.discounts as any)[d.id] && <i className="fa-solid fa-check"></i>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <p style={{ textAlign: 'center', marginTop: '40px', color: '#717171', fontSize: '0.9rem' }}>
                                Only one discount will be applied per stay. <span style={{ textDecoration: 'underline', color: '#222', cursor: 'pointer' }}>Learn more</span>
                            </p>
                        </div>
                    </div>
                    {/* Progress Footer */}
                    <div style={{ position: 'sticky', bottom: 0, padding: '20px 80px', background: '#fff', borderTop: '6px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100 }}>
                        <div style={{ position: 'absolute', top: '-6px', left: 0, height: '6px', background: '#eee', width: '100%' }}>
                            <div style={{ height: '100%', background: 'var(--brand-blue, #71b7e1)', width: '80%', transition: 'width 0.3s ease' }}></div>
                        </div>
                        <button onClick={handleBack} style={{ background: 'none', border: 'none', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}>Back</button>
                        <button onClick={handleNext} style={{ padding: '14px 32px', background: 'var(--brand-blue, #71b7e1)', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer' }}>Next</button>
                    </div>
                </div>
            )}

            {step === 23 && (
                /* Step 23: Share safety details */
                <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fff' }}>
                    <div style={{ flex: 1, padding: '80px 40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ maxWidth: '750px', width: '100%' }}>
                            <h1 style={{ fontSize: '2.8rem', fontWeight: 800, marginBottom: '40px', color: '#222' }}>Share safety details</h1>
                            
                            <div style={{ borderBottom: '1px solid #eee', paddingBottom: '32px', marginBottom: '40px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                                    <h2 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Does your place have any of these?</h2>
                                    <i className="fa-regular fa-circle-info" style={{ color: '#717171', cursor: 'pointer' }}></i>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                    {[
                                        { id: 'exteriorCamera', label: 'Exterior security camera present' },
                                        { id: 'noiseMonitor', label: 'Noise decibel monitor present' },
                                        { id: 'weapons', label: 'Weapon(s) on the property' }
                                    ].map((s) => (
                                        <div 
                                            key={s.id}
                                            onClick={() => setListingData({ ...listingData, safetyDetails: { ...listingData.safetyDetails, [s.id]: !listingData.safetyDetails[s.id as keyof typeof listingData.safetyDetails] } })}
                                            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                                        >
                                            <span style={{ fontSize: '1.1rem', color: '#222' }}>{s.label}</span>
                                            <div style={{ 
                                                width: '28px', height: '28px', borderRadius: '4px', border: '1px solid #717171', 
                                                background: (listingData.safetyDetails as any)[s.id] ? '#222' : 'transparent',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                color: '#fff', transition: 'all 0.1s'
                                            }}>
                                                {(listingData.safetyDetails as any)[s.id] && <i className="fa-solid fa-check" style={{ fontSize: '0.9rem' }}></i>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div style={{ color: '#222', lineHeight: 1.6 }}>
                                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '12px' }}>Important things to know</h3>
                                <p style={{ marginBottom: '16px', color: '#484848' }}>
                                    Security cameras that monitor indoor spaces are not allowed even if they're turned off. All exterior security cameras must be disclosed.
                                </p>
                                <p style={{ color: '#484848' }}>
                                    Be sure to comply with your <span style={{ textDecoration: 'underline', fontWeight: 600, cursor: 'pointer' }}>local laws</span> and review Airbnb's <span style={{ textDecoration: 'underline', fontWeight: 600, cursor: 'pointer' }}>Anti-Discrimination Policy</span> and <span style={{ textDecoration: 'underline', fontWeight: 600, cursor: 'pointer' }}>guest and Host fees</span>.
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Progress Footer */}
                    <div style={{ position: 'sticky', bottom: 0, padding: '20px 80px', background: '#fff', borderTop: '6px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100 }}>
                        <div style={{ position: 'absolute', top: '-6px', left: 0, height: '6px', background: '#eee', width: '100%' }}>
                            <div style={{ height: '100%', background: 'var(--brand-blue, #71b7e1)', width: '100%', transition: 'width 0.3s ease' }}></div>
                        </div>
                        <button onClick={handleBack} style={{ background: 'none', border: 'none', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}>Back</button>
                        <button onClick={handleNext} style={{ padding: '14px 32px', background: 'var(--brand-blue, #71b7e1)', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer' }}>Next</button>
                    </div>
                </div>
            )}

            {step === 24 && (
                /* Step 24: Final Details (Residential Address) */
                <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fff' }}>
                    <div style={{ flex: 1, padding: '80px 40px', display: 'flex', justifyContent: 'center' }}>
                        <div style={{ maxWidth: '650px', width: '100%' }}>
                            <h1 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '12px', color: '#222' }}>Provide a few final details</h1>
                            <p style={{ fontSize: '1.1rem', color: '#717171', marginBottom: '40px' }}>This is required to comply with financial regulations and helps us prevent fraud.</p>
                            
                            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '8px' }}>What's your residential address?</h2>
                            <p style={{ fontSize: '0.9rem', color: '#717171', marginBottom: '24px' }}>Guests won't see this information.</p>

                            <div style={{ border: '1px solid #ddd', borderRadius: '12px', overflow: 'hidden' }}>
                                <div style={{ padding: '12px 16px', borderBottom: '1px solid #ddd', position: 'relative' }}>
                                    <label style={{ fontSize: '0.75rem', color: '#717171', display: 'block' }}>Country / region</label>
                                    <select 
                                        value={listingData.residentialAddress.country}
                                        onChange={(e) => setListingData({ ...listingData, residentialAddress: { ...listingData.residentialAddress, country: e.target.value } })}
                                        style={{ width: '100%', border: 'none', outline: 'none', fontSize: '1rem', background: 'transparent', padding: '4px 0', cursor: 'pointer' }}
                                    >
                                        <option>Philippines</option>
                                        <option>India</option>
                                        <option>United States</option>
                                    </select>
                                </div>
                                <div style={{ padding: '12px 16px', borderBottom: '1px solid #ddd' }}>
                                    <input 
                                        type="text" 
                                        placeholder="Unit, level, etc. (if applicable)" 
                                        value={listingData.residentialAddress.unit}
                                        onChange={(e) => setListingData({ ...listingData, residentialAddress: { ...listingData.residentialAddress, unit: e.target.value } })}
                                        style={{ width: '100%', border: 'none', outline: 'none', fontSize: '1rem' }}
                                    />
                                </div>
                                <div style={{ padding: '12px 16px', borderBottom: '1px solid #ddd' }}>
                                    <input 
                                        type="text" 
                                        placeholder="Building name (if applicable)" 
                                        value={listingData.residentialAddress.building}
                                        onChange={(e) => setListingData({ ...listingData, residentialAddress: { ...listingData.residentialAddress, building: e.target.value } })}
                                        style={{ width: '100%', border: 'none', outline: 'none', fontSize: '1rem' }}
                                    />
                                </div>
                                <div style={{ padding: '12px 16px', borderBottom: '1px solid #ddd' }}>
                                    <label style={{ fontSize: '0.75rem', color: '#717171', display: 'block' }}>Street address</label>
                                    <input 
                                        type="text" 
                                        placeholder="2 Ortigas" 
                                        value={listingData.residentialAddress.street}
                                        onChange={(e) => setListingData({ ...listingData, residentialAddress: { ...listingData.residentialAddress, street: e.target.value } })}
                                        style={{ width: '100%', border: 'none', outline: 'none', fontSize: '1rem' }}
                                    />
                                </div>
                                <div style={{ padding: '12px 16px', borderBottom: '1px solid #ddd' }}>
                                    <input 
                                        type="text" 
                                        placeholder="Barangay / district (if applicable)" 
                                        value={listingData.residentialAddress.barangay}
                                        onChange={(e) => setListingData({ ...listingData, residentialAddress: { ...listingData.residentialAddress, barangay: e.target.value } })}
                                        style={{ width: '100%', border: 'none', outline: 'none', fontSize: '1rem' }}
                                    />
                                </div>
                                <div style={{ padding: '12px 16px', borderBottom: '1px solid #ddd' }}>
                                    <label style={{ fontSize: '0.75rem', color: '#717171', display: 'block' }}>City/municipality</label>
                                    <input 
                                        type="text" 
                                        placeholder="Pasay City" 
                                        value={listingData.residentialAddress.city}
                                        onChange={(e) => setListingData({ ...listingData, residentialAddress: { ...listingData.residentialAddress, city: e.target.value } })}
                                        style={{ width: '100%', border: 'none', outline: 'none', fontSize: '1rem' }}
                                    />
                                </div>
                                <div style={{ padding: '12px 16px', borderBottom: '1px solid #ddd' }}>
                                    <label style={{ fontSize: '0.75rem', color: '#717171', display: 'block' }}>Postcode</label>
                                    <input 
                                        type="text" 
                                        placeholder="1302" 
                                        value={listingData.residentialAddress.postcode}
                                        onChange={(e) => setListingData({ ...listingData, residentialAddress: { ...listingData.residentialAddress, postcode: e.target.value } })}
                                        style={{ width: '100%', border: 'none', outline: 'none', fontSize: '1rem' }}
                                    />
                                </div>
                                <div style={{ padding: '12px 16px' }}>
                                    <label style={{ fontSize: '0.75rem', color: '#717171', display: 'block' }}>Province</label>
                                    <input 
                                        type="text" 
                                        placeholder="Kalakhang Maynila" 
                                        value={listingData.residentialAddress.province}
                                        onChange={(e) => setListingData({ ...listingData, residentialAddress: { ...listingData.residentialAddress, province: e.target.value } })}
                                        style={{ width: '100%', border: 'none', outline: 'none', fontSize: '1rem' }}
                                    />
                                </div>
                            </div>

                            <div style={{ marginTop: '40px' }}>
                                <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '16px' }}>Are you hosting as a business?</h2>
                                <div style={{ display: 'flex', gap: '16px' }}>
                                    <button 
                                        onClick={() => setListingData({ ...listingData, isBusiness: false })}
                                        style={{ padding: '12px 24px', border: !listingData.isBusiness ? '2px solid #222' : '1px solid #ddd', borderRadius: '8px', background: !listingData.isBusiness ? '#f7f7f7' : '#fff', fontWeight: 600, cursor: 'pointer' }}
                                    >No</button>
                                    <button 
                                        onClick={() => setListingData({ ...listingData, isBusiness: true })}
                                        style={{ padding: '12px 24px', border: listingData.isBusiness ? '2px solid #222' : '1px solid #ddd', borderRadius: '8px', background: listingData.isBusiness ? '#f7f7f7' : '#fff', fontWeight: 600, cursor: 'pointer' }}
                                    >Yes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Progress Footer */}
                    <div style={{ position: 'sticky', bottom: 0, padding: '20px 80px', background: '#fff', borderTop: '6px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100 }}>
                        <div style={{ position: 'absolute', top: '-6px', left: 0, height: '6px', background: 'var(--brand-blue, #71b7e1)', width: '100%', transition: 'width 0.3s ease' }}></div>
                        <button onClick={handleBack} style={{ background: 'none', border: 'none', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}>Back</button>
                        <button onClick={() => setStep(25)} style={{ padding: '14px 32px', background: '#222', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer' }}>Create listing</button>
                    </div>
                </div>
            )}

            {step === 25 && (
                /* Step 25: Your listings with Confirmation Modal */
                <div style={{ minHeight: '100vh', background: '#f7f7f7' }}>
                    {/* Fake Dashboard Header */}
                    <div style={{ background: '#fff', padding: '16px 80px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'center' }}>
                         <div style={{ maxWidth: '1400px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', gap: '32px' }}>
                                <span style={{ fontWeight: 600, color: '#222' }}>Today</span>
                                <span style={{ fontWeight: 600, color: '#717171' }}>Calendar</span>
                                <span style={{ fontWeight: 800, color: '#222', borderBottom: '2px solid #222', paddingBottom: '4px' }}>Listings</span>
                                <span style={{ fontWeight: 600, color: '#717171' }}>Messages</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Switch to travelling</span>
                                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#222', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{user?.name?.[0] || 'N'}</div>
                                <div style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #ddd', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="fa-solid fa-bars"></i></div>
                            </div>
                         </div>
                    </div>

                    <div style={{ padding: '60px 80px', maxWidth: '1400px', margin: '0 auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                            <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Your listings</h1>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <button style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #ddd', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="fa-solid fa-grip"></i></button>
                                <button style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #ddd', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="fa-solid fa-plus"></i></button>
                            </div>
                        </div>

                        {/* Listing Card */}
                        <div style={{ width: '320px', background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                            <div style={{ position: 'relative', height: '320px' }}>
                                <img src={uploadedPhotos[0] || hostelRoom1} alt="Listing" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div style={{ position: 'absolute', top: '16px', left: '16px', background: '#fff', padding: '6px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff385c' }}></span>
                                    Action required
                                </div>
                            </div>
                            <div style={{ padding: '16px' }}>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '4px' }}>{listingData.title || 'Natours Hostels'}</h3>
                                <p style={{ color: '#717171', fontSize: '0.9rem' }}>Home in {listingData.addressDetails.city || 'Pasay City'}, {listingData.addressDetails.province || 'Metro Manila'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Confirmation Modal */}
                    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                        <div style={{ background: '#fff', padding: '48px', borderRadius: '32px', maxWidth: '550px', width: '90%', textAlign: 'center', position: 'relative' }}>
                            <button style={{ position: 'absolute', top: '24px', right: '24px', border: 'none', background: 'none', fontSize: '1.2rem', cursor: 'pointer' }}><i className="fa-solid fa-xmark"></i></button>
                            <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#717171', marginBottom: '32px' }}>Required to publish</p>
                            
                            <div style={{ width: '120px', height: '120px', background: '#ff385c', borderRadius: '50%', margin: '0 auto 32px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                                <div style={{ width: '100%', height: '100%', border: '4px solid #fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <i className="fa-solid fa-envelope-open-text" style={{ fontSize: '3.5rem', color: '#fff' }}></i>
                                </div>
                                <div style={{ position: 'absolute', bottom: '15px', right: '15px', width: '24px', height: '24px', background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ff385c' }}>
                                    <i className="fa-solid fa-check" style={{ fontSize: '0.8rem' }}></i>
                                </div>
                            </div>

                            <h2 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '32px' }}>Confirm a few key details</h2>
                            
                            <button 
                                onClick={() => setStep(26)}
                                style={{ padding: '16px 48px', background: '#222', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '1.2rem', fontWeight: 800, cursor: 'pointer', marginBottom: '48px' }}
                            >Get started</button>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', borderTop: '1px solid #eee', paddingTop: '16px' }}>
                                <div style={{ width: '28px', height: '28px', background: 'var(--brand-blue, #71b7e1)', borderRadius: '4px', overflow: 'hidden' }}>
                                    <img src={uploadedPhotos[0] || hostelRoom1} alt="Icon" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#444' }}>{listingData.title || 'Natours Hostels'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {step === 26 && (
                /* Step 26: Checklist page */
                <div style={{ minHeight: '100vh', background: '#fff' }}>
                    <div style={{ padding: '24px 80px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', gap: '32px' }}>
                            <span style={{ fontWeight: 600, color: '#717171' }}>Today</span>
                            <span style={{ fontWeight: 600, color: '#717171' }}>Calendar</span>
                            <span style={{ fontWeight: 800, color: '#222' }}>Listings</span>
                            <span style={{ fontWeight: 600, color: '#717171' }}>Messages</span>
                        </div>
                    </div>

                    <div style={{ maxWidth: '1000px', margin: '80px auto', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 350px', gap: '80px', padding: '0 40px' }}>
                        <div>
                            <h1 style={{ fontSize: '2.8rem', fontWeight: 800, marginBottom: '60px' }}>Key details to take care of</h1>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                                {/* Verify Identity */}
                                <div 
                                    onClick={() => !listingData.verificationStatus.idVerified && setStep(27)}
                                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: '32px', borderBottom: '1px solid #eee', cursor: listingData.verificationStatus.idVerified ? 'default' : 'pointer' }}
                                >
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{ fontSize: '1.25rem', fontWeight: 500, marginBottom: '8px' }}>Verify your identity</h3>
                                        <p style={{ color: '#717171', fontSize: '1rem', lineHeight: 1.5, marginBottom: '12px' }}>We'll gather some information to help confirm that you're you.</p>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            {listingData.verificationStatus.idVerified ? (
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#008a05', fontWeight: 700 }}>
                                                    <i className="fa-solid fa-circle-check" style={{ fontSize: '1.2rem' }}></i>
                                                    <span>Complete</span>
                                                </div>
                                            ) : (
                                                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#222' }}>Required</span>
                                            )}
                                        </div>
                                    </div>
                                    {!listingData.verificationStatus.idVerified && <i className="fa-solid fa-chevron-right" style={{ marginTop: '4px', fontSize: '1.2rem' }}></i>}
                                </div>

                                {/* Confirm Phone */}
                                <div 
                                    onClick={() => !listingData.verificationStatus.phoneConfirmed && setStep(28)}
                                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: '32px', borderBottom: '1px solid #eee', cursor: listingData.verificationStatus.phoneConfirmed ? 'default' : 'pointer' }}
                                >
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{ fontSize: '1.25rem', fontWeight: 500, marginBottom: '8px' }}>Confirm your phone number</h3>
                                        <p style={{ color: '#717171', fontSize: '1rem', lineHeight: 1.5, marginBottom: '12px' }}>We'll call or text to confirm your number. Standard messaging rates apply.</p>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            {listingData.verificationStatus.phoneConfirmed ? (
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#008a05', fontWeight: 700 }}>
                                                    <i className="fa-solid fa-circle-check" style={{ fontSize: '1.2rem' }}></i>
                                                    <span>Complete</span>
                                                </div>
                                            ) : (
                                                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#222' }}>Required</span>
                                            )}
                                        </div>
                                    </div>
                                    {!listingData.verificationStatus.phoneConfirmed && <i className="fa-solid fa-chevron-right" style={{ marginTop: '4px', fontSize: '1.2rem' }}></i>}
                                </div>
                            </div>
                        </div>

                        <div style={{ background: '#fff', border: '1px solid #ddd', borderRadius: '16px', overflow: 'hidden', padding: '16px', height: 'fit-content' }}>
                            <img src={uploadedPhotos[0] || hostelRoom1} alt="Preview" style={{ width: '100%', height: '230px', objectFit: 'cover', borderRadius: '12px', marginBottom: '16px' }} />
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '4px' }}>{listingData.title || 'Natours Hostels'}</h3>
                            <p style={{ color: '#717171', fontSize: '0.85rem' }}>Diplomat, 2 Roxas Blvd Cor Russel St, San...</p>
                        </div>
                    </div>
                </div>
            )}

            {step === 27 && (
                /* Step 27: Add ID */
                <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fff' }}>
                    <div style={{ flex: 1, padding: '80px 40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                         <div style={{ maxWidth: '1000px', width: '100%', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 350px', gap: '80px' }}>
                            <div>
                                <h1 style={{ fontSize: '2.8rem', fontWeight: 800, marginBottom: '16px' }}>Let's add your government ID</h1>
                                <p style={{ fontSize: '1.2rem', color: '#484848', lineHeight: 1.6, marginBottom: '32px' }}>
                                    We'll need you to add an official government ID. This step helps make sure you're really you.
                                </p>
                                <p style={{ fontSize: '1.1rem', color: '#484848', lineHeight: 1.6 }}>
                                    Depending on what country you're from, you can add a driver licence, passport or national identity card.
                                </p>
                            </div>
                            <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: '12px', padding: '32px', height: 'fit-content', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '16px' }}>Your privacy</h3>
                                <p style={{ color: '#717171', fontSize: '1rem', lineHeight: 1.6, marginBottom: '12px' }}>
                                    We aim to keep the data you share during this process private, safe and secure. Learn more in our <span style={{ textDecoration: 'underline', color: '#222', fontWeight: 700, cursor: 'pointer' }}>Privacy Policy</span>.
                                </p>
                                <p style={{ color: '#222', fontSize: '1rem', fontWeight: 800, textDecoration: 'underline', cursor: 'pointer' }}>How identity verification works</p>
                            </div>
                         </div>
                    </div>
                    {/* Progression Footer */}
                    <div style={{ padding: '24px 80px', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                         <button onClick={() => setStep(26)} style={{ background: 'none', border: 'none', fontSize: '1.1rem', fontWeight: 800, cursor: 'pointer', textDecoration: 'underline', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <i className="fa-solid fa-arrow-left"></i> Back
                         </button>
                         <button 
                            onClick={() => setStep(29)}
                            style={{ padding: '14px 40px', background: '#222', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 800, cursor: 'pointer' }}
                        >Add an ID</button>
                    </div>
                </div>
            )}

            {step === 28 && (
                /* Step 28: Phone Confirmation Entry */
                <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fff' }}>
                    <div style={{ flex: 1, padding: '80px 40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ maxWidth: '750px', width: '100%' }}>
                            <h1 style={{ fontSize: '2.8rem', fontWeight: 800, marginBottom: '24px' }}>Which number can guests use to contact you?</h1>
                            <p style={{ fontSize: '1.2rem', color: '#484848', lineHeight: 1.6, marginBottom: '48px' }}>
                                We'll send you booking requests, reminders, and other notifications. This number should be able to receive texts or calls.
                            </p>

                            <div style={{ border: '1px solid #ddd', borderRadius: '16px', overflow: 'hidden' }}>
                                <div style={{ padding: '16px 20px', borderBottom: '1px solid #ddd', position: 'relative' }}>
                                    <label style={{ fontSize: '0.75rem', color: '#717171', display: 'block', marginBottom: '4px' }}>Country / Region</label>
                                    <div style={{ fontSize: '1.15rem', color: '#222', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span>Philippines (+63)</span>
                                        <i className="fa-solid fa-chevron-down" style={{ fontSize: '0.9rem' }}></i>
                                    </div>
                                </div>
                                <div style={{ padding: '16px 20px' }}>
                                    <label style={{ fontSize: '0.75rem', color: '#717171', display: 'block', marginBottom: '4px' }}>Phone number</label>
                                    <input type="text" defaultValue="+63" style={{ width: '100%', border: 'none', outline: 'none', fontSize: '1.15rem', color: '#222' }} />
                                </div>
                            </div>
                            <p style={{ marginTop: '12px', fontSize: '0.9rem', color: '#484848' }}>We'll call or text you to confirm your number. Standard message and data rates apply.</p>
                            
                            <button 
                                onClick={() => setStep(32)}
                                style={{ marginTop: '48px', width: '100%', padding: '16px', background: '#222', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '1.25rem', fontWeight: 800, cursor: 'pointer' }}
                            >Continue</button>
                        </div>
                    </div>
                    {/* Progression Footer */}
                    <div style={{ padding: '24px 80px', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                         <button onClick={() => setStep(26)} style={{ background: 'none', border: 'none', fontSize: '1.1rem', fontWeight: 800, cursor: 'pointer', textDecoration: 'underline' }}>Back</button>
                    </div>
                </div>
            )}

            {step === 29 && (
                /* Step 29: Govt ID Method */
                <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fff' }}>
                    <div style={{ flex: 1, padding: '80px 40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ maxWidth: '600px', width: '100%' }}>
                            <h1 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '40px' }}>How would you like to add your government ID?</h1>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div onClick={() => setStep(30)} style={{ padding: '24px', border: '2px solid #222', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '4px', cursor: 'pointer' }}>
                                    <span style={{ fontSize: '1.2rem', fontWeight: 700 }}>Upload an existing photo</span>
                                    <span style={{ fontSize: '1rem', color: '#717171' }}>Recommended</span>
                                </div>
                                <div style={{ padding: '24px', border: '1px solid #ddd', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '4px', cursor: 'pointer' }}>
                                    <span style={{ fontSize: '1.2rem', fontWeight: 700 }}>Take photo with webcam</span>
                                </div>
                                <div style={{ padding: '24px', border: '1px solid #ddd', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '4px', cursor: 'pointer' }}>
                                    <span style={{ fontSize: '1.2rem', fontWeight: 700 }}>Take photo with the Metrolodges mobile app</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Progression Footer */}
                    <div style={{ padding: '24px 80px', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                         <button onClick={() => setStep(27)} style={{ background: 'none', border: 'none', fontSize: '1.1rem', fontWeight: 800, cursor: 'pointer', textDecoration: 'underline' }}>Back</button>
                         <button onClick={() => setStep(30)} style={{ padding: '14px 40px', background: '#222', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 800, cursor: 'pointer' }}>Continue</button>
                    </div>
                </div>
            )}

            {step === 30 && (
                /* Step 30: Legal Name */
                <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fff' }}>
                    <div style={{ flex: 1, padding: '80px 40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ maxWidth: '600px', width: '100%' }}>
                            <h1 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '16px' }}>Is this your legal name?</h1>
                            <p style={{ fontSize: '1.15rem', color: '#484848', lineHeight: 1.6, marginBottom: '32px' }}>
                                We pulled this name from the ID you provided. If it isn't correct, you can update your name below or <span style={{ textDecoration: 'underline', fontWeight: 700, cursor: 'pointer' }}>upload a different ID</span>.
                            </p>

                            <div style={{ border: '1px solid #ddd', borderRadius: '16px', overflow: 'hidden', marginBottom: '32px' }}>
                                <div style={{ padding: '16px 20px', borderBottom: '1px solid #ddd' }}>
                                    <label style={{ fontSize: '0.75rem', color: '#717171', display: 'block', marginBottom: '4px' }}>First name on ID</label>
                                    <input type="text" defaultValue="Maria" style={{ width: '100%', border: 'none', outline: 'none', fontSize: '1.15rem', color: '#222' }} />
                                </div>
                                <div style={{ padding: '16px 20px' }}>
                                    <label style={{ fontSize: '0.75rem', color: '#717171', display: 'block', marginBottom: '4px' }}>Surname on ID</label>
                                    <input type="text" defaultValue="Dela Cruz" style={{ width: '100%', border: 'none', outline: 'none', fontSize: '1.15rem', color: '#222' }} />
                                </div>
                            </div>

                            <p style={{ fontSize: '1rem', color: '#484848', marginBottom: '32px' }}>
                                This will be the legal name on your account. <span style={{ textDecoration: 'underline', fontWeight: 700, cursor: 'pointer' }}>Learn more</span>
                            </p>

                            <div style={{ border: '1px solid #ddd', borderRadius: '16px', padding: '16px 20px', marginBottom: '12px' }}>
                                <input type="text" placeholder="Preferred first name (optional)" style={{ width: '100%', border: 'none', outline: 'none', fontSize: '1.15rem', color: '#222' }} />
                            </div>
                            <p style={{ fontSize: '0.95rem', color: '#717171' }}>This is how your first name will appear to hosts and guests.</p>
                        </div>
                    </div>
                    {/* Progression Footer */}
                    <div style={{ padding: '24px 80px', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'flex-end' }}>
                         <button 
                            onClick={() => setStep(31)} 
                            style={{ padding: '14px 40px', background: '#222', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 800, cursor: 'pointer' }}
                        >Confirm</button>
                    </div>
                </div>
            )}

            {step === 31 && (
                /* Step 31: How should we match your photos? */
                <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fff' }}>
                    <div style={{ flex: 1, padding: '80px 40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ maxWidth: '600px', width: '100%' }}>
                            <h1 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '24px' }}>How should we match your photos?</h1>
                            <p style={{ fontSize: '1.2rem', color: '#484848', lineHeight: 1.6, marginBottom: '32px' }}>
                                We’ll compare your selfie with the ID you provided to make sure it’s really you.
                            </p>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
                                <div onClick={() => setStep(33)} style={{ padding: '24px', border: '2px solid var(--brand-blue, #71b7e1)', borderRadius: '16px', cursor: 'pointer', position: 'relative' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                        <span style={{ fontSize: '1.2rem', fontWeight: 700 }}>Automatic photo match</span>
                                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px solid var(--brand-blue, #71b7e1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--brand-blue, #71b7e1)' }}></div>
                                        </div>
                                    </div>
                                    <p style={{ color: '#717171', lineHeight: 1.5 }}>We'll use facial recognition technology to compare your photos. Usually takes less than a minute.</p>
                                </div>
                                
                                <div style={{ padding: '24px', border: '1px solid #ddd', borderRadius: '16px', cursor: 'pointer' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                        <span style={{ fontSize: '1.2rem', fontWeight: 700 }}>Manual photo match</span>
                                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px solid #ddd' }}></div>
                                    </div>
                                    <p style={{ color: '#717171', lineHeight: 1.5 }}>A member of our team will compare your photos. Can take up to 24 hours.</p>
                                </div>
                            </div>
                            
                            <p style={{ fontSize: '0.9rem', color: '#717171', lineHeight: 1.5 }}>
                                If you select 'automatic match', we'll process your facial recognition data through our partners using biometric technology. <span style={{ textDecoration: 'underline', fontWeight: 700, cursor: 'pointer', color: '#222' }}>Learn more</span>
                            </p>
                        </div>
                    </div>
                    {/* Progression Footer */}
                    <div style={{ padding: '24px 80px', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                         <button onClick={() => setStep(30)} style={{ background: 'none', border: 'none', fontSize: '1.1rem', fontWeight: 800, cursor: 'pointer', textDecoration: 'underline' }}>Back</button>
                         <button onClick={() => setStep(33)} style={{ padding: '14px 40px', background: '#222', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 800, cursor: 'pointer' }}>Continue</button>
                    </div>
                </div>
            )}

            {step === 32 && (
                /* Step 32: Phone OTP */
                <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fff' }}>
                    <div style={{ flex: 1, padding: '80px 40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ maxWidth: '600px', width: '100%', textAlign: 'center' }}>
                            <h1 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '24px', textAlign: 'left' }}>Confirm your phone number</h1>
                            <p style={{ fontSize: '1.15rem', color: '#484848', lineHeight: 1.6, marginBottom: '60px', textAlign: 'left' }}>
                                Enter the code we sent via SMS to +63 945 853 4190.
                            </p>

                            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '40px' }}>
                                {[1,2,3,4].map(i => (
                                    <div key={i} style={{ width: '40px', height: '60px', borderBottom: '2px solid #222', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: '#717171' }}>-</div>
                                ))}
                            </div>

                            <button 
                                onClick={() => {
                                    setListingData({ ...listingData, verificationStatus: { ...listingData.verificationStatus, phoneConfirmed: true } })
                                    setStep(26)
                                }}
                                style={{ width: '100%', maxWidth: '240px', padding: '16px', background: '#222', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 800, cursor: 'pointer' }}
                            >Continue</button>

                            <div style={{ marginTop: '40px' }}>
                                <p style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px' }}>Didn't get a text? <span style={{ textDecoration: 'underline', cursor: 'pointer', color: 'var(--brand-blue, #71b7e1)' }}>Send again</span></p>
                                <p style={{ fontSize: '1.1rem', fontWeight: 700, textDecoration: 'underline', cursor: 'pointer' }}>Call me instead</p>
                            </div>
                        </div>
                    </div>
                    {/* Progression Footer */}
                    <div style={{ padding: '24px 80px', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                         <button onClick={() => setStep(28)} style={{ background: 'none', border: 'none', fontSize: '1.1rem', fontWeight: 800, cursor: 'pointer', textDecoration: 'underline' }}>Back</button>
                    </div>
                </div>
            )}

            {step === 33 && (
                /* Step 33: Selfie Capture UI */
                <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'rgba(0,0,0,0.8)', position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 10000 }}>
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
                        <div style={{ width: '100%', maxWidth: '850px', background: '#000', borderRadius: '32px', position: 'relative', overflow: 'hidden', height: '85vh', display: 'flex', flexDirection: 'column', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
                            <div style={{ padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
                                <button onClick={() => setStep(31)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.6rem', cursor: 'pointer' }}><i className="fa-solid fa-xmark"></i></button>
                                <span style={{ color: '#fff', fontWeight: 700, textDecoration: 'underline', cursor: 'pointer', fontSize: '1rem' }}>Tips</span>
                            </div>
                            
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                                {/* Camera Circle View */}
                                <div style={{ 
                                    width: '480px', 
                                    height: '480px', 
                                    borderRadius: '50%', 
                                    border: '6px solid var(--brand-blue, #71b7e1)', 
                                    position: 'relative',
                                    zIndex: 5,
                                    overflow: 'hidden',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '4px',
                                    boxSizing: 'border-box'
                                }}>
                                    <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                                        {/* Camera Placeholder Simulation */}
                                        <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <i className="fa-solid fa-user" style={{ fontSize: '12rem', color: '#444' }}></i>
                                            {/* Flash/Overlay effect */}
                                            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'radial-gradient(circle, transparent 40%, rgba(0,0,0,0.3) 100%)' }}></div>
                                        </div>
                                    </div>
                                    {/* Progress track */}
                                    <div style={{ position: 'absolute', top: '-6px', left: '-6px', width: 'calc(100% + 12px)', height: 'calc(100% + 12px)', borderRadius: '50%', border: '6px solid white', borderTopColor: 'transparent', borderRightColor: 'transparent', transform: 'rotate(45deg)', opacity: 0.8 }}></div>
                                </div>
                                
                                <div style={{ marginTop: '48px', textAlign: 'center', zIndex: 10 }}>
                                    <button 
                                        onClick={() => {
                                            setListingData({ ...listingData, verificationStatus: { ...listingData.verificationStatus, idVerified: true } })
                                            setStep(26)
                                        }}
                                        style={{ 
                                            padding: '18px 48px', 
                                            background: 'rgba(255,255,255,0.1)', 
                                            border: '2px solid rgba(255,255,255,0.6)', 
                                            color: '#fff', 
                                            borderRadius: '40px', 
                                            fontSize: '1.25rem', 
                                            fontWeight: 700, 
                                            cursor: 'pointer',
                                            backdropFilter: 'blur(10px)',
                                            transition: 'all 0.3s'
                                        }}
                                        onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                                        onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                                    >Perfect, stay right there</button>
                                </div>
                            </div>

                            {/* Camera Info Text */}
                            <div style={{ padding: '32px', textAlign: 'center', color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem' }}>
                                Center your face in the circle. Make sure you're in a well-lit area.
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Photo Upload Modal */}
            {showPhotoUploadModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ background: '#fff', width: '90%', maxWidth: '700px', maxHeight: '85vh', borderRadius: '24px', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
                        <div style={{ padding: '20px 32px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <button onClick={() => setShowPhotoUploadModal(false)} style={{ border: 'none', background: 'none', fontSize: '1.4rem', cursor: 'pointer' }}><i className="fa-solid fa-xmark"></i></button>
                            <div style={{ textAlign: 'center' }}>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Upload photos</h3>
                                <p style={{ fontSize: '0.85rem', color: '#717171' }}>{uploadedPhotos.length} items shared</p>
                            </div>
                            <button onClick={handlePhotoUpload} style={{ border: 'none', background: 'none', fontSize: '1.2rem', cursor: 'pointer' }}><i className="fa-solid fa-plus"></i></button>
                        </div>

                        <input 
                            type="file" 
                            id="photo-input" 
                            multiple 
                            accept="image/*" 
                            onChange={handleFileChange} 
                            style={{ display: 'none' }} 
                        />

                        <div style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
                            {uploadedPhotos.length === 0 ? (
                                <div style={{ height: '350px', border: '1px dashed #ddd', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '24px' }}>
                                    <div style={{ fontSize: '4rem', color: '#222' }}><i className="fa-regular fa-images"></i></div>
                                    <div style={{ textAlign: 'center' }}>
                                        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '8px' }}>Drag and drop</h2>
                                        <p style={{ color: '#444' }}>or browse for photos</p>
                                    </div>
                                    <button onClick={handlePhotoUpload} style={{ padding: '12px 32px', background: '#222', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: 800, cursor: 'pointer' }}>Browse</button>
                                </div>
                            ) : (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                                    {uploadedPhotos.map((photo, i) => (
                                        <div key={i} style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', height: '220px' }}>
                                            <img src={photo} alt="Upload" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            <button 
                                                onClick={() => removePhoto(i)}
                                                style={{ position: 'absolute', top: '12px', right: '12px', width: '32px', height: '32px', background: 'rgba(0,0,0,0.8)', color: '#fff', border: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                                            >
                                                <i className="fa-solid fa-trash-can"></i>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div style={{ padding: '24px 32px', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <button onClick={() => setShowPhotoUploadModal(false)} style={{ background: 'none', border: 'none', fontSize: '1rem', fontWeight: 800, cursor: 'pointer', textDecoration: 'underline' }}>{uploadedPhotos.length > 0 ? 'Cancel' : 'Done'}</button>
                            <button 
                                onClick={handlePhotoUpload}
                                disabled={isUploading}
                                style={{ padding: '12px 32px', background: isUploading ? '#eee' : '#222', color: isUploading ? '#999' : '#fff', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 800, cursor: isUploading ? 'not-allowed' : 'pointer' }}
                            >
                                {isUploading ? 'Uploading...' : 'Upload'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showTerms && (
                <div style={{ 
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', 
                    background: 'rgba(0,0,0,0.6)', zIndex: 9999,
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                    padding: '20px'
                }}>
                    <div style={{ 
                        background: '#fff', maxWidth: '1000px', width: '100%', maxHeight: '90vh', 
                        borderRadius: '24px', overflow: 'hidden', position: 'relative',
                        display: 'flex', flexDirection: 'column',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
                    }}>
                        {/* Modal Header */}
                        <div style={{ 
                            padding: '24px 40px', 
                            borderBottom: '1px solid #eee',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            background: '#fff',
                            zIndex: 10
                        }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>Service Terms and Conditions</h2>
                            <button 
                                onClick={() => setShowTerms(false)}
                                style={{ border: 'none', background: '#f5f5f5', width: '40px', height: '40px', borderRadius: '50%', fontSize: '1.2rem', cursor: 'pointer', color: '#717171', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div style={{ padding: '40px', overflowY: 'auto', color: '#444', lineHeight: 1.6 }}>
                            <div style={{ background: 'rgba(113, 183, 225, 0.08)', padding: '24px', borderRadius: '16px', border: '1px solid var(--brand-blue, #71b7e1)', marginBottom: '40px' }}>
                                <p style={{ fontWeight: 800, color: 'var(--brand-blue, #71b7e1)', marginBottom: '12px', fontSize: '1.1rem' }}>Important Disclaimer:</p>
                                <p style={{ fontSize: '0.95rem', color: '#444' }}>
                                    Metrolodges maintains a strict policy of not dealing in cash payments under any circumstances. No Metrolodges employee or representative is authorized to request or accept payments directly via UPI, cash, or any personal accounts. All financial transactions related to Metrolodges services are conducted solely through the company's official current accounts. In cases where payments are made directly to third-party service providers, such as photographers, the Owner will receive prior notification from Metrolodges via email and other formal communications. This ensures transparency and security in all financial dealings associated with Metrolodges.
                                </p>
                            </div>

                            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                                <h3 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '16px', color: '#222' }}>Metrolodges Service Agreement & Terms of Use</h3>
                                <p style={{ maxWidth: '850px', margin: '0 auto 24px', fontSize: '1rem' }}>
                                    This Metrolodges Service Agreement ("Agreement") is a legally binding contract between Metrolodges Private Limited ("Metrolodges," "we," "our," "the Company" or "us") located in India and the property owner, host, or entity ("Owner," "Host," "Manager," or "you") registering for any service offered by Metrolodges.
                                </p>
                                <p style={{ fontWeight: 600, color: '#222' }}>
                                    This agreement is applicable to properties located across all states in India only. The terms and conditions herein are designed to meet the general requirements for properties nationwide, ensuring consistency and compliance with relevant regulations.
                                </p>
                                <p style={{ fontWeight: 700, marginTop: '24px', color: 'var(--brand-blue, #71b7e1)' }}>
                                    By signing up and submitting your application, you acknowledge and agree to all terms set forth in this Agreement. This Agreement applies based on the selected service type (Host-IT-Yourself or Managed by Metrolodges), with additional clauses applicable to Channel Manager subscriptions.
                                </p>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                                <section>
                                    <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '12px', color: '#222' }}>1. Introduction</h4>
                                    <p>Metrolodges is a technology platform and marketplace that enables property owners to list, manage, and receive bookings for homestays and vacation rentals. Metrolodges provides tools, support, and technology solutions but does not own or control the properties listed.</p>
                                </section>

                                <section>
                                    <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '12px', color: '#222' }}>2. Acceptance of Terms & Service Options</h4>
                                    <p style={{ marginBottom: '12px' }}>By clicking "Submit" during signup or using any Metrolodges service, you confirm that:</p>
                                    <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <li>You accept all terms and conditions stated in this Agreement.</li>
                                        <li>You agree to comply with Metrolodges' minimum quality and safety standards.</li>
                                        <li>Your property meets eligibility criteria outlined in Section 5.</li>
                                        <li>You grant Metrolodges the right to manage or facilitate listings based on your selected service model.</li>
                                    </ul>
                                </section>

                                <section>
                                    <h5 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '12px', color: '#222' }}>2.1 Service Models Covered</h5>
                                    <p style={{ marginBottom: '12px' }}>This Agreement applies to the following Metrolodges service models:</p>
                                    <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <li><strong>Host-IT-Yourself – Subscription-Based:</strong> Fixed fee per listing, direct guest communication, no commission.</li>
                                        <li><strong>Host-IT-Yourself – Pay-Per-Booking:</strong> No upfront cost, commission charged only on successful bookings.</li>
                                        <li><strong>Managed by Metrolodges:</strong> Full-service property management on online platforms.</li>
                                        <li><strong>Channel Manager Subscription:</strong> Optional service for syncing across OTAs.</li>
                                    </ul>
                                </section>

                                <section>
                                    <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '12px', color: '#222' }}>3. Signup & Platform Use</h4>
                                    <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <li>You must submit complete and truthful information, including identity and property documentation.</li>
                                        <li>Metrolodges may verify your identity or property via video KYC, inspection, or digital means.</li>
                                        <li>Sharing login credentials is prohibited.</li>
                                        <li>You may not use the platform for fraudulent, illegal, or abusive activities.</li>
                                        <li>You agree not to use Metrolodges branding for personal gain, misrepresentation, or misleading claims.</li>
                                    </ul>
                                </section>

                                <section>
                                    <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '12px', color: '#222' }}>4. Host Duties and Commitments</h4>
                                    <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <li>Maintain a clean, hygienic, and safe property.</li>
                                        <li>Ensure 100% accuracy in listing details including amenities and photos.</li>
                                        <li>Respond to guest inquiries professionally and in a timely manner.</li>
                                        <li>Respect guest privacy and ensure a positive stay experience.</li>
                                        <li>Comply with all local laws, tax requirements, homestay regulations, and safety norms.</li>
                                        <li>Ensure FRRO compliance when hosting foreign guests.</li>
                                    </ul>
                                </section>

                                <section>
                                    <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '12px', color: '#222' }}>5. Minimum Property Standards</h4>
                                    <p style={{ marginBottom: '12px' }}>To maintain listing quality, all properties must adhere to Metrolodges’ Minimum Quality & Hygiene Guidelines:</p>
                                    <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <li><strong>Cleanliness:</strong> No dust, stains, mold, or clutter; bathrooms must be spotless.</li>
                                        <li><strong>Furnishing:</strong> Fully set up with no broken or incomplete furniture.</li>
                                        <li><strong>Safety:</strong> CCTV in entry/common areas (not inside rooms); emergency exits, extinguishers, and rules displayed.</li>
                                        <li><strong>Comfort:</strong> Quality beds, linen, and essential toiletries provided.</li>
                                        <li><strong>Maintenance:</strong> On-call staff or technician must be available for emergencies.</li>
                                    </ul>
                                </section>

                                <section>
                                    <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '12px', color: '#222' }}>6. Service Terms by Model</h4>
                                    <div style={{ marginBottom: '16px' }}>
                                        <h5 style={{ fontWeight: 800, color: '#444', marginBottom: '8px' }}>6.1. Host-IT-Yourself – Subscription Plan (No-Commission)</h5>
                                        <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                            <li>Fixed subscription per property (as agreed during signup, billed quarterly).</li>
                                            <li>Host manages listings, calendar, pricing, and communication.</li>
                                            <li>Verified guests can contact Hosts directly via WhatsApp.</li>
                                            <li>Hosts are solely responsible for all direct bookings, payments, refunds, cancellations, and guest issues.</li>
                                            <li>Metrolodges does not mediate or interfere in direct bookings.</li>
                                            <li>Misuse of Metrolodges branding in direct bookings may result in account termination.</li>
                                        </ul>
                                    </div>
                                    <div style={{ marginBottom: '16px' }}>
                                        <h5 style={{ fontWeight: 800, color: '#444', marginBottom: '8px' }}>6.2 Host-IT-Yourself – Pay-Per-Booking Model</h5>
                                        <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                            <li>No setup fee. Commission charged only on confirmed bookings.</li>
                                            <li>The host receives the payout one day after the guest's check-in date.</li>
                                        </ul>
                                    </div>
                                    <div style={{ marginBottom: '16px' }}>
                                        <h5 style={{ fontWeight: 800, color: '#444', marginBottom: '8px' }}>6.3 Managed by Metrolodges</h5>
                                        <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                            <li>Metrolodges manages all aspects of online operations (listings, pricing, bookings).</li>
                                            <li>Host is responsible for on-ground duties (cleaning, check-ins, maintenance).</li>
                                            <li>Payout is issued one day after the guest's check-in date.</li>
                                            <li>No lock-in period. 90 days cancellation notice required.</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h5 style={{ fontWeight: 800, color: '#444', marginBottom: '8px' }}>6.4 Channel Manager Subscription</h5>
                                        <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                            <li>Optional tool to sync pricing and calendar across OTAs.</li>
                                            <li>Monthly usage fees billed as per plan.</li>
                                        </ul>
                                    </div>
                                </section>

                                <section>
                                    <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '12px', color: '#222' }}>7. Payments & Payouts</h4>
                                    <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <li>Subscription fees are billed quarterly in advance.</li>
                                        <li>Pay-per-booking and Managed services involve commission deducted before payout.</li>
                                        <li>All payouts are made one day after the guest's check-in date.</li>
                                    </ul>
                                </section>

                                <section>
                                    <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '12px', color: '#222' }}>8. Guest Management & Direct Bookings</h4>
                                    <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <li>Under Subscription Model, the Host assumes all responsibility for communication, booking, and safety.</li>
                                        <li>Metrolodges will not intervene in guest disputes under the direct booking model.</li>
                                        <li>Misuse of platform identity may lead to immediate suspension.</li>
                                    </ul>
                                </section>

                                <section>
                                    <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '12px', color: '#222' }}>9. Promotions & Discounts</h4>
                                    <p>Metrolodges actively promotes properties through travel agents & B2B programs. We may offer up to 10% discount to verified partners to increase occupancy without separate host approval.</p>
                                </section>

                                <section>
                                    <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '12px', color: '#222' }}>10. Detailed terms for "Managed By Metrolodges"</h4>
                                    <div style={{ paddingLeft: '20px' }}>
                                        <h5 style={{ fontWeight: 800, color: '#444', marginBottom: '8px' }}>10.1. Services Provided</h5>
                                        <p style={{ fontSize: '0.9rem', marginBottom: '10px' }}>Metrolodges provides Property Management System (PMS) access, channel management, dynamic AI pricing, professional listing creation, and handling of all online guest communication.</p>
                                        
                                        <h5 style={{ fontWeight: 800, color: '#444', marginBottom: '8px' }}>10.2. Fees</h5>
                                        <p style={{ fontSize: '0.9rem', marginBottom: '10px' }}>14% service fee for bookings via Metrolodges direct channels; 10% for bookings from other OTAs (Airbnb, MMT, Booking.com, etc.).</p>
                                        
                                        <h5 style={{ fontWeight: 800, color: '#444', marginBottom: '8px' }}>10.3. Payout Process</h5>
                                        <p style={{ fontSize: '0.9rem' }}><strong>Airbnb:</strong> Owners can keep existing listings; Metrolodges is added as co-host. 90% goes to Owner, 10% to Metrolodges. For <strong>MMT & Booking.com</strong>, listings are managed via professional hosting accounts for efficiency.</p>
                                    </div>
                                </section>

                                <section>
                                    <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '12px', color: '#222' }}>Indemnification and Liability</h4>
                                    <p style={{ fontSize: '0.95rem' }}>The Host agrees to indemnify Metrolodges from all claims arising out of property use. The Owner is solely responsible for complying with local laws, implementing security measures, and maintaining property safety. Jurisdiction lies in Hyderabad, Telangana (India).</p>
                                </section>

                                <section style={{ borderTop: '1px solid #eee', paddingTop: '32px', textAlign: 'center' }}>
                                    <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '12px', color: '#222' }}>Acceptance of Terms</h4>
                                    <p style={{ fontSize: '0.95rem' }}>By agreeing online, you acknowledge you have read and understood these terms. This Agreement is binding once you submit your hosting application.</p>
                                </section>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div style={{ padding: '20px 40px', borderTop: '1px solid #eee', textAlign: 'right', background: '#fff' }}>
                            <button
                                onClick={() => setShowTerms(false)}
                                style={{
                                    padding: '12px 32px',
                                    background: 'var(--brand-blue, #71b7e1)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '40px',
                                    fontWeight: 700,
                                    cursor: 'pointer'
                                }}
                            >
                                Close Terms
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
            {/* OTP Modal */}
            {showOtp && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3000
                }}>
                    <div style={{
                        background: '#fff', padding: '48px', borderRadius: '24px',
                        maxWidth: '550px', width: '90%', textAlign: 'center',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.2)'
                    }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '16px' }}>Enter OTP</h2>
                        <p style={{ color: '#444', fontSize: '1.05rem', marginBottom: '32px', lineHeight: 1.5 }}>
                            Please enter the OTP sent to <span style={{ fontWeight: 700 }}>{formData.countryCode} {formData.phone}</span> via SMS or WhatsApp
                        </p>

                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '32px' }}>
                            {otp.map((digit, i) => (
                                <input
                                    key={i}
                                    id={`otp-${i}`}
                                    type="text"
                                    value={digit}
                                    onChange={(e) => handleOtpChange(i, e.target.value)}
                                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                                    style={{
                                        width: '60px', height: '70px',
                                        fontSize: '1.8rem', fontWeight: 700, textAlign: 'center',
                                        border: digit ? '2px solid var(--brand-blue, #71b7e1)' : '2px solid #eee',
                                        borderRadius: '12px', outline: 'none',
                                        background: digit ? 'rgba(113, 183, 225, 0.05)' : '#fff',
                                        transition: 'all 0.2s'
                                    }}
                                />
                            ))}
                        </div>

                        <div style={{ marginBottom: '40px' }}>
                            <p style={{ fontSize: '1rem', color: '#717171' }}>
                                Resend OTP <span style={{ color: '#71b7e1', fontWeight: 700 }}>{resendTimer > 0 ? `(${resendTimer} sec)` : ''}</span>
                                {resendTimer === 0 && (
                                    <span 
                                        onClick={() => setResendTimer(60)} 
                                        style={{ color: '#71b7e1', cursor: 'pointer', marginLeft: '8px', textDecoration: 'underline' }}
                                    >
                                        Click here
                                    </span>
                                )}
                            </p>
                        </div>

                        <button
                            onClick={handleOtpSubmit}
                            style={{
                                width: '100%', padding: '20px',
                                background: 'var(--brand-blue, #71b7e1)', border: 'none',
                                borderRadius: '40px', color: 'white',
                                fontSize: '1.2rem', fontWeight: 700,
                                cursor: 'pointer', transition: 'all 0.2s'
                            }}
                            onMouseOver={(e) => { e.currentTarget.style.opacity = '0.9' }}
                            onMouseOut={(e) => { e.currentTarget.style.opacity = '1' }}
                        >
                            Continue Listing
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default BecomeHost
