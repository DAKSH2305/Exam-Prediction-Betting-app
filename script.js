// Initialize user data
// Try to read stored user info from localStorage (signup/login behavior stores these)
let userPoints = parseInt(localStorage.getItem('userPoints')) || 1000;
let totalWagered = 150;
let potentialWin = 320;

// DOM Elements
const userPointsElement = document.getElementById('userPoints');
const totalWageredElement = document.getElementById('totalWagered');
const potentialWinElement = document.getElementById('potentialWin');
const betButtons = document.querySelectorAll('.bet-btn');

// Update points display
function updatePointsDisplay() {
    userPointsElement.textContent = userPoints;
    totalWageredElement.textContent = totalWagered;
    potentialWinElement.textContent = potentialWin;
}

// Betting functionality
betButtons.forEach(button => {
    button.addEventListener('click', function() {
        const points = parseInt(this.getAttribute('data-points'));
        
        if (userPoints >= points) {
            // Deduct points
            userPoints -= points;
            totalWagered += points;
            potentialWin += Math.floor(points * 1.5);
            
            // Update display
            updatePointsDisplay();
            
            // Visual feedback
            this.style.background = 'var(--success)';
            this.style.color = 'white';
            this.textContent = `✓ ${points} Points`;
            
            // Reset button after 2 seconds
            setTimeout(() => {
                this.style.background = '';
                this.style.color = '';
                this.textContent = `${points} Points`;
            }, 2000);
            
            // Show success message
            showNotification(`Successfully placed ${points} point bet!`, 'success');
        } else {
            showNotification('Not enough points!', 'error');
        }
    });
});

// Notification system
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${type === 'success' ? 'var(--success)' : 'var(--danger)'};
        color: white;
        border-radius: 5px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add CSS for animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;
document.head.appendChild(style);

// Button event listeners
document.getElementById('loginBtn').addEventListener('click', () => {
    showNotification('Login feature coming soon!', 'success');
});

document.getElementById('signupBtn').addEventListener('click', () => {
    showNotification('Sign up feature coming soon!', 'success');
});

document.getElementById('browseCourses').addEventListener('click', () => {
    document.getElementById('markets').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('howItWorks').addEventListener('click', () => {
    document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' });
});

// View market buttons
document.querySelectorAll('.view-market').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelector('.prediction-section').scrollIntoView({ behavior: 'smooth' });
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Initialize the page
updatePointsDisplay();

// Update UI with stored username if available
function updateUserUI() {
    const userName = localStorage.getItem('userName');
    const welcomeHeading = document.getElementById('welcomeHeading');
    const currentUserName = document.getElementById('currentUserName');
    const currentUserPoints = document.getElementById('currentUserPoints');

    if (userName) {
        if (welcomeHeading) welcomeHeading.textContent = `Welcome ${userName}`;
        if (currentUserName) currentUserName.textContent = `${userName} (you)`;
    }

    // Update points shown on leaderboard for current user if stored
    const storedPoints = localStorage.getItem('userPoints');
    if (storedPoints && currentUserPoints) {
        currentUserPoints.textContent = `${parseInt(storedPoints).toLocaleString()} points`;
    }
}

updateUserUI();