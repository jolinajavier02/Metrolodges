// ── Philippines Listings ──
const philippineListings = [
    { id: 101, title: "QBEE Hostel Manila", price: 550, rating: 4.7, nights: 1, badge: "Popular", image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=600", location: "Makati, Manila", city: "Manila" },
    { id: 102, title: "Z Hostel Rooftop", price: 780, rating: 4.8, nights: 1, badge: "Guest favorite", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=600", location: "Poblacion, Makati", city: "Manila" },
    { id: 103, title: "Lub d Makati", price: 890, rating: 4.6, nights: 1, image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=600", location: "Makati Ave, Manila", city: "Manila" },
    { id: 104, title: "Our Melting Pot Hostel", price: 480, rating: 4.5, nights: 1, image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=600", location: "Ermita, Manila", city: "Manila" },
    { id: 105, title: "Red Planet Ermita", price: 1200, rating: 4.4, nights: 1, image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=600", location: "Ermita, Manila", city: "Manila" },
    { id: 106, title: "Selah Pods Hotel", price: 950, rating: 4.7, nights: 1, badge: "New", image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=600", location: "Pasay, Manila", city: "Manila" },
    { id: 107, title: "QBEE Hostel Baguio", price: 450, rating: 4.6, nights: 1, badge: "Popular", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=600", location: "Session Road, Baguio", city: "Baguio" },
    { id: 108, title: "Camp Allen Suite", price: 1689, rating: 4.95, nights: 2, badge: "Guest favorite", image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=600", location: "Legarda-Burnham-Kisad", city: "Baguio" },
    { id: 109, title: "Pine Breeze Hostel", price: 520, rating: 4.5, nights: 1, image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=600", location: "Burnham Park, Baguio", city: "Baguio" },
    { id: 110, title: "Sky View Apartment", price: 3424, rating: 4.97, nights: 2, badge: "Guest favorite", image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=600", location: "Camp 7, Baguio", city: "Baguio" },
    { id: 111, title: "MadHouse Cebu Hostel", price: 420, rating: 4.6, nights: 1, image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=600", location: "IT Park, Cebu City", city: "Cebu" },
    { id: 112, title: "Sugbo Mercado Lodge", price: 750, rating: 4.5, nights: 1, image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=600", location: "Fuente Osmeña, Cebu", city: "Cebu" },
    { id: 113, title: "Beachfront Cabana Mactan", price: 2800, rating: 4.8, nights: 1, badge: "Superhost", image: "https://images.unsplash.com/photo-1499793983394-12decfcbb846?auto=format&fit=crop&q=80&w=600", location: "Mactan, Cebu", city: "Cebu" },
    { id: 114, title: "iCove Hostel", price: 380, rating: 4.3, nights: 1, image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600", location: "Mango Ave, Cebu", city: "Cebu" },
    { id: 115, title: "Spin Designer Hostel El Nido", price: 650, rating: 4.7, nights: 1, badge: "Guest favorite", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600", location: "Hama St, El Nido", city: "El Nido" },
    { id: 116, title: "Island Front Cottage", price: 3200, rating: 4.9, nights: 1, badge: "Superhost", image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&q=80&w=600", location: "Corong-Corong, El Nido", city: "El Nido" },
    { id: 117, title: "Nacpan Beach Glamping", price: 2100, rating: 4.8, nights: 1, badge: "New", image: "https://images.unsplash.com/photo-1520483601560-389dff434fdf?auto=format&fit=crop&q=80&w=600", location: "Nacpan, El Nido", city: "El Nido" },
    { id: 118, title: "Puerto Princesa Backpackers", price: 390, rating: 4.4, nights: 1, image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=600", location: "Rizal Ave, Puerto Princesa", city: "Palawan" },
    { id: 119, title: "Bravo Beach Resort Siargao", price: 1800, rating: 4.7, nights: 1, badge: "Guest favorite", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=600", location: "General Luna, Siargao", city: "Siargao" },
    { id: 120, title: "Harana Surf Hostel", price: 600, rating: 4.6, nights: 1, image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=600", location: "Cloud 9, Siargao", city: "Siargao" },
    { id: 121, title: "Boracay Backpackers", price: 550, rating: 4.5, nights: 1, image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&q=80&w=600", location: "Station 2, Boracay", city: "Boracay" },
    { id: 122, title: "White Beach Villa Boracay", price: 4500, rating: 4.9, nights: 1, badge: "Superhost", image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=600", location: "Station 1, Boracay", city: "Boracay" },
    { id: 123, title: "Tagaytay Wind Residences", price: 2200, rating: 4.6, nights: 1, image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=600", location: "Tagaytay City", city: "Tagaytay" },
    { id: 124, title: "SMDC Cool Suites", price: 1800, rating: 4.5, nights: 1, image: "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&q=80&w=600", location: "Tagaytay Rotunda", city: "Tagaytay" },
];

// ── India Listings ──
const indiaListings = [
    { id: 201, title: "Zostel Mumbai", price: 599, rating: 4.5, nights: 1, badge: "Popular", image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&q=80&w=600", location: "Colaba, Mumbai", city: "Mumbai", currency: "₹" },
    { id: 202, title: "Backpacker Panda Colaba", price: 750, rating: 4.6, nights: 1, image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=600", location: "Colaba, Mumbai", city: "Mumbai", currency: "₹" },
    { id: 203, title: "Bombay Backpackers", price: 650, rating: 4.4, nights: 1, image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600", location: "Fort, Mumbai", city: "Mumbai", currency: "₹" },
    { id: 204, title: "Sea-view Apartment Bandra", price: 4500, rating: 4.8, nights: 1, badge: "Superhost", image: "https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&q=80&w=600", location: "Bandra West, Mumbai", city: "Mumbai", currency: "₹" },
    { id: 205, title: "Zostel Delhi", price: 549, rating: 4.5, nights: 1, badge: "Popular", image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=600", location: "Paharganj, New Delhi", city: "Delhi", currency: "₹" },
    { id: 206, title: "Moustache Hostel Delhi", price: 499, rating: 4.6, nights: 1, badge: "Guest favorite", image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=600", location: "Old Delhi", city: "Delhi", currency: "₹" },
    { id: 207, title: "Madpackers New Delhi", price: 699, rating: 4.7, nights: 1, image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=600", location: "Connaught Place, Delhi", city: "Delhi", currency: "₹" },
    { id: 208, title: "Luxury Stay Near India Gate", price: 5200, rating: 4.9, nights: 1, badge: "Superhost", image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=600", location: "Central Delhi", city: "Delhi", currency: "₹" },
    { id: 209, title: "Zostel Bangalore", price: 549, rating: 4.4, nights: 1, badge: "Popular", image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=600", location: "Koramangala, Bangalore", city: "Bangalore", currency: "₹" },
    { id: 210, title: "Social Rehab Hostel", price: 450, rating: 4.3, nights: 1, image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=600", location: "Indiranagar, Bangalore", city: "Bangalore", currency: "₹" },
    { id: 211, title: "Cozy Villa Whitefield", price: 3800, rating: 4.7, nights: 1, badge: "Superhost", image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=600", location: "Whitefield, Bangalore", city: "Bangalore", currency: "₹" },
    { id: 212, title: "GoStops Bangalore", price: 599, rating: 4.5, nights: 1, image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=600", location: "MG Road, Bangalore", city: "Bangalore", currency: "₹" },
    { id: 213, title: "Zostel Goa Anjuna", price: 799, rating: 4.7, nights: 1, badge: "Guest favorite", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600", location: "Anjuna, Goa", city: "Goa", currency: "₹" },
    { id: 214, title: "The Hostel Crowd Goa", price: 650, rating: 4.5, nights: 1, image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&q=80&w=600", location: "Baga, Goa", city: "Goa", currency: "₹" },
    { id: 215, title: "Palolem Beach Cottage", price: 2200, rating: 4.8, nights: 1, badge: "Superhost", image: "https://images.unsplash.com/photo-1520483601560-389dff434fdf?auto=format&fit=crop&q=80&w=600", location: "Palolem, Goa", city: "Goa", currency: "₹" },
    { id: 216, title: "Jungle Hostel Arambol", price: 450, rating: 4.4, nights: 1, image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=600", location: "Arambol, Goa", city: "Goa", currency: "₹" },
    { id: 217, title: "Zostel Jaipur", price: 499, rating: 4.6, nights: 1, badge: "Popular", image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=600", location: "MI Road, Jaipur", city: "Jaipur", currency: "₹" },
    { id: 218, title: "Moustache Jaipur", price: 599, rating: 4.7, nights: 1, badge: "Guest favorite", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=600", location: "Old City, Jaipur", city: "Jaipur", currency: "₹" },
    { id: 219, title: "Haveli Heritage Stay", price: 3500, rating: 4.9, nights: 1, badge: "Superhost", image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&q=80&w=600", location: "Hawa Mahal, Jaipur", city: "Jaipur", currency: "₹" },
    { id: 220, title: "Backpacker Panda Jaipur", price: 450, rating: 4.3, nights: 1, image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=600", location: "C-Scheme, Jaipur", city: "Jaipur", currency: "₹" },
    { id: 221, title: "Zostel Varanasi", price: 449, rating: 4.5, nights: 1, badge: "Popular", image: "https://images.unsplash.com/photo-1499793983394-12decfcbb846?auto=format&fit=crop&q=80&w=600", location: "Assi Ghat, Varanasi", city: "Varanasi", currency: "₹" },
    { id: 222, title: "BunkStop Varanasi", price: 399, rating: 4.4, nights: 1, image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=600", location: "Dashashwamedh, Varanasi", city: "Varanasi", currency: "₹" },
    { id: 223, title: "Ganges View Apartment", price: 2800, rating: 4.8, nights: 1, badge: "Superhost", image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=600", location: "Meer Ghat, Varanasi", city: "Varanasi", currency: "₹" },
    { id: 224, title: "Moustache Varanasi", price: 549, rating: 4.6, nights: 1, image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&q=80&w=600", location: "Lanka, Varanasi", city: "Varanasi", currency: "₹" },
];

const allListings = [...philippineListings, ...indiaListings];

function createListingHTML(listing) {
    const currencySymbol = listing.currency || '₱';
    return `
        <div class="listing-card">
            <div class="listing-image-container">
                <img src="${listing.image}" alt="${listing.title}">
                ${listing.badge ? `<div class="badge">${listing.badge}</div>` : ''}
                <i class="fa-regular fa-heart heart-icon"></i>
            </div>
            <div class="listing-info">
                <div class="listing-title">${listing.title}</div>
                <div class="listing-rating">
                    <i class="fa-solid fa-star"></i>
                    ${listing.rating}
                </div>
            </div>
            <div class="listing-meta">${listing.location}</div>
            <div class="listing-price">${currencySymbol}${listing.price.toLocaleString()} <span>per night</span></div>
        </div>
    `;
}

function renderListings() {
    const phGrid = document.getElementById('listingGrid');
    const indiaGrid = document.getElementById('indiaGrid');

    if (phGrid) {
        phGrid.innerHTML = philippineListings.map(createListingHTML).join('');
    }
    if (indiaGrid) {
        indiaGrid.innerHTML = indiaListings.map(createListingHTML).join('');
    }
}


document.addEventListener('DOMContentLoaded', () => {
    renderListings();

    // Check auth state
    const authMenuBtn = document.getElementById('userMenuBtn');
    if (localStorage.getItem('metrolodges_loggedin') === 'true' && authMenuBtn) {

        authMenuBtn.classList.add('logged-in-menu');
        authMenuBtn.classList.remove('logged-out-menu');
        authMenuBtn.innerHTML = `
            <div class="user-avatar-btn">N</div>
            <div class="user-burger-btn"><i class="fa-solid fa-bars"></i></div>
        `;

        // Update dropdown menu
        const authDropdown = document.getElementById('userDropdown');
        if (authDropdown) {
            authDropdown.innerHTML = `
                <a href="#" class="dropdown-item icon-item">
                    <i class="fa-regular fa-heart"></i> Wishlists
                </a>
                <a href="#" class="dropdown-item icon-item">
                    <i class="fa-brands fa-airbnb"></i> Trips
                </a>
                <a href="#" class="dropdown-item icon-item">
                    <i class="fa-regular fa-message"></i> Messages
                </a>
                <a href="#" class="dropdown-item icon-item">
                    <i class="fa-regular fa-circle-user"></i> Profile
                </a>
                <div class="dropdown-divider"></div>
                <a href="#" class="dropdown-item icon-item">
                    <i class="fa-solid fa-gear"></i> Account settings
                </a>
                <a href="#" class="dropdown-item icon-item">
                    <i class="fa-solid fa-globe"></i> Languages & currency
                </a>
                <a href="#" class="dropdown-item icon-item">
                    <i class="fa-regular fa-circle-question"></i> Help Centre
                </a>
                <div class="dropdown-divider"></div>
                <a href="hosting.html" class="dropdown-item dropdown-host-promo">
                    <div class="promo-text">
                        <strong>Become a host</strong>
                        <span>It's easy to start hosting and earn extra income.</span>
                    </div>
                    <img src="images/host-promo.png" alt="Host promo icon" onerror="this.style.display='none'">
                </a>
                <div class="dropdown-divider"></div>
                <a href="#" class="dropdown-item">Refer a host</a>
                <a href="#" class="dropdown-item">Find a co-host</a>
                <a href="#" class="dropdown-item">Gift cards</a>
                <div class="dropdown-divider"></div>
                <a href="#" class="dropdown-item" id="logoutBtn">Log out</a>
            `;

            document.getElementById('logoutBtn').addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('metrolodges_loggedin');
                window.location.reload();
            });
        }
    }

    // Scroll: show mini search bar when user scrolls past the top section
    const header = document.getElementById('mainHeader');
    const sentinel = document.getElementById('scrollSentinel');

    if (sentinel) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // When sentinel leaves the top area (not intersecting with top 80px), we show mini bar
                if (entry.isIntersecting) {
                    header.classList.remove('scrolled');
                    header.classList.remove('expanded');
                } else {
                    header.classList.add('scrolled');
                }
            });
        }, {
            threshold: 0,
            rootMargin: '-80px 0px 0px 0px' // Offset the trigger point
        });

        observer.observe(sentinel);
    }

    // Mini search bar → expand header and open specific dropdown
    const miniSearchBar = document.getElementById('miniSearchBar');
    const miniItems = {
        'miniWhere': 'whereItem',
        'miniWhen': 'whenItem',
        'miniWho': 'whoItem'
    };

    Object.keys(miniItems).forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('click', (e) => {
                e.stopPropagation();
                header.classList.add('expanded');
                // Trigger click on the main search item to open its dropdown
                const targetItem = document.getElementById(miniItems[id]);
                if (targetItem) targetItem.click();
            });
        }
    });

    // Main mini search bar container click (fallback)
    miniSearchBar.addEventListener('click', (e) => {
        if (e.target === miniSearchBar || e.target.classList.contains('mini-search-btn')) {
            e.stopPropagation();
            header.classList.add('expanded');
            document.getElementById('whereItem').click();
        }
    });

    // Close expanded header when clicking outside
    document.addEventListener('click', (e) => {
        if (header.classList.contains('expanded') && !header.contains(e.target)) {
            header.classList.remove('expanded');
            // Also deactivate any active search items
            document.querySelectorAll('.search-item.active').forEach(item => {
                item.classList.remove('active');
            });
            document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
                menu.classList.remove('show');
            });
        }
    });

    // Search Bar Elements
    const searchItems = document.querySelectorAll('.search-item');
    const whereItem = document.getElementById('whereItem');
    const whoItem = document.getElementById('whoItem');
    const whereDropdown = document.getElementById('whereDropdown');
    const whoDropdown = document.getElementById('whoDropdown');
    const whereInput = document.getElementById('whereInput');
    const whoInput = document.getElementById('whoInput');

    // Toggle Dropdowns
    searchItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            searchItems.forEach(si => si.classList.remove('active'));
            document.querySelectorAll('.dropdown-menu').forEach(dm => dm.classList.remove('active'));

            item.classList.add('active');
            const dropdown = item.querySelector('.dropdown-menu');
            if (dropdown) dropdown.classList.add('active');

            // Focus input if any
            const input = item.querySelector('input');
            if (input && input.id !== 'whoInput') input.focus();
        });
    });

    // Handle Destination Selection
    const destItems = document.querySelectorAll('.destination-item');
    destItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            const value = item.getAttribute('data-value');
            whereInput.value = value;
            whereDropdown.classList.remove('active');
            whereItem.classList.remove('active');
            // Sync mini bar
            document.getElementById('miniWhere').innerText = value || 'Anywhere';
        });
    });

    // Handle Guest Counts
    const guestCounts = {
        adults: 0,
        children: 0,
        infants: 0,
        pets: 0
    };

    function updateWhoInput() {
        const total = guestCounts.adults + guestCounts.children;
        const infants = guestCounts.infants;
        const pets = guestCounts.pets;

        let parts = [];
        if (total > 0) parts.push(`${total} guest${total > 1 ? 's' : ''}`);
        if (infants > 0) parts.push(`${infants} infant${infants > 1 ? 's' : ''}`);
        if (pets > 0) parts.push(`${pets} pet${pets > 1 ? 's' : ''}`);

        const text = parts.length > 0 ? parts.join(', ') : 'Add guests';
        whoInput.value = text;
        // Sync mini bar
        document.getElementById('miniWho').innerText = text;
    }

    const plusBtns = document.querySelectorAll('.control-btn.plus');
    const minusBtns = document.querySelectorAll('.control-btn.minus');

    plusBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const type = btn.getAttribute('data-type');
            guestCounts[type]++;
            if (type !== 'infants' && type !== 'pets' && guestCounts.adults === 0) {
                guestCounts.adults = 1; // Auto-add adult if child added
                document.getElementById('count-adults').innerText = guestCounts.adults;
            }
            document.getElementById(`count-${type}`).innerText = guestCounts[type];
            btn.parentElement.querySelector('.minus').disabled = false;
            updateWhoInput();
        });
    });

    minusBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const type = btn.getAttribute('data-type');
            if (guestCounts[type] > 0) {
                guestCounts[type]--;
                document.getElementById(`count-${type}`).innerText = guestCounts[type];
                if (guestCounts[type] === 0) btn.disabled = true;
                updateWhoInput();
            }
        });
    });

    // Calendar Logic
    const grid1 = document.getElementById('grid1');
    const grid2 = document.getElementById('grid2');
    const monthLabels = document.querySelectorAll('.month-label');
    let currentDate = new Date();
    let startDate = null;
    let endDate = null;

    function renderMonth(grid, dateObj, labelElement) {
        // Clear previous days
        const days = grid.querySelectorAll('.calendar-day');
        days.forEach(d => d.remove());

        const year = dateObj.getFullYear();
        const month = dateObj.getMonth();

        labelElement.innerText = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(dateObj);

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Empty slots
        for (let i = 0; i < firstDay; i++) {
            const empty = document.createElement('div');
            empty.className = 'calendar-day empty';
            grid.appendChild(empty);
        }

        // Days
        for (let i = 1; i <= daysInMonth; i++) {
            const day = document.createElement('div');
            const thisDate = new Date(year, month, i);
            day.className = 'calendar-day';
            day.innerText = i;

            // Highlight Logic
            if (startDate && thisDate.getTime() === startDate.getTime()) {
                day.classList.add('selected');
            }
            if (endDate && thisDate.getTime() === endDate.getTime()) {
                day.classList.add('selected');
            }
            if (startDate && endDate && thisDate > startDate && thisDate < endDate) {
                day.classList.add('in-range');
            }

            day.addEventListener('click', (e) => {
                e.stopPropagation();
                if (!startDate || (startDate && endDate)) {
                    startDate = thisDate;
                    endDate = null;
                } else if (thisDate < startDate) {
                    startDate = thisDate;
                } else if (thisDate.getTime() === startDate.getTime()) {
                    startDate = null;
                } else {
                    endDate = thisDate;
                    // Format and show result
                    const startStr = startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                    const endStr = endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                    const dateLabel = `${startStr} – ${endStr}`;
                    document.getElementById('whenInput').value = dateLabel;
                    // Sync mini bar
                    document.getElementById('miniWhen').innerText = dateLabel;

                    // Don't close immediately to let user see selection
                    setTimeout(() => {
                        document.getElementById('whenDropdown').classList.remove('active');
                        searchItems.forEach(si => si.classList.remove('active'));
                    }, 500);
                }
                renderCalendar();
            });
            grid.appendChild(day);
        }
    }

    function renderCalendar() {
        const nextDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
        renderMonth(grid1, currentDate, monthLabels[0]);
        renderMonth(grid2, nextDate, monthLabels[1]);
    }

    document.getElementById('prevMonth').addEventListener('click', (e) => {
        e.stopPropagation();
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    document.getElementById('nextMonth').addEventListener('click', (e) => {
        e.stopPropagation();
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    renderCalendar();

    // Calendar Tabs
    const calendarTabs = document.querySelectorAll('.calendar-tab');
    calendarTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.stopPropagation();
            calendarTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });

    // Flexibility Buttons
    const flexBtns = document.querySelectorAll('.flex-btn');
    flexBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            flexBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Close dropdowns on click outside
    document.addEventListener('click', () => {
        searchItems.forEach(si => si.classList.remove('active'));
        document.querySelectorAll('.dropdown-menu').forEach(dm => {
            dm.classList.remove('active');
            dm.classList.remove('show');
        });
    });

    // User Menu Dropdown Toggle
    const userMenuBtn = document.getElementById('userMenuBtn');
    const userDropdown = document.getElementById('userDropdown');

    if (userMenuBtn && userDropdown) {
        userMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isShowing = userDropdown.classList.contains('show');

            // Close everything first
            document.querySelectorAll('.dropdown-menu').forEach(dm => {
                dm.classList.remove('active');
                dm.classList.remove('show');
            });
            searchItems.forEach(si => si.classList.remove('active'));

            if (!isShowing) {
                userDropdown.classList.add('show');
            }
        });
    }

    // Heart icons
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('heart-icon')) {
            e.target.classList.toggle('fa-regular');
            e.target.classList.toggle('fa-solid');
            e.target.style.color = e.target.classList.contains('fa-solid') ? '#FF385C' : 'rgba(0,0,0,0.5)';
        }
    });

    // Categories
    const categories = document.querySelectorAll('.category-item');
    categories.forEach(cat => {
        cat.addEventListener('click', () => {
            const categoryName = cat.querySelector('span').innerText;
            categories.forEach(c => c.classList.remove('active'));
            cat.classList.add('active');
            renderListings();
        });
    });
});
