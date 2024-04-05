// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/pose

// the link to your model provided by Teachable Machine export panel
const URL = "./my_model/";
let model, webcam, ctx, labelContainer, maxPredictions;
let predictedPose = 'neutral';

async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // Note: the pose library adds a tmPose object to your window (window.tmPose)
    model = await tmPose.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    const size = 200;
    const flip = true; // whether to flip the webcam
    webcam = new tmPose.Webcam(size, size, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(mainLoop);
    //mainLoop(0);
    // append/get elements to the DOM
    const canvas = document.getElementById("canvas");
    canvas.width = size; canvas.height = size;
    ctx = canvas.getContext("2d");
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) { // and class labels
        labelContainer.appendChild(document.createElement("div"));
    }
}

async function mainLoop(timestamp) {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(mainLoop);
}

async function predict() {
    // Prediction #1: run input through posenet
    // estimatePose can take in an image, video or canvas html element
    const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
    // Prediction 2: run input through teachable machine classification model
    const prediction = await model.predict(posenetOutput);
    if (prediction.lengh <= 0) return;
    predictedPose = prediction[0].className;
    let predictedScore = 0;
    for (let i = 0; i < maxPredictions; i++) {
        const currentScore = prediction[i].probability.toFixed(2);
        if (currentScore > predictedScore) {
            predictedScore = currentScore;
            predictedPose = prediction[i].className;
        }
        
        const classPrediction =
            prediction[i].className + ": " + currentScore;
        labelContainer.childNodes[i].innerHTML = classPrediction;
    }


    // finally draw the poses
    drawPose(pose);
}

function drawPose(pose) {
    if (webcam.canvas) {
        ctx.drawImage(webcam.canvas, 0, 0);
        // draw the keypoints and skeleton
        if (pose) {
            const minPartConfidence = 0.5;
            tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
            tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
        }
    }
}

let circleX;
let circleY;
let speed = 1;
function setup() {
    createCanvas(320, 260);
    circleX = width * 0.1;
    circleY = height * 0.9;
}

function draw() {
    background(255);

    const lineY = height * 0.3;
    line(0, lineY, width * 0.3, lineY);

    line(width, lineY, width * 0.7, lineY);

    if (predictedPose === "left") {
        circleX -= speed;
    } else if (predictedPose === "right") {
        circleX += speed;
    } else if (predictedPose === "top") {
        if (circleY > 0) {
            circleY -= speed;
        }
    } else {
        if (circleY < height) {
            circleY += speed;
        }
    }

    circle(circleX, circleY, 50);

}