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
  // CAMERA AND SCENE RENDERING 
  push();
  
  if (scene === 1) playScene1_Title();
  else if (scene === 2) playScene2_Choice();
  else if (scene === 3) playScene3_Childhood();
  else if (scene === 4) playScene4_Teenage();
  else if (scene === 5) playScene5_OfficeWindow();
  else if (scene === 6) playScene6_FinalQuote();
  else if (scene === 7) playScene7_TheEnd();

  pop();

  // OVERLAYS
  // drawCinematicBars(); 

  // INTERACTIVE PROGRESSION PROMPT 
  if (scene >= 3 && sceneTimer > getSceneDuration(scene) && !isFading && scene < 7) {
    canAdvance = true;
    drawContinuePrompt();
  } else {
    canAdvance = false;
  }

  // TRANSITION LOGIC 
  if (isFading) {
    transitionAlpha += 4; // Fade out to black
    if (transitionAlpha >= 255) {
      scene = nextScene;
      sceneTimer = 0;
      isFading = false;
      canAdvance = false; 
    }
  } else {
    if (transitionAlpha > 0) transitionAlpha -= 4; // Fade in from black
  }

  // Draw Global Fade Screen
  fill(0, transitionAlpha);
  rect(0, 0, width, height);

  // Advance Timer
  if (!isFading) {
    sceneTimer++;
  }
}

function triggerFade(targetScene) {
  isFading = true;
  nextScene = targetScene;
}

// Scene animation durations (frames before the user can advance)
function getSceneDuration(s) {
  const durations = { 3: 500, 4: 500, 5: 600, 6: 400, 7: 300 };
  return durations[s];
}

/* SCENES*/

function playScene1_Title() {
  setGradient(0, 0, width, height, color(135, 206, 235), color(255, 204, 153)); 
  
  fill(255, 255, 200, 150);
  circle(width / 2, height * 0.8, 400); // Sun

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
  background(135, 206, 235); // Clear sky blue
  
  fill(255, 223, 0, 200);
  circle(width * 0.8, height * 0.2, 150); // Sun

  drawClouds(255, 220);
  drawSunParticles();

  fill(124, 252, 0); // Bright warm grass
  rect(0, height * 0.6, width, height * 0.4);

  let boyX = width * 0.3;
  let boyY = height * 0.6;

  // Pure TPP Bat Swing Animation
  let batAngle = 30; // Resting position
  if (sceneTimer > 250 && sceneTimer < 300) {
    batAngle = map(sceneTimer, 250, 300, 30, -50); // Draw bat back
  } else if (sceneTimer >= 300 && sceneTimer < 340) {
    batAngle = map(sceneTimer, 300, 340, -50, 130); // Fast Swing forward
  } else if (sceneTimer >= 340) {
    batAngle = 130; // Follow-through pose
  }

  // Draw Boy with animated bat
  drawCharacter(boyX, boyY, color(20, 80, 150), color(255, 200, 150), true, 1.2, batAngle);

  // Ball Delivery and Hit Logic
  fill(200, 50, 50); // Red ball
  if (sceneTimer < 320) {
    let bx = map(sceneTimer, 150, 320, width * 1.1, boyX + 40);
    let by = height * 0.5 - abs(sin(sceneTimer * 0.08)) * 40; 
    if (sceneTimer > 150) circle(bx, by, 15);
  } else {
    let bx = map(sceneTimer, 320, 500, boyX + 40, width * 0.8);
    let by = map(sceneTimer, 320, 500, height * 0.5, -50); 
    circle(bx, by, 15);
  }

  drawDialogueBox("LITTLE BOY", "I just wanted to play.", 100, 600);
}

function playScene4_Teenage() {
  setGradient(0, 0, width, height, color(112, 128, 144), color(169, 169, 169)); // Stormy grey
  drawClouds(100, 150);

  // SHAKE EFFECT REMOVED
  // if (sceneTimer % 60 < 10) translate(random(-2, 2), random(-2, 2)); 

  if (sceneTimer % 150 > 140) {
    fill(255, 255, 255, 100);
    rect(0, 0, width, height); // Lightning
  }

  fill(80, 90, 100);
  rect(0, height * 0.65, width, height * 0.4);

  drawCharacter(width * 0.65, height * 0.65, color(30, 40, 60), color(200, 150, 120), false, 1.3); // Parent
  drawCharacter(width * 0.35, height * 0.65, color(40, 80, 120), color(255, 200, 150), false, 1.1); // Teen

  if (sceneTimer < 250) {
    drawDialogueBox("FATHER", "Cricket won't build your future.", 50, 220);
  } else {
    drawDialogueBox("TEEN", "But it was my dream.", 250, 500);
  }
}

function playScene5_OfficeWindow() {
  // 1. DRAW OUTSIDE SCENERY FIRST (Rainy night with kids)
  background(20, 30, 50); // Dark evening blue
  
  // Streetlight
  fill(255, 230, 150, 60); 
  triangle(width * 0.6, height * 0.1, width * 0.2, height, width * 0.9, height);
  fill(50); 
  rect(width * 0.58, height * 0.1, 15, height); // Pole
  fill(255, 240, 200); 
  circle(width * 0.6, height * 0.1, 30); // Bulb

  // Kids playing outside in the rain
  drawCharacter(width * 0.45, height * 0.55, color(80, 100, 140), color(200, 150, 120), true, 0.4, 60);
  drawCharacter(width * 0.65, height * 0.55, color(100, 80, 100), color(200, 150, 120), false, 0.3, 0);

  // Rain falling outside
  drawRain(1.0);

  // 2. MASK WITH OFFICE WALLS (Creates the window illusion)
  fill(30, 35, 45); // Dark office wall color
  let winX = width * 0.15;
  let winY = height * 0.1;
  let winW = width * 0.7;
  let winH = height * 0.55;

  rect(0, 0, width, winY); // Top wall
  rect(0, winY + winH, width, height); // Bottom wall
  rect(0, winY, winX, winH); // Left wall
  rect(winX + winW, winY, width, winH); // Right wall

  // Window Frame & Sill
  stroke(15, 20, 25);
  strokeWeight(15);
  noFill();
  rect(winX, winY, winW, winH); // Frame
  noStroke();
  fill(20, 25, 30);
  rect(winX - 20, winY + winH - 5, winW + 40, 25); // Sill

  // 3. DRAW OFFICE INTERIOR (Foreground)
  // Desk
  fill(40, 30, 25); // Dark wood desk
  rect(0, height * 0.75, width, height * 0.25);

  // Laptop resting on desk
  let laptopX = width * 0.75;
  let laptopY = height * 0.78;
  fill(150);
  quad(laptopX - 50, laptopY + 20, laptopX + 100, laptopY + 20, laptopX + 80, laptopY, laptopX - 30, laptopY); // Base
  fill(130);
  rect(laptopX - 30, laptopY - 60, 110, 60, 5); // Screen Backing
  fill(200, 230, 255, 60);
  rect(laptopX - 25, laptopY - 55, 100, 50, 2); // Idle glowing screen

  // 4. DRAW CHARACTER SITTING (From Behind, looking out)
  let charX = width * 0.5;
  let charY = height * 1.05; // Placed low to look naturally seated

  // Office Chair Back
  fill(20, 20, 25);
  rect(charX - 80, charY - 200, 160, 250, 20);

  // Character Shoulders
  fill(45, 55, 65); // Shirt
  rect(charX - 70, charY - 220, 140, 120, 40); 

  // Character Head (Back of head)
  fill(30, 20, 15); // Dark hair
  circle(charX, charY - 260, 80);

  // Dialogue
  drawDialogueBox("MAN", "Some dreams stay with us forever.", 50, 700);
}

function playScene6_FinalQuote() {
  // Pure black screen
  background(10, 10, 15); 
  
  // Soft, mild rain
  drawRain(0.3); 
  
  // Fade text in slowly
  let textAlpha = map(sceneTimer, 50, 150, 0, 255);
  
  textAlign(CENTER, CENTER);
  fill(255, textAlpha);
  textSize(32);
  
  // Quote layout
  text("The cost of ignoring your passion is", width / 2, height / 2 - 30);
  text("spending your life wishing you hadn't.", width / 2, height / 2 + 30);
}

function playScene7_TheEnd() {
  background(10, 10, 15);
  drawRain(0.1); // Very subtle rain
  
  fill(200, 150, 100, map(sceneTimer, 50, 150, 0, 255)); // Warm gold text
  textSize(24);
  textAlign(CENTER, CENTER);
  text("THE END", width / 2, height / 2);
}

/* UI PROMPTS & INTERACTION LOGIC */

function drawContinuePrompt() {
  // Pulsing Alpha for a smooth "breathing" effect
  let pulse = map(sin(frameCount * 0.05), -1, 1, 100, 255);
  fill(255, 200, 150, pulse);
  textAlign(RIGHT, BOTTOM);
  textSize(20);
  text("Click to Continue ➔", width - 40, height - 40);
}

function mousePressed() {
  if (scene === 1 && btnBegin.isClicked() && !isFading) triggerFade(2);
  
  if (scene === 2 && !isFading) {
    if (btnBoy.isClicked()) triggerFade(3);
    if (btnGirl.isClicked()) {
      showComingSoon = true;
      comingSoonTimer = 0;
    }
  }

  // Advance Story on Click
  if (canAdvance && !isFading) triggerFade(scene + 1);
}

/* HELPER FUNCTIONS & CLASSES */

function drawCharacter(x, y, shirtColor, skinColor, hasBat, sizeScale = 1, batAngle = 30) {
  push();
  translate(x, y);
  scale(sizeScale);
  
  fill(shirtColor); // Body
  rect(-20, -80, 40, 80, 10);
  
  fill(skinColor); // Head
  circle(0, -100, 45);

  if (hasBat) {
    push();
    translate(15, -60); // Shoulder/Hands Anchor
    rotate(radians(batAngle));
    fill(180, 120, 80); // Wooden Bat
    rect(-5, -10, 10, 80, 5); 
    pop();
  }
  pop();
}

function drawDialogueBox(speaker, txt, startFrame, endFrame) {
  let alpha = 0;
  if (sceneTimer > startFrame) {
    if (sceneTimer < startFrame + 30) alpha = map(sceneTimer, startFrame, startFrame + 30, 0, 255);
    else if (sceneTimer > endFrame - 30 && sceneTimer < endFrame) alpha = map(sceneTimer, endFrame - 30, endFrame, 255, 0);
    else if (sceneTimer >= endFrame) alpha = 0;
    else alpha = 255;
  }
  
  if (alpha <= 0) return; // Don't draw if invisible

  push();
  let boxW = width * 0.6;
  let boxH = 100;
  let boxX = width / 2 - boxW / 2;
  let boxY = height - 150; // Position at bottom of screen

  // Transparent dark dialogue box with glowing border
  fill(20, 25, 35, alpha * 0.85); 
  stroke(200, 230, 255, alpha * 0.6); // Soft border
  strokeWeight(2);
  rect(boxX, boxY, boxW, boxH, 15);
  noStroke();

  // Speaker Name (Yellow/Orange)
  textAlign(LEFT, TOP);
  fill(255, 200, 100, alpha);
  textSize(18);
  text(speaker + ":", boxX + 25, boxY + 15);

  // Dialogue Text (White)
  textAlign(LEFT, CENTER);
  fill(255, alpha);
  textSize(26);
  text(txt, boxX + 25, boxY + 60);
  pop();
}

function drawCinematicBars() {
  fill(10);
  rect(0, 0, width, 80);
  rect(0, height - 80, width, 80);
}

function setGradient(x, y, w, h, c1, c2) {
  noFill();
  for (let i = y; i <= y + h; i++) {
    let inter = map(i, y, y + h, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(x, i, x + w, i);
  }
  noStroke();
}

/* UI Classes */
class Button {
  constructor(label, x, y, w, h, isCircle = false) {
    this.label = label;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.isCircle = isCircle;
    this.scale = 1;
  }

  update() {
    let isHovering = false;
    if (this.isCircle) isHovering = dist(mouseX, mouseY, this.x, this.y) < this.w / 2;
    else isHovering = (mouseX > this.x - this.w/2 && mouseX < this.x + this.w/2 && mouseY > this.y - this.h/2 && mouseY < this.y + this.h/2);

    this.scale = lerp(this.scale, isHovering ? 1.1 : 1.0, 0.2); 
  }

  show() {
    push();
    translate(this.x, this.y);
    scale(this.scale);
    
    drawingContext.shadowBlur = 20;
    drawingContext.shadowColor = 'rgba(255, 200, 100, 0.5)';
    
    fill(255, 240, 220); 
    if (this.isCircle) circle(0, 0, this.w);
    else rect(-this.w/2, -this.h/2, this.w, this.h, 30);
    
    drawingContext.shadowBlur = 0; 

    fill(100, 80, 60); 
    textSize(24);
    textAlign(CENTER, CENTER);
    text(this.label, 0, 0);
    pop();
  }

  isClicked() {
    if (this.isCircle) return dist(mouseX, mouseY, this.x, this.y) < this.w / 2;
    return (mouseX > this.x - this.w/2 && mouseX < this.x + this.w/2 && mouseY > this.y - this.h/2 && mouseY < this.y + this.h/2);
  }
}

/* Particle Systems */
class Cloud {
  constructor() {
    this.x = random(width);
    this.y = random(height * 0.4);
    this.size = random(80, 200);
    this.speed = random(0.2, 0.8);
  }
  update() {
    this.x += this.speed;
    if (this.x > width + this.size) this.x = -this.size;
  }
  show(col, alpha) {
    fill(col, col, col, alpha);
    ellipse(this.x, this.y, this.size, this.size * 0.6);
    ellipse(this.x + this.size*0.3, this.y - this.size*0.2, this.size*0.8, this.size*0.5);
  }
}

function drawClouds(col, alpha) {
  for (let c of clouds) {
    c.update();
    c.show(col, alpha);
  }
}

class SunParticle {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(2, 6);
    this.speed = random(0.5, 1.5);
    this.offset = random(100);
  }
  show() {
    this.y -= this.speed * 0.5;
    this.x += sin(frameCount * 0.02 + this.offset) * 1;
    if (this.y < 0) this.y = height;
    fill(255, 255, 200, 150);
    circle(this.x, this.y, this.size);
  }
}

function drawSunParticles() {
  for (let p of sunParticles) p.show();
}

class Raindrop {
  constructor() {
    this.x = random(width);
    this.y = random(-height, height);
    this.length = random(10, 25);
    this.speed = random(10, 20);
  }
  show(speedMult) {
    this.y += this.speed * speedMult;
    if (this.y > height) {
      this.y = random(-100, 0);
      this.x = random(width);
    }
    stroke(200, 220, 255, 120);
    strokeWeight(2);
    line(this.x, this.y, this.x, this.y + this.length);
    noStroke();
  }
}

function drawRain(speedMult) {
  for (let r of raindrops) r.show(speedMult);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}