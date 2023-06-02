
//creat a start page
let startPage = document.getElementById("startPage");


//create canvas
let myCanvas = document.getElementById("myCanvas");
//get 2d context
let ctx = myCanvas.getContext("2d");
//set the default status of web page
let deleteMode = false;

let glowingParticles = [];
let lightPoints = [];

//initial mouse
let mouse = {
    x: undefined,
    y: undefined
};

//initial Star colors

// let colors = ["#9DD9D2", "#79BCB8", "#5EC2B7", "#45B4AE", "#2CA6A4"];
// let colors = ["#2F4B26", "#3E885B", "#85BDA6", "#C0D7BB", "#D0E1CC"];
// let colors = ["#3F111F", "#4F1329", "#70163C", "#893E5E", "#91607A"];
let colors = ["#E95D0F", "#FF5722", "#FF9800", "#FFC107", "#FFEB3B"];

myCanvas.width = window.innerWidth;
myCanvas.height = window.innerHeight;


//construct particles class
class glowingParticle {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.speed = 0.01;
        this.radius = radius;
        this.color = color;
        this.velocity = {
            x: (Math.random() - 0.5),
            y: (Math.random() - 0.5)
        };
    }


    draw () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.closePath();
    }



    update () {
        this.draw();

        // Calculate the scaling factor based on the current canvas size
        let scalingFacter = Math.min(myCanvas.width / 800, myCanvas.height / 600);

        for (let i = 0; i < glowingParticles.length; i++) {
            if (this === glowingParticles[i])
                continue;
            let dx = this.x - glowingParticles[i].x;
            let dy = this.y - glowingParticles[i].y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            // Adjust the distance threshold based on the scaling factor
            let maxDistance = 80 * scalingFacter;

            //draw the line between the parstsl
            if (distance < maxDistance) {
                ctx.beginPath();
                ctx.strokeStyle = this.color;
                ctx.lineWidth = 0.2;
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(glowingParticles[i].x, glowingParticles[i].y);
                ctx.stroke();
                ctx.closePath();
            }
        }

        // No glowingParticles running off the screen
        if (this.x + this.radius > myCanvas.width || this.x - this.radius < 0) {
            this.velocity.x = -this.velocity.x;
        }

        if (this.y + this.radius > myCanvas.height || this.y - this.radius < 0) {
            this.velocity.y = -this.velocity.y;
        }

        this.x += this.velocity.x;
        this.y += this.velocity.y;




        // Attraction towards mouse cursor
        // if (mouse.x && mouse.y) {
        //     let dx = mouse.x - this.x;
        //     let dy = mouse.y - this.y;
        //     let distance = Math.sqrt(dx * dx + dy * dy);
        //     if (distance < 200) {
        //         this.velocity.x += (dx / distance) * this.speed;
        //         this.velocity.y += (dy / distance) * this.speed;
        //     }
        // }
        // make the star bigger
        if (mouse.x - this.x < 50 &&
            mouse.x - this.x > -50 &&
            mouse.y - this.y < 50 &&
            mouse.y - this.y > -50) {
            if (this.radius < 40) {
                this.radius += 2;
            }
        } else if (this.radius > 2) {
            this.radius -= 2;
        }

        // Attraction towards fixed circles
        for (let i = 0; i < lightPoints.length; i++) {
            let dx = lightPoints[i].x - this.x;
            let dy = lightPoints[i].y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 200) {
                this.velocity.x += (dx / distance) * this.speed;
                this.velocity.y += (dy / distance) * this.speed;
            }
        }



    };
    
}


//put particles into array
function initFunction() {
    glowingParticles = [];

    for (let i = 0; i < 80; i++) {
        let radius = Math.random() * 5 + 1;
        let x = Math.random() * (myCanvas.width - radius * 2) + radius;
        let y = Math.random() * (myCanvas.height - radius * 2) + radius;
        let color = colors[Math.floor(Math.random() * colors.length)];

        glowingParticles.push(new glowingParticle(x, y, radius, color));
    }
}


let normalColor = "rgba(255, 255, 255, 0.5)"
let deleteModeColor = "rgba(255, 0, 0, 0.5)"


//the circle that show the status of mouse
let followCircle = {
    x: undefined,
    y: undefined,
    radius: 10,
    color: normalColor,
};

//make the correspounding circle follow mouse
window.addEventListener("mousemove", function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
    
    followCircle.x = event.x;
    followCircle.y = event.y;
});


function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

    for (let i = 0; i < glowingParticles.length; i++) {
        glowingParticles[i].update();
    }

    // Draw the fixed circles
    for (let i = 0; i < lightPoints.length; i++) {
        ctx.beginPath();
        ctx.arc(lightPoints[i].x, lightPoints[i].y, lightPoints[i].radius, 0, Math.PI * 2, false);
        ctx.fillStyle = lightPoints[i].color;
        ctx.shadowColor = lightPoints[i].color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.closePath();
    }

    // Draw the follow circle
    ctx.beginPath();
    ctx.arc(followCircle.x, followCircle.y, followCircle.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = followCircle.color;
    ctx.shadowColor = followCircle.color;
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.closePath();
}





//start corresponding fuction
function startAnimation() {
    const audio = document.getElementById("bgm");
    document.getElementById("startPage").style.display = "none";
        initFunction();
        animate();
        audio.play();
}


window.addEventListener("mousemove", function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
});


//
window.addEventListener("resize", function () {
    myCanvas.width = window.innerWidth;
    myCanvas.height = window.innerHeight;
    initFunction();
});




window.addEventListener("click", function (event) {
    
    
    if (deleteMode && event.button === 0) {
        let clickX = event.x;
        let clickY = event.y;

        // Find the index of the white circle to delete
        let indexToDelete = -1;
        for (let i = 0; i < lightPoints.length; i++) {
            let circle = lightPoints[i];
            let dx = clickX - circle.x;
            let dy = clickY - circle.y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance <= circle.radius) {
                indexToDelete = i;
                break;
            }
        }

        // Remove the white circle from the array
        if (indexToDelete !== -1) {
            lightPoints.splice(indexToDelete, 1);
        }
    } else if (!deleteMode && event.button === 0) {
        // Code to add circles
        let circle = {
            x: event.x,
            y: event.y,
            radius: 25,
            color: "#00B4D8"
        };

        lightPoints.push(circle);
    }

    // Play the click sound effect
    const fx = document.getElementById("fx");
    fx.play();
    
});


//Switch between normal mode and delete mode
window.addEventListener("keydown", function (event) {
    if (event.key === "d" || event.key === "D") {
        deleteMode = !deleteMode;
        if (deleteMode == true){
            followCircle.color = deleteModeColor;
        }else {
            followCircle.color = normalColor;
        }
    }
});



let isMuted = false;

//The function to turn off the sound
function toggleMute() {
    const audio = document.getElementById("bgm");
    if (isMuted) {
      audio.play();
      isMuted = false;
    } else {
      audio.pause();
      isMuted = true;
    }
  }
  
const muteButton = document.getElementById("music");
muteButton.addEventListener("click", toggleMute);




