
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");

        var particles = [];
        var mouse = {
            x: undefined,
            y: undefined
        };

        var colors = ["#ff0000", "#00ff00", "#0000ff", "#ff00ff", "#ffff00"];

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        function Particle(x, y, radius, color) {
            this.x = x;
            this.y = y;
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
                ctx.fill();
            };

            this.update = function () {
                this.draw();

                for (var i = 0; i < particles.length; i++) {
                    if (this === particles[i]) continue;

                    var dx = this.x - particles[i].x;
                    var dy = this.y - particles[i].y;
                    var distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 120) {
                        ctx.beginPath();
                        ctx.strokeStyle = this.color;
                        ctx.lineWidth = 0.2;
                        ctx.moveTo(this.x, this.y);
                        ctx.lineTo(particles[i].x, particles[i].y);
                        ctx.stroke();
                    }
                }

                if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
                    this.velocity.x = -this.velocity.x;
                }

                if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
                    this.velocity.y = -this.velocity.y;
                }

                this.x += this.velocity.x;
                this.y += this.velocity.y;

                // 鼠标靠近效果
                if (
                    mouse.x - this.x < 50 &&
                    mouse.x - this.x > -50 &&
                    mouse.y - this.y < 50 &&
                    mouse.y - this.y > -50
                ) {
                    if (this.radius < 40) {
                        this.radius += 1;
                    }
                } else if (this.radius > 2) {
                    this.radius -= 1;
                }
            };
        }

        function init() {
            particles = [];

            for (var i = 0; i < 50; i++) {
                var radius = Math.random() * 3 + 1;
                var x = Math.random() * (canvas.width - radius * 2) + radius;
                var y = Math.random() * (canvas.height - radius * 2) + radius;
                var color = colors[Math.floor(Math.random() * colors.length)];

                particles.push(new Particle(x, y, radius, color));
            }
        }

        function animate() {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (var i = 0; i < particles.length; i++) {
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
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            init();
        });