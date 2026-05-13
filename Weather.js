let scene = 1; // 1: Title, 2: Choice, 3: Childhood, 4: Teen, 5: Job & Window, 6: Final Quote, 7: The End
let sceneTimer = 0;
let transitionAlpha = 0;
let isFading = false;
let nextScene = 1;
let canAdvance = false;

// Particles & Systems
let clouds = [];
let sunParticles = [];
let raindrops = [];

// Ball Interaction Logic
let ballActive = false;
let ballStartTime = 0;

// UI Elements
let btnBegin, btnBoy, btnGirl;
let showComingSoon = false;
let comingSoonTimer = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  frameRate(60);
  noStroke();

  // Initialize Particles
  for (let i = 0; i < 15; i++) clouds.push(new Cloud());
  for (let i = 0; i < 50; i++) sunParticles.push(new SunParticle());
  for (let i = 0; i < 300; i++) raindrops.push(new Raindrop());

  // Initialize Buttons
  btnBegin = new Button("BEGIN", width / 2, height * 0.7, 200, 60);
  btnBoy = new Button("BOY", width * 0.4, height * 0.6, 150, 150, true);
  btnGirl = new Button("GIRL", width * 0.6, height * 0.6, 150, 150, true);
}

function draw() {
  push();
  
  if (scene === 1) playScene1_Title();
  else if (scene === 2) playScene2_Choice();
  else if (scene === 3) playScene3_Childhood();
  else if (scene === 4) playScene4_Teenage();
  else if (scene === 5) playScene5_OfficeWindow();
  else if (scene === 6) playScene6_FinalQuote();
  else if (scene === 7) playScene7_TheEnd();

  pop();

  // Progression Logic
  if (scene >= 3 && sceneTimer > getSceneDuration(scene) && !isFading && scene < 7) {
    canAdvance = true;
    drawContinuePrompt();
  } else {
    canAdvance = false;
  }

  // Transitions
  if (isFading) {
    transitionAlpha += 6; // Faster fade
    if (transitionAlpha >= 255) {
      scene = nextScene;
      sceneTimer = 0;
      ballActive = false; 
      isFading = false;
      canAdvance = false; 
    }
  } else {
    if (transitionAlpha > 0) transitionAlpha -= 6; 
  }

  fill(0, transitionAlpha);
  rect(0, 0, width, height);

  if (!isFading) sceneTimer++;
}

function triggerFade(targetScene) {
  isFading = true;
  nextScene = targetScene;
}

// REDUCED TIMINGS HERE
function getSceneDuration(s) {
  const durations = { 
    3: 300, // Reduced from 700 (Cricket)
    4: 350, // Reduced from 500 (Teenage)
    5: 400, // Reduced from 600 (Office)
    6: 300, // Reduced from 400 (Quote)
    7: 200  // Reduced from 300 (End)
  };
  return durations[s];
}

/* SCENES */

function playScene1_Title() {
  setGradient(0, 0, width, height, color(135, 206, 235), color(255, 204, 153)); 
  fill(255, 255, 200, 150);
  circle(width / 2, height * 0.8, 400); 
  drawClouds(255, 200);
  drawSunParticles();
  textAlign(CENTER, CENTER);
  fill(255);
  textSize(60);
  text("WEATHER AS MOOD", width / 2, height * 0.35);
  textSize(24);
  fill(255, 220);
  text("Every weather tells a story.", width / 2, height * 0.45);
  btnBegin.update();
  btnBegin.show();
}

function playScene2_Choice() {
  setGradient(0, 0, width, height, color(255, 230, 200), color(255, 245, 230)); 
  drawClouds(255, 100);
  textAlign(CENTER, CENTER);
  fill(100, 80, 60);
  textSize(40);
  text("Choose Your Story", width / 2, height * 0.3);
  btnBoy.update();
  btnBoy.show();
  btnGirl.update();
  btnGirl.show();

  if (showComingSoon) {
    fill(200, 50, 50, map(comingSoonTimer, 0, 60, 255, 0));
    textSize(20);
    text("Story Coming Soon", width * 0.6, height * 0.75);
    comingSoonTimer++;
    if (comingSoonTimer > 60) showComingSoon = false;
  }
}

function playScene3_Childhood() {
  background(135, 206, 235);
  fill(255, 223, 0, 200);
  circle(width * 0.8, height * 0.2, 150); 
  drawClouds(255, 220);
  drawSunParticles();
  fill(124, 252, 0); 
  rect(0, height * 0.6, width, height * 0.4);

  let boyX = width * 0.3;
  let boyY = height * 0.6;

  let batAngle = 30; 
  if (ballActive) {
    let elapsed = frameCount - ballStartTime;
    if (elapsed > 20 && elapsed < 40) batAngle = map(elapsed, 20, 40, 30, -50); 
    else if (elapsed >= 40 && elapsed < 55) batAngle = map(elapsed, 40, 55, -50, 130); 
    else if (elapsed >= 55) batAngle = 130; 
  }

  drawCharacter(boyX, boyY, color(20, 80, 150), color(255, 200, 150), true, 1.2, batAngle);

  if (!ballActive) {
    fill(255, 150);
    textAlign(CENTER);
    textSize(18);
    text("[ Press 'B' to Bowl ]", width / 2, height * 0.1);
  }

  if (ballActive) {
    fill(200, 50, 50);
    let elapsed = frameCount - ballStartTime;
    let contactFrame = 45; 
    let contactX = boyX + 45;
    let contactY = height * 0.52;

    if (elapsed <= contactFrame) {
      let bx = map(elapsed, 0, contactFrame, width * 1.1, contactX);
      let by = map(elapsed, 0, contactFrame, height * 0.4, contactY) + abs(sin(elapsed * 0.1)) * 20; 
      circle(bx, by, 15);
    } else {
      let bx = map(elapsed, contactFrame, contactFrame + 80, contactX, width * 0.9);
      let by = map(elapsed, contactFrame, contactFrame + 80, contactY, -100); 
      circle(bx, by, 15);
    }
  }

  drawDialogueBox("LITTLE BOY", "I just wanted to play.", 50, 280);
}

function playScene4_Teenage() {
  setGradient(0, 0, width, height, color(112, 128, 144), color(169, 169, 169)); 
  drawClouds(100, 150);
  if (sceneTimer % 150 > 140) {
    fill(255, 255, 255, 100);
    rect(0, 0, width, height); 
  }
  fill(80, 90, 100);
  rect(0, height * 0.65, width, height * 0.4);
  drawCharacter(width * 0.65, height * 0.65, color(30, 40, 60), color(200, 150, 120), false, 1.3); 
  drawCharacter(width * 0.35, height * 0.65, color(40, 80, 120), color(255, 200, 150), false, 1.1); 
  
  if (sceneTimer < 180) {
    drawDialogueBox("FATHER", "Cricket won't build your future.", 30, 170);
  } else {
    drawDialogueBox("TEEN", "But it was my dream.", 180, 330);
  }
}

function playScene5_OfficeWindow() {
  background(20, 30, 50); 
  fill(255, 230, 150, 60); 
  triangle(width * 0.6, height * 0.1, width * 0.2, height, width * 0.9, height);
  fill(50); rect(width * 0.58, height * 0.1, 15, height); 
  fill(255, 240, 200); circle(width * 0.6, height * 0.1, 30); 

  drawCharacter(width * 0.45, height * 0.55, color(80, 100, 140), color(200, 150, 120), true, 0.4, 60);
  drawCharacter(width * 0.65, height * 0.55, color(100, 80, 100), color(200, 150, 120), false, 0.3, 0);
  drawRain(1.0);

  fill(30, 35, 45); 
  let winX = width * 0.15; let winY = height * 0.1;
  let winW = width * 0.7; let winH = height * 0.55;
  rect(0, 0, width, winY); rect(0, winY + winH, width, height); 
  rect(0, winY, winX, winH); rect(winX + winW, winY, width, winH); 

  stroke(15, 20, 25); strokeWeight(15); noFill();
  rect(winX, winY, winW, winH); noStroke();
  fill(20, 25, 30); rect(winX - 20, winY + winH - 5, winW + 40, 25); 

  fill(40, 30, 25); rect(0, height * 0.75, width, height * 0.25);
  let laptopX = width * 0.75; let laptopY = height * 0.78;
  fill(150); quad(laptopX - 50, laptopY + 20, laptopX + 100, laptopY + 20, laptopX + 80, laptopY, laptopX - 30, laptopY); 
  fill(130); rect(laptopX - 30, laptopY - 60, 110, 60, 5); 
  fill(200, 230, 255, 60); rect(laptopX - 25, laptopY - 55, 100, 50, 2); 

  let charX = width * 0.5; let charY = height * 1.05; 
  fill(20, 20, 25); rect(charX - 80, charY - 200, 160, 250, 20);
  fill(45, 55, 65); rect(charX - 70, charY - 220, 140, 120, 40); 
  fill(30, 20, 15); circle(charX, charY - 260, 80);

  drawDialogueBox("MAN", "Some dreams stay with us forever.", 40, 380);
}

function playScene6_FinalQuote() {
  background(10, 10, 15); drawRain(0.3); 
  let textAlpha = map(sceneTimer, 50, 120, 0, 255);
  textAlign(CENTER, CENTER);
  fill(255, textAlpha);
  textSize(32);
  text("The cost of ignoring your passion is", width / 2, height / 2 - 30);
  text("spending your life wishing you hadn't.", width / 2, height / 2 + 30);
}

function playScene7_TheEnd() {
  background(10, 10, 15); drawRain(0.1); 
  fill(200, 150, 100, map(sceneTimer, 30, 100, 0, 255)); 
  textSize(24); textAlign(CENTER, CENTER);
  text("THE END", width / 2, height / 2);
}

/* INPUT */

function keyPressed() {
  if (scene === 3 && (key === 'b' || key === 'B')) {
    ballActive = true;
    ballStartTime = frameCount;
  }
}

function mousePressed() {
  if (scene === 1 && btnBegin.isClicked() && !isFading) triggerFade(2);
  if (scene === 2 && !isFading) {
    if (btnBoy.isClicked()) triggerFade(3);
    if (btnGirl.isClicked()) { showComingSoon = true; comingSoonTimer = 0; }
  }
  if (canAdvance && !isFading) triggerFade(scene + 1);
}

/* UI HELPERS */

function drawContinuePrompt() {
  let pulse = map(sin(frameCount * 0.08), -1, 1, 150, 255);
  fill(255, 200, 150, pulse);
  textAlign(RIGHT, BOTTOM);
  textSize(20);
  text("Next ➔", width - 40, height - 40);
}

function drawCharacter(x, y, shirtColor, skinColor, hasBat, sizeScale = 1, batAngle = 30) {
  push();
  translate(x, y); scale(sizeScale);
  fill(shirtColor); rect(-20, -80, 40, 80, 10);
  fill(skinColor); circle(0, -100, 45);
  if (hasBat) {
    push(); translate(15, -60); rotate(radians(batAngle));
    fill(180, 120, 80); rect(-5, -10, 10, 80, 5); 
    pop();
  }
  pop();
}

function drawDialogueBox(speaker, txt, startFrame, endFrame) {
  let alpha = 0;
  if (sceneTimer > startFrame) {
    if (sceneTimer < startFrame + 20) alpha = map(sceneTimer, startFrame, startFrame + 20, 0, 255);
    else if (sceneTimer > endFrame - 20 && sceneTimer < endFrame) alpha = map(sceneTimer, endFrame - 20, endFrame, 255, 0);
    else if (sceneTimer >= endFrame) alpha = 0;
    else alpha = 255;
  }
  if (alpha <= 0) return; 
  push();
  let boxW = width * 0.6; let boxH = 100;
  let boxX = width / 2 - boxW / 2; let boxY = height - 150; 
  fill(20, 25, 35, alpha * 0.85); stroke(200, 230, 255, alpha * 0.6); 
  strokeWeight(2); rect(boxX, boxY, boxW, boxH, 15); noStroke();
  textAlign(LEFT, TOP); fill(255, 200, 100, alpha); textSize(18); text(speaker + ":", boxX + 25, boxY + 15);
  textAlign(LEFT, CENTER); fill(255, alpha); textSize(26); text(txt, boxX + 25, boxY + 60);
  pop();
}

function setGradient(x, y, w, h, c1, c2) {
  noFill();
  for (let i = y; i <= y + h; i++) {
    let inter = map(i, y, y + h, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c); line(x, i, x + w, i);
  }
  noStroke();
}

class Button {
  constructor(label, x, y, w, h, isCircle = false) {
    this.label = label; this.x = x; this.y = y; this.w = w; this.h = h;
    this.isCircle = isCircle; this.scale = 1;
  }
  update() {
    let isHovering = false;
    if (this.isCircle) isHovering = dist(mouseX, mouseY, this.x, this.y) < this.w / 2;
    else isHovering = (mouseX > this.x - this.w/2 && mouseX < this.x + this.w/2 && mouseY > this.y - this.h/2 && mouseY < this.y + this.h/2);
    this.scale = lerp(this.scale, isHovering ? 1.1 : 1.0, 0.2); 
  }
  show() {
    push(); translate(this.x, this.y); scale(this.scale);
    fill(255, 240, 220); 
    if (this.isCircle) circle(0, 0, this.w);
    else rect(-this.w/2, -this.h/2, this.w, this.h, 30);
    fill(100, 80, 60); textSize(24); textAlign(CENTER, CENTER); text(this.label, 0, 0);
    pop();
  }
  isClicked() {
    if (this.isCircle) return dist(mouseX, mouseY, this.x, this.y) < this.w / 2;
    return (mouseX > this.x - this.w/2 && mouseX < this.x + this.w/2 && mouseY > this.y - this.h/2 && mouseY < this.y + this.h/2);
  }
}

class Cloud {
  constructor() {
    this.x = random(width); this.y = random(height * 0.4);
    this.size = random(80, 200); this.speed = random(0.2, 0.8);
  }
  update() { this.x += this.speed; if (this.x > width + this.size) this.x = -this.size; }
  show(col, alpha) {
    fill(col, col, col, alpha);
    ellipse(this.x, this.y, this.size, this.size * 0.6);
    ellipse(this.x + this.size*0.3, this.y - this.size*0.2, this.size*0.8, this.size*0.5);
  }
}

function drawClouds(col, alpha) { for (let c of clouds) { c.update(); c.show(col, alpha); } }

class SunParticle {
  constructor() {
    this.x = random(width); this.y = random(height);
    this.size = random(2, 6); this.speed = random(0.5, 1.5); this.offset = random(100);
  }
  show() {
    this.y -= this.speed * 0.5; this.x += sin(frameCount * 0.02 + this.offset) * 1;
    if (this.y < 0) this.y = height;
    fill(255, 255, 200, 150); circle(this.x, this.y, this.size);
  }
}

function drawSunParticles() { for (let p of sunParticles) p.show(); }

class Raindrop {
  constructor() {
    this.x = random(width); this.y = random(-height, height);
    this.length = random(10, 25); this.speed = random(10, 20);
  }
  show(speedMult) {
    this.y += this.speed * speedMult;
    if (this.y > height) { this.y = random(-100, 0); this.x = random(width); }
    stroke(200, 220, 255, 120); strokeWeight(2); line(this.x, this.y, this.x, this.y + this.length); noStroke();
  }
}

function drawRain(speedMult) { for (let r of raindrops) r.show(speedMult); }

function windowResized() { resizeCanvas(windowWidth, windowHeight); }