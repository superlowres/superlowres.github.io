/**
 *  Reduction d'une image
 */


const NUM_X = 64
const NUM_Y = 64
const CELL  = 10

let capture, offscreen

function setup(){
    createCanvas(windowWidth, windowHeight)
    offscreen = createGraphics(NUM_X, NUM_Y)
    capture   = createCapture(VIDEO)
    capture.hide()

 //    button = createButton("SAVE");
 // button.position(200, 200)
 // button.position(width/2-50,30)
 // button.mousePressed(saveToFile);
 // button.style("font-family", "Sans Serif");
 //  button.style("font-size", "40px");
 //  button.style("color","black");
}

function draw(){
    background(0)

    // Resize proportionel et centree de l’image (de la webcam)
    // sur le "offscreen"
    const ch = NUM_Y
    const cw = Math.floor(capture.width / capture.height * ch)
    offscreen.image(capture, (NUM_X-cw)/2, 0, cw, ch)

    // Preview de l'image:
    image(offscreen, 0, 0)

    // HACK:
    // .get() ne marche pas avec "p5.Capture" (bug de P5JS?)
    // on est obligé de acceder directement le tableau des pixels[]
    offscreen.loadPixels()

    // Il faut considerer aussi la densité des pixels
    const d  = offscreen.pixelDensity()
    const wd = offscreen.width * d * d

    // Offset de la matrice
    const ox = (width - NUM_X * CELL) / 2
    const oy = (height - NUM_Y * CELL) / 2


  //  const sx = Math.round(map(Math.sin((frameCount/3) * 0.0051), -1, 1, 0, 5))
    //const sy = Math.round(map(Math.sin(frameCount * 0.0063), -1, 1, 0, 6))
  const sx = Math.round(map(mouseX, 0, width, 0, 6))
  const sy = Math.round(map(mouseY, 0, height, 0, 6))

    // numero de subdivisons: 1, 2, 4, 8, 16, 32, 64...
    const subdivisions_x = Math.pow(2, sx)
    const subdivisions_y = Math.pow(2, sy)

    const cell_w = NUM_X * CELL / subdivisions_x
    const cell_h = NUM_Y * CELL / subdivisions_y

    // Affichage final
    noStroke()

    for (let j=0; j<subdivisions_y; j++) {
        for (let i=0; i<subdivisions_x; i++) {
            const x = i * cell_w + ox
            const y = j * cell_h + oy

let xnormal = i / subdivisions_x
let ynormal = j /subdivisions_y
xnormal = xnormal * wd/2
ynormal = ynormal * offscreen.height

            const si = Math.floor(i * NUM_X / subdivisions_x)
            const sj = Math.floor(j * NUM_Y / subdivisions_y)
          //  const offs = ((offscreen.width - 1 - si) * d + sj * wd) * 4 // mirror
            //const offs = (i * d/2 + sj * wd) * 4 // mirror
            const offs = (xnormal + ynormal * wd) * 4
            const r = offscreen.pixels[offs  + 1]
            //const r = random(80)
            const g = offscreen.pixels[offs + 1]
            const b = offscreen.pixels[offs + 2]
           fill(r, g, b)

            rect(x, y, cell_w-1, cell_h-1)
        }
    }
}

function saveToFile() {
  // Save the current canvas to file as png
  saveCanvas('mycanvas', 'png')
  console.log('SAVE');
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight)
}
