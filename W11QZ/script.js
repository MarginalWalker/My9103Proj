class Star {
    constructor(xPos, yPos, radius) {
      this.x = xPos;
      this.y = yPos;
      this.r = radius;
      this.svgElement;
    }
  
    drawStar() {
      this.svgElement = makeCircle(this.x, this.y, this.r);
      svg.appendChild(this.svgElement);
    }
}
  

let width = 100;
let height = 100;


const svg = document.getElementById("svg-canvas");


svg.setAttribute("style", "background-color: darkblue")

let text = document.getElementById("txt");
text.setAttribute("fill", "white");
svg.appendChild(text);



for(i=0; i<100; i++){
    
}
function createArray(num) {
    let starArray = [];

    for (let i = 0; i < num; i++){
        let starX = `${randomNum(0, width)}%`;
        let starY = `${randomNum(0, height)}%`;
        let starSize = randomNum(width * 0.001, width * 0.002);
        starArray.push(new Star(starX, starY, starSize));

    }
    return starArray;
}
let stars = createArray(50);
for (let Star of stars) {
    Star.drawStar();
  }


window.addEventListener("resize", resizeSvg);

function resizeSvg(){
    let bbox = svg.getBoundingClientRect();
    svg.setAttribute("viewBox", `0 0 ${bbox.width} ${bbox.height}`);
    for(let circle of svg.children){
        circle.setAttribute('r',  Math.min(bbox.width, bbox.height) * 0.002);
    }
    for(let text of svg.children){
        text.setAttribute('font-size',  Math.min(bbox.width, bbox.height) * 0.03);
    }
}
//Here, if you want the star to appear, you have to actively resize the window to get the star to appear. 
//I'm not sure how to fix this bug, but I will try to fix it in a future implementation.