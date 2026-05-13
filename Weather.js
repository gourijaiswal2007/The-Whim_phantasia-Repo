let scene = 1; 
// 1: Title, 2: Choice
// BOY: 10(Sunshine), 11(Storm), 12(Rain), 13(Regret), 14(Final Quote)
// GIRL: 20(Rain), 21(Storm), 22(Escape), 23(Success/Painting), 24(Speech)
// ENDING: 100

let sceneTimer = 0;
let transitionAlpha = 0;
let isFading = false;
let nextScene = 1;
let canAdvance = false;

// Overlay State Managers
let activeWeather = "";
let activeEmotion = "";
let activeSpeaker = "";
let activeDialogue = "";
let activeDialogueStart = 0;

// Particle Systems
let clouds = [];
let sunParticles = [];
let raindrops = [];
let snowflakes = [];

// UI Buttons
let btnBegin, btnBoy, btnGirl;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  frameRate(60);
  noStroke();

  // Initialize Particle Systems
  for (let i = 0; i < 12; i++) clouds.push(new Cloud());
  for (let i = 0; i < 60; i++) sunParticles.push(new SunParticle());
  for (let i = 0; i < 250; i++) raindrops.push(new Raindrop());
  for (let i = 0; i < 200; i++) snowflakes.push(new Snowflake());

  // Initialize UI Buttons
  btnBegin = new Button("BEGIN", width / 2, height * 0.75, 200, 60);
  btnBoy = new Button("BOY", width * 0.35, height * 0.6, 150, 150, true);
  btnGirl = new Button("GIRL", width * 0.65, height * 0.6, 150, 150, true);
}

function draw() {
  // Reset overlay data every frame
  activeWeather = "";
  activeSpeaker = "";

  push();
  
  // --- GLOBAL SCENE ROUTER ---
  if (scene === 1) playTitle();
  else if (scene === 2) playChoice();
  
  // Boy Path
  else if (scene === 10) playBoySunshine();
  else if (scene === 11) playBoyStorm();
  else if (scene === 12) playBoyRain();
  else if (scene === 13) playBoyRegret();
  else if (scene === 14) playBoyQuote();
  
  // Girl Path
  else if (scene === 20) playGirlRain();
  else if (scene === 21) playGirlStorm();
  else if (scene === 22) playGirlEscape();
  else if (scene === 23) playGirlSuccess();
  else if (scene === 24) playGirlSpeech();
  
  // Universal Ending
  else if (scene === 100) playEnding();

  pop();

  // --- DRAW OVERLAYS ON FULL SCREEN ---
  if (activeWeather !== "") {
    drawEmotionTheme(activeWeather, activeEmotion);
  }
  if (activeSpeaker !== "") {
    drawDialogueBox(activeSpeaker, activeDialogue, activeDialogueStart);
  }

  // --- TRANSITION AND UI INTERACTION LOGIC ---
  let duration = getSceneDuration(scene);
  
  if (scene >= 10 && scene !== 100 && sceneTimer > duration && !isFading) {
    canAdvance = true;
    drawContinuePrompt();
  } else {
    canAdvance = false;
  }

  // Cinematic Black Fade Logic
  if (isFading) {
    transitionAlpha += 4; 
    if (transitionAlpha >= 255) {
      scene = nextScene;
      sceneTimer = 0;
      isFading = false;
    }
  } else {
    if (transitionAlpha > 0) transitionAlpha -= 4; 
  }

  // Global Fade Screen Overlay
  fill(0, transitionAlpha);
  rect(0, 0, width, height);

  if (!isFading) sceneTimer++;
}

// Helpers to set Overlay Data inside scenes
function setEmotion(weather, emotion) {
  activeWeather = weather;
  activeEmotion = emotion;
}

function setDialogue(speaker, txt, startFrame) {
  activeSpeaker = speaker;
  activeDialogue = txt;
  activeDialogueStart = startFrame;
}

function triggerFade(targetScene) {
  isFading = true;
  nextScene = targetScene;
}

function getSceneDuration(s) {
  const durations = {
    10: 450, 11: 400, 12: 450, 13: 450, 14: 200, // Boy
    20: 350, 21: 400, 22: 400, 23: 450, 24: 400  // Girl
  };
  return durations[s] || 400;
}