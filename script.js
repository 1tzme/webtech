// FAQ accordion
const acc = document.querySelectorAll(".accordion");
acc.forEach((accordion) => {
    accordion.addEventListener("click", function() {
        this.classList.toggle("active");
        const panel = this.nextElementSibling;
        panel.style.maxHeight = panel.style.maxHeight ? null : `${panel.scrollHeight}px`;
    });
});

// Popup Logic
const loginIcon = document.querySelector('.icon[alt="Login"]');
const popup = document.getElementById('loginPopup');
const closeBtn = document.querySelector('.close-btn');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const userProfile = document.getElementById('userProfile');
const createAccountLink = document.getElementById('createAccountLink');
const displayUsername = document.getElementById('displayUsername');
const displayEmail = document.getElementById('displayEmail');
const logoutButton = document.getElementById('logoutButton');

// Show popup on icon click
loginIcon.addEventListener('click', function(event) {
    event.preventDefault();
    popup.style.display = 'block';
});

// Close popup on clicking "X" or outside
closeBtn.addEventListener('click', () => popup.style.display = 'none');
window.addEventListener('click', event => {
    if (event.target === popup) popup.style.display = 'none';
});

// Toggle between login and signup
createAccountLink.addEventListener('click', function (event) {
    event.preventDefault();
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
});

loginAccountLink.addEventListener('click', function (event) {
  event.preventDefault();
  loginForm.style.display = 'block';
    signupForm.style.display = 'none';
});

// Signup Validation and Storage
signupForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    
    let valid = true;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        valid = false;
    } else if (password.length < 8 || password !== confirmPassword) {
        alert('Password must be at least 8 characters and match the confirmation.');
        valid = false;
    }

    if (valid) {
        // Store in local storage
        localStorage.setItem('username', username);
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);  // Store password for verification
        localStorage.setItem('isLoggedIn', 'true');

        displayUserProfile();
    }
});

// Login Validation
loginForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    if (email === localStorage.getItem('email')) {
        localStorage.setItem('isLoggedIn', 'true');
        displayUserProfile();
    } else {
        alert('Invalid credentials');
    }
});

// Display Profile
function displayUserProfile() {
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');
    displayUsername.textContent = username || '';
    displayEmail.textContent = email || '';
    loginForm.style.display = 'none';
    signupForm.style.display = 'none';
    userProfile.style.display = 'block';
}

// Logout
logoutButton.addEventListener('click', function () {
    localStorage.setItem('isLoggedIn', 'false');
    userProfile.style.display = 'none';
    loginForm.style.display = 'block';
});

// Check login status on page load
window.addEventListener('load', function () {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        displayUserProfile();
    } else {
        loginForm.style.display = 'block';
    }
});

// Real-time Astana time display
function updateAstanaTime() {
    const astanaTimeElement = document.getElementById('astana-time');
    const astanaTime = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Almaty", year: 'numeric', month: 'long', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric'
    });
    astanaTimeElement.textContent = ` ${astanaTime}`;
}
setInterval(updateAstanaTime, 1000);

// Theme Toggle
const themeToggleButton = document.getElementById('theme-toggle-btn');

function setTheme(theme) {
    document.body.classList.toggle('dark-theme', theme === 'dark');
    document.body.classList.toggle('light-theme', theme !== 'dark');
    themeToggleButton.textContent = theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme';
    localStorage.setItem('theme', theme);
}

themeToggleButton.addEventListener('click', function() {
    const currentTheme = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
    setTheme(currentTheme);
});

window.addEventListener('load', function() {
    setTheme(localStorage.getItem('theme') || 'light');
});

// Rating System
const stars = document.querySelectorAll('#star-rating .star');
stars.forEach(star => {
    star.addEventListener('click', function() {
        stars.forEach(s => s.style.color = 'gray');
        for (let i = 0; i < this.dataset.value; i++) {
            stars[i].style.color = 'gold';
        }
        document.getElementById('dynamic-message').textContent = `You rated this ${this.dataset.value} star(s)! Thank you for your feedback!`;
    });
});

// Content Filter
const filterOptions = document.querySelectorAll(".filter-option");
const contentBlocks = document.querySelectorAll(".content-block");

filterOptions.forEach(option => {
    option.addEventListener("click", function() {
        const selectedSection = option.getAttribute("data-section");
        contentBlocks.forEach(block => {
            block.classList.remove("highlighted");
            block.style.display = block.getAttribute("data-section") === selectedSection ? "block" : "none";
        });
    });
});


const apiKey = 'c6b5f7ee099671aa413318ed3e0a64fb'; // Replace with your API key from OpenWeatherMap
const weatherInfo = document.getElementById('weather-info');

async function fetchWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=Astana&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.cod === 200) { // Check for successful response
            const temperature = data.main.temp;
            const description = data.weather[0].description;
            weatherInfo.textContent = `Temperature: ${temperature}°C, Conditions: ${description}`;
        } else {
            weatherInfo.textContent = "Could not retrieve weather data.";
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        weatherInfo.textContent = "Error loading weather information.";
    }
}

// Call fetchWeather when the page loads
window.addEventListener('load', fetchWeather);
