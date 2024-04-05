let sentiment;
let input;
let prediction;
let fresh;
let rotten;

function preload() {
    fresh = loadImage('assets/fresh.png');
    rotten = loadImage('assets/rotten.png');
}

function setup() {
    createCanvas(300, 300);
    sentiment = ml5.sentiment('movieReviews', modelReady);
}

function modelReady() {
    console.log('modelReady');
    input = createInput();
    input.position(20, 20);

    const button = createButton('predict');
    button.position(input.x + input.width, 20);
    button.mousePressed(predict);
}

function predict() {
    const txt = input.value();
    prediction = sentiment.predict(txt);
    console.log('predict', prediction);
}

function draw() {
    background(225);
    if (prediction) {
        const w = 50;
        const h = 50;
        const x = width/2 - w/2;
        const y = height/2 - h/2;
        if (prediction.score > 0.5) {
            image(fresh, x, y, w, h);
        } else {
            image(rotten, x, y, w, h);
        }
    }
}