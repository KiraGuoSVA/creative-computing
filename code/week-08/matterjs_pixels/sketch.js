let ps;
let myImg;
function preload() {
  myImg = loadImage('./chuck.png');
}
function setup() {
  createCanvas(500, 500);
  ps = new ParticleSystem(myImg);
  myImg.loadPixels();
  noStroke();
}

function draw() {
  background(0);

  //image(myImg, 0, 0, width, height);
  ps.update();
  ps.display();

}

function mouseDragged() {
  ps.addParticles(1, createVector(mouseX, mouseY));
}