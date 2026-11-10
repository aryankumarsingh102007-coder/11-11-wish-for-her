const message = "Sach bolu toh 2026 mein tera har baat pe gussa karna, mujhe padhai ke liye daantna aur har choti baat pe lecture dena sabse pyaari cheez thi... Shayad humari nok-jhok na ho toh din hi nahi banta. Tu bas aise hi hasti reh, apne sapne poore kar, aur baaki sab theek hai. Happy New Year, Chasmish! 🥺✨";
let index = 0;
const speed = 35;
let isOpen = false;

function openCard() {
    if (isOpen) return;
    isOpen = true;

    // Flip the 3D Card
    document.getElementById("greetingCard").classList.add("open");

    // Play Music
    const music = document.getElementById("bgMusic");
    music.play().catch(e => console.log("Audio play blocked", e));

    // Trigger Fireworks Burst
    triggerBurst();

    // Start Typewriter Effect after card flips
    setTimeout(typeWriter, 600);
}

function typeWriter() {
    if (index < message.length) {
        document.getElementById("typedText").innerHTML += message.charAt(index);
        index++;
        setTimeout(typeWriter, speed);
    }
}

// Canvas Fireworks Engine
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.velocity = {
            x: (Math.random() - 0.5) * 8,
            y: (Math.random() - 0.5) * 8
        };
        this.alpha = 1;
        this.friction = 0.94;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }

    update() {
        this.velocity.x *= this.friction;
        this.velocity.y *= this.friction;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.012;
    }
}

function triggerBurst() {
    const colors = ['#f43f5e', '#38bdf8', '#fbbf24', '#a855f7', '#34d399'];
    const x = window.innerWidth / 2;
    const y = window.innerHeight / 3;
    
    for (let i = 0; i < 100; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push(new Particle(x, y, color));
    }
}

function initFireworks() {
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((particle, index) => {
            if (particle.alpha > 0) {
                particle.update();
                particle.draw();
            } else {
                particles.splice(index, 1);
            }
        });
    }
    animate();
}

window.onload = () => {
    initFireworks();
};
