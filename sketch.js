let PI = 3.14159265358979323846;

let a1 = 0;
let r1 = 400;
let m1 = 200;
let a1_v = 0;

let a2 = 0;
let r2 = 600;
let m2 = 10;
let a2_v = 0;

let g = 0.9;

let ty = width / 2;
let tx = height / 2;

let history = [];


function setup() {
  createCanvas(1000,800);
  pixelDensity(1);
  a1 = PI/2;
  a2 = PI/3;
}


function draw() {
  background(51);
  translate(tx, ty);
  scale(0.5);

  noFill();
  stroke(0,180,255);
  strokeWeight(5);
  beginShape();
  for (var i = 0; i < history.length; i ++) {
    vertex(history[i].x, history[i].y);
  }
  endShape();

  let num1 = -g * (2 * m1 + m2) * sin(a1);
  let num2 = -m2 * g * sin(a1 - 2 * a2);
  let num3 = -2 * sin(a1 - a2) * m2;
  let num4 = a2_v * a2_v * r2 + a1_v * a1_v * r1 * cos(a1 - a2);
  let den = r1 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
  let a1_a = (num1 + num2 + num3 * num4) / den;

  num1 = 2 * sin(a1 - a2);
  num2 = (a1_v * a1_v * r1 * (m1 + m2));
  num3 = g * (m1 + m2) * cos(a1);
  num4 = a2_v * a2_v * r2 * m2 * cos(a1 - a2);
  den = r2 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
  let a2_a = (num1 * (num2 + num3 + num4)) / den;

  // ball holding pendulum
  stroke(255);
  strokeWeight(2);
  fill(255);
  ellipse(0,0, 10);

  // first line
  let x1 = r1 * sin(a1);
  let y1 = r1 * cos(a1);
  line(0,0,x1,y1);
  ellipse(x1,y1,m1);

  // second line
  let x2 = r2 * sin(a2) + x1;
  let y2 = r2 * cos(a2) + y1;
  line(x1,y1,x2,y2);
  ellipse(x2,y2,m2);

  a1_v += a1_a;
  a2_v += a2_a;
  a1 += a1_v;
  a2 += a2_v;

  // a1_v *= 0.999;
  // a2_v *= 0.999;

  if (frameCount % 1 == 0) {
  history.push(createVector(x2,y2));
  }
}
