Webcam.set ({
    height: 300,
    width: 350,
    image_format: "png",
    image_quality: 90
});

camera = document.getElementById("live-camera");
Webcam.attach(camera);

function take_snapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("show-image").innerHTML = "<img id='captured-image' src= " + data_uri + ">";
    })
}

console.log(ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/pN4JPl3VA/model.json", ModelLoaded);

function ModelLoaded() {
    console.log("Model Loaded");
}

function identify_object() {
    image_to_identify = document.getElementById("captured-image");
    classifier.classify(image_to_identify, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(results)
        document.getElementById("display_object").innerHTML = results[0].label;
        document.getElementById("display_accuracy").innerHTML = results[0].confidence.toFixed(3);
    }
}