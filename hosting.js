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

    // Initial calculation
    updateCalculations();
});
