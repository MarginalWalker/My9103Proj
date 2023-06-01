//create canvas
let newCanvas = document.getElementById("myCanvas");
//get 2d context
let ctx = newCanvas.getContext("2d");

let particles = [];
let mouse = {
    x: undefined,
    y: undefined
};

let colors = ["#E95D0F", "#FF5722", "#FF9800", "#FFC107", "#FFEB3B"];

newCanvas.width = window.innerWidth;
newCanvas.height = window.innerHeight;

function Particle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.speed = 0.02;
    this.radius = radius;
    this.color = color;
    this.velocity = {
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2
    };

    this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.closePath();
    };

    this.update = function () {
        this.draw();

        for (let i = 0; i < particles.length; i++) {
            if (this === particles[i]) continue;

            let dx = this.x - particles[i].x;
            let dy = this.y - particles[i].y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            //draw the line between the star
            if (distance < 120) {
                ctx.beginPath();
                ctx.strokeStyle = this.color;
                ctx.lineWidth = 0.2;
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(particles[i].x, particles[i].y);
                ctx.stroke();
                ctx.closePath();
            }
        }

        if (this.x + this.radius > newCanvas.width || this.x - this.radius < 0) {
            this.velocity.x = -this.velocity.x;
        }

        if (this.y + this.radius > newCanvas.height || this.y - this.radius < 0) {
            this.velocity.y = -this.velocity.y;
        }

        this.x += this.velocity.x;
        this.y += this.velocity.y;

        // 鼠标靠近效果
        // if (
        //     mouse.x - this.x < 50 &&
        //     mouse.x - this.x > -50 &&
        //     mouse.y - this.y < 50 &&
        //     mouse.y - this.y > -50
        // ) {
        //     if (this.radius < 40) {
        //         this.radius += 2;
        //     }
        // } else if (this.radius > 2) {
        //     this.radius -= 2;
        // }


        
            // Attraction towards mouse cursor
            if (mouse.x && mouse.y) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
        
                if (distance < 200) {
                    this.velocity.x += (dx / distance) * this.speed;
                    this.velocity.y += (dy / distance) * this.speed;
                }
            }
        
            
        
    };
}

function init() {
    particles = [];

    for (let i = 0; i < 50; i++) {
        let radius = Math.random() * 5 + 1;
        let x = Math.random() * (newCanvas.width - radius * 2) + radius;
        let y = Math.random() * (newCanvas.height - radius * 2) + radius;
        let color = colors[Math.floor(Math.random() * colors.length)];

        particles.push(new Particle(x, y, radius, color));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, newCanvas.width, newCanvas.height);

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
    }
}

init();
animate();

window.addEventListener("mousemove", function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener("resize", function () {
    newCanvas.width = window.innerWidth;
    newCanvas.height = window.innerHeight;

    init();
});