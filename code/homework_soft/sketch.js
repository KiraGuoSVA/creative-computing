var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body;

let engine = Engine.create(),
    world = engine.world;
    world.gravity.y = 0.2;

let boxes = [];
let softBodies = [];

let overAllTexture;

function setup() {
    canvas = createCanvas(windowWidth-20, windowHeight-20);

    overAllTexture = createGraphics(width, height);
    overAllTexture.loadPixels();
    for(var i = 0; i < width + 50; i++) {
        for(var o = 0; o < height + 50; o++) {
            overAllTexture.set(i, o, color(100, noise(i/3, o/3, i * o/50) * random([0, 30, 60])));
        }
    }
    overAllTexture.updatePixels();

    var mouse = Mouse.create(canvas.elt);
    var mouseParams = {
        mouse: mouse,
        constraint: {
            stiffness: 0.5
        }
    }
    mouseConstraint = MouseConstraint.create(engine, mouseParams);
    mouseConstraint.mouse.pixelRatio = pixelDensity();
    World.add(world, mouseConstraint);

    var ground = Bodies.rectangle(width / 2, height+50, width+100, 100, {isStatic: true});
    var wall1 = Bodies.rectangle(-50, height/2, 100, height, {isStatic: true});
    var wall2 = Bodies.rectangle(width+50, height/2, 100, height, {isStatic: true});
    var top = Bodies.rectangle(width/2, -50, width, 100, {isStatic: true});
    World.add(world, [ground, wall1, wall2, top]);

    let numID = 0;
    for(var o = 0; o < height - 100; o+=200) {
        addSoftBody(o + random(20), random(height-200), numID++)
    }
    Engine.run(engine);
}