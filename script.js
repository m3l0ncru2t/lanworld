document.addEventListener('DOMContentLoaded', () => {
    const feedContainer = document.getElementById('feed-container');
    let feedIndex = 0;
    const feedsToLoad = 5; // Number of items to load at a time
    let isLoading = false;

    // Example RSS feed URLs (replace with your actual feed URLs)
    const feedUrls = [
        'https://feeds.megaphone.fm/newheights',
        'https://example.com/feed2.xml'
    ];

    // Function to parse RSS XML and return a list of feed items
    function parseRSS(xml) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(xml, 'text/xml');
        const items = doc.querySelectorAll('item');
        return Array.from(items).map(item => ({
            title: item.querySelector('title').textContent,
            description: item.querySelector('description').textContent,
            link: item.querySelector('link').textContent
        }));
    }

    // Function to load RSS feeds
    async function loadFeeds() {
        if (isLoading || feedIndex >= feedUrls.length) return;
        isLoading = true;

        const url = feedUrls[feedIndex];
        try {
            const response = await fetch(url);
            const xml = await response.text();
            const feedItems = parseRSS(xml);

            feedItems.slice(0, feedsToLoad).forEach(item => {
                const div = document.createElement('div');
                div.className = 'feed-item';
                div.innerHTML = `
                    <h2><a href="${item.link}" target="_blank">${item.title}</a></h2>
                    <p>${item.description}</p>
                `;
                feedContainer.appendChild(div);
            });

            feedIndex++;
        } catch (error) {
            console.error('Error loading feed:', error);
        } finally {
            isLoading = false;
        }
    }

    // Intersection Observer to trigger loading when user scrolls to the bottom
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadFeeds();
            }
        });
    }, {
        root: null,
        threshold: 1.0 // Trigger when the target is fully in view
    });

    // Observe a dummy target at the bottom to trigger loading
    const sentinel = document.createElement('div');
    sentinel.style.height = '1px';
    feedContainer.appendChild(sentinel);
    observer.observe(sentinel);

    // Load initial feeds
    loadFeeds();
});
