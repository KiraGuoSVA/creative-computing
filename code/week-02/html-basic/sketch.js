let btn;
let numOfCircle = 0;
function setup() {
    const canvas = createCanvas(windowWidth,windowHeight);
    canvas.addClass('background');
    background(0);
}

function draw() {
    for (let i = 0; i < 100; i++) {
        circle(random(width),
            random(height), random(50,150));
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}