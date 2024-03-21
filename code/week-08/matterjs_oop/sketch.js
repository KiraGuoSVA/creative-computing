let engine;
let shapes = [];

function setup() {
  createCanvas(600, 600);
  rectMode(CENTER);

  engine = Matter.Engine.create();

  const ground = new Rect(engine.world, 
    createVector(width/2, height),
    createVector(width - 10, 30), { isStatic: true });
  
  Matter.Runner.run(engine);
  shapes.push(ground);
}

function createShape(x, y, options) {
  let shape;
  if (random() > 0.5) {
    shape = new Rect(engine.world,
      createVector(x, y), 
      createVector(random(10, 50), random(10,50)),
      options);
  } else {
    shape = new Circle(engine.world,
      createVector(x, y), 
      createVector(random(10, 50), random(10,50)),
      options);
  }
  shapes.push(shape);
}

function draw() {
  background(200);

  shapes.forEach( shape => {
    shape.display();
  });

  if (mouseIsPressed) {
    createShape(mouseX, mouseY, null);
  }
}