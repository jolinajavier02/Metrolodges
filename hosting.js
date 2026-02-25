document.addEventListener('DOMContentLoaded', () => {
    const listingsSlider = document.getElementById('listingsSlider');
    const listingCountInput = document.getElementById('listingCount');
    const decreaseBtn = document.getElementById('decrease');
    const increaseBtn = document.getElementById('increase');
    const perListingPriceEl = document.getElementById('perListingPrice');
    const totalPriceEl = document.getElementById('totalPrice');
    const currencySelect = document.getElementById('currencySelect');
    const currencySymbols = document.querySelectorAll('.currency-symbol');

    const BASE_PRICE_INR = 490;
    const CONVERSION_RATES = {
        'INR': 1,
        'PHP': 0.67,
        'USD': 0.012
    };
    const SYMBOLS = {
        'INR': '₹',
        'PHP': '₱',
        'USD': '$'
    };

    let currentListingCount = 1;
    let selectedCurrency = 'INR';

    function updateCalculations() {
        const rate = CONVERSION_RATES[selectedCurrency];
        const symbol = SYMBOLS[selectedCurrency];

        // Update per listing price text
        const convertedPerListing = (BASE_PRICE_INR * rate).toFixed(0);
        perListingPriceEl.textContent = convertedPerListing;

        // Update total price
        const total = (BASE_PRICE_INR * currentListingCount * rate).toFixed(0);
        totalPriceEl.textContent = total;

        // Update all symbols
        currencySymbols.forEach(s => s.textContent = symbol);
    }

    function syncValue(val) {
        currentListingCount = parseInt(val) || 1;
        if (currentListingCount < 1) currentListingCount = 1;

        listingCountInput.value = currentListingCount;
        listingsSlider.value = currentListingCount;

        updateCalculations();
    }

    listingsSlider.addEventListener('input', (e) => syncValue(e.target.value));
    listingCountInput.addEventListener('change', (e) => syncValue(e.target.value));

    decreaseBtn.addEventListener('click', () => {
        if (currentListingCount > 1) syncValue(currentListingCount - 1);
    });

    increaseBtn.addEventListener('click', () => {
        syncValue(currentListingCount + 1);
    });

    currencySelect.addEventListener('change', (e) => {
        selectedCurrency = e.target.value;
        updateCalculations();
    });

    // FAQ Accordion Logic
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;

            // Close other items (optional, but usually preferred for cleaner UX)
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            item.classList.toggle('active');
        });
    });

    // Close user dropdown on click outside
    document.addEventListener('click', () => {
        document.querySelectorAll('.dropdown-menu').forEach(dm => {
            dm.classList.remove('show');
        });
    });

    // User Menu Dropdown Toggle
    const userMenuBtn = document.getElementById('userMenuBtn');
    const userDropdown = document.getElementById('userDropdown');

    if (userMenuBtn && userDropdown) {
        userMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            userDropdown.classList.toggle('show');
        });
    }

    // Check auth state
    const authMenuBtn = document.getElementById('userMenuBtn');
    if (localStorage.getItem('metrolodges_loggedin') === 'true' && authMenuBtn) {
        // Add avatar icon
        const avatar = document.createElement('i');
        avatar.className = 'fa-solid fa-circle-user';
        avatar.style.fontSize = '1.8rem';
        avatar.style.color = '#717171';
        authMenuBtn.appendChild(avatar);

        // Adjust user menu styling to fit both icons
        authMenuBtn.style.padding = '5px 5px 5px 12px';
        authMenuBtn.style.width = '70px';
        authMenuBtn.style.justifyContent = 'space-between';
        authMenuBtn.style.gap = '8px';

        // Update dropdown menu
        const authDropdown = document.getElementById('userDropdown');
        if (authDropdown) {
            // Find login item and replace it with account/logout
            const items = Array.from(authDropdown.querySelectorAll('.dropdown-item'));
            const loginLink = items.find(a => a.textContent.includes('Log in or sign up'));
            if (loginLink) {
                loginLink.textContent = 'Account';
                loginLink.href = '#';

                const logoutLink = document.createElement('a');
                logoutLink.className = 'dropdown-item';
                logoutLink.href = '#';
                logoutLink.textContent = 'Log out';
                logoutLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    localStorage.removeItem('metrolodges_loggedin');
                    window.location.reload();
                });
                authDropdown.appendChild(logoutLink);
            }
        }
    }

    // Initial calculation
    updateCalculations();
});
