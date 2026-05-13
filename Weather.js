let scene = 1; 
let sceneTimer = 0;
let transitionAlpha = 0;
let isFading = false;
let nextScene = 1;
let canAdvance = false;

// Shared Particle Systems
let clouds = [];
let sunParticles = [];
let raindrops = [];
let snowflakes = [];

// Boy Specific Logic
let ballActive = false;
let ballStartTime = 0;

// Girl Specific Logic
let paintLevel = 0; 
let speechActive = false;
let activeWeather = "";
let activeEmotion = "";
let activeSpeaker = "";
let activeDialogue = "";
let activeDialogueStart = 0;

// UI Elements
let btnBegin, btnBoy, btnGirl;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  frameRate(60);
  noStroke();

  // Initialize Particles
  for (let i = 0; i < 15; i++) clouds.push(new Cloud());
  for (let i = 0; i < 60; i++) sunParticles.push(new SunParticle());
  for (let i = 0; i < 300; i++) raindrops.push(new Raindrop());
  for (let i = 0; i < 200; i++) snowflakes.push(new Snowflake());

  // Buttons
  btnBegin = new Button("BEGIN", width / 2, height * 0.7, 210, 75);
  btnBoy = new Button("BOY", width * 0.30, height * 0.65, 160, 160, true);
  btnGirl = new Button("GIRL", width * 0.70, height * 0.65, 160, 160, true);
}

function draw() {
  activeWeather = "";
  activeSpeaker = "";
  noStroke(); 

  push();
  if (scene === 1) playScene1_Title();
  else if (scene === 2) playChoice(); 
  
  // Boy Storyline
  else if (scene === 3) playScene3_Childhood();
  else if (scene === 4) playScene4_Teenage();
  else if (scene === 5) playScene5_OfficeWindow();
  else if (scene === 6) playScene6_FinalQuote();
  else if (scene === 7) playScene7_TheEnd();

  // Girl Storyline
  else if (scene === 20) playGirlRain();
  else if (scene === 21) playGirlStorm();
  else if (scene === 22) playGirlEscape();
  else if (scene === 23) playGirlSuccess();
  else if (scene === 24) playGirlSpeech();
  else if (scene === 100) playEnding();
  pop();

  if (activeWeather !== "") drawEmotionTheme(activeWeather, activeEmotion);
  if (activeSpeaker !== "") drawDialogueBoxGirl(activeSpeaker, activeDialogue, activeDialogueStart);

  let duration = getSceneDuration(scene);
  if (scene >= 3 && scene !== 100 && sceneTimer > duration && !isFading) {
    canAdvance = true;
    drawContinuePrompt();
  }

  if (isFading) {
    transitionAlpha += 10; 
    if (transitionAlpha >= 255) {
      scene = nextScene;
      sceneTimer = 0;
      ballActive = false; 
      paintLevel = 0;
      speechActive = false;
      isFading = false;
      canAdvance = false; 
    }
  } else {
    if (transitionAlpha > 0) transitionAlpha -= 10; 
  }

  fill(0, transitionAlpha);
  rect(0, 0, width, height);

  if (!isFading) sceneTimer++;
}

function getSceneDuration(s) {
  const durations = { 
    3: 300, 4: 350, 5: 400, 6: 300, 7: 200, 
    20: 250, 21: 280, 22: 280, 23: 320, 24: 300 
  };
  return durations[s] || 300;
}

function keyPressed() {
  if (scene === 3 && (key === 'b' || key === 'B')) { ballActive = true; ballStartTime = frameCount; }
  if (scene === 23 && (key === 'p' || key === 'P')) paintLevel += 10;
  if (scene === 24 && (key === 's' || key === 'S')) speechActive = true;
}

function mousePressed() {
  if (!isFading) {
    if (scene === 1 && btnBegin.isClicked()) triggerFade(2);
    else if (scene === 2) {
      if (btnBoy.isClicked()) triggerFade(3);
      if (btnGirl.isClicked()) triggerFade(20);
    } 
    else if (canAdvance) {
       if (scene === 7 || scene === 24) triggerFade(100);
       else triggerFade(scene + 1);
    }
  }
}

/* --- CORE SCENES --- */

function playScene1_Title() {
  setGradient(0, 0, width, height, color(135, 206, 235), color(255, 204, 153)); 
  fill(255, 255, 200, 150); circle(width / 2, height * 0.8, 400); 
  drawClouds(255, 200); drawSunParticles();
  textAlign(CENTER, CENTER); fill(255); textSize(60); text("WEATHER AS MOOD", width / 2, height * 0.35);
  textSize(24); fill(255, 220); text("Every weather tells a story.", width / 2, height * 0.45);
  btnBegin.update(); btnBegin.show();
}

function playChoice() {
  setGradient(0, 0, width, height, color(255, 235, 210), color(255, 245, 235)); 
  drawClouds(255, 120); textAlign(CENTER, CENTER);
  fill(100, 80, 60); textSize(48); text("Pick Your Gender", width / 2, height * 0.28);
  btnBoy.update(); btnBoy.show(); btnGirl.update(); btnGirl.show();
}

/* --- BOY STORY --- */

function playScene3_Childhood() {
  background(135, 206, 235); fill(255, 223, 0, 200); circle(width * 0.8, height * 0.2, 150); 
  drawClouds(255, 220); drawSunParticles();
  fill(124, 252, 0); rect(0, height * 0.6, width, height * 0.4);
  let boyX = width * 0.3; let boyY = height * 0.6; let batAngle = 30; 
  if (ballActive) {
    let el = frameCount - ballStartTime;
    if (el > 20 && el < 40) batAngle = map(el, 20, 40, 30, -50); 
    else if (el >= 40 && el < 55) batAngle = map(el, 40, 55, -50, 130); 
    else if (el >= 55) batAngle = 130; 
  }
  drawCharacterBoy(boyX, boyY, color(20, 80, 150), color(255, 200, 150), true, 1.2, batAngle);
  drawSceneHeading("SUNSHINE = JOY & INNOCENCE");
  if (!ballActive) {
    push(); let pulse = map(sin(frameCount * 0.1), -1, 1, 150, 255);
    textAlign(CENTER); textSize(32); textStyle(BOLD); fill(255, 255, 0, pulse); text("PRESS 'B' TO BOWL", width / 2, height * 0.2); pop();
  }
  if (ballActive) {
    fill(200, 50, 50); let el = frameCount - ballStartTime;
    let contactX = boyX + 45; let contactY = height * 0.52;
    if (el <= 45) {
      circle(map(el, 0, 45, width * 1.1, contactX), map(el, 0, 45, height * 0.4, contactY) + abs(sin(el * 0.1)) * 20, 15);
    } else {
      circle(map(el, 45, 125, contactX, width * 0.9), map(el, 45, 125, contactY, -100), 15);
    }
  }
  setDialogue("LITTLE BOY", "I just wanted to play.", 50);
}

function playScene4_Teenage() {
  setGradient(0, 0, width, height, color(112, 128, 144), color(169, 169, 169)); 
  drawClouds(100, 150); if (sceneTimer % 150 > 140) { fill(255, 100); rect(0, 0, width, height); }
  fill(80, 90, 100); rect(0, height * 0.65, width, height * 0.4);
  drawAdult(width * 0.65, height * 0.65, color(30, 40, 60), color(200, 150, 120), 1.3); 
  drawCharacterBoy(width * 0.35, height * 0.65, color(40, 80, 120), color(255, 200, 150), false, 1.1); 
  drawSceneHeading("STORM = REBEL, ANGER & FRUSTRATION");
  if (sceneTimer < 180) setDialogue("FATHER", "Cricket won't build your future.", 30);
  else setDialogue("TEEN", "But it was my dream.", 180);
}

function playScene5_OfficeWindow() {
  background(20, 30, 50); 
  let winX = width * 0.15; let winY = height * 0.1;
  let winW = width * 0.7; let winH = height * 0.55;
  
  fill(30, 40, 60); rect(winX, winY, winW, winH);
  push();
  clip(() => { rect(winX, winY, winW, winH); });
  drawRain(1.0);
  
  // Road
  fill(40, 44, 52); rect(winX, winY + winH * 0.7, winW, winH * 0.3);
  stroke(200, 150); strokeWeight(2);
  for(let i = 0; i < winW; i += 40) line(winX + i, winY + winH * 0.85, winX + i + 20, winY + winH * 0.85);
  noStroke();

  // Vehicle
  let carX = (frameCount * 2) % (winW + 150) + winX - 150;
  let carY = winY + winH * 0.75;
  fill(60, 70, 90); rect(carX, carY, 65, 22, 5);
  fill(0); circle(carX + 15, carY + 22, 12); circle(carX + 50, carY + 22, 12);
  fill(255, 255, 200, 180); circle(carX + 60, carY + 8, 6);
  
  // Children Playing
  drawCharacterBoy(winX + winW * 0.3, winY + winH * 0.65, color(80, 100, 140), color(200, 150, 120), true, 0.25, 45);
  drawCharacterBoy(winX + winW * 0.45, winY + winH * 0.65, color(100, 80, 100), color(200, 150, 120), false, 0.22, 0);
  drawCharacterBoy(winX + winW * 0.6, winY + winH * 0.65, color(40, 80, 120), color(255, 200, 150), false, 0.23, 10);
  pop();

  // Window Grid
  stroke(25, 30, 40); strokeWeight(10);
  line(winX + winW/2, winY, winX + winW/2, winY + winH);
  line(winX, winY + winH/2, winX + winW, winY + winH/2);
  stroke(15, 20, 25); strokeWeight(15); noFill(); rect(winX, winY, winW, winH); noStroke();
  
  // Walls
  fill(10, 15, 25); 
  rect(0, 0, width, winY); rect(0, winY + winH, width, height); rect(0, winY, winX, winH); rect(winX + winW, winY, width, winH); 
  
  // Desk
  fill(40, 30, 25); rect(0, height * 0.75, width, height * 0.25);
  
  // Laptop Restored
  let laptopX = width * 0.75; let laptopY = height * 0.78;
  fill(150); quad(laptopX - 50, laptopY + 20, laptopX + 100, laptopY + 20, laptopX + 80, laptopY, laptopX - 30, laptopY); // Base
  fill(130); rect(laptopX - 30, laptopY - 60, 110, 60, 5); // Lid
  fill(200, 230, 255, 80); rect(laptopX - 25, laptopY - 55, 100, 50, 2); // SCREEN

  // Man
  fill(20, 20, 25); rect(width*0.5 - 80, height*1.05 - 200, 160, 250, 20);
  fill(30, 20, 15); circle(width*0.5, height*1.05 - 260, 80);

  drawSceneHeading("RAIN = SAD REGRETS & LONELINESS");
  setDialogue("MAN", "Some dreams stay with us forever.", 40);
}

function playScene6_FinalQuote() {
  background(10, 10, 15); drawRain(0.3); 
  textAlign(CENTER, CENTER); fill(255, map(sceneTimer, 50, 120, 0, 255)); textSize(32);
  text("The cost of ignoring your passion is\nspending your life wishing you hadn't.", width / 2, height / 2);
}

function playScene7_TheEnd() {
  background(10, 10, 15); drawRain(0.1); 
  fill(200, 150, 100, map(sceneTimer, 30, 100, 0, 255)); textSize(24); textAlign(CENTER, CENTER); text("THE END", width / 2, height / 2);
}

/* --- GIRL STORY --- */

function playGirlRain() {
  background(40, 45, 60); fill(60, 70, 90); rect(width * 0.1, height * 0.1, width * 0.4, height * 0.5); 
  push(); clip(() => { rect(width * 0.1, height * 0.1, width * 0.4, height * 0.5); }); drawRain(1.0); pop();
  fill(20, 25, 30); rect(width * 0.1, height * 0.1, width * 0.4, 15); rect(width * 0.1, height * 0.6, width * 0.4, 15); 
  fill(50, 40, 35); rect(0, height * 0.7, width, height * 0.3); 
  drawGirl(width * 0.6, height * 0.7, 1.4, 'stand');
  activeWeather = "RAIN"; activeEmotion = "LONELINESS & RESTRICTION";
  setDialogue("GIRL", "I wanted a life that felt like mine.", 50);
}

function playGirlStorm() {
  setGradient(0, 0, width, height, color(90, 100, 110), color(130, 135, 140)); 
  if (random(1) > 0.97) {
    fill(255, 150); rect(0, 0, width, height); stroke(255); strokeWeight(4); line(random(width), 0, random(width), height * 0.5); noStroke();
  }
  drawClouds(100, 180); fill(60, 65, 70); rect(0, height * 0.65, width, height * 0.4); 
  drawAdult(width * 0.3, height * 0.65, color(40, 30, 50), color(200, 150, 120), 1.4);
  drawGirl(width * 0.65, height * 0.65, 1.3, 'stand');
  activeWeather = "STORM"; activeEmotion = "REBELLION & COURAGE";
  if (sceneTimer < 150) setDialogue("MOTHER", "Girls should stay within limits.", 40);
  else setDialogue("TEEN", "But I wanted more from life.", 150);
}

function playGirlEscape() {
  background(25, 30, 45); 
  fill(15, 20, 25); rect(width * 0.3, height * 0.15, width * 0.6, 40, 5); 
  fill(20, 25, 30); rect(width * 0.35, height * 0.15, 20, height * 0.55); rect(width * 0.85, height * 0.15, 20, height * 0.55); 
  fill(30, 35, 45); rect(0, height * 0.7, width, height * 0.3); 
  fill(90, 55, 45); rect(width * 0.42, height * 0.62, 80, 55, 5); 
  drawGirl(width * 0.55, height * 0.7, 1.3, 'stand');
  drawRain(1.5); activeWeather = "RAIN"; activeEmotion = "TRANSITION & HOPE";
  setDialogue("GIRL", "If I stayed, I would lose myself.", 50);
}

function playGirlSuccess() {
  setGradient(0, 0, width, height, color(135, 206, 250), color(255, 230, 180)); 
  fill(255, 223, 0, 180); circle(width * 0.15, height * 0.2, 120);
  fill(255, 255, 200, 40); triangle(width*0.15, height*0.2, width*0.1, height, width*0.9, height);
  drawSunParticles();
  fill(240, 230, 220); rect(0, height * 0.6, width, height * 0.4); 
  push(); textAlign(CENTER); fill(100, 80, 60, map(sin(frameCount*0.1),-1,1,100,255));
  textSize(24); text("PRESS 'P' TO PAINT", width/2, height*0.25); pop();
  push(); translate(width * 0.65, height * 0.35);
  fill(139, 69, 19); rect(0, 0, 180, 220, 5); fill(250, 245, 235); rect(10, 10, 160, 200); 
  if(paintLevel > 10) { fill(255, 100, 100); circle(90, 90, 70); }
  if(paintLevel > 40) { fill(255, 200, 100); circle(70, 110, 50); }
  if(paintLevel > 70) { fill(100, 200, 255); circle(110, 130, 60); }
  pop();
  drawGirl(width * 0.48, height * 0.6, 1.4, paintLevel > 0 ? 'draw' : 'stand');
  activeWeather = "SUNSHINE"; activeEmotion = "FREEDOM & SUCCESS";
  setDialogue("WOMAN", "I chose myself.", 50);
}

function playGirlSpeech() {
  setGradient(0, 0, width, height, color(180, 200, 220), color(230, 240, 250)); 
  fill(255); rect(0, height * 0.55, width, height * 0.45); 
  for(let i = 0; i < 7; i++) { drawAudienceMember(width * 0.15 + (i * width * 0.1), height * 0.9, 1.4); }
  if (!speechActive) {
    push(); textAlign(CENTER); fill(100, 80, 60, map(sin(frameCount*0.1),-1,1,100,255));
    textSize(24); text("PRESS 'S' TO SPEAK", width/2, height*0.25); pop();
  }
  drawGirl(width / 2, height * 0.6, 1.2, 'stand'); drawSnow();
  activeWeather = "SNOW"; activeEmotion = "PEACE & HEALING";
  if (speechActive) setDialogue("WOMAN", "Sometimes the bravest thing you can do is choose your own life.", 10);
}

function playEnding() {
  background(10, 10, 15); textAlign(CENTER, CENTER);
  fill(255, map(sceneTimer, 50, 150, 0, 255)); textSize(45); text("WEATHER AS MOOD", width / 2, height * 0.35);
  fill(200, 220, 255, map(sceneTimer, 150, 300, 0, 255)); 
  textSize(28); text("Your worth is not defined by the limits others set for you.", width / 2, height * 0.55);
  fill(255, 200, 100, map(sceneTimer, 300, 450, 0, 255)); textSize(32); text("THE END", width / 2, height * 0.75);
}

/* --- HELPERS --- */

function drawGirl(x, y, sizeScale = 1, pose = 'stand') {
  push(); translate(x, y); scale(sizeScale);
  fill(160, 80, 120); triangle(0, -75, -35, 0, 35, 0); rect(-15, -75, 30, 40, 5); fill(255, 200, 150); circle(0, -90, 40);
  fill(50, 30, 40); arc(0, -95, 48, 50, PI, 0); 
  beginShape(); vertex(-24, -95); bezierVertex(-35, -50, -10, -20, -30, 0); vertex(-15, 0); bezierVertex(0, -40, -15, -70, 0, -95); endShape(CLOSE);
  if (pose === 'draw') { push(); translate(12, -55); rotate(radians(70)); fill(255, 200, 150); rect(0, -5, 35, 10, 5); pop(); } pop();
}

function drawCharacterBoy(x, y, shirtColor, skinColor, hasBat, sizeScale = 1, batAngle = 30) {
  push(); translate(x, y); scale(sizeScale); fill(shirtColor); rect(-20, -80, 40, 80, 10); fill(skinColor); circle(0, -100, 45);
  if (hasBat) { push(); translate(15, -60); rotate(radians(batAngle)); fill(180, 120, 80); rect(-5, -10, 10, 80, 5); pop(); } pop();
}

function drawAdult(x, y, shirtColor, skinColor, sizeScale = 1) { push(); translate(x, y); scale(sizeScale); fill(shirtColor); rect(-25, -85, 50, 85, 10); fill(skinColor); circle(0, -105, 45); pop(); }
function drawAudienceMember(x, y, sizeScale = 1) { push(); translate(x, y); scale(sizeScale); fill(30, 35, 45); rect(-25, -60, 50, 80, 20, 20, 5, 5); fill(20, 15, 15); circle(0, -75, 40); pop(); }

function drawSceneHeading(title) {
  push(); textSize(18); rectMode(CENTER); fill(15, 18, 22, 220); 
  rect(width / 2, 60, textWidth(title.toUpperCase()) + 60, 40, 25); 
  textAlign(CENTER, CENTER); fill(255); text(title.toUpperCase(), width / 2, 60); pop();
}

function drawDialogueBoxGirl(speaker, txt, startFrame) {
  let alpha = (sceneTimer > startFrame) ? 255 : 0;
  if (alpha <= 0) return;
  push(); fill(15, 20, 25, alpha * 0.85); stroke(200, 220, 255, alpha * 0.5); strokeWeight(2);
  rect(width / 2 - (width * 0.7) / 2, height - 150, width * 0.7, 120, 15); noStroke();
  textAlign(LEFT, TOP); fill(255, 200, 100, alpha); textSize(20); text(speaker + ":", width / 2 - (width * 0.7) / 2 + 30, height - 130);
  fill(255, alpha); textSize(26); text(txt, width / 2 - (width * 0.7) / 2 + 30, height - 100, width * 0.7 - 60, 70); pop();
}

function setDialogue(speaker, txt, startFrame) { activeSpeaker = speaker; activeDialogue = txt; activeDialogueStart = startFrame; }
function drawEmotionTheme(weather, emotion) { drawSceneHeading(weather + " = " + emotion); }
function triggerFade(targetScene) { isFading = true; nextScene = targetScene; }
function setGradient(x, y, w, h, c1, c2) { noFill(); for (let i = y; i <= y + h; i++) { stroke(lerpColor(c1, c2, map(i, y, y + h, 0, 1))); line(x, i, x + w, i); } noStroke(); }
function drawContinuePrompt() { let pulse = map(sin(frameCount * 0.08), -1, 1, 150, 255); fill(255, 200, 150, pulse); textAlign(RIGHT, BOTTOM); textSize(20); text("Next ➔", width - 40, height - 40); }

class Button {
  constructor(label, x, y, w, h, isCircle = false) { this.label = label; this.x = x; this.y = y; this.w = w; this.h = h; this.isCircle = isCircle; this.scale = 1; }
  update() { let hov = this.isCircle ? dist(mouseX, mouseY, this.x, this.y) < this.w/2 : (mouseX > this.x-this.w/2 && mouseX < this.x+this.w/2 && mouseY > this.y-this.h/2 && mouseY < this.y+this.h/2); this.scale = lerp(this.scale, hov ? 1.05 : 1.0, 0.2); }
  show() { 
    push(); translate(this.x, this.y); scale(this.scale); 
    if (scene === 2) { drawingContext.shadowBlur = 45; drawingContext.shadowColor = color(255, 210, 100, 180); }
    else { drawingContext.shadowBlur = 0; }
    fill(255, 250, 245); 
    if (this.isCircle) circle(0, 0, this.w); else rect(-this.w/2, -this.h/2, this.w, this.h, 40); 
    fill(120, 95, 75); textAlign(CENTER, CENTER); textSize(32); text(this.label, 0, 0); 
    pop(); 
  }
  isClicked() { return this.isCircle ? dist(mouseX, mouseY, this.x, this.y) < this.w/2 : (mouseX > this.x-this.w/2 && mouseX < this.x+this.w/2 && mouseY > this.y-this.h/2 && mouseY < this.y+this.h/2); }
}

class Cloud { constructor() { this.x = random(width); this.y = random(height * 0.4); this.size = random(80, 200); this.speed = random(0.2, 0.8); } update() { this.x += this.speed; if (this.x > width + this.size) this.x = -this.size; } show(col, alpha) { noStroke(); fill(255, alpha * 0.4); ellipse(this.x, this.y, this.size, this.size * 0.6); } }
class SunParticle { constructor() { this.x = random(width); this.y = random(height); this.size = random(2, 6); this.speed = random(0.5, 1.5); } show() { this.y -= this.speed * 0.5; if (this.y < 0) this.y = height; fill(255, 255, 200, 150); circle(this.x, this.y, this.size); } }
class Raindrop { constructor() { this.x = random(width); this.y = random(-height, height); this.length = random(10, 25); this.speed = random(10, 20); } show(speedMult) { this.y += this.speed * speedMult; if (this.y > height) this.y = -100; stroke(200, 220, 255, 120); strokeWeight(2); line(this.x, this.y, this.x, this.y + this.length); noStroke(); } }
class Snowflake { constructor() { this.x = random(width); this.y = random(-height, height); this.size = random(4, 8); this.speed = random(1, 3); } show() { this.y += this.speed; if (this.y > height) this.y = -50; fill(255, 220); circle(this.x, this.y, this.size); } }
function drawClouds(c, a) { for (let cl of clouds) { cl.update(); cl.show(c, a); } }
function drawSunParticles() { for (let p of sunParticles) p.show(); }
function drawRain(s) { for (let r of raindrops) r.show(s); }
function drawSnow() { for (let sn of snowflakes) sn.show(); }
function windowResized() { resizeCanvas(windowWidth, windowHeight); }