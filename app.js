

const slider = document.getElementById('slider');
const slides = slider.children;
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');

let currentIndex = 0;

function updateSlideIndex(index) {
  Array.prototype.forEach.call(slides, function(slide, i) {
    if (i === index) {
      slide.classList.add('opacity-100');
      slide.classList.remove('opacity-0');
    } else {
      slide.classList.remove('opacity-100');
      slide.classList.add('opacity-0');
    }
  });
}

prevButton.addEventListener('click', function() {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlideIndex(currentIndex);
  }
});

nextButton.addEventListener('click', function() {
  if (currentIndex < slides.length - 1) {
    currentIndex++;
    updateSlideIndex(currentIndex);
  }
});

// Auto-slide functionality
setInterval(function() {
  if (currentIndex < slides.length - 1) {
    currentIndex++;
    updateSlideIndex(currentIndex);
  } else {
    currentIndex = 0;
    updateSlideIndex(currentIndex);
  }
}, 3000); // Change the interval time as needed

// Initialize the first slide
slides[0].classList.add('opacity-100');
slides[0].classList.remove('opacity-0');

    // Set the target date to December 15 of the current year
    const targetDate = new Date(new Date().getFullYear(), 11, 15, 0, 0, 0).getTime();

    // Update the countdown every second
    const countdownFunction = setInterval(() => {
      const now = new Date().getTime();
      const timeLeft = targetDate - now;

      // Time calculations for days, hours, minutes, and seconds
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      // Display the result in the corresponding elements
      document.getElementById('days-value').innerText = days;
      document.getElementById('hours-value').innerText = hours;
      document.getElementById('minutes-value').innerText = minutes;
      document.getElementById('seconds-value').innerText = seconds;

      // If the countdown is finished, display "Join the Fun!"
      if (timeLeft < 0) {
        clearInterval(countdownFunction);
        document.getElementById('countdown').classList.add('hidden');
        document.getElementById('message').classList.remove('hidden');
      }
    }, 1000);

// sponsors
    // var copy = document.querySelector(".logos-slide").cloneNode(true);
    // document.querySelector(".logos").appendChild(copy);


  const texts = [
    "Surulere Sparkle Fest 2024",
    "The best event experience you'll ever have!",
    "Awards, Competitions, and Talent Hunts!",
    "Join us for an unforgettable adventure!"
  ];
  let index = 0;  // Current text index
  let charIndex = 0;  // Character index for current text
  let isDeleting = false;  // Whether the text is being erased
  const typingSpeed = 100;  // Speed for typing characters
  const erasingSpeed = 50;  // Speed for erasing characters
  const delayBetweenTexts = 2000;  // Delay before starting to erase

  function typeEffect() {
    const currentText = texts[index];
    const typewriterElement = document.getElementById("typewriter-text");

    if (isDeleting) {
      typewriterElement.innerHTML = currentText.substring(0, charIndex--);
    } else {
      typewriterElement.innerHTML = currentText.substring(0, charIndex++);
    }

    if (!isDeleting && charIndex === currentText.length) {
      setTimeout(() => isDeleting = true, delayBetweenTexts);  // Pause before starting to erase
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      index = (index + 1) % texts.length;  // Move to the next text
    }

    const delay = isDeleting ? erasingSpeed : typingSpeed;
    setTimeout(typeEffect, delay);  // Recursive typing function
  }

  // Start typing effect when the page loads
  window.onload = typeEffect;


