/**
 * 	Example P5JS canvas
 */

/* Fluid system adapted from the paper "Real-Time Fluid Dynamics for Games" (https://pdfs.semanticscholar.org/847f/819a4ea14bd789aca8bc88e85e906cfc657c.pdf) */

const Cells = new Array();
const x_size = 96;
const y_size = 96;

var prevPos = new p5.Vector(0, 0, 0);

var scalingFactor;

function findScale() {
  let lowerSide = window.innerWidth;
  if (window.innerHeight < lowerSide) {
    lowerSide = window.innerHeight;
  }
  scalingFactor = lowerSide / x_size;
  return scalingFactor;
}

function preload() {}

function setup() {
  createCanvas(windowWidth, windowHeight);

  findScale();

  for (var x = 0; x < x_size; x++) {
    for (var y = 0; y < y_size; y++) {
      var cell = new Cell(x, y);
      Cells.push(cell);
    }
  }
}

function draw() {
  /* console.log(frameRate()); */
  background(0);

  for (var i = 0; i < Cells.length; i++) {
    Cells[i].draw();
  }

  fluidSim(0.000001);
  const margin = Math.floor((x_size - 63) / 2);
  var x = Math.floor(map(Math.sin(frameCount * 0.1), -1, 1, 1, 62)) + margin;
  var y = Math.floor(map(Math.cos(frameCount * 0.1), -1, 1, 1, 62)) + margin;

  /* console.log(x); */
  addDensity(x, y, 20);
  const v = createVector(x - prevPos.x, y - prevPos.y);
  addVelocity(x, y, v);
  prevPos = createVector(x, y);

  if (mouseIsPressed) {
    try {
      drawDensity(mouseX, mouseY, 15);
    } catch (e) {}
  }

  stroke(255);
  textSize(30);
  text(Math.round(frameRate()), 20, 40);
}

function fluidSim(dt) {
  if (dt == undefined) {
    dt = 0.8;
  }
  diffuse(x_size, 0.001, deltaTime);
  advect(x_size, deltaTime);
  project(x_size);
  advect(x_size, deltaTime);
  project(x_size);
  bounds();
}

function bounds() {
  for (var x = 0; x < x_size; x++) {
    for (var y = 0; y < y_size; y++) {
      if (x == 0 || y == 0 || x == x_size - 1 || y == y_size - 1) {
        Cells[toIndex(x, y)].density = 0;
      }
    }
  }
}

function addVelocity(x, y, v) {
  Cells[toIndex(x, y)].velocity.x += v.x;
  Cells[toIndex(x, y)].velocity.y += v.y;
}

function addDensity(x, y, n) {
  x = Math.round(x);
  y = Math.round(y);
  /* console.log(x, y); */

  var i = x * y_size + y;
  i = toIndex(x, y);
  /* console.log(i); */
  Cells[i].density += n;
}

function drawDensity(x, y, n) {
  x /= scalingFactor;
  y /= scalingFactor;
  x = Math.round(x);
  y = Math.round(y);
  /* console.log(x, y); */

  var i = x * y_size + y;
  i = toIndex(x, y);
  /* console.log(i); */
  Cells[i].density += n;
  var vel = createVector(mouseX - pmouseX, mouseY - pmouseY);
  const mult = 0.01;
  vel.x *= mult;
  vel.y *= mult;
  Cells[i].velocity.x += vel.x;
  Cells[i].velocity.y += vel.y;

  /* console.log(Cells[i].velocity); */
}

function diffuse(N, diff, dt) {
  var a = dt * diff * N * N;
  /* console.log("diffusing"); */
  for (var k = 0; k < 20; k++) {
    for (var i = 0; i < Cells.length; i++) {
      var cell = Cells[i];
      cell.density =
        (cell.prevDensity +
          a *
            (getDensity(cell.x - 1, cell.y) +
              getDensity(cell.x + 1, cell.y) +
              getDensity(cell.x, cell.y - 1) +
              getDensity(cell.x, cell.y + 1))) /
        (1 + 4 * a);
    }
  }
}

function advect(N, dt) {
  var dt0 = dt * N;
  var x0, y0, x1, y1;
  var s0, s1, t0, t1;

  for (var i = 0; i < Cells.length; i++) {
    cell = Cells[i];
    thisVel = getVelocity(cell.x, cell.y);
    var x = cell.x - dt0 * thisVel.x;
    var y = cell.y - dt0 * thisVel.y;

    if (x < 0.5) x = 0.5;
    if (x > N + 0.5) x = N + 0.5;
    x0 = Math.round(x);
    x1 = x0 + 1;

    if (y < 0.5) y = 0.5;
    if (y > N + 0.5) y = N + 0.5;
    y0 = Math.round(y);
    y1 = y0 + 1;

    s1 = x - x0;
    s0 = 1 - s1;
    t1 = y - y0;
    t0 = 1 - t1;

    cell.density =
      s0 * (t0 * getDensity(x0, y0) + t1 * getDensity(x0, y1)) +
      s1 * (t0 * getDensity(x0, y0) + t1 * getDensity(x1, y1));
  }
}

function project(N) {
  for (var i = 0; i < Cells.length; i++) {
    var h = 1 / N;
    let cell = Cells[i];
    cell.div =
      -0.5 *
      h *
      (getVelocity(cell.x + 1, cell.y).x -
        getVelocity(cell.x - 1, cell.y).x +
        getVelocity(cell.x, cell.y + 1).y -
        getVelocity(cell.x, cell.y - 1).y);
    cell.pressure = 0;
  }

  for (var k = 0; k < 20; k++) {
    for (var i = 0; i < Cells.length; i++) {
      var cell = Cells[i];
      cell.pressure =
        (cell.div +
          getP(cell.x - 1, cell.y) +
          getP(cell.x + 1, cell.y) +
          getP(cell.x, cell.y - 1) +
          getP(cell.x, cell.y + 1)) /
        4;
    }
  }

  for (var i = 0; i < Cells.length; i++) {
    var cell = Cells[i];
    cell.velocity.x -=
      (0.5 * (getP(cell.x + 1, cell.y) - getP(cell.x - 1, cell.y))) / h;
    cell.velocity.y -=
      (0.5 * (getP(cell.x, cell.y + 1) - getP(cell.x, cell.y - 1))) / h;
  }
}

function mousePressed() {}

function keyPressed() {}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  let lowerSide = window.innerWidth;
  if (window.innerHeight < lowerSide) {
    lowerSide = window.innerHeight;
  }

  scalingFactor = lowerSide / x_size;

  for (var i = 0; i < Cells.length; i++) {
    Cells[i].refreshScaling();
  }
}

function toIndex(x, y) {
  return x * x_size + y;
}

function getP(x, y) {
  if (Cells[toIndex(x, y)] != null) {
    return Cells[toIndex(x, y)].pressure;
  } else {
    return 0;
  }
}

function getDiv(x, y) {
  if (Cells[toIndex(x, y)] != null) {
    return Cells[toIndex(x, y)].div;
  } else {
    return 0;
  }
}

function getDensity(x, y) {
  if (Cells[toIndex(x, y)] != null) {
    return Cells[toIndex(x, y)].density;
  } else {
    return 0;
  }
}

function getPreviousDensity(x, y) {
  if (Cells[toIndex(x, y)] != null) {
    return Cells[toIndex(x, y)].prevDensity;
  } else {
    return 0;
  }
}

function getVelocity(x, y) {
  if (Cells[toIndex(x, y)] != null) {
    return Cells[toIndex(x, y)].velocity;
  } else {
    return createVector(0, 0);
  }
}
