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
    
    const animationContainer = document.getElementById('animationContainer');

    // Handle animation
    if (direction) {
        const oldContainer = document.getElementById('gridContainer');
        const bounds = animationContainer.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        
        // Position absolutely during animation
        if (oldContainer) {
            oldContainer.style.position = 'absolute';
            oldContainer.style.width = '100%';
            oldContainer.style.left = '0';
            oldContainer.style.transform = 'none';
        }
        
        newContainer.style.position = 'absolute';
        newContainer.style.width = '100%';
        newContainer.style.transform = `translateX(${direction === 'left' ? '100%' : '-100%'})`;
        animationContainer.appendChild(newContainer);
        
        // Force reflow
        newContainer.offsetHeight;
        
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
                newContainer.style.transform = '';
                newContainer.style.width = '100%';
                newContainer.style.transition = '';
            }, parseInt(transitionDuration, 10));
        });
    } else {
        // Initial load - no animation
        newContainer.id = 'gridContainer';
        animationContainer.appendChild(newContainer);
    }
}