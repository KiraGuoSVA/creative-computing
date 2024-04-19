var font;
var fontFile = "../assets/font/GintoNord-Medium.otf";

function preload() {
    font = loadFont(fontFile);
}

var boxInfo = []
var boxText = ['hiya', 'ImKira']

var Engine = Matter.Engine,
    Bodies = Matter.Bodies,
    World = Matter.World,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint;

var engine = Engine.create(),
    world = engine.world;

var inputElement;

var boxes = [];
var Texts = [];

function setup() {
    createCanvas(windowWidth, windowHeight-20);

    inputElement = createInput();
    inputElement.position(50, 50);
    inputElement.input(userInput);

    var ground = Bodies.rectangle(width/2, height+5, width, 100, {isStatic: true});
    var leftWall = Bodies.rectangle(-5, height/2, 10, height, {isStatic: true});
    var rightWall = Bodies.rectangle(width+5, height/2, 10, height, {isStatic: true});

    boxes.push(ground);
    boxes.push(leftWall);
    boxes.push(rightWall);

    var boxInfo0 = Bodies.rectangle(random(200, width-200), random(100), 80 * 0.65 * 4, 80);
    var boxInfo1 = Bodies.rectangle(random(200, width-200), random(100), 80 * 0.65 * 8, 80);
    var boxInfo2 = Bodies.rectangle(random(200, width-200), random(100), 80 * 0.65 * 2, 80);

    boxInfo.push(boxInfo0);
    boxInfo.push(boxInfo1);
    boxInfo.push(boxInfo2);

    var mouse = Mouse.create(canvas.elt);
    var mouseConstraint = MouseConstraint.create(engine, {mouse:mouse});

    world.add(engine.world, [ground, leftWall, rightWall, mouseConstraint]);
    world.add(engine.world, boxInfo);
    Matter.Runner.run(engine);
}

function userInput() {
    Texts.push({
        x:width/2,
        y:50,
        text:this.value()
    })
}

function generateBox() {
    var boxScale = 80;
    var boxA = Bodies.rectangle(random(width), random(30), boxScale*0.65*Texts.length, boxScale);

    boxA.boxScale = boxScale;

    for(var i = 0; i < Texts.length; i++) {
        var textPrint = Texts[i];
        boxA.char = textPrint.text;
    }

    boxes.push(boxA);
    World.add(engine.world, boxA);
}

function keyPressed() {
    if(keyCode===ENTER) {
        inputElement.value('');
        generateBox();
        Texts.splice(0, Texts.length)
    }
}

function draw() {
    background(255);
    
    fill(0)
    textSize(20)
    text('SayHi&Enter', 205, 68)

    for(var i = 0; i < boxInfo.length; i++) {
        push();
        translate(boxInfo[i].position.x, boxInfo[i].position.y);
        rotate(boxInfo[i].angle);
        fill(0);
        textSize(80*1.4);
        textAlign(CENTER);
        text(boxText[i], 0, 40);
        pop();
    }

    for(var box of boxes) {
        noFill();
        noStroke();
        var boxScale = box.boxScale
        beginShape()
        for(var vert of box.vertices) {
            vertex(vert.x, vert.y)
        }
        endShape(CLOSE)

        push();
        if(boxScale) {
            translate(box.position.x, box.position.y);
            rotate(box.angle);

            fill(0);
            textSize(boxScale*1.4);
            textAlign(CENTER);
            text(box.char, 0, 40);
        }
        pop();
    }
}