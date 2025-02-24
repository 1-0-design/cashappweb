// Grid data for each tab
const gridData = {
    money: [
        { 
            title: 'Direct Deposit',
            label: 'Get Paid Early',
            description: 'Get your paycheck up to two days early with direct deposit. Just share your Cash App routing and account numbers with your employer and get paid sooner, with no hidden fees or hassle.'
        },
        { 
            title: 'Cash Card',
            label: 'Spend',
            description: 'A free, customizable debit card that works everywhere Visa is accepted. Design your own card, add it to Apple Pay or Google Pay, and get instant discounts at your favorite spots with Cash App Boosts.'
        },
        { 
            title: 'Banking',
            label: 'Mobile Bank',
            description: 'A full-featured mobile bank account without the paperwork. Send and receive money instantly, use your free debit card everywhere, and manage your money with powerful tools built right in.'
        },
        { 
            title: 'Payments',
            label: 'Send & Receive',
            description: 'Send and receive money instantly with anyone in the US. No forms to fill out, no bank details needed - just enter an amount, pick a $cashtag, and tap send.'
        },
        { 
            title: 'Bitcoin',
            label: 'Buy & Sell',
            description: 'Buy, sell, and send Bitcoin without the wait. Start with as little as $1 and trade instantly, 24/7. Your Bitcoin is kept secure in our vault system with state-of-the-art encryption.'
        },
        { 
            title: 'Stocks',
            label: 'Invest',
            description: 'Invest in stocks with as little as $1. Buy fractional shares of your favorite companies instantly, with no commission fees. Track your portfolio in real-time and learn as you grow.'
        },
        { 
            title: 'Money Tools',
            label: 'Manage',
            description: 'Take control of your money with powerful tools built right into Cash App. Set spending limits, track your activity, automate your savings, and get detailed financial insights.'
        },
        { 
            title: 'Round Ups',
            label: 'Save',
            description: 'Turn everyday purchases into investments automatically. Round up every transaction to the nearest dollar and invest the difference in stocks or Bitcoin. Small change, big potential.'
        }
    ],
    'send-money': [
        { title: 'Instant Transfer', label: 'Send Instantly' },
        { title: 'QR Code', label: 'Scan & Pay' },
        { title: 'Request', label: 'Get Paid' },
        { title: 'Group Pay', label: 'Split Bills' },
        { title: 'Cash Tags', label: '$Cashtag' },
        { title: 'Cross Border', label: 'International' },
        { title: 'Paper Money', label: 'Cash Out' },
        { title: 'Business', label: 'For Work' }
    ],
    card: [
        { title: 'Custom Design', label: 'Personalize' },
        { title: 'Contactless', label: 'Tap to Pay' },
        { title: 'Boosts', label: 'Save Money' },
        { title: 'Virtual Card', label: 'Shop Online' },
        { title: 'ATM', label: 'Withdraw' },
        { title: 'Security', label: 'Lock Card' },
        { title: 'Pin', label: 'Set Up' },
        { title: 'Limits', label: 'Spending' }
    ],
    local: [
        { title: 'Cash Map', label: 'Near You' },
        { title: 'Boost Spots', label: 'Discounts' },
        { title: 'Bitcoin ATMs', label: 'Buy BTC' },
        { title: 'ATM Finder', label: 'Get Cash' },
        { title: 'Community', label: 'Local Events' },
        { title: 'Coffee', label: 'Cafe Deals' },
        { title: 'Partners', label: 'Local Shops' },
        { title: 'Favorites', label: 'Save Places' }
    ],
    account: [
        { title: 'Profile', label: 'Settings' },
        { title: 'Security', label: 'Privacy' },
        { title: 'Statements', label: 'History' },
        { title: 'Support', label: 'Help' },
        { title: 'Rewards', label: 'Earn' },
        { title: 'Notifications', label: 'Alerts' },
        { title: 'Family', label: 'Accounts' },
        { title: 'Documents', label: 'Tax Forms' }
    ]
};

// Tab order for navigation
const tabOrder = ['money', 'card', 'send-money', 'local', 'account'];

// Current active tab
let currentTab = 'money';

// DOM Elements
const tabButtons = document.querySelectorAll('.tab-btn');
const mainContent = document.querySelector('main');

// Create grid items for a specific tab
function createGridItems(tabName, direction = null) {
    // Create a new container
    const newContainer = document.createElement('div');
    newContainer.className = 'grid-container';
    
    // Add grid items
    gridData[tabName].forEach((item, index) => {
        const gridItem = document.createElement('div');
        gridItem.className = 'grid-item';
        gridItem.dataset.id = `${tabName}-${index}`;
        
        const label = document.createElement('div');
        label.className = 'item-label';
        label.textContent = item.label;
        
        gridItem.addEventListener('click', (event) => {
            event.preventDefault();
            openModal(item, gridItem);
        });
        
        gridItem.appendChild(label);
        newContainer.appendChild(gridItem);
    });
    
    const animationContainer = document.querySelector('.animation-container') || (() => {
        const container = document.createElement('div');
        container.className = 'animation-container';
        mainContent.appendChild(container);
        return container;
    })();

    // Handle animation
    if (direction) {
        const oldContainer = document.getElementById('gridContainer');
        
        // Position absolutely during animation
        newContainer.style.position = 'absolute';
        newContainer.style.top = '0';
        newContainer.style.width = '100%';
        
        // Set initial position off-screen
        newContainer.style.transform = `translateX(${direction === 'left' ? '100%' : '-100%'})`;
        animationContainer.appendChild(newContainer);
        
        // Force reflow
        newContainer.offsetHeight;
        
        // Setup old container
        if (oldContainer) {
            oldContainer.style.position = 'absolute';
            oldContainer.style.top = '0';
            oldContainer.style.width = '100%';
            oldContainer.style.transform = 'translateX(0)';
        }
        
        // Get transition duration
        const transitionDuration = getComputedStyle(document.documentElement)
            .getPropertyValue('--transition-duration')
            .trim()
            .replace('ms', '');
        
        // Start animations
        requestAnimationFrame(() => {
            const timing = `transform ${transitionDuration}ms cubic-bezier(0.4, 0.0, 0.2, 1)`;
            
            if (oldContainer) {
                oldContainer.style.transition = timing;
                oldContainer.style.transform = `translateX(${direction === 'left' ? '-100%' : '100%'})`;
            }
            
            newContainer.style.transition = timing;
            newContainer.style.transform = 'translateX(0)';
            
            // Clean up after animation
            setTimeout(() => {
                if (oldContainer && oldContainer.parentNode) {
                    oldContainer.remove();
                }
                newContainer.id = 'gridContainer';
                newContainer.style.position = 'relative';
                newContainer.style.transition = '';
            }, parseInt(transitionDuration, 10));
        });
    } else {
        // Initial load - no animation
        newContainer.id = 'gridContainer';
        animationContainer.appendChild(newContainer);
    }
}

// Event Listeners
document.querySelector('.close-btn')?.addEventListener('click', closeModal);
tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const newTab = btn.dataset.tab;
        if (newTab !== currentTab) {
            switchTab(newTab);
        }
    });
});

// Handle keyboard navigation
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        navigateTab('left');
    } else if (event.key === 'ArrowRight') {
        navigateTab('right');
    }
});

// Touch navigation setup
let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;
let touchStartTime = 0;
let isSwiping = false;

function handleTouchStart(event) {
    // Only handle touch events on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
        touchStartTime = Date.now();
        isSwiping = false;
    }
}

function handleTouchMove(event) {
    // Only handle touch events on touch devices
    if (window.matchMedia('(pointer: coarse)').matches && event.touches.length > 0) {
        const deltaX = event.touches[0].clientX - touchStartX;
        const deltaY = event.touches[0].clientY - touchStartY;
        
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
            isSwiping = true;
        }
        
        touchEndX = event.touches[0].clientX;
        touchEndY = event.touches[0].clientY;
    }
}

function handleTouchEnd(event) {
    // Only handle touch events on touch devices
    if (!window.matchMedia('(pointer: coarse)').matches) {
        return;
    }

    const touchEndTime = Date.now();
    const touchDuration = touchEndTime - touchStartTime;
    const touchElement = event.target.closest('.grid-item');
    
    if (touchElement && !isSwiping && touchDuration < 200) {
        event.preventDefault();
        const itemIndex = Array.from(touchElement.parentNode.children).indexOf(touchElement);
        const item = gridData[currentTab][itemIndex];
        openModal(item, touchElement);
        return;
    }
    
    if (isSwiping) {
        const swipeThreshold = 50;
        const swipeDistance = touchEndX - touchStartX;
        
        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                navigateTab('right');
            } else {
                navigateTab('left');
            }
        }
    }
    
    touchStartX = 0;
    touchEndX = 0;
    touchStartY = 0;
    touchEndY = 0;
    touchStartTime = 0;
    isSwiping = false;
}

// Only add touch events if we're on a touch device
if (window.matchMedia('(pointer: coarse)').matches) {
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
}

// Title fade on scroll
document.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 0) {
        document.querySelector('.page-title').style.opacity = 0;
    } else {
        document.querySelector('.page-title').style.opacity = 1;
    }
});

// Initialize first grid
createGridItems(currentTab);