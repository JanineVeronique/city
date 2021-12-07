let img;
var sunrise = 500;
var height1;
let t;
let drop;
let drops = [];
let snowflakes = [];
let sun = [];
let rain= [];
const numOfDrops = 1000;
let showSunrise= false;
// let showPixel= false;
 function preload() {
   img = loadImage("assets/portofspain.jpeg");
 }

function setup() {
  createCanvas(windowWidth, windowHeight);
  fill(240);
  noStroke();
  // background(100);
   image(img, 0, 0, windowWidth, windowHeight);

  for (let i = 0; i < 500; i++) {
    snowflakes.push(new snowflake());
  }

    for (let i = 0; i < numOfDrops; i++) {
    rain.push (new Raindrop());
  }
}

function draw() {
  background("assets/portofspain.jpeg");
  image(img, 0, 0, windowWidth, windowHeight);
  // background(255);
  if (showSunrise==true){
  c = color(255, 212, 0);
  fill(c);
  ellipseMode(CORNER);
  ellipse(50, sunrise, 50);
  if (sunrise > 50) sunrise--;
  // image(img, 0, 0, 400, 500);
  t = frameCount / 60; // update time
  //console.log(t)
  }


  for (let flake of snowflakes) {
    if (flake.run == true) {
      //flake.update2(); // update snowflake position
      flake.update(t);
      flake.display(); // draw snowflake
    }
  }

      for (let drop of rain) {
        if (drop.run==true){
        drop.fall();
        drop.draw();
        }
      }
    }
  /


class snowflake {
  constructor(x, y) {
    this.run = false;
    // initialize coordinates
    this.posX = 0;
    //this.posX = random(width);
    this.posY = random(-50, 0);
    this.initialangle = random(0, 2 * PI);
    this.size = random(2, 5);

    // radius of snowflake spiral
    // chosen so the snowflakes are uniformly spread out in area
    this.radius = sqrt(random(pow(width / 2, 2)));

    this.update = function (time) {
      // x position follows a circle
      let w = 0.6; // angular speed
      let angle = w * time + this.initialangle;
      this.posX = width / 2 + this.radius * sin(angle);

      // different size snowflakes fall at slightly different y speeds
      this.posY += pow(this.size, 0.5);

      // delete snowflake if past end of screen
      if (this.posY > height) {
        let index = snowflakes.indexOf(this);
        snowflakes.splice(index, 1);
      }
    };

    this.update2 = function () {
      this.posY += 1;
    };

    this.display = function () {
      ellipse(this.posX, this.posY, this.size);
      //ellipse(this.posX,this.posY,2,2);
    };
  }
}

class Raindrop{
  constructor(x, y ){
    this.run= false;
    this.x = random(0, width);
    this.y = random(-height, 0);
    this.size = random(1.5,8);
    if(this.size > 3){  this.size = random(1.5,8) }
    this.speed = this.size / 0.5;
    this.dropThickness = floor(this.size/3.8);
    if(this.dropThickness < 1){ this.dropThickness = 1; }
  }
    fall() {
    this.y += this.speed;
  }

  draw() {
    strokeWeight(this.dropThickness);
    stroke(255);
    line(this.x, this.y, this.x, this.y - this.size * 2);
  }

}
function fall() {
  console.log("button works!");
  for (let i = 0; i < snowflakes.length; i++) {
    snowflakes[i].run = true;
  }
}

 // function surprise() {
 //   console.log("button works!");
 //    showPixel=true;
 //  }

function sunriseShow(){
  showSunrise=true;
}
function rainFall(){
  console.log("button works!");
  for (let i = 0; i < numOfDrops; i++){
   rain[i].run = true;
  }
}
