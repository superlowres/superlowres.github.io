/**
 * 	Example P5JS canvas
 */

/* Cellular automato with simple reaction diffusion filter */
var timeStamps = [];

var maxI = 256;
var t = 1;
var ruleSet;
var yOffset = 0;

var cellSize = 1;
var cellMargin = 0;

var renderRefresh = false;
var RT;

var settingsObject = function () {
  this.d = 0.15;
  this.r = 0.01;
  this.pixelDensity = 1;

  this.maxI = 2048;
  this.cellSize = 1;
  this.cellMargin = 0;
  this.ruleSet = 1;

  this.speed = 30;

  this.RD = false;
  this.reRender = function () {
    selectRuleSet();
    t = 1;
    renderAutomata();
  };
  this.reSeed = function () {
    updateRules(random() * 100);
    selectRuleSet();

    this.reRender();
  };
};
var settings;
var gui;

var rule = {
  "111": 0,
  "110": 0,
  "101": 0,
  "100": 1,
  "011": 1,
  "010": 1,
  "001": 1,
  "000": 0,
};

const rule1 = {
  "111": 0,
  "110": 0,
  "101": 0,
  "100": 1,
  "011": 1,
  "010": 1,
  "001": 1,
  "000": 0,
};

const rule2 = {
  "111": 0,
  "110": 0,
  "101": 0,
  "100": 1,
  "011": 1,
  "010": 1,
  "001": 1,
  "000": 0,
};
const rule3 = {
  "111": 0,
  "110": 0,
  "101": 0,
  "100": 1,
  "011": 1,
  "010": 1,
  "001": 1,
  "000": 0,
};
const rule4 = {
  "111": 0,
  "110": 0,
  "101": 0,
  "100": 1,
  "011": 1,
  "010": 1,
  "001": 1,
  "000": 0,
};

const rules = ["111", "110", "101", "100", "011", "010", "001", "000"];

function preload() {}

function drawCell() {
  var x = mouseX;
  var y = mouseY;
}

function updateRules(mult) {
  for (var i = 0; i < rules.length; i++) {
    var newVal = Math.round(noise(mult * i));
    rule[rules[i]] = newVal;
    /* console.log(mult, i, newVal); */
  }
}

function setup() {
  ruleSet = rule1;
  settings = new settingsObject();
  gui = new dat.GUI({ autoPlace: false });
  gui.add(settings, "d", 0, 1);
  gui.add(settings, "r", -0.2, 0.2);
  gui.add(settings, "pixelDensity", 0.1, 4);
  gui.add(settings, "reRender");
  gui.add(settings, "RD");
  gui.add(settings, "reSeed");
  gui.add(settings, "cellSize", 0.1, 4);
  gui.add(settings, "cellMargin", 0, 10);
  gui.add(settings, "maxI", [64, 128, 256, 512, 1024, 2048]);
  gui.add(settings, "ruleSet", {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    random: "random",
  });
  gui.add(settings, "speed", 0.1, 30);
  updateRules(random()*100);

  var e = document.getElementsByClassName("datContainer")[0];
  e.appendChild(gui.domElement);

  createCanvas(settings.maxI, settings.maxI);   

  frameRate(5);
  /* pixelDensity(1); */
  noSmooth();

  renderAutomata();
}

function selectRuleSet() {
  switch (settings.ruleSet) {
    case 1:
      ruleSet = rule1;
      break;
    case 2:
      ruleSet = rule2;
      break;
    case 3:
      ruleSet = rule3;
      break;
    case 4:
      ruleSet = rule4;
      break;
    case "random":
      ruleSet = rule;
      break;
  }
  console.log(ruleSet);
}

function renderAutomata() {
  background(0);
  resizeCanvas(settings.maxI, settings.maxI);
  if (settings.pixelDensity != pixelDensity()) {
    pixelDensity(settings.pixelDensity);
  }
  
  var newTimeStamps = new Array();
  console.log("maxI: " + settings.maxI);
  newTimeStamps[0] = new Array(settings.maxI);
  /*   timeStamps[0].fill(0);
  timeStamps[0][Math.floor(settings.maxI / 2)] = 1; */
  for (var i = 0; i < settings.maxI; i++) {
    if (i == Math.floor(settings.maxI / 2)) {
      newTimeStamps[0][i] = 1;
    } else {
      newTimeStamps[0][i] = 0;
    }
  }
  timeStamps = newTimeStamps;

  /* for (var i = 0; i < timeStamps.length; i++) {
    
  } */

  renderRefresh = true;
  console.log("automata render done");
}

function draw() {
  frameRate(settings.speed);
  

  if (t < settings.maxI) {
    advTime();
    console.log(t + " out of " + settings.maxI + " iterations done");
  }

  if (settings.RD) {
    filter(BLUR, 1 + settings.d);
    loadPixels();
    for (var i = 0; i < pixels.length; i += 4) {
      pixels[i] += settings.r * 255;
      pixels[i + 1] += settings.r * 255;
      pixels[i + 2] += settings.r * 255;
    }
    updatePixels();
    filter(THRESHOLD);
    console.log("rd frame");
  }
}

function getNeighbours(array, i) {
  var result = "";
  if (i == 0) {
    result = result.concat("0");
  } else {
    result = result.concat(array[i - 1]);
  }

  result = result.concat(array[i]);

  if (i == array.length - 1) {
    result = result.concat("0");
  } else {
    result = result.concat(array[i + 1]);
  }
  /* console.log(result, array, i); */
  return result;
}

function solveNeighbours(stamp) {
  if (ruleSet[stamp] == 1) {
    return true;
  } else {
    return false;
  }
}

/* function advTime() {
  var prev = timeStamps[timeStamps.length - 1];
  var step = [];
  for (var i = 0; i < prev.length; i++) {
    var neigh = getNeighbours(prev, i);
    if (solveNeighbours(neigh)) {
      step.push(1);
    } else {
      step.push(0);
    }
  }

  timeStamps.push(step);
} */

function advTime() {
  var next = [];
  for (var i = 0; i < settings.maxI; i++) {
    /* var v = timeStamps[t - 1][i]; */
    /* console.log(v); */
    var neigh = getNeighbours(timeStamps[t - 1], i);
    /* console.log(neigh); */
    if (solveNeighbours(neigh)) {
      next.push(1);
    } else if (!solveNeighbours(neigh)) {
      next.push(0);
    }
  }

  timeStamps[t] = next;

  for (var j = 0; j < timeStamps[t].length; j++) {
    if (timeStamps[t][j] == 0) {
      fill(255);
      rect(
        j * settings.cellSize + j * settings.cellMargin,
        t * settings.cellSize + t * settings.cellMargin,
        settings.cellSize,
        settings.cellSize
      );
    }
  }

  t++;
}

function mousePressed() {}

function keyPressed() {}

function windowResized() {}
