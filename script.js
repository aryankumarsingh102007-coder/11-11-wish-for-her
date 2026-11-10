const message = "Naya saal toh aa gaya, par tere bina baat ke lecture dena aur har baat pe chashma thik karke gussa hona bilkul nahi badla! 🤓😂";
let index = 0;
const speed = 40;

function typeWriter() {
    if (index < message.length) {
        document.getElementById("typedText").innerHTML += message.charAt(index);
        index++;
        setTimeout(typeWriter, speed);
    }
}

window.onload = () => {
    typeWriter();
    initFireworks();
};

function showSecret() {
    const secretBox = document.getElementById("secretBox");
    secretBox.style.display = "block";
    triggerBurst();
}

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
            x: (Math.random() - 0.5) * 7,
            y: (Math.random() - 0.5) * 7
        };
        this.alpha = 1;
        this.friction = 0.95;
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
        this.alpha -= 0.015;
    }
}

function triggerBurst() {
    const colors = ['#f43f5e', '#38bdf8', '#fbbf24', '#a855f7', '#34d399'];
    const x = window.innerWidth / 2;
    const y = window.innerHeight / 3;
    
    for (let i = 0; i < 70; i++) {
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
