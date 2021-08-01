window.onload = function () {
    if(window.location.pathname.split("/").pop().toUpperCase() == "CAFE.HTML"){
        let apples = document.getElementsByClassName("apple");
        for(let i in apples){
            let apple = apples.item(i);
            let randomy = getRandom(5, 20);
            let randomx = getRandom(35, 90);
            apple.setAttribute("style", "top: "+randomy+"vh; left: "+randomx+"vw;");
        }
    }
}

function exit(){
    window.location.href="../welcome.html";
}

function getRandom(min, max){
    return Math.random() * (max-min) + min;
}

function allApplesEaten(){
    let result = true;
    let apples = document.getElementsByClassName("apple");
    for(let i in apples){
        let apple = apples.item(i);
        if(apple.style.visibility != "hidden"){
            result = false;
        }
    }
    return result;
}

function nextLvl(){
    let finished = new Audio("https://media1.vocaroo.com/mp3/1hLKRxuUcoGu")
    finished.play();
    setTimeout(function() {
        if(window.location.pathname.split("/").pop().toUpperCase() == "CAFE.HTML"){
            window.location.replace("Dachterrasse.html");
        }else if(window.location.pathname.split("/").pop().toUpperCase() == "DACHTERRASSE.HTML"){
            window.location.replace("Seminarraum.html");
        }
      }, 2000);
};

function allowDrop(ev) {
    ev.preventDefault();
}
  
function drag(ev) {
    ev.dataTransfer.setData('Text/html', ev.target.id);
}
  
function drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text/html");
    let apple = document.getElementById(data);
    apple.setAttribute("style", "visibility: hidden;");
    let eating = new Audio("https://media1.vocaroo.com/mp3/11lljylyTU0e");
    eating.play();
    if(allApplesEaten()){
        nextLvl();
    }
}

let s;
let fx;
let fy;
let totalfood;

function setup(){
    var w = Math.round(((windowWidth/100)*18)/20)*20
    var h = Math.round(((windowHeight/100)*65)/20)*20
    createCanvas(w, h);
    textSize(25);
    frameRate(3);
    s = new Snake();
    fx = spawnFoodX();
    fy = spawnFoodY();
    totalfood = 0;
}
function draw(){
    background(2, 62, 138);
    s.update();
    fill(100);
    rect(fx*20, fy*20, 20, 20);
    fill(0);
    text(totalfood+'/5', 10, 30);
    checkFinished();
}

//function windowResized(){
//    w = Math.round(((windowWidth/100)*18)/20)*20
//    h = Math.round(((windowHeight/100)*65)/20)*20
//    resizeCanvas(w, h);
//}

function checkFinished(){
    if(totalfood>=5){
        nextLvl();
        remove();
    }
}

function spawnFoodX(){
    let cols = floor(width/20);
    let foodx = floor(random(cols));
    return foodx;
}

function spawnFoodY(){
    let rows = floor(height/20);
    let foody = floor(random(rows));
    return foody;
}

class Snake{
    constructor(){
        this.x = 20;
        this.y = height-40;
        this.xspeed = 0;
        this.yspeed = -1;
        this.tail = [];
    }
    update(){
        this.move();
        this.edge();
        this.eat();
        this.show();
    }
    direction(x, y){
        this.xspeed = x;
        this.yspeed = y;
    }
    move(){
        this.x = this.x + this.xspeed*20;
        this.y = this.y + this.yspeed*20;
    }
    edge(){
        if(this.x >= width){
            this.x = 0;
        }else if(this.x < 0){
            this.x = width - 20;
        }else if(this.y >= height){
            this.y = 0;
        }else if(this.y < 0){
            this.y = height - 20;
        }
    }
    eat(){
        let distance = dist(this.x, this.y, fx*20, fy*20);
        if(distance < 20){
            totalfood++;
            let eat = new Audio("https://freesound.org/data/previews/20/20279_29508-lq.mp3");
            eat.play();
            fx = spawnFoodX();
            fy = spawnFoodY();
            console.log(totalfood);
        }
    }
    show(){
        fill(0);
        rect(this.x, this.y, 20, 20);
    }
}

function keyPressed(){
    if(key == 'w' || key == 'W'){
        console.log("up");   
        s.direction(0, -1)
    }else if(key == 's' || key == 'S'){
        console.log("down");
        s.direction(0, 1)
    }else if(key == 'a' || key == 'A'){
        console.log("left");
        s.direction(-1, 0)
    }else if(key == 'd' || key == 'D'){
        console.log("right");
        s.direction(1, 0)
    }
}



