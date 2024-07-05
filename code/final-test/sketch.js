let cols, rows;
let scl = 20;
let zoff = 0;
let particles = [];
let flowfield;
let i = 0;
let mic;

function setup() {
  createCanvas(windowWidth, windowHeight);
  mic = new p5.AudioIn();
  mic.start();
  cols = floor(windowWidth / scl);
  rows = floor(windowHeight / scl);
  flowfield = new Array(cols * rows);

  for (let i = 0; i < 2000; i++) {
    particles[i] = new Particle();
  }
  background(255);
}

function draw() {
  let vol = mic.getLevel();
  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols;
      let angle = noise(xoff, yoff, zoff) * TWO_PI * 2;
      let v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowfield[index] = v;
      xoff += 0.1;
    }
    yoff += 0.1;
  }
  zoff += 0.01;

  for (let i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }

  push();
  noStroke();
  fill(0);
  rectMode(CENTER);
  rect(windowWidth/2, windowHeight/2, 100 + vol, 100 + vol)
}

class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector();
    this.acc = createVector();
    this.maxspeed = 2;
    this.color = color(random(255), random(255), random(255), 5);
    this.size = random(1, 3); // Varying size
  }

  follow(flowfield) {
    let x = floor(this.pos.x / scl);
    let y = floor(this.pos.y / scl);
    let index = x + y * cols;
    let force = flowfield[index];
    this.applyForce(force);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  edges() {
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;
  }

  show() {
    let d = dist(this.pos.x, this.pos.y, mouseX, mouseY);
    if (d < 50) {
      this.color = color(random(255), random(255), random(255), 5); // Colorful trails
    }
    strokeWeight(this.size); // Varying size
    stroke(this.color);
    point(this.pos.x, this.pos.y);

  }
}

function radialGradient(sX, sY, sR, eX, eY, eR, colorS, colorE) {
  let gradient = drawingContext.createRadialGradient(sX, sY, sR, eX, eY, eR);
  gradient.addColorStop(0, colorS);
  gradient.addColorStop(1, colorE);
  drawingContext.fillStyle = gradient;
}