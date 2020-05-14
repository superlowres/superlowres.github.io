/**
 *  Reduction d'une image
 */


const NUM_X = 64
const NUM_Y = 64
const CELL  = 10

let capture, offscreen
let sub
let button
let img

function setup(){
    createCanvas(windowWidth, windowHeight)
    offscreen = createGraphics(NUM_X, NUM_Y)
    capture   = createCapture(VIDEO)
    capture.hide()
    let sub = 500


}

function draw(){
    background(0)
    let img = capture.get();

    // Resize proportionel et centree de l’image (de la webcam)
    // sur le "offscreen"
    const ch = NUM_Y
    const cw = Math.floor(capture.width / capture.height * ch)
  //  offscreen.image(capture, (NUM_X-cw)/2, 0, cw, ch)

    // Preview de l'image:
    //image(offscreen, 0, 0)

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


    const sx = Math.round(map(Math.sin(frameCount * 0.02), -1, 1, 0, 3))
    const sy = Math.round(map(Math.sin(frameCount * 0.02), -1, 1, 0, 3))

    let sub = Math.random(map(Math.cos(frameCount * 2.02), 0, 1, 0, 2))


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

            const si = Math.floor(i * NUM_X / subdivisions_x)
            const sj = Math.floor(j * NUM_Y / subdivisions_y)
            const offs = ((offscreen.width - 1 - si) * d + sj * wd) * 4 // mirror
            const r = offscreen.pixels[offs    ]
            const g = offscreen.pixels[offs + 1]
            const b = offscreen.pixels[offs + 2]
            fill(r, g, b)
            rect(x, y, cell_w, cell_h)
        }
    }
    push();
    imageMode(CENTER)
    translate(width, 0); // flip image
    scale(-1, 1); // flip image
    pop();
    copy(img, mouseX/5,mouseY/2, 100, 100, 720, 112, 320, 320); //haut droite
    copy(img, mouseX/3,mouseY/2, 100, 100, 1040, 112, 320, 320); //haut droite


   copy(img, mouseX/4, mouseY/2, 100, 100, width/2, height/2, 320, 320); // bas droite
   copy(img, mouseX/5, mouseY/3, 100, 100, 1040, height/2, 320, 320); // bas droite


     copy(img, mouseX/3, mouseY/3, 100, 100, 80, 112, 320, 320); // haut gauche
     copy(img, mouseX/4, mouseY/5, 100, 100, 400, 112, 320, 320); // haut gauche

  copy(img, mouseX/7, mouseY/2, 100, 100, 400, height/2, 320, 320); // bas gauche
  copy(img, mouseX/3, mouseY/2, 100, 100, 80, height/2, 320, 320); // bas gauche




  //  copy(img, mouseX/3, mouseY/3, 200, 200, 405, 105, 320, 320);




}


function mousePressed() {
console.log('YO');
savetoFile();
return false
}
function saveToFile() {
  // Save the current canvas to file as png
  saveCanvas('mycanvas', 'png')
  console.log('SAVE');
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight)
}
