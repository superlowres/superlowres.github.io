/**
 * 	Example P5JS canvas
 */

/* Cellular automato with simple reaction diffusion filter */
var timeStamps = [];

var maxI = 256;
var t = 1;
var ruleSet;

var cellSize = 1;
var cellMargin = 0;

var renderRefresh = false;
var RT;

var aa;
var AsciiGfx;
var buffer;
var canevas;

var settingsObject = function () {
  this.d = 0.15;
  this.r = 0.01;
  this.ruleSet = 1;
  this.maxI = 64;

  this.cellSize = 1;
  this.cellMargin = 0;

  this.scale = 3;
  this.renderScale = 4;
  this.pixelDensity = 1;
  this.autoFit = true;

  this.speed = 5;

  this.Ascii = true;
  this.asciiW = 64;
  this.asciiH = 64;
  this.asciiScale = 32;

  this.RD = true;
  this.feedback = true;
  this.RDfeedback = true;
  this.fade = 1;
  this.fadeOffset = 3;
  this.reRender = function () {
    selectRuleSet();
    t = 1;
    renderAutomata();
  };
  this.reSeed = function () {
    updateRules(random() * 100);
    settings.ruleSet = "random";

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
  "110": 1,
  "101": 1,
  "100": 0,
  "011": 1,
  "010": 1,
  "001": 1,
  "000": 0,
};
const rule3 = {
  "111": 0,
  "110": 1,
  "101": 1,
  "100": 1,
  "011": 1,
  "010": 0,
  "001": 1,
  "000": 0,
};
const rule4 = {
  "111": 1,
  "110": 0,
  "101": 0,
  "100": 1,
  "011": 0,
  "010": 1,
  "001": 1,
  "000": 0,
};

const rules = ["111", "110", "101", "100", "011", "010", "001", "000"];

function preload() {
  loadFont("./dos-font.otf");
}

function drawCell() {
  var x = mouseX;
  var y = mouseY;
}

function updateRules(mult) {
  for (var i = 0; i < rules.length; i++) {
    var newVal = Math.round(noise(mult * i));
    rule[rules[i]] = newVal;
    console.log(newVal);
  }
}

function setup() {
  textAlign(CENTER, CENTER);
  textFont("dos-font", 8);
  textStyle(NORMAL);

  ruleSet = rule1;
  settings = new settingsObject();
  gui = new dat.GUI({ autoPlace: false });
  gui.add(settings, "d", 0, 1);
  gui.add(settings, "r", -0.2, 0.2);
  gui.add(settings, "pixelDensity", 0.1, 4);
  gui.add(settings, "reRender");
  gui.add(settings, "RD");
  gui.add(settings, "reSeed");
  /* gui.add(settings, "cellSize", 0.1, 4);
  gui.add(settings, "cellMargin", 0, 10); */
  gui.add(settings, "maxI", [64, 128, 256, 512, 1024, 2048]);
  gui.add(settings, "ruleSet", {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    random: "random",
  });
  gui.add(settings, "speed", 0.1, 30);
  updateRules();
  gui.add(settings, "scale", 1, 8);
  gui.add(settings, "Ascii");
  gui.add(settings, "asciiW");
  gui.add(settings, "asciiH");
  gui.add(settings, "asciiScale");
  gui.add(settings, "renderScale", 1, 16);
  gui.add(settings, "autoFit");
  gui.add(settings, "feedback");
  gui.add(settings, "RDfeedback");
  gui.add(settings, "fade", 1, 255);
  gui.add(settings, "fadeOffset", -50, 50);

  var e = document.getElementsByClassName("datContainer")[0];
  e.appendChild(gui.domElement);

  canevas = createCanvas(settings.maxI, settings.maxI);
  buffer = createGraphics(settings.maxI, settings.maxI);
  buffer.noSmooth();

  aa = new AsciiArt(this);
  aa.printWeightTable();
  AsciiGfx = createGraphics(settings.asciiW, settings.asciiH);

  frameRate(5);
  /* pixelDensity(1); */
  noSmooth();

  renderAutomata();
}

function selectRuleSet() {
  switch (settings.ruleSet) {
    case "1":
      ruleSet = rule1;
      console.log("switched to " + 1);
      break;
    case "2":
      ruleSet = rule2;
      console.log("switched to " + 2);
      break;
    case "3":
      ruleSet = rule3;
      console.log("switched to " + 3);
      break;
    case "4":
      ruleSet = rule4;
      console.log("switched to " + 4);
      break;
    case "random":
      console.log("switched to " + 5);
      ruleSet = rule;
      break;
  }
  console.log("switched to " + Object.valueOf(ruleSet));
}

function autoScale() {
  var lower = window.innerHeight;
  if (window.innerWidth < lower) {
    lower = window.innerWidth;
  }
  const scaleRatio = lower / width;
  console.log("scaleRatio: " + scaleRatio);
  const can = document.getElementsByClassName("p5Canvas")[0].style;
  console.log(can);
  const newParam = "scale(" + str(scaleRatio) + ");";
  can.transform = newParam;
}

function renderAutomata() {
  resizeCanvas(
    settings.maxI * Math.round(settings.scale) * settings.renderScale,
    settings.maxI * Math.round(settings.scale) * settings.renderScale
  );
  pixelDensity(settings.pixelDensity);
  buffer.resizeCanvas(
    settings.maxI * Math.round(settings.scale),
    settings.maxI * Math.round(settings.scale)
  );
  buffer.pixelDensity(settings.pixelDensity);
  AsciiGfx.pixelDensity(settings.pixelDensity);
  AsciiGfx.resizeCanvas(
    settings.maxI * Math.round(settings.scale),
    settings.maxI * Math.round(settings.scale)
  );

  if (settings.autoFit) {
    autoScale();
  }

  var newTimeStamps = new Array();
  console.log("maxI: " + settings.maxI);
  newTimeStamps[0] = new Array(settings.maxI);
  /*   timeStamps[0].fill(0);
  timeStamps[0][Math.floor(settings.maxI / 2)] = 1; */
  const fillColor = color(255, 255, 255, 255);

  for (var i = 0; i < settings.maxI; i++) {
    if (i == Math.floor(settings.maxI / 2)) {
      newTimeStamps[0][i] = 1;
    } else {
      newTimeStamps[0][i] = 0;
    }
  }
  timeStamps = newTimeStamps;

  while (t < settings.maxI) {
    advTime();
    console.log(t + " out of " + settings.maxI + " iterations done");
  }
  buffer.rectMode(CORNER);
  buffer.noStroke();
  if (settings.feedback) {
    fillColor.a = 255 - settings.fade;
  }
  for (var i = 0; i < timeStamps.length; i++) {
    for (var j = 0; j < timeStamps[i].length; j++) {
      if (timeStamps[i][j] == 0) {
        buffer.fill(fillColor);
        buffer.rect(
          j * Math.round(settings.scale) + j * settings.cellMargin,
          i * Math.round(settings.scale) + i * settings.cellMargin,
          settings.cellSize * Math.round(settings.scale),
          settings.cellSize * Math.round(settings.scale)
        );
      }
    }
  }

  renderRefresh = true;
  console.log("automata render done");
}

function draw() {
  /* buffer.rect(0, 0, 12, 12); */

  frameRate(settings.speed);

  if (settings.RD) {
    if (settings.RDfeedback) {
      buffer.image(canevas, 0, 0, buffer.width, buffer.height);
    }
    buffer.filter(BLUR, 1 + settings.d);
    buffer.loadPixels();
    for (var i = 0; i < pixels.length; i += 4) {
      buffer.pixels[i] += settings.r * 255;
      buffer.pixels[i + 1] += settings.r * 255;
      buffer.pixels[i + 2] += settings.r * 255;
    }
    buffer.updatePixels();
    buffer.filter(THRESHOLD);
    console.log("rd frame");
  }

  if (settings.Ascii) {
    if (settings.feedback) {
      const faded = 255 - settings.fade;
      background(0, 0, 0, faded);
    } else {
      background(0, 0, 0, 255);
    }
    textSize(settings.asciiScale);
    var ascii_arr = aa.convert(buffer, settings.asciiW, settings.asciiH);
    if (frameCount < 2) {
      fill(0);
    } else {
      fill(255);
    }
    if (settings.feedback) {
      image(canevas, settings.fadeOffset, settings.fadeOffset);
    }

    aa.typeArray2d(ascii_arr, this);
  } else {
    if (settings.feedback) {
      const faded = 255 - settings.fade;
      background(0, 0, 0, faded);
      image(buffer, settings.fadeOffset, settings.fadeOffset, width, height);
      image(buffer, 0, 0, width, height);
    } else {
      image(buffer, 0, 0, width, height);
    }
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
    var v = timeStamps[t - 1][i];
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
  t++;
}

function mousePressed() {}

function keyPressed() {}

function windowResized() {}
