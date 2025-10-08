/**
 * Initialize the scrolling timeline
 */
function initTimeline() {
  // All timeline items
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  // Optional control buttons
  const showAllBtn = document.querySelector('.show-all-btn');
  const resetBtn = document.querySelector('.reset-btn');
  
  /**
   * Check if an element is in the viewport
   * @param {HTMLElement} element - The element to check
   * @returns {boolean} - Whether the element is in viewport
   */
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
      rect.bottom >= 0
    );
  }
  
  /**
   * Handle scroll event to reveal timeline items
   */
  function onScroll() {
    timelineItems.forEach(item => {
      if (isInViewport(item)) {
        item.classList.add('active');
      }
    });
  }
  
  /**
   * Show all timeline items immediately
   */
  function showAllItems() {
    timelineItems.forEach((item, index) => {
      // Stagger the animations slightly
      setTimeout(() => {
        item.classList.add('active');
      }, index * 300);
    });
  }
  
  /**
   * Reset all timeline items to hidden state
   */
  function resetItems() {
    timelineItems.forEach(item => {
      item.classList.remove('active');
    });
    
    // Activate the first item after a short delay
    setTimeout(() => {
      if (timelineItems.length > 0) {
        timelineItems[0].classList.add('active');
      }
    }, 300);
  }
  
  // Add scroll event listener
  window.addEventListener('scroll', onScroll);
  
  // Initial check on page load
  window.addEventListener('load', onScroll);
  
  // Add event listeners to control buttons if they exist
  if (showAllBtn) {
    showAllBtn.addEventListener('click', showAllItems);
  }
  
  if (resetBtn) {
    resetBtn.addEventListener('click', resetItems);
  }
}

// Initialize when the DOM is ready
document.addEventListener('DOMContentLoaded', initTimeline);