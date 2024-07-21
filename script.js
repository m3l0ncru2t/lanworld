import { auth, firestore, signInWithEmailAndPassword, signOut, collection, addDoc, onSnapshot } from './firebase-config.js';

// Comment box functionality
const commentsContainer = document.getElementById('comments-container');
const commentInput = document.getElementById('comment-input');
const submitBtn = document.getElementById('submit-btn');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');

const commentsRef = collection(firestore, 'comments');

loginBtn.addEventListener('click', () => {
    const email = prompt('Enter your email');
    const password = prompt('Enter your password');
    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            loginBtn.style.display = 'none';
            logoutBtn.style.display = 'block';
            submitBtn.disabled = false;
        })
        .catch((error) => alert('Login error: ' + error.message));
});

logoutBtn.addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            loginBtn.style.display = 'block';
            logoutBtn.style.display = 'none';
            submitBtn.disabled = true;
        })
        .catch((error) => alert('Logout error: ' + error.message));
});

submitBtn.addEventListener('click', async () => {
    if (commentInput.value.trim() === '') {
        alert('Please enter a comment.');
        return;
    }

    try {
        await addDoc(commentsRef, {
            text: commentInput.value,
            timestamp: new Date()
        });
        commentInput.value = '';
    } catch (error) {
        alert('Error adding comment: ' + error.message);
    }
});

onSnapshot(commentsRef, (snapshot) => {
    commentsContainer.innerHTML = '';
    snapshot.forEach((doc) => {
        const comment = document.createElement('div');
        comment.className = 'comment';
        comment.textContent = doc.data().text;
        commentsContainer.appendChild(comment);
    });
});

// RSS Feed functionality
async function fetchRSSFeeds() {
    const feedUrls = [
        'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
        'https://feeds.bbci.co.uk/news/rss.xml',
        'https://feeds.feedburner.com/TechCrunch/'
    ];

    const feedContainer = document.getElementById('rss-feed-container');

    for (const url of feedUrls) {
        try {
            const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
            const data = await response.json();
            const parser = new DOMParser();
            const xml = parser.parseFromString(data.contents, 'text/xml');
            const items = xml.querySelectorAll('item');

            const feedSection = document.createElement('div');
            feedSection.className = 'rss-feed-item';

            items.forEach(item => {
                const title = item.querySelector('title').textContent;
                const link = item.querySelector('link').textContent;
                const description = item.querySelector('description').textContent;

                const feedItem = document.createElement('div');
                feedItem.className = 'rss-feed-item';
                feedItem.innerHTML = `
                    <h3><a href="${link}" target="_blank">${title}</a></h3>
                    <p>${description}</p>
                `;
                feedSection.appendChild(feedItem);
            });

            feedContainer.appendChild(feedSection);
        } catch (error) {
            console.error('Error fetching RSS feed:', error);
        }
    }
}

fetchRSSFeeds();
