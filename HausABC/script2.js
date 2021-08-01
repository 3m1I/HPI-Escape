function nextLvl(){
    let finished;
    if(window.location.pathname.split("/").pop().toUpperCase() == "SEMINARRAUM.HTML"){
        finished = new Audio("https://media1.vocaroo.com/mp3/1lbSTp8RWc70");
    }else{
    finished = new Audio("https://media1.vocaroo.com/mp3/1hLKRxuUcoGu")
    }
    remove();
    finished.play();
    setTimeout(function() {
        if(window.location.pathname.split("/").pop().toUpperCase() == "CAFE.HTML"){
            window.location.replace("Dachterrasse.html");
        }else if(window.location.pathname.split("/").pop().toUpperCase() == "DACHTERRASSE.HTML"){
            window.location.replace("Seminarraum.html");
        }else if(window.location.pathname.split("/").pop().toUpperCase() == "SEMINARRAUM.HTML"){
            window.location.replace("../welcome.html");
        }
      }, 2000);
};

function exit(){
    window.location.href="../welcome.html";
}

let classifier;
let words = ["cat", "house", "tree", "star", "bicycle"]
let word;
let totalwords = 0;
function setup(){
    var w = (windowWidth/100)*30;
    var h = (windowWidth/100)* 30;
    var canvas = createCanvas(w, h);
    background(200);
    classifier = ml5.imageClassifier('DoodleNet', modelReady)
    document.getElementById("current_word").innerHTML = pickNewWord();
}

function windowResized(){
    w = (windowWidth/100)*30;
    h = (windowWidth/100)*30;
    resizeCanvas(w, h);
    background(200);
}

function pickNewWord(){
    word = words[Math.floor(Math.random()*words.length)];
    return word;
}

function modelReady(){
    console.log("model loaded!");
    classifier.classify(canvas, results);
}

function results(error, result){
    if(error){
        console.error(error);
        return;
    }
    document.getElementById("current_predicted_word").innerHTML = result[0].label;
    if(result[0].label == word){
        document.getElementById("current_predicted_word").setAttribute("style", "color:rgb(37, 247, 72);");
        nextWordOrFinished();
    }
    setTimeout(function() {
        document.getElementById("current_predicted_word").setAttribute("style", "color:rgb(247, 37, 37);");
        classifier.classify(canvas, results);
      }, 2000);
}

function reset(){
    background(200);
}

function nextWordOrFinished(){
    let ring = new Audio("https://media1.vocaroo.com/mp3/1eFtmQlInJC7");
    ring.play();
    totalwords++;
    document.getElementById("wordsGuessed").innerHTML = totalwords + "/3";
    if(totalwords >= 3){
        nextLvl();
        return;
    }
    setTimeout(function() {
        reset();
        document.getElementById("current_word").innerHTML = pickNewWord();
    }, 1000);
}

function draw(){
    if(mouseIsPressed){
        fill(50);
        strokeWeight(25);
        line(mouseX, mouseY, pmouseX, pmouseY);
    }
}
