//create canvas
let newCanvas = document.getElementById("myCanvas");
//get 2d context
let conxt = newCanvas.getContext("2d");

let particles = [];
let fixedCircles = [];
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
        conxt.beginPath();
        conxt.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        conxt.fillStyle = this.color;
        conxt.shadowColor = this.color;
        conxt.shadowBlur = 10;
        conxt.fill();
        conxt.closePath();
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
                conxt.beginPath();
                conxt.strokeStyle = this.color;
                conxt.lineWidth = 0.2;
                conxt.moveTo(this.x, this.y);
                conxt.lineTo(particles[i].x, particles[i].y);
                conxt.stroke();
                conxt.closePath();
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

            // Attraction towards fixed circles
    for (let i = 0; i < fixedCircles.length; i++) {
        let dx = fixedCircles[i].x - this.x;
        let dy = fixedCircles[i].y - this.y;
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
    conxt.clearRect(0, 0, newCanvas.width, newCanvas.height);

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
    }

    // Draw the fixed circles
    for (let i = 0; i < fixedCircles.length; i++) {
        conxt.beginPath();
        conxt.arc(fixedCircles[i].x, fixedCircles[i].y, fixedCircles[i].radius, 0, Math.PI * 2, false);
        conxt.fillStyle = fixedCircles[i].color;
        conxt.shadowColor = fixedCircles[i].color;
        conxt.shadowBlur = 10;
        conxt.fill();
        conxt.closePath();
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

window.addEventListener("click", function (event) {
    if (event.button === 0) {
        let circle = {
            x: event.x,
            y: event.y,
            radius: 10,
            color: "#FFFFFF"
        };

        fixedCircles.push(circle);
    }
});