/**
 *  Reduction d'une image
 */


let NUM_X = 48
let NUM_Y = 80
let CELL  = 10

let capture, offscreen


let myFont;
function preload() {
  myFont = loadFont('fonts/GT-Cinetype-Light.woff');
}

function setup(){
    createCanvas(windowWidth, windowHeight)
    offscreen = createGraphics(NUM_X, NUM_Y)
    capture   = createCapture(VIDEO)
    capture.hide()


  saveCanvas =  createGraphics(NUM_X*CELL, NUM_Y*CELL);

}

function draw(){
    background(0)

    // Resize proportionel et centree de l’image (de la webcam)
    // sur le "offscreen"
    let ch = NUM_Y
    let cw = Math.floor(capture.width / capture.height * ch)
    offscreen.image(capture, (NUM_X-cw)/2, 0, cw, ch)

    // Preview de l'image:
    //image(offscreen, 0, 0)



    // HACK:
    // .get() ne marche pas avec "p5.Capture" (bug de P5JS?)
    // on est obligé de acceder directement le tableau des pixels[]
    offscreen.loadPixels()

    // Il faut considerer aussi la densité des pixels
    let d  = offscreen.pixelDensity()
    let wd = offscreen.width * d * d

    // Offset de la matrice
    let ox = (width - NUM_X * CELL) / 2
    let oy = (height - NUM_Y * CELL) / 2


  //  const sx = Math.round(map(Math.sin((frameCount/3) * 0.0051), -1, 1, 0, 5))
    //const sy = Math.round(map(Math.sin(frameCount * 0.0063), -1, 1, 0, 6))
  let sx = Math.round(map(mouseX, 0, width, 0, 6))
  let sy = Math.round(map(mouseY, 0, height, 0, 6))

    // numero de subdivisons: 1, 2, 4, 8, 16, 32, 64...
    let subdivisions_x = Math.pow(2, sx)
    let subdivisions_y = Math.pow(2, sy)

    let cell_w = NUM_X * CELL / subdivisions_x
    let cell_h = NUM_Y * CELL / subdivisions_y

    // Affichage final
    noStroke()

    for (let j=0; j<subdivisions_y; j++) {
        for (let i=0; i<subdivisions_x; i++) {
            let x = i * cell_w + ox
            let y = j * cell_h + oy

            let xnormal = i / subdivisions_x
            let ynormal = j /subdivisions_y
            xnormal = xnormal * wd/2
            ynormal = ynormal * offscreen.height

            let si = Math.floor(i * NUM_X / subdivisions_x)
            let sj = Math.floor(j * NUM_Y / subdivisions_y)
          //  const offs = ((offscreen.width - 1 - si) * d + sj * wd) * 4 // mirror
          //const offs = (i * d/2 + sj * wd) * 4 // mirror
            //const offs = (xnormal + ynormal * wd ) * 1
            let offs = (xnormal + ynormal * wd) * 4

            let r = offscreen.pixels[offs  + 80]
          //  const r = random(80)
            let g = offscreen.pixels[offs + 130]
            let b = offscreen.pixels[offs + 150]
           fill(r, g, b)

            rect(x, y, cell_w-1, cell_h-1)
        }
    }
}

function keyPressed() {
  if (keyCode == 32) {

    let ox = (width - NUM_X * CELL) / 2
    let oy = (height - NUM_Y * CELL) / 2
    let cell_w = NUM_X * CELL
    let cell_h = NUM_Y * CELL

    let c = get(ox,oy, cell_w, cell_h);
    saveCanvas.image(c, 0, 0);
    save(saveCanvas, frameCount+".png");
  }
  }

function windowResized(){
    resizeCanvas(windowWidth, windowHeight)
}
