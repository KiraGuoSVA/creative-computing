let engine;
let shapes = [];
let walls;
let leftPaddle;
let rightPaddle;

function setup() {
  createCanvas(600, 600);
  rectMode(CENTER);
  engine = Matter.Engine.create();
  walls = new Walls(engine.world);
  walls.addSideWalls();

  leftPaddle = new Rect(engine.world,
    createVector(width * 0.3, height * 0.8),
    createVector(width * 0.3, 30),
    {isStatic: true, angle: PI/4});

  rightPaddle = new Rect(engine.world,
    createVector(width * 0.7, height * 0.8),
    createVector(width * 0.3, 30),
    {isStatic: true, angle: -PI/4});
  shapes.push(leftPaddle, rightPaddle);
  Matter.Runner.run(engine);

  setInterval(() => {
    if (shapes.length < 3) {
      const options = {
        friction: 0,
        frictionAir: 0,
        restitution: 1,
        inertia: Infinity
      }
    this.createCircle(
      random(width*0.25, width*0.75), -10, options);
    }
  },1000);
}

function createCircle(x, y, options) {
  let shape = new Circle(engine.world,
      createVector(x, y), 
      createVector(25, 25),
      options);
  
  shapes.push(shape);
}

function draw() {
  background(200);
  walls.display();

  for (let i = shapes.length-1; i >= 0; i--) {
    const s = shapes[i];
    s.display();
    if(s.isDead()) {
      shapes.splice(i, 1);
    }
  }

  let targetLeftAngle = PI/4;
  let targetRightAngle = -PI/4;

  if(keyIsPressed) {
    if (keyIsDown(LEFT_ARROW)) {
      targetLeftAngle = -PI/4;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      targetRightAngle = PI/4;
    }
  }

  leftPaddle.animAngle(targetLeftAngle);
  rightPaddle.animAngle(targetRightAngle);
}