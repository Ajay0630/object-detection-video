let stetus = false;
var objects = [];
let video;

function setup() {
    canvas = createCanvas(900, 700);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(900, 700)
    video.hide();
}

function modelLoaded() {
    console.log("Model has loaded.");
    stetus = true;
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting...";
}

function draw() {
    image(video, 0, 0, 900, 700);
    if (stetus == true){
        objectDetector.detect(video, gotResults);
        document.getElementById("hashobj").innerHTML = "Number of Objects: " + objects.length;
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        objects = results;
    }
}