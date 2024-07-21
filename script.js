document.addEventListener('DOMContentLoaded', () => {
    const contents = document.querySelectorAll('.content-to-load');
    let currentIndex = 0;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Show the current element
                entry.target.style.opacity = '1';
                entry.target.style.visibility = 'visible';
                
                // Move to the next element in the sequence
                currentIndex++;
                if (currentIndex < contents.length) {
                    observer.observe(contents[currentIndex]);
                }
            }
        });
    }, {
        root: null, // Use the viewport as the root
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    // Start observing the first element
    if (contents.length > 0) {
        observer.observe(contents[currentIndex]);
    }
});
