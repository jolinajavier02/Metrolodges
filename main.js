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
        image: "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&q=80&w=600",
        location: "West End"
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

function renderListings() {
    const grid = document.getElementById('listingGrid');
    const weekendGrid = document.getElementById('weekendGrid');
    
    if (grid) {
        grid.innerHTML = listings.map(createListingHTML).join('');
    }
    
    if (weekendGrid) {
        // Reverse listings for variety in the second grid
        weekendGrid.innerHTML = [...listings].reverse().map(createListingHTML).join('');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderListings();
    
    // Add simple hover effect for heart icons
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('heart-icon')) {
            e.target.classList.toggle('fa-regular');
            e.target.classList.toggle('fa-solid');
            e.target.style.color = e.target.classList.contains('fa-solid') ? '#FF385C' : 'rgba(0,0,0,0.5)';
        }
    });

    // Handle Category clicks
    const categories = document.querySelectorAll('.category-item');
    categories.forEach(cat => {
        cat.addEventListener('click', () => {
            categories.forEach(c => c.classList.remove('active'));
            cat.classList.add('active');
        });
    });
});
