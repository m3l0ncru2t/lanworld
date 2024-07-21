document.addEventListener('DOMContentLoaded', () => {
    // Select all elements with the class 'extra-content'
    const extraContents = document.querySelectorAll('.extra-content');

    // Create an Intersection Observer to watch the extra content
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Show the extra content when it comes into view
                entry.target.style.opacity = '1';
                // Stop observing after the content has been loaded
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null, // Use the viewport as the root
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    // Start observing each extra content element
    extraContents.forEach(content => {
        observer.observe(content);
    });
});
