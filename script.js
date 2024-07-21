// script.js
document.addEventListener('DOMContentLoaded', () => {
    let loading = false;
    const contentContainer = document.getElementById('content-container');
    const loadingSpinner = document.getElementById('loading-spinner');
    
    const loadContent = async () => {
        if (loading) return;
        loading = true;
        loadingSpinner.style.display = 'block';

        // Simulate a network request
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Load new content
        for (let i = 0; i < 3; i++) {
            const newSegment = document.createElement('div');
            newSegment.className = 'content-segment';
            newSegment.innerHTML = `<p>Content segment ${contentContainer.children.length + 1}</p>`;
            contentContainer.appendChild(newSegment);
        }

        loadingSpinner.style.display = 'none';
        loading = false;
    };

    const handleScroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
            loadContent();
        }
    };

    window.addEventListener('scroll', handleScroll);

    // Initial load
    loadContent();
});
