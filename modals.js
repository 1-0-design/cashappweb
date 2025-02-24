// Modal handlers
function openModal(item, sourceElement) {
    const modal = document.getElementById('modal');
    const modalContent = modal.querySelector('.modal-content');
    const clickedItem = sourceElement || event.target.closest('.grid-item');
    if (!clickedItem) return;
    modal.dataset.sourceElement = clickedItem.dataset.id;
    const clickedRect = clickedItem.getBoundingClientRect();
    
    modalContent.style.width = `${clickedRect.width}px`;
    modalContent.style.height = `${clickedRect.height}px`;
    modalContent.style.top = `${clickedRect.top}px`;
    modalContent.style.left = `${clickedRect.left}px`;
    modalContent.classList.add('initial');
    
    modal.querySelector('.modal-title').textContent = item.title;
    modal.querySelector('.modal-text').textContent = item.description || item.label;
    
    requestAnimationFrame(() => {
        modal.classList.add('active');
        document.querySelector('.nav-brand').style.opacity = '0';
        modalContent.style.width = '100%';
        modalContent.style.height = '100%';
        modalContent.style.top = '0';
        modalContent.style.left = '0';
        modalContent.classList.remove('initial');
    });
}

function closeModal() {
    const modal = document.getElementById('modal');
    const modalContent = modal.querySelector('.modal-content');
    const sourceId = modal.dataset.sourceElement;
    const sourceElement = document.querySelector(`[data-id="${sourceId}"]`);
    const returnRect = sourceElement.getBoundingClientRect();
    
    modalContent.classList.add('initial');
    modalContent.style.width = `${returnRect.width}px`;
    modalContent.style.height = `${returnRect.height}px`;
    modalContent.style.top = `${returnRect.top}px`;
    modalContent.style.left = `${returnRect.left}px`;
    
    modal.classList.remove('active');
    document.querySelector('.nav-brand').style.opacity = '1';
    
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
    
    tabButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.tab === newTab) {
            btn.classList.add('active');
        }
    });
    
    createGridItems(newTab, direction);
    currentTab = newTab;
}

// Navigate between tabs
function navigateTab(direction) {
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