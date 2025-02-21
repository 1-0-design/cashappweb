// Sample data for the grid items
const gridData = {
    money: [
        { title: 'Send', label: 'Send Money' },
        { title: 'Receive', label: 'Get Paid' },
        { title: 'Invest', label: 'Stocks' },
        { title: 'Bitcoin', label: 'Buy & Sell' },
        { title: 'Banking', label: 'Cash Card' },
        { title: 'Boost', label: 'Save Money' }
    ],
    card: [
        { title: 'Physical', label: 'Order Card' },
        { title: 'Virtual', label: 'Use Now' },
        { title: 'Design', label: 'Customize' },
        { title: 'Rewards', label: 'Cash Back' }
    ],
    discover: [
        { title: 'Friends', label: 'Social' },
        { title: 'Offers', label: 'Deals' },
        { title: 'News', label: 'Updates' },
        { title: 'Learn', label: 'Tutorials' }
    ],
    account: [
        { title: 'Profile', label: 'Settings' },
        { title: 'Security', label: 'Privacy' },
        { title: 'Support', label: 'Help' },
        { title: 'History', label: 'Activity' }
    ]
};

// Current active tab
let currentTab = 'money';

// DOM Elements
const gridContainer = document.getElementById('gridContainer');
const modal = document.getElementById('modal');
const tabButtons = document.querySelectorAll('.tab-btn');
const pageTitle = document.querySelector('.page-title');

// Create grid items for a specific tab
function createGridItems(tabName, direction = null) {
    const items = gridData[tabName];
    gridContainer.innerHTML = '';
    
    items.forEach((item, index) => {
        const gridItem = document.createElement('div');
        gridItem.className = 'grid-item';
        gridItem.dataset.id = `${tabName}-${index}`;
        if (direction) {
            gridItem.classList.add(`slide-${direction}`);
        }
        
        const label = document.createElement('div');
        label.className = 'item-label';
        label.textContent = item.label;
        
        gridItem.appendChild(label);
        
        // Add click event for modal
        gridItem.addEventListener('click', () => openModal(item));
        
        gridContainer.appendChild(gridItem);
    });
}

// Modal handlers
function openModal(item) {
    const modalContent = modal.querySelector('.modal-content');
    const clickedItem = event.target.closest('.grid-item');
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
        
        // Update content
        modal.querySelector('.modal-title').textContent = item.title;
        modal.querySelector('.modal-text').textContent = item.label;
        
        // Show modal and trigger animation to full screen
        requestAnimationFrame(() => {
            modal.classList.add('active');
            modalContent.style.width = '100%';
            modalContent.style.height = '100%';
            modalContent.style.top = '0';
            modalContent.style.left = '0';
        });
    });
}

function closeModal() {
    const modalContent = modal.querySelector('.modal-content');
    const sourceId = modal.dataset.sourceElement;
    const sourceElement = document.querySelector(`[data-id="${sourceId}"]`);
    const returnRect = sourceElement.getBoundingClientRect();
    
    // Animate back to original position and size
    modalContent.style.width = `${returnRect.width}px`;
    modalContent.style.height = `${returnRect.height}px`;
    modalContent.style.top = `${returnRect.top}px`;
    modalContent.style.left = `${returnRect.left}px`;
    
    modal.classList.remove('active');
    
    // Clean up after animation
    setTimeout(() => {
        modalContent.style.width = '';
        modalContent.style.height = '';
        modalContent.style.top = '';
        modalContent.style.left = '';
        modal.dataset.sourceElement = '';
    }, 400);
}

// Tab handling
function switchTab(newTab) {
    const oldTabIndex = Array.from(tabButtons).findIndex(btn => btn.dataset.tab === currentTab);
    const newTabIndex = Array.from(tabButtons).findIndex(btn => btn.dataset.tab === newTab);
    const direction = newTabIndex > oldTabIndex ? 'left' : 'right';
    
    // Update active tab
    tabButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.tab === newTab) {
            btn.classList.add('active');
        }
    });
    
    // Update page title
    pageTitle.textContent = newTab.charAt(0).toUpperCase() + newTab.slice(1);
    
    // Update grid with animation
    createGridItems(newTab, direction);
    currentTab = newTab;
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

// Handle scroll
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const titleElement = document.querySelector('.page-title');
    const fadeStartPoint = 0;
    const fadeEndPoint = 100;  // Adjust this value to control how quickly it fades
    
    if (scrollPosition <= fadeStartPoint) {
        titleElement.style.opacity = 1;
    } else if (scrollPosition >= fadeEndPoint) {
        titleElement.style.opacity = 0;
    } else {
        const opacity = 1 - ((scrollPosition - fadeStartPoint) / (fadeEndPoint - fadeStartPoint));
        titleElement.style.opacity = opacity;
    }
});

// Initialize grid
createGridItems(currentTab);