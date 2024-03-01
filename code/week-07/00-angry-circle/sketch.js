let bird;
let mPressed;
let mCurrent;
let mDragging = false;
let birdSize = 50;
function setup() {
  createCanvas (600, 600);
}

function draw() {
  background(200);

  if (mDragging) {
    line(mPressed.x, mPressed.y, mCurrent.x, mCurrent.y);
    circle(mPressed.x, mPressed.y, birdSize);
  }

  if (bird) {
    bird.applyForce(createVector(0, 0.03));
    bird.bounce();
    bird.update();
    bird.display();
  }
}

function mousePressed() {
  mPressed = createVector(mouseX, mouseY);
  mCurrent = createVector(mouseX, mouseY);
  mDragging = true;
}

function mouseDragged() {
  mCurrent = createVector(mouseX, mouseY);
}

function mouseReleased() {
  mCurrent = createVector(mouseX, mouseY);

  bird = new RigidBody(mPressed.x, mPressed.y, birdSize);
  mDragging = false;
  force = p5.Vector.sub(mPressed, mCurrent);
  force.mult(0.1);
  bird.applyForce(force);
}