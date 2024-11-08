// faq accordion
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}

// popup
// show popup when clicking
const loginIcon = document.querySelector('.icon[alt="Login"]');
const popup = document.getElementById('loginPopup');
const closeBtn = document.querySelector('.close-btn');

loginIcon.addEventListener('click', function(event) {
    event.preventDefault();
    popup.style.display = 'block';
});

// close popup when clicking x
closeBtn.addEventListener('click', function() {
    popup.style.display = 'none';
});

// close popup when clicking outside
window.addEventListener('click', function(event) {
    if (event.target === popup) {
        popup.style.display = 'none';
    }
});

// form validation
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    let valid = true;

    document.getElementById('emailError').style.display = 'none';
    document.getElementById('passwordError').style.display = 'none';
    document.getElementById('confirmPasswordError').style.display = 'none';

    // email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address.';
        document.getElementById('emailError').style.display = 'block';
        valid = false;
    }

    // password validation
    if (password.length < 8) {
        document.getElementById('passwordError').textContent = 'Password must be at least 8 characters long.';
        document.getElementById('passwordError').style.display = 'block';
        valid = false;
    }

    // confirm password validation
    if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').textContent = 'Passwords do not match.';
        document.getElementById('confirmPasswordError').style.display = 'block';
        valid = false;
    }

    if (valid) {
        alert('Login successful!');
        const userEmail = email;
        const userPassword = password;

        console.log(`Email: ${userEmail}`);
        console.log(`Password: ${userPassword}`);

        // close the popup after login successful
        popup.style.display = 'none';
    }
});


// background color change
const colorOptions = document.querySelectorAll('.color-option');

colorOptions.forEach(option => {
  option.addEventListener('click', (event) => {
    event.preventDefault();
    const selectedColor = option.getAttribute('data-color');
    document.body.style.backgroundColor = selectedColor;
  });
});

// rating system
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

// current date and time in astana
document.getElementById('show-time-btn').addEventListener('click', function() {
  const astanaTimeElement = document.getElementById('astana-time');
  
  if (astanaTimeElement.style.display === 'none' || astanaTimeElement.style.display === '') {
      const now = new Date();
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
      astanaTimeElement.textContent = now.toLocaleDateString('en', options);
      astanaTimeElement.style.display = 'block';
      this.textContent = 'Hide current time in Astana';

      const hour = now.getHours();
      let greeting;

      switch (true) {
          case (hour < 12):
              greeting = "Good Morning!";
              break;
          case (hour < 18):
              greeting = "Good Afternoon!";
              break;
          case (hour <= 23):
              greeting = "Good Evening!";
              break;
          default:
              greeting = "Hello!";
              break;
      }

      alert(greeting);
      
  } else {
      astanaTimeElement.style.display = 'none';
      this.textContent = 'Show current time in Astana';
  }
});

//sound effects
const sound_effect1 = new Audio('htmlfiles/sounds/snow_sound.mp3');
document.getElementById('sound-btn1').addEventListener('click', () => {
  if (sound_effect1.paused) {
    sound_effect1.play();
  }
  else {
    sound_effect1.pause();
  }
});

const sound_effect2 = new Audio('htmlfiles/sounds/footsteps_in_snow.mp3');
document.getElementById('sound-btn2').addEventListener('click', () => {
  if (sound_effect2.paused) {
    sound_effect2.play();
  }
  else {
    sound_effect2.pause();
  }
});

// filter option
document.addEventListener("DOMContentLoaded", function() {
  const filterOptions = document.querySelectorAll(".filter-option");
  const contentBlocks = document.querySelectorAll(".content-block");

  filterOptions.forEach(option => {
      option.addEventListener("click", function() {
          const selectedSection = option.getAttribute("data-section");

          contentBlocks.forEach(block => {
              block.classList.remove("highlighted");
              block.style.display = "none";
          });

          const selectedBlock = document.querySelector(`.content-block[data-section="${selectedSection}"]`);
          if (selectedBlock) {
              selectedBlock.style.display = "block";
              selectedBlock.classList.add("highlighted");
          }
      });
  });
});