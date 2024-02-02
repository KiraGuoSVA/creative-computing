let btn;
function setup() {
    const canvas = createCanvas(windowWidth,windowHeight);
    canvas.addClass('background');
    background(220);

    ws = new WebSocket("ws://localhost:3000");
    ws.onMessage = onMessage;
}

function onMessage(event) {
    const json = JSON.parse(event.data);
    line(json.px, json.py, json.x, json.y);
}

function mouseDragged() {
    //line(pmouseX, pmouseY, mouseX, mouseY);

    const data = {
        "px": pmouseX,
        "py": pmouseY,
        "x": mouseX,
        "y": mouseY,
    };

    ws.send(JSON.stringify(data));
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}