const listings = [
    {
        id: 1,
        title: "Guest suite in Camp Allen",
        price: 1689,
        rating: 4.95,
        nights: 2,
        badge: "Guest favorite",
        image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=600",
        location: "Legarda-Burnham-Kisad"
    },
    {
        id: 2,
        title: "Apartment in Session Road Area",
        price: 5706,
        rating: 4.91,
        nights: 2,
        badge: "Guest favorite",
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=600",
        location: "Baguio City"
    },
    {
        id: 3,
        title: "Apartment in Holy Ghost Extension",
        price: 4930,
        rating: 4.98,
        nights: 2,
        badge: "Guest favorite",
        image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=600",
        location: "Highland Greens"
    },
    {
        id: 4,
        title: "Room in General Luna Upper",
        price: 4200,
        rating: 4.88,
        nights: 2,
        badge: "Guest favorite",
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=600",
        location: "Downtown Plaza"
    },
    {
        id: 5,
        title: "Apartment in City Camp Proper",
        price: 3995,
        rating: 4.94,
        nights: 2,
        image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=600",
        location: "Metro Heights"
    },
    {
        id: 6,
        title: "Condo in Engineers' Hill",
        price: 4170,
        rating: 4.94,
        nights: 2,
        badge: "Guest favorite",
        image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=600",
        location: "Green View"
    },
    {
        id: 7,
        title: "Apartment in Camp 7",
        price: 3424,
        rating: 4.97,
        nights: 2,
        category: "Homes",
        image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&q=80&w=600",
        location: "South Ridge"
    },
    {
        id: 8,
        title: "Room in Maitim 2nd West",
        price: 5362,
        rating: 4.96,
        nights: 2,
        badge: "Guest favorite",
        category: "Homes",
        image: "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&q=80&w=600",
        location: "West End"
    },
    {
        id: 9,
        title: "Sky View Suite",
        price: 8500,
        rating: 4.99,
        nights: 1,
        category: "Iconic Cities",
        image: "https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&q=80&w=600",
        location: "Downtown"
    }
];

function createListingHTML(listing) {
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
            <div class="listing-price">₱${listing.price.toLocaleString()} <span>per night</span></div>
        </div>
    `;
}

function renderListings(filter = 'Homes') {
    const grid = document.getElementById('listingGrid');
    const weekendGrid = document.getElementById('weekendGrid');

    // Filter listings based on category if not 'Homes' (which we use as default all)
    const filtered = filter === 'Homes' ? listings : listings.filter(l => l.category === filter);

    if (grid) {
        grid.innerHTML = (filtered.length > 0 ? filtered : listings.slice(0, 4)).map(createListingHTML).join('');
    }

    if (weekendGrid) {
        weekendGrid.innerHTML = [...listings].reverse().slice(0, 4).map(createListingHTML).join('');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderListings();

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

        whoInput.value = parts.length > 0 ? parts.join(', ') : 'Add guests';
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
                    document.getElementById('whenInput').value = `${startStr} – ${endStr}`;

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
        document.querySelectorAll('.dropdown-menu').forEach(dm => dm.classList.remove('active'));
    });

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
            renderListings(categoryName);
        });
    });
});
