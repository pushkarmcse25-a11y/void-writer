window.onscroll = () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById("progressBar").style.width = scrolled + "%";
};

// 2. INTERACTIVE CTA FEEDBACK
// Replaces the basic alert with a timed button state change
document.querySelector('.cta-btn').onclick = function(e) {
    e.preventDefault();
    this.innerHTML = "Opening Mailbox...";
    this.style.background = "#333";
    
    setTimeout(() => {
        window.location.href = "mailto:hello@voidwriter.com";
        this.innerHTML = "Get Started";
        this.style.background = "#000";
    }, 800);
};




const greetingMsg = document.getElementById('greeting');
const hour = new Date().getHours();
let welcome;

if (hour < 12) welcome = "Good Morning. ";
else if (hour < 18) welcome = "Good Afternoon. ";
else welcome = "Good Evening. ";

// This adds the greeting to your existing text
greetingMsg.prepend(welcome);





const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
const mouse = { x: null, y: null, radius: 150 };

// Resize canvas to window
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
window.dispatchEvent(new Event('resize'));

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;

        // Mouse Interaction Logic
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        if (distance < mouse.radius) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) this.x += 2;
            if (mouse.x > this.x && this.x > this.size * 10) this.x -= 2;
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) this.y += 2;
            if (mouse.y > this.y && this.y > this.size * 10) this.y -= 2;
        }
    }
    draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    particles = [];
    for (let i = 0; i < 100; i++) particles.push(new Particle());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        // Drawing connecting lines
        for (let j = i; j < particles.length; j++) {
            let dx = particles[i].x - particles[j].x;
            let dy = particles[i].y - particles[j].y;
            let dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < 100) {
                ctx.strokeStyle = `rgba(255, 255, 255, ${1 - dist/100})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animate);
}

init();
animate();
