const GUI = new dat.GUI({autoPlace : false});
var customContainer = document.getElementById('gui');
customContainer.appendChild(GUI.domElement);

const NUM_X = 64
const NUM_Y = 64
const CELL = 8
const data = new Array(NUM_X * NUM_Y).fill(0)
let inc;
let palette
let liste
let test
let randomV = [];
let randomV1 = [];
const gap = 8;

let chooseDoc = [ v20, v21, v22, v23, v24, v25, v26, v27, v28, v29, v30, v31 ];
const SLIT = {
  timeline : 0
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  GUI.add(SLIT, 'timeline', SLIT.timeline).min(0).max(11).step(1
  for (i = 0; i < NUM_X; i += gap) {
    randomV[i] = round(random(-10, 10));
    randomV1[i] = round(random(0, 10));
  }

  // liste = document.getElementById("menu").getElementsByTagName("Li");
}

function draw() {
  background(220);
  grid1();
  // let app = SLIT.app;
  chooseDoc[SLIT.timeline]();
}

function grid1() {
  inc++;
  if (frameCount % 5 == 0) {
    for (let i = 0; i < NUM_X / 2; i++) {
      data[i + NUM_X * (NUM_Y - 1)] = noise(i * 0.1, frameCount * 0.03);
    }
    for (let i = NUM_X / 2; i < NUM_X; i++) {
      data[i + NUM_X] = noise(i * 0.1, frameCount * 0.03);
    }

    for (let j = 0; j < NUM_Y - 1; j++) {
      for (let i = 0; i < NUM_X; i++) {
        if (i < NUM_X / 2) {
          const src = (j + 1) * NUM_X + i
          const dest = j * NUM_X + i
          data[dest] = max(0, data[src])
        } else {
          const src = (j + 0) * NUM_X + i
          const dest = (j + 2) * NUM_X + i
          data[dest] = max(0, data[src])
        }
      }
    }
  }
  // render
  background(220)

  // stroke(0)
  noStroke()
  if (frameCount == 1) {
    console.log("hello");
    grid();
  }
  const n = CELL;
  for (let j = 0; j < NUM_Y; j += gap) {
    for (let i = 0; i < NUM_X; i += gap) {
      if (frameCount == 1) {
        console.log(j, i);
      }
      displacement(i, j + randomV1[i], i + gap, gap + j,
                   gap * (randomV[i] * i / gap), 0, randomV1[i]);
      // displacement(i, j, i + gap, gap + j, randomV[i] * n + i,
      //              randomV1[j] * gap);
    }
  }
}

function grid() {
  a = 6;
  x1 = NUM_X
  y1 = NUM_Y
  mos1 = round(random(20));
  mos2 = round(random(20, 40));
  bloc1 = mos1 * x1
  bloc2 = mos2 * x1
  rand = random(10);

  console.log(mos1, mos2)
}

function displacement(x1, y1, widthW, heightW, newX, newY, rCell) {

  // récupérer la position de la dernière ligne et la derniere colonne
  // dessiner le prochain carré par rapport à cette dernière ligne et ou colonne
  const ox = (width - NUM_X * CELL) / 2 // offset de la matrice
  const oy = (height - NUM_Y * CELL) / 2
  for (let j = y1 + 0; j < heightW; j++) {
    for (let i = x1 + 0; i < widthW; i++) {
      const x = i * CELL + ox
      const y = j * CELL + oy
      const idx = i + j * NUM_X
      const v = data[idx];
      fill(Math.round(v) * 255)
      rect(x + newX, y + newY, CELL - 0.3, CELL - 0.3);
    }
  }
}

function windowResized() { resizeCanvas(windowWidth, windowHeight) }
