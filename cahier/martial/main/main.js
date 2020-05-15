const GUI = new dat.GUI();

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
  GUI.add(SLIT, 'timeline', SLIT.timeline).min(0).max(11).step(1);

  // liste = document.getElementById("menu").getElementsByTagName("Li");
}

function draw() {
  background(220);

  // let app = SLIT.app;
  chooseDoc[SLIT.timeline]();
}

function v20() {
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

  // render
  background(220)

  // stroke(0)
  noStroke()
  const ox = (width - NUM_X * CELL) / 2 // offset de la matrice
  const oy = (height - NUM_Y * CELL) / 2
  for (let j = 0; j < NUM_Y; j++) {
    for (let i = 0; i < NUM_X; i++) {
      const x = i * CELL + ox
      const y = j * CELL + oy
      const idx = i + j * NUM_X
      const v = data[idx];
      // const pal_idx = Math.floor(map(v, 0, 1, 0, palette.pixels.length));
      fill(Math.round(map(v, 0, 1, 0, 1)) * 255)
      rect(x, y, CELL - 1, CELL - 1)
      // ellipse(x, y, CELL * v, CELL * v)
    }
  }
}

function v21() {
  for (let i = 0; i < NUM_X; i++) {
    data[i + NUM_X * (NUM_Y - 1)] = noise(i * 0.1, frameCount * 0.03);
  }
  for (let j = 0; j < NUM_Y - 1; j++) {
    for (let i = 0; i < NUM_X; i++) {
      const src = (j + 1) * NUM_X + i
      const dest = j * NUM_X + i
      data[dest] = max(0, data[src] + random(0.001, 0.003))
    }
  }

  // render
  background(220)

  // stroke(0)
  noStroke()
  const ox = (width - NUM_X * CELL) / 2 // offset de la matrice
  const oy = (height - NUM_Y * CELL) / 2
  for (let j = 0; j < NUM_Y; j++) {
    for (let i = 0; i < NUM_X; i++) {
      const x = i * CELL + ox
      const y = j * CELL + oy
      const idx = i + j * NUM_X
      const v = data[idx];
      // const pal_idx = Math.floor(map(v, 0, 1, 0, palette.pixels.length));
      fill(Math.round(map(v, 0, 1, 0, 1)) * 255)
      // rect(x, y, CELL - 1, CELL - 1)
      ellipse(x, y, CELL * v, CELL * v)
    }
  }
}

function v22() {
  if (frameCount % 3 == 0) {
    for (let i = 0; i < NUM_X / 2; i++) {
      if (i % 2 == 0) {
        data[i + NUM_X * (NUM_Y - 1)] = random();
      }
    }
    for (let j = 0; j < NUM_Y - 1; j++) {
      for (let i = 0; i < NUM_X / 2; i++) {
        if (i % 1 == 0) {
          const src = (j + 1) * NUM_X + i
          const dest = (j) * NUM_X + i
          data[dest] = max(0, data[src])
        }
      }
    }

    // 2eme moitie écran
    for (let i = NUM_X / 2; i < NUM_X; i++) {
      if (i % 1 == 0) {
        data[i + (NUM_X * round(random(CELL)))] = random();
      }
    }
    for (let j = 0; j < NUM_Y; j++) {
      for (let i = NUM_X / 2; i < NUM_X; i++) {
        if (i % 1 == 0) {
          const src = (j) * NUM_X + i
          const dest = (j + Math.round(random(-1, 2))) * NUM_X + i
          data[dest] = max(0, data[src])
        }
      }
    }
  }

  // render
  background(220)

  // stroke(0)
  noStroke()
  const ox = (width - NUM_X * CELL) / 2 // offset de la matrice
  const oy = (height - NUM_Y * CELL) / 2
  for (let j = 0; j < NUM_Y; j++) {
    for (let i = 0; i < NUM_X; i++) {
      const x = i * CELL + ox
      const y = j * CELL + oy
      const idx = i + j * NUM_X
      const v = data[idx];
      // const pal_idx = Math.floor(map(v, 0, 1, 0, palette.pixels.length));
      fill(Math.round(v) * 255)
      rect(x, y, CELL - 1, CELL - 1)
      // ellipse(x, y, CELL * v, CELL * v)
    }
  }
}

function v23() {
  if (frameCount % 1 == 0) {
    console.log(Math.floor(mouseX / 20));

    /*partie gauche de l'écran*/
    let r1 = ceil(cos(frameCount) * Math.floor(mouseX / 20));
    for (let i = -1; i <= NUM_X; i++) {
      if (i % r1 == 0) {
        data[i + NUM_X * (NUM_Y - 1)] = sin(frameCount) * 16;
      }
    }
    // partie gauche écran
    for (let j = 0; j < NUM_Y - 1; j++) {
      for (let i = 0; i < NUM_X; i++) {
        if (i % 1 == 0) {
          const src = (j + 1) * NUM_X + i
          const dest = (j) * NUM_X + i
          data[dest] = max(0, data[src])
        }
      }
    }

    // /*partie droite de l'écran*/
    // for (let i = NUM_X / 2; i < NUM_X; i++) {
    //   if (i % 1 == 0) {
    //     data[i + (NUM_X * round(random(NUM_Y)))] = random();
    //   }
    // }
    //
    // // partie droite écran
    // for (let j = 0; j < NUM_Y; j++) {
    //   for (let i = NUM_X / 2; i < NUM_X; i++) {
    //     if (i % 1 == 0) {
    //       const src = (j) * NUM_X + i
    //       const dest = (j + Math.round(random(-1, 2))) * NUM_X + i
    //       data[dest] = max(0, data[src])
    //     }
    //   }
    // }
  }

  // render
  background(220)

  // stroke(0)
  noStroke()
  const ox = (width - NUM_X * CELL) / 2 // offset de la matrice
  const oy = (height - NUM_Y * CELL) / 2
  for (let j = 0; j < NUM_Y; j++) {
    for (let i = 0; i < NUM_X; i++) {
      const x = i * CELL + ox
      const y = j * CELL + oy
      const idx = i + j * NUM_X
      const v = data[idx];
      // const pal_idx = Math.floor(map(v, 0, 1, 0, palette.pixels.length));
      fill(Math.round(v) * 255)
      rect(x, y, CELL - 1, CELL - 1)
      // ellipse(x, y, CELL * v, CELL * v)
    }
  }
}

function v24() {
  if (frameCount % 5 == 0) {
    for (let i = 0; i < NUM_X; i++) {
      if (i % 2 == 0) {
        data[i + NUM_X * (NUM_Y)] = random();
      }
    }

    for (let j = 0; j < NUM_Y; j++) {
      for (let i = 0; i < NUM_X; i++) {
        if (i % 1 == 0) {
          const src = (j + 1) * NUM_X + i
          const dest = (j) * NUM_X + i
          data[dest] = data[src]
        }
      }
    }

    for (let j = NUM_Y / 2; j < NUM_Y; j++) {
      for (let i = 0; i < NUM_X; i++) {
        if (i % 1 == 0) {
          const src = (j + 1) * NUM_X + i
          const dest = (j) * NUM_X + i
          data[dest] = data[src]
        }
      }
    }
  }

  // render
  background(220)

  // stroke(0)
  noStroke()
  const ox = (width - NUM_X * CELL) / 2 // offset de la matrice
  const oy = (height - NUM_Y * CELL) / 2
  for (let j = 0; j < NUM_Y; j++) {
    for (let i = 0; i < NUM_X; i++) {
      const x = i * CELL + ox
      const y = j * CELL + oy
      const idx = i + j * NUM_X
      const v = data[idx];
      // const pal_idx = Math.floor(map(v, 0, 1, 0, palette.pixels.length));
      fill(Math.round(v) * 255)
      rect(x, y, CELL - 1, CELL - 1)
      // ellipse(x, y, CELL * v, CELL * v)
    }
  }
}

function v25() {
  if (frameCount % 5 == 0) {
    for (let i = 0; i < NUM_X; i++) {
      if (i % 2 == 0) {
        data[i + NUM_X * (NUM_Y)] = random();
      }
    }

    for (let j = 0; j < NUM_Y; j++) {
      for (let i = 0; i < NUM_X; i++) {
        if (i % 1 == 0) {
          const src = (j + 1) * NUM_X + i
          const dest = (j) * NUM_X + i
          data[dest] = data[src]
        }
      }
    }

    for (let j = NUM_Y / 2; j < NUM_Y; j++) {
      for (let i = 0; i < NUM_X; i++) {
        if (i % 1 == 0) {
          const src = (j + 1) * NUM_X + i
          const dest = (j) * NUM_X + i
          data[dest] = data[src]
        }
      }
    }
    for (let j = (NUM_Y / 3); j < NUM_Y; j++) {
      for (let i = 0; i < NUM_X; i++) {
        if (i % 1 == 0) {
          const src = (j + 1) * NUM_X + i
          const dest = (j) * NUM_X + i
          data[dest] = data[src]
        }
      }
    }
  }

  // render
  background(220)

  // stroke(0)
  noStroke()
  const ox = (width - NUM_X * CELL) / 2 // offset de la matrice
  const oy = (height - NUM_Y * CELL) / 2
  for (let j = 0; j < NUM_Y; j++) {
    for (let i = 0; i < NUM_X; i++) {
      const x = i * CELL + ox
      const y = j * CELL + oy
      const idx = i + j * NUM_X
      const v = data[idx];
      // const pal_idx = Math.floor(map(v, 0, 1, 0, palette.pixels.length));
      fill(Math.round(v) * 255)
      rect(x, y, CELL, CELL)
      // ellipse(x, y, CELL * v, CELL * v)
    }
  }
}

function v26() {
  if (frameCount % 5 == 0) {
    for (let i = 0; i < NUM_X; i++) {
      if (i + 1 < NUM_X / 3) {
        if (frameCount % 1 == 0) {
          data[i + NUM_X * (NUM_Y)] = random();
        }
      } else if (i < NUM_X / 3 * 2) {
        if (frameCount % 3 == 0) {
          data[i + NUM_X * (NUM_Y)] = random();
        }
      } else {
        if (frameCount % 5 == 0) {
          data[i + NUM_X * (NUM_Y)] = random();
        } //
        // if (frameCount % 10 == 0)
        //   data[i] = random();
      }
    }

    for (let j = 0; j < NUM_Y; j++) {
      for (let i = 0; i < NUM_X; i++) {
        if (i < NUM_X / 3) {
          const src = (j + 1) * NUM_X + i
          const dest = (j) * NUM_X + i
          data[dest] = data[src]
        } else if (i < (NUM_X / 3) * 2) {
          if (i % 2 == 0) {
            const src = (j + 1) * NUM_X + i
            const dest = (j) * NUM_X + i
            data[dest] = data[src]
          }
        } else if (i < (NUM_X)) {
          if (i % 3 == 0) {
            const src = (j + 1) * NUM_X + i
            const dest = (j) * NUM_X + i
            data[dest] = data[src]
          }
        }
      }
    }

    // for (let i = NUM_X / 2; i < NUM_X; i++) {
    //   if (i % 1 == 0) {
    //     data[i + (NUM_X * round(random(CELL))) * (NUM_Y / 2)] = random();
    //   }
    // }
    // for (let j = NUM_Y / 2; j < NUM_Y; j++) {
    //   for (let i = NUM_X / 2; i < NUM_X; i++) {
    //     if (i % 1 == 0) {
    //       const src = (j) * NUM_X + i - 1
    //       const dest = (j + Math.round(random(0, 2))) * NUM_X + i - 1
    //       data[dest] = max(0, data[src])
    //     }
    //   }
    // }
  }

  // render
  background(220)

  // stroke(0)
  noStroke()
  const ox = (width - NUM_X * CELL) / 2 // offset de la matrice
  const oy = (height - NUM_Y * CELL) / 2
  for (let j = 0; j < NUM_Y; j++) {
    for (let i = 0; i < NUM_X; i++) {
      const x = i * CELL + ox
      const y = j * CELL + oy
      const idx = i + j * NUM_X
      const v = data[idx];
      // const pal_idx = Math.floor(map(v, 0, 1, 0, palette.pixels.length));
      fill(Math.round(v) * 255)
      rect(x, y, CELL, CELL)
      // ellipse(x, y, CELL * v, CELL * v)
    }
  }
}

function v27() {
  if (frameCount % 5 == 0) {
    for (let i = 0; i < NUM_X; i++) {

      let probs = random();
      if (probs > 0.85) {
        data[i + NUM_X * (NUM_Y)] = random();
      } else {
        data[i + NUM_X * (NUM_Y)] = 0;
      }
    }

    for (let j = 0; j < NUM_Y; j++) {
      for (let i = 0; i < NUM_X; i++) {
        if (i % 1 == 0) {
          const src = (j + 1) * NUM_X + i;
          const dest = (j) * NUM_X + i + round(random(-1, 1));
          data[dest] = data[src]
        }
      }
    }
    //
    // for (let j = 0; j < NUM_Y; j++) {
    //   for (let i = 0; i < NUM_X; i++) {
    //     if (i % 1 == 0) {
    //       const src = (j) * NUM_X + i
    //       const dest = (j + 1) * NUM_X + i;
    //       data[dest] = data[src]
    //     }
    //   }
    // }

    // for (let i = NUM_X / 2; i < NUM_X; i++) {
    //   if (i % 1 == 0) {
    //     data[i + (NUM_X * round(random(CELL))) * (NUM_Y / 2)] = random();
    //   }
    // }
    // for (let j = NUM_Y / 2; j < NUM_Y; j++) {
    //   for (let i = NUM_X / 2; i < NUM_X; i++) {
    //     if (i % 1 == 0) {
    //       const src = (j) * NUM_X + i - 1
    //       const dest = (j + Math.round(random(0, 2))) * NUM_X + i - 1
    //       data[dest] = max(0, data[src])
    //     }
    //   }
    // }
  }

  // render
  background(220)

  // stroke(0)
  noStroke()
  const ox = (width - NUM_X * CELL) / 2 // offset de la matrice
  const oy = (height - NUM_Y * CELL) / 2
  for (let j = 0; j < NUM_Y; j++) {
    for (let i = 0; i < NUM_X; i++) {
      const x = i * CELL + ox
      const y = j * CELL + oy
      const idx = i + j * NUM_X
      const v = data[idx];
      // const pal_idx = Math.floor(map(v, 0, 1, 0, palette.pixels.length));
      fill(Math.round(v) * 255)
      rect(x, y, CELL, CELL)
      // ellipse(x, y, CELL * v, CELL * v)
    }
  }
}

function v28() {
  if (frameCount % 5 == 0) {
    for (let i = 0; i < NUM_X; i++) {
      if (i + 1 < NUM_X / 2) {
        data[i + NUM_X * (NUM_Y)] = random();
      } else {
        if (frameCount % 10 == 0)
          data[i + NUM_X * (NUM_Y)] = random();
      }
    }

    for (let j = 0; j < NUM_Y; j++) {
      for (let i = 0; i < NUM_X; i++) {
        if (i < NUM_X / 2) {
          const src = (j + 1) * NUM_X + i
          const dest = (j) * NUM_X + i + round(random(1));
          data[dest] = data[src]
        } else {
          const src = (j + 1) * NUM_X + i
          const dest = (j) * NUM_X + i + round(random(-1));
          data[dest] = data[src]
        }
      }
    }
    //
    // for (let j = 0; j < NUM_Y; j++) {
    //   for (let i = 0; i < NUM_X; i++) {
    //     if (i % 1 == 0) {
    //       const src = (j) * NUM_X + i
    //       const dest = (j + 1) * NUM_X + i;
    //       data[dest] = data[src]
    //     }
    //   }
    // }

    // for (let i = NUM_X / 2; i < NUM_X; i++) {
    //   if (i % 1 == 0) {
    //     data[i + (NUM_X * round(random(CELL))) * (NUM_Y / 2)] = random();
    //   }
    // }
    // for (let j = NUM_Y / 2; j < NUM_Y; j++) {
    //   for (let i = NUM_X / 2; i < NUM_X; i++) {
    //     if (i % 1 == 0) {
    //       const src = (j) * NUM_X + i - 1
    //       const dest = (j + Math.round(random(0, 2))) * NUM_X + i - 1
    //       data[dest] = max(0, data[src])
    //     }
    //   }
    // }
  }

  // render
  background(220)

  // stroke(0)
  noStroke()
  const ox = (width - NUM_X * CELL) / 2 // offset de la matrice
  const oy = (height - NUM_Y * CELL) / 2
  for (let j = 0; j < NUM_Y; j++) {
    for (let i = 0; i < NUM_X; i++) {
      const x = i * CELL + ox
      const y = j * CELL + oy
      const idx = i + j * NUM_X
      const v = data[idx];
      // const pal_idx = Math.floor(map(v, 0, 1, 0, palette.pixels.length));
      fill(Math.round(v) * 255)
      rect(x, y, CELL, CELL)
      // ellipse(x, y, CELL * v, CELL * v)
    }
  }
}

function v29() {
  inc++;
  if (frameCount % 5 == 0) {
    for (let i = 0; i < NUM_X; i++) {
      if (i % 2 == 0 && i <= NUM_X / 2) {
        // haut gauche
        data[i + NUM_X * (NUM_Y / 2)] = random();
      } else if (i >= NUM_X / 2) {
        // bas droite
        data[(i * NUM_X)] = noise(i * 0.1, frameCount * 0.003);
      }
    }

    const x1 = Math.sin(frameCount * 0.06) * 0.4;
    const y1 = Math.sin(frameCount * 0.06) * 0.4;
    const x2 = Math.sin(frameCount * 0.05) * 0.4;
    const y2 = Math.sin(frameCount * 0.12) * 0.4;

    for (let j = 0; j < NUM_Y; j++) {
      for (let i = 0; i < NUM_X; i++) {
        if (i <= NUM_X / 2 && j <= NUM_Y / 2) {
          if (i % 2 == 0) {
            const src = (j + 1) * NUM_X + i
            const dest = (j) * NUM_X + i
            data[dest] = data[src]
          }
        } else if (i >= NUM_X / 2 && j < NUM_Y / 2) {
          // bas gauche
          const src = (((j) * NUM_Y) + NUM_Y)
          const dest = (NUM_Y * (i) + j + 1)
          data[dest] = data[src]
        } else if (i > NUM_X / 2 && j > NUM_Y / 2) {
          const idx = i + j * NUM_X;
          const u = (i * 2 - NUM_X) / NUM_X;
          const v = (j * 2 - NUM_Y) / NUM_Y;
          let d = 1e100;
          // d = Math.min(dist(0, 0, u + x1, v + y1) - Math.abs(x1), d);
          // d = Math.min(dist(0, 0, u + x1, v + y1) - Math.abs(x1 * 0.5) - 0.2,
          // d);

          d = Math.min(dist(0, 0, u - 0.5, v - 0.5) -
                           Math.abs(Math.sin(frameCount * 0.001 * i) * 0.7) +
                           0.19,
                       d);

          data[idx] = Math.exp(-10 * Math.abs(d));
        } else if (i <= NUM_X / 2 && j > NUM_Y / 2) {
          // haut droite
        }
      }
    }

    // for (let i = NUM_X / 2; i < NUM_X; i++) {
    //   if (i % 1 == 0) {
    //     data[i + (NUM_X * round(random(CELL))) * (NUM_Y / 2)] = random();
    //   }
    // }
    // for (let j = NUM_Y / 2; j < NUM_Y; j++) {
    //   for (let i = NUM_X / 2; i < NUM_X; i++) {
    //     if (i % 1 == 0) {
    //       const src = (j) * NUM_X + i - 1
    //       const dest = (j + Math.round(random(0, 2))) * NUM_X + i - 1
    //       data[dest] = max(0, data[src])
    //     }
    //   }
    // }
  }

  // render
  background(220)

  // stroke(0)
  noStroke()
  const ox = (width - NUM_X * CELL) / 2 // offset de la matrice
  const oy = (height - NUM_Y * CELL) / 2
  for (let j = 0; j < NUM_Y; j++) {
    for (let i = 0; i < NUM_X; i++) {
      const x = i * CELL + ox
      const y = j * CELL + oy
      const idx = i + j * NUM_X
      const v = data[idx];
      // const pal_idx = Math.floor(map(v, 0, 1, 0, palette.pixels.length));
      fill(Math.round(v) * 255)
      // fill(v * 255)
      // if (frameCount % 2 == 0) {
      rect(x, y, CELL - 0.3, CELL - 0.3)
      //  }
      // ellipse(x, y, CELL * v, CELL * v)
    }
  }
}

function v30() {
  // background(255)
  translate((windowWidth - (NUM_X * CELL)) / 2,
            (windowHeight - (NUM_Y * CELL)) / 2);
  fill(255);
  stroke(0);

  const x1 = Math.sin(frameCount * 0.06) * 0.4;
  const y1 = Math.sin(frameCount * 0.06) * 0.4;
  const x2 = Math.sin(frameCount * 0.05) * 0.4;
  const y2 = Math.sin(frameCount * 0.12) * 0.4;
  // stroke(0);

  for (let j = 0; j < NUM_Y; j++) {
    for (let i = 0; i < NUM_X; i++) {
      const idx = i + j * NUM_X;
      const u = (i * 2 - NUM_X) / NUM_X;
      const v = (j * 2 - NUM_Y) / NUM_Y;
      let d = 1e100;
      if (frameCount < 1000) {

        d = Math.min(dist(0, 0, u, v) -
                         Math.abs(Math.sin(frameCount * 0.002 * (i)) * 1.5) +
                         0.19,
                     d);
      } else if (frameCount < 2000) {
        d = Math.min(dist(0, 0, u, v) -
                         (Math.sin(frameCount * 0.003 * (i + j))) + 0.19,
                     d);
      } else if (frameCount < 3000) {

        d = Math.min(dist(0, 0, u, v) -
                         ((Math.sin(frameCount * 0.1 * ((i + 1) - (j + 1)))) +
                          (Math.cos(frameCount * 0.1 * ((i) / (i))))),
                     d);
      } else if (frameCount < 6000) {

        d = Math.min(dist(0, 0, u, v) -
                         ((Math.sin(frameCount * 0.1 *
                                    ((i + 1) -
                                     (Math.sin(frameCount * 0.001) * j + 1)))) +
                          (Math.cos(frameCount * 0.1 * ((i) / (i))))),
                     d);
      }

      data[idx] = Math.exp(-10 * Math.abs(d));
    }
  }

  textSize(5);
  textAlign(CENTER, CENTER);

  for (let j = 0; j < NUM_Y; j++) {
    for (let i = 0; i < NUM_X; i++) {
      const x = i * CELL;
      const y = j * CELL;

      const idx = i + j * NUM_X;
      const v = data[idx];

      fill((v) * 255);

      rect(x, y, CELL, CELL);
      // fill(255, 0, 0)
      // text(v, x + CELL / 2, y + CELL / 2);
    }
  }
}
function v31() {
  inc++;
  if (frameCount % 5 == 0) {
    for (let i = 0; i < NUM_X; i++) {
      if (i % 2 == 0 && i <= NUM_X / 2) {
        // haut gauche
        data[i + NUM_X * (NUM_Y / 2)] = random();
      } else if (i >= NUM_X / 2) {
        // bas droite
        data[(i * NUM_X)] = noise(i * 0.1, frameCount * 0.003);
      }
    }

    for (let j = 0; j < NUM_Y; j++) {
      for (let i = 0; i < NUM_X; i++) {
        if (i <= NUM_X / 2 && j <= NUM_Y / 2) {
          if (i % 2 == 0) {
            const src = (j + 1) * NUM_X + i
            const dest = (j) * NUM_X + i
            data[dest] = data[src]
          }
        } else if (i >= NUM_X / 2 && j < NUM_Y / 2) {
          // bas gauche
          const src = (((j) * NUM_Y) + NUM_Y)
          const dest = (NUM_Y * (i) + j + 1)
          data[dest] = data[src]
        } else if (i > NUM_X / 2 && j > NUM_Y / 2) {
          const idx = i + j * NUM_X;
          const u = (i * 2 - NUM_X) / NUM_X;
          const v = (j * 2 - NUM_Y) / NUM_Y;
          let d = 1e100;
          // d = Math.min(dist(0, 0, u + x1, v + y1) - Math.abs(x1), d);
          // d = Math.min(dist(0, 0, u + x1, v + y1) - Math.abs(x1 * 0.5) - 0.2,
          // d);

          d = Math.min(dist(0, 0, u - 0.5, v - 0.5) -
                           Math.abs(Math.sin(frameCount * 0.001 * i) * 0.7) +
                           0.19,
                       d);

          data[idx] = Math.exp(-10 * Math.abs(d));
        } else if (i <= NUM_X / 2 && j > NUM_Y / 2) {
          // haut droite
        }
      }
    }

    // for (let i = NUM_X / 2; i < NUM_X; i++) {
    //   if (i % 1 == 0) {
    //     data[i + (NUM_X * round(random(CELL))) * (NUM_Y / 2)] = random();
    //   }
    // }
    // for (let j = NUM_Y / 2; j < NUM_Y; j++) {
    //   for (let i = NUM_X / 2; i < NUM_X; i++) {
    //     if (i % 1 == 0) {
    //       const src = (j) * NUM_X + i - 1
    //       const dest = (j + Math.round(random(0, 2))) * NUM_X + i - 1
    //       data[dest] = max(0, data[src])
    //     }
    //   }
    // }
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
      displacement(i, j, i + gap, gap + j, gap, gap * randomV[i]);
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

function displacement(x, y, width, height, newX, newY) {
  // récupérer les valeurs qu'on veut bouger(du genre 0,0,10,10)
  // poser la position à laquelle on veut bouger le carré
  // dessiner le rectangle
  // récupérer la position de la dernière ligne et la derniere colonne
  // dessiner le prochain carré par rapport à cette dernière ligne et ou colonne
  for (let j = x + 0; j < height; j++) {
    for (let i = y + 0; i < width; i++) {
      rect(x + newX, y + newY, CELL - 0.3, CELL - 0.3);
    }
  }
}

function windowResized() { resizeCanvas(windowWidth, windowHeight) }
