document.addEventListener('DOMContentLoaded', () => {
    const contents = document.querySelectorAll('.content-to-load');
    let currentIndex = 0;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Make sure only the current element is visible
                contents.forEach((content, index) => {
                    if (index <= currentIndex) {
                        content.style.opacity = '1';
                        content.style.visibility = 'visible';
                    } else {
                        content.style.opacity = '0';
                        content.style.visibility = 'hidden';
                    }
                });

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
