document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('show-register').addEventListener('click', showRegisterForm);
    document.getElementById('show-login').addEventListener('click', showLoginForm);
    document.querySelectorAll('#back-to-landing').forEach(button => {
        button.addEventListener('click', showLandingPage);
    });
    document.getElementById('register-button').addEventListener('click', register);
    document.getElementById('login-button').addEventListener('click', login);
    document.getElementById('post-button').addEventListener('click', postComment);
    document.getElementById('avatar-upload').addEventListener('change', handleAvatarUpload);

    // Load existing comments
    loadComments();
});

let currentUser = null;

function showRegisterForm() {
    document.getElementById('landing-page').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
}

function showLoginForm() {
    document.getElementById('landing-page').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
}

function showLandingPage() {
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('landing-page').style.display = 'block';
}

function register() {
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;

    if (username && password) {
        if (localStorage.getItem(username)) {
            alert('Username already exists');
        } else {
            localStorage.setItem(username, password);
            localStorage.setItem(`${username}-avatar`, 'default-avatar.png'); // Default avatar
            alert('Registration successful');
            // Hide the registration form and show the login form
            document.getElementById('register-form').style.display = 'none';
            document.getElementById('login-form').style.display = 'block';
        }
    } else {
        alert('Please enter both username and password');
    }
}


function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        const storedPassword = localStorage.getItem(username);
        if (storedPassword && storedPassword === password) {
            currentUser = {
                username: username,
                avatar: localStorage.getItem(`${username}-avatar`) || 'default-avatar.png'
            };
            document.getElementById('login-form').style.display = 'none';
            document.getElementById('comment-input').style.display = 'flex';
            document.getElementById('user-avatar').src = currentUser.avatar;
        } else {
            alert('Invalid username or password');
        }
    } else {
        alert('Please enter both username and password');
    }
}



// Event listener for the upload button
document.getElementById('upload-button').addEventListener('click', function() {
    document.getElementById('comment-image-upload').click();
});

// Handle file upload
document.getElementById('comment-image-upload').addEventListener('change', function() {
    // You can add a preview feature here if needed
});

// Function to post a comment
function postComment() {
    const commentText = document.getElementById('comment-text').value;
    const commentImageFile = document.getElementById('comment-image-upload').files[0];
    
    if (commentText || commentImageFile) {
        const comments = JSON.parse(localStorage.getItem('comments')) || [];
        const newComment = {
            id: Date.now(), // Unique identifier for the comment
            username: currentUser.username,
            avatar: currentUser.avatar,
            text: commentText,
            timestamp: new Date().toLocaleString(), // Add timestamp
            image: null
        };

        if (commentImageFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                newComment.image = e.target.result;
                comments.push(newComment); // Add new comment to the end of the array
                localStorage.setItem('comments', JSON.stringify(comments));
                displayComment(newComment);

                document.getElementById('comment-text').value = '';
                document.getElementById('comment-image-upload').value = ''; // Clear the file input
            };
            reader.readAsDataURL(commentImageFile);
        } else {
            comments.push(newComment); // Add new comment without image
            localStorage.setItem('comments', JSON.stringify(comments));
            displayComment(newComment);

            document.getElementById('comment-text').value = '';
        }
    } else {
        alert('Please enter a comment or upload an image');
    }
}

// Function to display a comment
function displayComment(comment) {
    const commentSection = document.getElementById('comments');
    const newComment = document.createElement('div');
    newComment.classList.add('comment');
    newComment.dataset.id = comment.id; // Store the comment ID for deletion

    const userAvatar = document.createElement('img');
    userAvatar.src = comment.avatar;
    userAvatar.alt = `${comment.username}'s avatar`;
    userAvatar.classList.add('avatar'); // Apply the avatar class

    const commentContent = document.createElement('p');

    const usernameSpan = document.createElement('span');
    usernameSpan.classList.add('username');
    usernameSpan.textContent = `${comment.username}: `;

    const commentText = document.createTextNode(comment.text);

    const timestampSpan = document.createElement('span');
    timestampSpan.classList.add('timestamp');
    timestampSpan.textContent = ` (${comment.timestamp})`; // Display timestamp

    commentContent.appendChild(usernameSpan);
    commentContent.appendChild(commentText);
    commentContent.appendChild(timestampSpan);

    if (comment.image) {
        const commentImage = document.createElement('img');
        commentImage.src = comment.image; // Use the data URL
        commentImage.alt = 'Comment image';
        commentImage.classList.add('comment-image'); // Apply the comment-image class
        commentContent.appendChild(commentImage);
    }

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', () => deleteComment(comment.id));

    newComment.appendChild(userAvatar);
    newComment.appendChild(commentContent);
    newComment.appendChild(deleteButton);

    commentSection.insertBefore(newComment, commentSection.firstChild);
}













document.addEventListener('DOMContentLoaded', () => {
    const appDiv = document.getElementById('app');
    const API_URL = 'https://api.github.com/repos/m3l0ncru2t/lanworld/issues';
    const TOKEN = ''; // Store securely on server side

    function loadLoginSection() {
        appDiv.innerHTML = `
            <div id="login-section">
                <h2>Login</h2>
                <form id="login-form">
                    <input type="text" id="login-username" placeholder="Username" required>
                    <input type="password" id="login-password" placeholder="Password" required>
                    <button type="submit">Login</button>
                </form>
                <button id="show-register">Register</button>
            </div>
        `;
        document.getElementById('show-register').addEventListener('click', loadRegisterSection);
        document.getElementById('login-form').addEventListener('submit', handleLogin);
    }

    function loadRegisterSection() {
        appDiv.innerHTML = `
            <div id="register-section">
                <h2>Register</h2>
                <form id="register-form">
                    <input type="text" id="register-username" placeholder="Username" required>
                    <input type="password" id="register-password" placeholder="Password" required>
                    <button type="submit">Register</button>
                </form>
                <button id="show-login">Login</button>
            </div>
        `;
        document.getElementById('show-login').addEventListener('click', loadLoginSection);
        document.getElementById('register-form').addEventListener('submit', handleRegister);
    }

    function loadCommentSection() {
        const username = localStorage.getItem('username');
        appDiv.innerHTML = `
            <div id="comment-section">
                <div id="user-info">
                    <img id="avatar" src="user-avatar.png" alt="Avatar">
                    <span id="user-name">${username}</span>
                </div>
                <textarea id="comment-box" placeholder="Write your comment here..."></textarea>
                <button id="post-comment">Post Comment</button>
                <div id="comments">
                    <!-- Comments will appear here -->
                </div>
                <button id="logout">Logout</button>
            </div>
        `;
        document.getElementById('post-comment').addEventListener('click', postComment);
        document.getElementById('logout').addEventListener('click', handleLogout);

        fetchComments();
    }

    async function handleLogin(event) {
        event.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        if (localStorage.getItem(`user-${username}`) === password) {
            localStorage.setItem('username', username);
            loadCommentSection();
        } else {
            alert('Invalid credentials');
        }
    }

    async function handleRegister(event) {
        event.preventDefault();
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;

        if (!localStorage.getItem(`user-${username}`)) {
            localStorage.setItem(`user-${username}`, password);
            alert('Registration successful. Please log in.');
            loadLoginSection();
        } else {
            alert('Username already exists.');
        }
    }

    async function postComment() {
        const commentText = document.getElementById('comment-box').value;
        const username = localStorage.getItem('username');

        if (commentText.trim()) {
            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Authorization': `token ${TOKEN}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        title: `Comment by ${username}`,
                        body: commentText
                    })
                });

                if (response.ok) {
                    const comment = await response.json();
                    addCommentToDom(comment);
                    document.getElementById('comment-box').value = '';
                } else {
                    alert('Failed to post comment');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error posting comment');
            }
        }
    }

    async function fetchComments() {
        try {
            const response = await fetch(API_URL, {
                headers: {
                    'Authorization': `token ${TOKEN}`
                }
            });

            if (response.ok) {
                const comments = await response.json();
                comments.forEach(addCommentToDom);
            } else {
                alert('Failed to load comments');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error loading comments');
        }
    }

    function addCommentToDom(comment) {
        const commentsDiv = document.getElementById('comments');
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');
        commentDiv.innerHTML = `<strong>${comment.user.login}</strong>: ${comment.body}`;
        commentsDiv.appendChild(commentDiv);
    }

    function handleLogout() {
        localStorage.removeItem('username');
        loadLoginSection();
    }

    // Initial load
    if (localStorage.getItem('username')) {
        loadCommentSection();
    } else {
        loadLoginSection();
    }
});


















function postComment() {
    const commentText = document.getElementById('comment-text').value;
    const commentImageFile = document.getElementById('comment-image-upload').files[0];
    
    if (commentText || commentImageFile) {
        const comments = JSON.parse(localStorage.getItem('comments')) || [];
        const newComment = {
            id: Date.now(), // Unique identifier for the comment
            username: currentUser.username,
            avatar: currentUser.avatar,
            text: commentText,
            timestamp: new Date().toLocaleString(), // Add timestamp
            image: null
        };

        if (commentImageFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                newComment.image = e.target.result;
                comments.push(newComment); // Add new comment to the end of the array
                localStorage.setItem('comments', JSON.stringify(comments));
                displayComment(newComment);

                document.getElementById('comment-text').value = '';
                document.getElementById('comment-image-upload').value = ''; // Clear the file input
            };
            reader.readAsDataURL(commentImageFile);
        } else {
            comments.push(newComment); // Add new comment without image
            localStorage.setItem('comments', JSON.stringify(comments));
            displayComment(newComment);

            document.getElementById('comment-text').value = '';
        }
    } else {
        alert('Please enter a comment or upload an image');
    }
}


function loadComments() {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];

    comments.forEach(comment => {
        displayComment(comment);
    });
}

function displayComment(comment) {
    const commentSection = document.getElementById('comments');
    const newComment = document.createElement('div');
    newComment.classList.add('comment');
    newComment.dataset.id = comment.id; // Store the comment ID for deletion

    const userAvatar = document.createElement('img');
    userAvatar.src = comment.avatar;
    userAvatar.alt = `${comment.username}'s avatar`;
    userAvatar.classList.add('avatar'); // Apply the avatar class

    const commentContent = document.createElement('p');

    const usernameSpan = document.createElement('span');
    usernameSpan.classList.add('username');
    usernameSpan.textContent = `${comment.username}: `;

    const commentText = document.createTextNode(comment.text);

    const timestampSpan = document.createElement('span');
    timestampSpan.classList.add('timestamp');
    timestampSpan.textContent = ` (${comment.timestamp})`; // Display timestamp

    commentContent.appendChild(usernameSpan);
    commentContent.appendChild(commentText);
    commentContent.appendChild(timestampSpan);

    if (comment.image) {
        const commentImage = document.createElement('img');
        commentImage.src = comment.image; // Use the data URL
        commentImage.alt = 'Comment image';
        commentImage.classList.add('comment-image'); // Apply the comment-image class
        commentContent.appendChild(commentImage);
    }

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', () => deleteComment(comment.id));

    newComment.appendChild(userAvatar);
    newComment.appendChild(commentContent);
    newComment.appendChild(deleteButton);

    commentSection.insertBefore(newComment, commentSection.firstChild);
}


function deleteComment(commentId) {
    if (!currentUser) {
        alert('You must be logged in to delete comments');
        return;
    }

    let comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments = comments.filter(comment => comment.id !== commentId);
    localStorage.setItem('comments', JSON.stringify(comments));
    document.getElementById('comments').innerHTML = '';
    loadComments();
}

document.addEventListener('DOMContentLoaded', () => {
    // Other initializations...

    document.getElementById('avatar-button').addEventListener('click', () => {
        document.getElementById('avatar-upload').click();
    });

    document.getElementById('avatar-upload').addEventListener('change', handleAvatarUpload);
});

function handleAvatarUpload(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const avatarURL = e.target.result;
            // Update the current user's avatar
            if (currentUser) {
                currentUser.avatar = avatarURL;
                document.getElementById('user-avatar').src = avatarURL;
                localStorage.setItem(`${currentUser.username}-avatar`, avatarURL);
            }
        };
        reader.readAsDataURL(file);
    } else {
        alert('Please upload a valid image file');
    }
}


