/**
 *  Reduction d'une image
 */

 const GUI = new dat.GUI();
 GUI.closed= false;

var customContainer = document.getElementById('my-gui-container');
customContainer.appendChild(GUI.domElement);


 let GRID = {
  LARGEUR : 24,
  HAUTEUR : 40,
  ZOOM: 20,
  DIVISION:28,
  //ZOOM : 16,
 }
//
// let LARGEUR = 24 //48
// let HAUTEUR = 40 //80
// let ZOOM = 20 //10

let capture, offscreen


function setup() {
    GUI.add(GRID, 'DIVISION', GRID.DIVISION).min(1).max(50);
  GUI.add(GRID, 'LARGEUR', GRID.LARGEUR).min(1).max(80).step(1);
  GUI.add(GRID, 'HAUTEUR', GRID.HAUTEUR).min(1).max(50).step(1);
  GUI.add(GRID, 'ZOOM', GRID.ZOOM).min(1).max(32).step(1);
//.step(1);
   //let ZOOMControl = GUI.add(GRID, 'ZOOM', GRID.ZOOM).min(1).max(32).step(1);

  createCanvas(windowWidth, windowHeight)
  offscreen = createGraphics(GRID.LARGEUR, GRID.HAUTEUR)
  capture = createCapture(VIDEO)
  capture.hide()


//  saveCanvas = createGraphics(width, height);//(GRID.LARGEUR * GRID.ZOOM, GRID.HAUTEUR * GRID.ZOOM);

}

function draw() {
  background(0)

        // GRID.LARGEUR = 4 * GRID.ZOOM
        // GRID.HAUTEUR = 4 * GRID.ZOOM
        // GRID.ZOOM = 128 / GRID.ZOOM

  // Resize proportionel et centree de l’image (de la webcam)
  // sur le "offscreen"
  let ch = GRID.HAUTEUR
  let cw = Math.floor(capture.width / capture.height * ch)
  offscreen.image(capture, (GRID.LARGEUR - cw) / 2, 0, cw, ch)

  // Preview de l'image:
  //image(offscreen, 0, 0)

  // HACK:
  // .get() ne marche pas avec "p5.Capture" (bug de P5JS?)
  // on est obligé de acceder directement le tableau des pixels[]
  offscreen.loadPixels()

  // Il faut considerer aussi la densité des pixels
  let d = offscreen.pixelDensity()
  let wd = offscreen.width * d * d

  // Offset de la matrice
  let ox = (width - GRID.LARGEUR * GRID.ZOOM) / 2
  let oy = (height - GRID.HAUTEUR * GRID.ZOOM) / 2


  //  const sx = Math.round(map(Math.sin((frameCount/3) * 0.0051), -1, 1, 0, 5))
  //const sy = Math.round(map(Math.sin(frameCount * 0.0063), -1, 1, 0, 6))
  let sx = Math.round(map(mouseX, 0, width, 0, 6)) //2
  let sy = Math.round(map(mouseY, 0, height, 0, 6)) //4

  // numero de subdivisons: 1, 2, 4, 8, 16, 32, 64...
  let subdivisions_x = Math.pow(2, sx)
  let subdivisions_y = Math.pow(2, sy)

  let dataH = []
  for (let i = 0; i < subdivisions_x; i++) {
    for (let j = 0; j < subdivisions_y; j++) {
      dataH.push(((j + i) % GRID.DIVISION) + 1)
      //dataH.push(((j + i) % 28) + 1)
      //dataH.push((j%2)+1)
    }
  }


  let ZOOM_w = GRID.LARGEUR * GRID.ZOOM / subdivisions_x
  let ZOOM_h = GRID.HAUTEUR * GRID.ZOOM / subdivisions_y


  // Affichage final
  noStroke()

  for (let i = 0; i < subdivisions_x; i++) {
    var htotal = 0
    for (let j = 0; j < subdivisions_y; j++) {
      htotal += dataH[i * subdivisions_y + j] //hauteur de la case
    }

    var hcase = (subdivisions_y * ZOOM_h) / htotal
    let y = oy

    for (let j = 0; j < subdivisions_y; j++) {

      let x = i * ZOOM_w + ox
      //  let y = j * ZOOM_h + oy //dépend du fait que tt cases même taille

      let xnormal = i / subdivisions_x
      let ynormal = j / subdivisions_y
      xnormal = xnormal * wd / 2
      ynormal = ynormal * offscreen.height

      let si = Math.floor(i * GRID.LARGEUR / subdivisions_x)
      let sj = Math.floor(j * GRID.HAUTEUR / subdivisions_y)
      //  const offs = ((offscreen.width - 1 - si) * d + sj * wd) * 4 // mirror
      //const offs = (i * d/2 + sj * wd) * 4 // mirror
      //const offs = (xnormal + ynormal * wd ) * 1
      let offs = (xnormal + ynormal * wd) * 4

      let r = offscreen.pixels[offs + 80]
      let g = offscreen.pixels[offs + 130]
      let b = offscreen.pixels[offs + 150]
      fill(r, g, b)

      rect(x, y, ZOOM_w +1 , dataH[i * subdivisions_y + j] * hcase +1) //ZOOM_h - 1)
      y += dataH[i * subdivisions_y + j] * hcase
    }
  }
}

function keyPressed() {
  if (keyCode == 32) {

    let ox = (width - GRID.LARGEUR * GRID.ZOOM) / 2
    let oy = (height - GRID.HAUTEUR * GRID.ZOOM) / 2
    let ZOOM_w = GRID.LARGEUR * GRID.ZOOM
    let ZOOM_h = GRID.HAUTEUR * GRID.ZOOM

    let c = get(ox, oy, ZOOM_w, ZOOM_h);

    saveCanvas = createGraphics(ZOOM_w,ZOOM_h);

    saveCanvas.image(c, 0, 0);
    save(saveCanvas, frameCount + ".png");
    saveCanvas.clear();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}
