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

// Tab order for navigation (matches visual order in tab bar)
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
    newContainer.style.position = direction ? 'absolute' : 'relative';
    newContainer.style.width = 'calc(100% - 80px)';
    newContainer.style.top = mainContent.scrollTop + 'px';  // Match scroll position

    // Add grid items
    items.forEach((item, index) => {
        const gridItem = document.createElement('div');
        gridItem.className = 'grid-item';
        gridItem.dataset.id = `${tabName}-${index}`;
        
        const label = document.createElement('div');
        label.className = 'item-label';
        label.textContent = item.label;
        
        gridItem.appendChild(label);
        newContainer.appendChild(gridItem);
    });
    
    // Handle animation
    if (direction) {
        // Calculate positioning
        let startTransform = direction === 'left' ? '100%' : '-100%';
        
        // Set initial position
        newContainer.style.transform = `translateX(${startTransform})`;
        newContainer.style.transition = 'none';
        mainContent.appendChild(newContainer);
        
        // Force reflow
        newContainer.offsetHeight;
        
        // Get the old container and prepare for animation
        const oldContainer = document.getElementById('gridContainer');
        const endTransform = direction === 'left' ? '-100%' : '100%';
        
        if (oldContainer) {
            oldContainer.style.position = 'absolute';
            oldContainer.style.width = 'calc(100% - 80px)';
            oldContainer.style.top = mainContent.scrollTop + 'px';
        }
        
        // Start animations
        requestAnimationFrame(() => {
            if (oldContainer) {
                oldContainer.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                oldContainer.style.transform = `translateX(${endTransform})`;
            }
            
            newContainer.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            newContainer.style.transform = 'translateX(0)';
            
            // Clean up after animation
            setTimeout(() => {
                if (oldContainer) {
                    oldContainer.remove();
                }
                newContainer.style.position = 'relative';
                newContainer.style.transition = '';
                newContainer.style.transform = '';
                newContainer.id = 'gridContainer';
            }, 400);
        });
    } else {
        newContainer.id = 'gridContainer';
        mainContent.appendChild(newContainer);
    }
}

// Modal handlers
function openModal(item, sourceElement) {
    const modal = document.getElementById('modal');
    const modalContent = modal.querySelector('.modal-content');
    const clickedItem = sourceElement || event.target.closest('.grid-item');
    if (!clickedItem) return; // Guard against missing element
    modal.dataset.sourceElement = clickedItem.dataset.id;
    const clickedRect = clickedItem.getBoundingClientRect();
    
    // Reset any previous styles
    modalContent.style.width = '';
    modalContent.style.height = '';
    modalContent.style.top = '';
    modalContent.style.left = '';
    
    // Set initial position and size
    requestAnimationFrame(() => {
        modalContent.style.width = `${clickedRect.width}px`;
        modalContent.style.height = `${clickedRect.height}px`;
        modalContent.style.top = `${clickedRect.top}px`;
        modalContent.style.left = `${clickedRect.left}px`;
        modalContent.classList.add('initial');
        
        // Update content
        modal.querySelector('.modal-title').textContent = item.title;
        modal.querySelector('.modal-text').textContent = item.description || item.label;
        
        // Show modal and trigger animation to full screen
        requestAnimationFrame(() => {
            modal.classList.add('active');
            document.querySelector('.nav-brand').style.opacity = '0';
            modalContent.style.width = '100%';
            modalContent.style.height = '100%';
            modalContent.style.top = '0';
            modalContent.style.left = '0';
            modalContent.classList.remove('initial');
        });
    });
}

function closeModal() {
    const modal = document.getElementById('modal');
    const modalContent = modal.querySelector('.modal-content');
    const sourceId = modal.dataset.sourceElement;
    const sourceElement = document.querySelector(`[data-id="${sourceId}"]`);
    const returnRect = sourceElement.getBoundingClientRect();
    
    modalContent.classList.add('initial');
    
    // Animate back to original position and size
    modalContent.style.width = `${returnRect.width}px`;
    modalContent.style.height = `${returnRect.height}px`;
    modalContent.style.top = `${returnRect.top}px`;
    modalContent.style.left = `${returnRect.left}px`;
    
    modal.classList.remove('active');
    document.querySelector('.nav-brand').style.opacity = '1';
    
    // Clean up after animation
    setTimeout(() => {
        modalContent.style.width = '';
        modalContent.style.height = '';
        modalContent.style.top = '';
        modalContent.style.left = '';
        modal.dataset.sourceElement = '';
        modalContent.classList.remove('initial');
    }, 400);
}

// Handle tab switching
function switchTab(newTab, direction = null) {
    const oldTabIndex = tabOrder.indexOf(currentTab);
    const newTabIndex = tabOrder.indexOf(newTab);
    
    if (!direction) {
        direction = newTabIndex > oldTabIndex ? 'left' : 'right';
    }
    
    // Update active tab
    tabButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.tab === newTab) {
            btn.classList.add('active');
        }
    });
    
    // Update grid with animation
    createGridItems(newTab, direction);
    currentTab = newTab;
}

// Navigate between tabs
function navigateTab(direction) {
    if (document.querySelector('.grid-container.sliding-left, .grid-container.sliding-right')) {
        return; // Don't allow navigation while animation is in progress
    }
    
    const currentIndex = tabOrder.indexOf(currentTab);
    let newIndex;
    
    if (direction === 'left') {
        newIndex = currentIndex - 1;
        if (newIndex < 0) newIndex = tabOrder.length - 1;
    } else {
        newIndex = currentIndex + 1;
        if (newIndex >= tabOrder.length) newIndex = 0;
    }
    
    switchTab(tabOrder[newIndex], direction);
}

// Event Listeners
document.querySelector('.close-btn').addEventListener('click', closeModal);
tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const newTab = btn.dataset.tab;
        if (newTab !== currentTab) {
            switchTab(newTab);
        }
    });
});

// Initialize grid with animation for consistency
createGridItems(currentTab, 'right');

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
    // Store both X and Y coordinates
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
    touchStartTime = Date.now();
    isSwiping = false;
}

function handleTouchMove(event) {
    if (event.touches.length > 0) {
        const deltaX = event.touches[0].clientX - touchStartX;
        const deltaY = event.touches[0].clientY - touchStartY;
        
        // If horizontal movement is greater than vertical and exceeds threshold, mark as swipe
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
            isSwiping = true;
        }
        
        touchEndX = event.touches[0].clientX;
        touchEndY = event.touches[0].clientY;
    }
}

function handleTouchEnd(event) {
    const touchEndTime = Date.now();
    const touchDuration = touchEndTime - touchStartTime;
    const touchElement = event.target.closest('.grid-item');
    
    // If it's a quick tap on a grid item (not a swipe), open the modal
    if (touchElement && !isSwiping && touchDuration < 200) {
        event.preventDefault();
        const itemIndex = Array.from(touchElement.parentNode.children).indexOf(touchElement);
        const item = gridData[currentTab][itemIndex];
        openModal(item, touchElement);
        return;
    }
    
    // Handle swipe navigation only if we detected a swipe
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
    
    // Reset touch tracking
    touchStartX = 0;
    touchEndX = 0;
    touchStartY = 0;
    touchEndY = 0;
    touchStartTime = 0;
    isSwiping = false;
}

document.addEventListener('touchstart', handleTouchStart);
document.addEventListener('touchmove', handleTouchMove);
document.addEventListener('touchend', handleTouchEnd);

// Title fade on scroll
document.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 0) {
        document.querySelector('.page-title').style.opacity = 0;
    } else {
        document.querySelector('.page-title').style.opacity = 1;
    }
});