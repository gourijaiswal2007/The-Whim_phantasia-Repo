let scene = 1;
let nextScene = 1;
let fadeAlpha = 0;
let isFadingOut = false;
let isFadingIn = true;
// let fadeSpeed = 5;                     HACKATHON 2026

let drops = [];
let embers = [];
let snow = [];
let sceneTimer = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  for (let i = 0; i < 150; i++) {
    drops.push({ x: random(width), y: random(height), speed: random(10, 20) });
  }
  for (let i = 0; i < 80; i++) {
    embers.push({ x: random(width), y: random(height), size: random(2, 6), speedY: random(-1, -3) });
  }
  for (let i = 0; i < 100; i++) {
    snow.push({ x: random(width), y: random(height), size: random(2, 4), speedY: random(0.5, 1.5) });
  }
  
  fadeAlpha = 255;
}

function draw() {
  if (scene === 3 && random(1) < 0.05) translate(random(-5, 5), random(-5, 5));

  if (scene === 1) drawScene1();
  else if (scene === 2) drawScene2();
  else if (scene === 3) drawScene3();
  else if (scene === 4) drawScene4();
  else if (scene === 5) drawScene5();
  else if (scene === 6) drawScene6();

  drawFades();
}

function drawScene1() {
  background(40, 0, 0); 
  drawEmbers();
  
  textAlign(CENTER, CENTER);
  noStroke();
  fill(255);
  textSize(56);
  text("WEATHER AS MOOD", width / 2, height / 3);
  
  textSize(20);
  fill(255, 150, 150);
  text("A journey of joy, anger, melancholy, and calm.", width / 2, height / 3 + 60);
  
  drawButton(width / 2, height / 2 + 80, "BEGIN");
}

function drawScene2() {
  background(80, 10, 10); 
  drawEmbers(); 
  
  drawBoy(width / 2, height - 150, true);
  
  noStroke();
  fill(255);
  textSize(32);
  text("SUNSHINE : JOY", width / 2, 80);
  textSize(20);
  fill(255, 200, 200);
  text("I just wanted to play.", width / 2, 130);
  
  drawContinuePrompt();
}

function drawScene3() {
  background(15, 0, 0); 
  
  if (random(1) < 0.05) {
    fill(255, 50, 50, 150);
    rect(0, 0, width, height);
  }
  
  drawBoy(width / 2 - 80, height - 150, false);
  drawParents(width / 2 + 80, height - 170);
  
  noStroke();
  fill(255);
  textSize(32);
  text("STORMS : ANGER", width / 2, 80);
  textSize(20);
  fill(255, 100, 100);
  text("But they told me it was time to let go.", width / 2, 130);
  
  drawContinuePrompt();
}

function drawScene4() {
  background(30, 5, 5); 
  drawRain(15); 
  
  drawJobBoy(width / 2, height - 150);
  
  noStroke();
  fill(255);
  textSize(32);
  text("RAIN : MELANCHOLY", width / 2, 80);
  textSize(20);
  fill(200, 150, 150);
  text("So I carried the weight instead.", width / 2, 130);
  
  drawContinuePrompt();
}

function drawScene5() {
  background(50, 5, 10); 
  drawRain(5); 
  drawEmbers(); 
  
  drawJobBoy(width / 4, height - 150);
  drawKidsCricket(width * 0.75, height - 150);
  
  noStroke();
  fill(255);
  textSize(32);
  text("THE SHIFT", width / 2, 80);
  textSize(20);
  fill(255, 200, 200);
  text("Until one evening, the past echoed back.", width / 2, 130);
  
  drawContinuePrompt();
}

function drawScene6() {
  background(10, 0, 0); 
  drawSnow();
  
  sceneTimer++;
  
  noStroke();
  textAlign(CENTER, CENTER);
  
  if (sceneTimer > 30) {
    fill(255, 200, 200, min(sceneTimer * 2, 255));
    textSize(28);
    text("SNOW : CALMNESS & ACCEPTANCE", width / 2, height * 0.2);
  }
  
  if (sceneTimer > 150) {
    fill(255, 150, 150, min((sceneTimer - 150) * 2, 255));
    textSize(22);
    text('"The future belongs to those who believe in the beauty of their dreams."\n- Eleanor Roosevelt', width / 2, height * 0.45);
  }
  
  if (sceneTimer > 300) {
    fill(255, 100, 100, min((sceneTimer - 300) * 2, 255));
    textSize(22);
    text('"Hold fast to dreams, for if dreams die,\nlife is a broken-winged bird that cannot fly."\n- Langston Hughes', width / 2, height * 0.75);
  }
}

// --- WEATHER ANIMATIONS ---

function drawEmbers() {
  noStroke();
  fill(255, 100, 50, 150);
  for (let e of embers) {
    circle(e.x, e.y, e.size);
    e.y += e.speedY;
    e.x += random(-1, 1);
    if (e.y < 0) { e.y = height; e.x = random(width); }
  }
}

function drawRain(intensity) {
  stroke(255, 100, 100, 120);
  strokeWeight(2);
  for (let i = 0; i < drops.length; i++) {
    if (i > intensity * 10) break;
    let d = drops[i];
    line(d.x, d.y, d.x - 2, d.y + d.speed);
    d.y += d.speed;
    d.x -= 2;
    if (d.y > height) { d.y = 0; d.x = random(width + 50); }
  }
}

function drawSnow() {
  noStroke();
  fill(255, 200, 200, 180);
  for (let s of snow) {
    circle(s.x, s.y, s.size);
    s.y += s.speedY;
    s.x += sin(frameCount * 0.01 + s.y) * 0.5;
    if (s.y > height) { s.y = 0; s.x = random(width); }
  }
}

// --- LINE ART CHARACTERS ---

function drawBoy(x, y, playing) {
  stroke(255);
  strokeWeight(3);
  noFill();
  circle(x, y - 50, 30);
  line(x, y - 35, x, y + 25);
  line(x, y + 25, x - 15, y + 70);
  line(x, y + 25, x + 15, y + 70);
  
  if (playing) {
    line(x, y - 15, x - 25, y - 25);
    line(x, y - 15, x + 25, y - 25);
    strokeWeight(5);
    line(x + 25, y - 25, x + 40, y - 60); 
  } else {
    line(x, y - 15, x - 15, y + 15);
    line(x, y - 15, x + 15, y + 15);
  }
}

function drawParents(x, y) {
  stroke(200, 50, 50);
  strokeWeight(4);
  noFill();
  
  circle(x - 25, y - 60, 30);
  line(x - 25, y - 45, x - 25, y + 30);
  line(x - 25, y + 30, x - 40, y + 80);
  line(x - 25, y + 30, x - 10, y + 80);
  line(x - 25, y - 20, x - 50, y);
  line(x - 25, y - 20, x, y);

  circle(x + 25, y - 50, 30);
  line(x + 25, y - 35, x + 25, y + 30);
  line(x + 25, y + 30, x + 10, y + 80);
  line(x + 25, y + 30, x + 40, y + 80);
  line(x + 25, y - 15, x, y);
  line(x + 25, y - 15, x + 50, y);
}

function drawJobBoy(x, y) {
  stroke(200);
  strokeWeight(3);
  noFill();
  circle(x, y - 45, 30);
  line(x, y - 30, x, y + 30);
  line(x, y + 30, x - 15, y + 70);
  line(x, y + 30, x + 15, y + 70);
  
  line(x, y - 10, x - 15, y + 20);
  line(x, y - 10, x + 20, y + 25);
  
  strokeWeight(2);
  fill(100, 0, 0);
  rect(x + 10, y + 25, 20, 15);
}

function drawKidsCricket(x, y) {
  stroke(255, 100, 100);
  strokeWeight(2);
  noFill();
  
  circle(x - 30, y - 20, 20);
  line(x - 30, y - 10, x - 30, y + 25);
  line(x - 30, y + 25, x - 45, y + 50);
  line(x - 30, y + 25, x - 15, y + 50);
  line(x - 30, y, x - 45, y - 10);
  line(x - 30, y, x - 15, y - 10);
  strokeWeight(4);
  line(x - 15, y - 10, x - 5, y - 30); 

  strokeWeight(2);
  circle(x + 30, y - 15, 20);
  line(x + 30, y - 5, x + 30, y + 25);
  line(x + 30, y + 25, x + 15, y + 50);
  line(x + 30, y + 25, x + 45, y + 50);
  line(x + 30, y + 5, x + 15, y + 15);
  line(x + 30, y + 5, x + 45, y + 20);
}

// --- UTILITY ---

function drawButton(x, y, label) {
  let d = dist(mouseX, mouseY, x, y);
  let r = 70;
  
  if (d < r) {
    fill(150, 0, 0);
    cursor(HAND);
  } else {
    fill(50, 0, 0);
    cursor(ARROW);
  }
  
  stroke(255);
  strokeWeight(2);
  circle(x, y, r * 2);
  
  noStroke();
  fill(255);
  textSize(20);
  text(label, x, y);
}

function drawContinuePrompt() {
  noStroke();
  fill(255, 255, 255, 100 + sin(frameCount * 0.05) * 100);
  textSize(14);
  text("Click anywhere to continue...", width / 2, height - 30);
}

function mouseReleased() {
  if (isFadingOut || isFadingIn) return;
  if (scene === 1 && dist(mouseX, mouseY, width / 2, height / 2 + 80) < 70) triggerTransition(2);
  else if (scene > 1 && scene < 6) triggerTransition(scene + 1);
}

function triggerTransition(targetScene) {
  nextScene = targetScene;
  isFadingOut = true;
}

function drawFades() {
  if (isFadingOut) {
    fadeAlpha += fadeSpeed;
    if (fadeAlpha >= 255) {
      scene = nextScene;
      isFadingOut = false;
      isFadingIn = true;
      sceneTimer = 0;
    }
  }
  if (isFadingIn) {
    fadeAlpha -= fadeSpeed;
    if (fadeAlpha <= 0) isFadingIn = false;
  }
  if (fadeAlpha > 0) {
    noStroke();
    fill(0, 0, 0, fadeAlpha);
    rect(0, 0, width, height);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}