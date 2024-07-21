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


