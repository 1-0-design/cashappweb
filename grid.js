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
        
        // Position absolutely during animation
        if (oldContainer) {
            oldContainer.style.position = 'absolute';
            oldContainer.style.width = '100%';
            oldContainer.style.maxWidth = '1200px';
            oldContainer.style.left = '50%';
            oldContainer.style.transform = 'translateX(-50%)';
            oldContainer.style.top = '0';
        }
        
        newContainer.style.position = 'absolute';
        newContainer.style.width = '100%';
        newContainer.style.maxWidth = '1200px';
        newContainer.style.left = '50%';
        newContainer.style.transform = direction === 'left' 
            ? 'translate(calc(-50% + 100vw))'
            : 'translate(calc(-50% - 100vw))';
        newContainer.style.top = '0';
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
                oldContainer.style.transform = direction === 'left'
                    ? 'translate(calc(-50% - 100vw))'
                    : 'translate(calc(-50% + 100vw))';
            }
            
            newContainer.style.transition = timing;
            newContainer.style.transform = 'translateX(-50%)';
            
            // Clean up after animation
            setTimeout(() => {
                if (oldContainer && oldContainer.parentNode) {
                    oldContainer.remove();
                }
                newContainer.id = 'gridContainer';
                newContainer.style.position = '';
                newContainer.style.width = '';
                newContainer.style.maxWidth = '';
                newContainer.style.left = '';
                newContainer.style.transform = '';
                newContainer.style.transition = '';
                newContainer.style.top = '';
            }, parseInt(transitionDuration, 10));
        });
    } else {
        // Initial load - no animation
        newContainer.id = 'gridContainer';
        animationContainer.appendChild(newContainer);
    }
}