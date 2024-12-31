// Countdown Timer
const countdown = document.getElementById('countdown');
const daysElem = document.getElementById('days');
const hoursElem = document.getElementById('hours');
const minutesElem = document.getElementById('minutes');
const secondsElem = document.getElementById('seconds');

const newYear = new Date(new Date().getFullYear() + 1, 0, 1);

function updateCountdown() {
  const now = new Date();
  const diff = newYear - now;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  daysElem.textContent = days.toString().padStart(2, '0');
  hoursElem.textContent = hours.toString().padStart(2, '0');
  minutesElem.textContent = minutes.toString().padStart(2, '0');
  secondsElem.textContent = seconds.toString().padStart(2, '0');
}

setInterval(updateCountdown, 1000);

// Fireworks Effect
const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 6 + 4; // Larger particles
    this.speedX = Math.random() * 5 - 2.5; // Wider spread horizontally
    this.speedY = Math.random() * 5 - 2.5; // Wider spread vertically
    this.color = color;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.size *= 0.95; // Gradual shrink
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function addFirework() {
  const colors = ['#ff4757', '#3742fa', '#2ed573', '#ffa502', '#ff6b81'];
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const color = colors[Math.floor(Math.random() * colors.length)];

  // Add more particles for a denser firework
  for (let i = 0; i < 100; i++) {
    particles.push(new Particle(x, y, color));
  }
}

function animate() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle, index) => {
    if (particle.size <= 0.2) {
      particles.splice(index, 1);
    } else {
      particle.update();
      particle.draw();
    }
  });

  requestAnimationFrame(animate);
}

setInterval(addFirework, 700); // Fireworks frequency
animate();
