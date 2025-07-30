const wrapper = document.querySelector(".wrapper");
const question = document.querySelector(".question");
const gif = document.querySelector(".gif");
const yesBtn = document.querySelector(".yes-btn");
const noBtn = document.querySelector(".no-btn");
const heartsContainer = document.getElementById("hearts");

// Create floating hearts
function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerHTML = Math.random() > 0.5 ? "💖" : (Math.random() > 0.5 ? "💕" : "🌸");
  heart.style.left = Math.random() * 100 + "%";
  heart.style.animationDuration = (Math.random() * 3 + 3) + "s";
  heart.style.opacity = Math.random();
  heartsContainer.appendChild(heart);
  
  setTimeout(() => {
    heart.remove();
  }, 6000);
}

// Create hearts continuously
setInterval(createHeart, 300);

// Add sparkle effect
function createSparkle(x, y) {
  const sparkle = document.createElement("div");
  sparkle.innerHTML = "✨";
  sparkle.style.position = "fixed";
  sparkle.style.left = x + "px";
  sparkle.style.top = y + "px";
  sparkle.style.pointerEvents = "none";
  sparkle.style.zIndex = "1000";
  sparkle.style.animation = "sparkleAnim 1s ease-out forwards";
  document.body.appendChild(sparkle);
  
  setTimeout(() => sparkle.remove(), 1000);
}

// Add sparkle animation to CSS dynamically
const style = document.createElement("style");
style.textContent = `
  @keyframes sparkleAnim {
    0% { transform: scale(0) rotate(0deg); opacity: 1; }
    50% { transform: scale(1) rotate(180deg); opacity: 1; }
    100% { transform: scale(0) rotate(360deg); opacity: 0; }
  }
`;
document.head.appendChild(style);

let noClickCount = 0;
const sadMessages = [
  "🥺 Ma dai...",
  "😢 Ripensaci!",
  "💔 Il mio cuore...",
  "🙏 Ti prego!",
  "😭 Solo una volta!",
  "💕 Per favore Denisa!"
];

yesBtn.addEventListener("click", (e) => {
  createSparkle(e.clientX, e.clientY);
  
  question.innerHTML = "🎉 Yay! Ci vediamo il 3 dicembre! 🎉";
  gif.src = "https://media.giphy.com/media/UMon0fuimoAN9ueUNP/giphy.gif";
  
  // Create explosion of hearts
  for(let i = 0; i < 20; i++) {
    setTimeout(() => {
      createSparkle(
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight
      );
    }, i * 100);
  }
  
  // Hide buttons
  document.querySelector(".btn-group").style.display = "none";
  
  // Change background to celebration
  document.body.style.background = "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)";
});

// Function to move the No button (shared by both hover and touch)
function moveNoButton() {
  const wrapper = document.querySelector(".wrapper");
  const wrapperRect = wrapper.getBoundingClientRect();
  const noBtnRect = noBtn.getBoundingClientRect();
  
  // Calculate boundaries within the wrapper container
  const minX = wrapperRect.left + 10; // 10px padding from edge
  const maxX = wrapperRect.right - noBtnRect.width - 10;
  const minY = wrapperRect.top + 60; // Leave space for title
  const maxY = wrapperRect.bottom - noBtnRect.height - 10;
  
  // Generate random position within wrapper bounds
  const randomX = Math.floor(Math.random() * (maxX - minX)) + minX;
  const randomY = Math.floor(Math.random() * (maxY - minY)) + minY;

  noBtn.style.position = "fixed";
  noBtn.style.left = randomX + "px";
  noBtn.style.top = randomY + "px";
  noBtn.style.transition = "all 0.3s ease";
  
  // Change message occasionally
  if(noClickCount < sadMessages.length) {
    question.innerHTML = sadMessages[noClickCount] + " Usciresti con me? 💖";
    noClickCount++;
  }
  
  // Add sad effect
  gif.style.filter = "grayscale(50%)";
  setTimeout(() => {
    gif.style.filter = "none";
  }, 1000);
}

// Desktop: move on hover
noBtn.addEventListener("mouseover", moveNoButton);

// Mobile: move on touch events
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault(); // Prevent default touch behavior
  moveNoButton();
});

// Also handle click events for mobile (as backup)
noBtn.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent actual click
  moveNoButton();
  return false; // Ensure the click doesn't do anything
});

// Prevent context menu on the button
noBtn.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

// Add hover effects to buttons
yesBtn.addEventListener("mouseenter", () => {
  createSparkle(
    yesBtn.getBoundingClientRect().left + yesBtn.offsetWidth/2,
    yesBtn.getBoundingClientRect().top + yesBtn.offsetHeight/2
  );
});

// Prevent context menu on images
gif.addEventListener("contextmenu", (e) => e.preventDefault());
