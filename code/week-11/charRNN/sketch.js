let charRNN;
let input;

function setup() {
    createCanvas(300, 300);
    charRNN = ml5.charRNN('./models/jkrowling_HP'. modelReady)
}

function modelReady() {
    input = createInput();
    input.position(20, 20);

    const button = createButton('generate');
    button.position(input.x + input.width, 20);
    button.mousePressed(generate);
}

function generate() {
    const txt = input.value().toLowerCase();

    if (txt.length > 0) {
        const data = {
            seed: txt,
            temperature: 0.5,
            length: 100
        }

        charRNN.generate(data, gotData);
    }
}

function gotData(err, result) {
    if (err) {
        console.err(err);
    } else {
        console.log(result);
    }
}

function draw() {
    background(225);
}