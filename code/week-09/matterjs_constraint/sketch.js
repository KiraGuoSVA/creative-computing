let engine;
let shapes = [];
let walls;

function setup() {
  createCanvas(600, 600);
  rectMode(CENTER);
  engine = Matter.Engine.create();
  walls = new Walls(engine.world);

  Matter.Runner.run(engine);
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
}