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
let font
let filter
let lettre = []

function preload(){
  font = loadFont('fonts/NeueHaasGrotesk-Roman.otf');
  filter = loadImage('img/filter.svg');

}
function setup(){
  createCanvas(windowWidth, windowHeight);
    offscreen = createGraphics(NUM_X, NUM_Y)
    capture   = createCapture(VIDEO)
    capture.hide()
    let sub = 500
    frameRate(25)


}

function draw(){
  //pixelDensity(0.2)

    background(255)
    let img = capture.get();
    textFont(font)
    textSize(110);
    fill(255)


    let xoffset = 0
    let yoffset = 120
    let offsetimg = 0
   for (var i = 0; i < lettre.length; i++) {
     if (lettre[i] == 0) {

       image(filter, width, height);

        copy(img, mouseX/3,mouseY/2, 70, 70, xoffset, yoffset, 120, 120); //haut droite
        xoffset = xoffset + 120
        offsetimg = offsetimg + 12

        push()
        translate(-85,95)
        text('b', xoffset, yoffset);
        pop()
      } if (lettre[i] == 1) {

        copy(img, mouseX/4,mouseY/4, 70, 70, xoffset, yoffset, 120, 120); //haut droite
        xoffset = xoffset + 120
        push()
        translate(-90,90)
        text('o', xoffset, yoffset);
        pop()



      }  if (lettre[i] == 2) {

        copy(img, mouseX/5,mouseY/3, 70, 70, xoffset, yoffset, 120, 120); //haut droite
        xoffset = xoffset + 120
        push()
        translate(-85,90)
        text('n', xoffset, yoffset);
        pop()

      } if (lettre[i] == 3) {

        copy(img, mouseX/3,mouseY/2, 30, 30, xoffset, yoffset, 120, 120); //haut droite
        xoffset = xoffset + 120
        push()
        translate(-70,90)
        text('j', xoffset, yoffset);
        pop()

      } if (lettre[i] == 4) {







        copy(img, mouseX/4,mouseY/4, 70, 70, xoffset, yoffset, 120, 120); //haut droite
        xoffset = xoffset + 120



        push()
        noStroke();
        translate(-120,0)
      //  ellipse(xoffset,yoffset,120,120)
        image(filter,xoffset,yoffset,120,120)

        pop()


      } if (lettre[i] == 5) {

        copy(img, mouseX/8,mouseY/2, 30, 30, xoffset, yoffset, 120, 120); //haut droite
        xoffset = xoffset + 120
        push()

translate(-85,90)
        text('u', xoffset, yoffset);
        pop()
      } if (lettre[i] == 6) {

        copy(img, mouseX/6,mouseY/2, 30, 30, xoffset, yoffset, 120, 120); //haut droite
        xoffset = xoffset + 120
        push()

translate(-80,90)
        text('r', xoffset, yoffset);
        pop()
      }

  if (xoffset > width) {
          yoffset = yoffset + 120
          xoffset = 0
        }
      }
 }

    // // Resize proportionel et centree de l’image (de la webcam)
    // // sur le "offscreen"
    // const ch = NUM_Y
    // const cw = Math.floor(capture.width / capture.height * ch)
    // offscreen.image(capture, (NUM_X-cw)/2, 0, cw, ch)
    //
    // // Preview de l'image:
    // //image(offscreen, 0, 0)
    //
    // // HACK:
    // // .get() ne marche pas avec "p5.Capture" (bug de P5JS?)
    // // on est obligé de acceder directement le tableau des pixels[]
    // offscreen.loadPixels()
    // capture.loadPixels()
    //
    // // Il faut considerer aussi la densité des pixels
    // const d  = offscreen.pixelDensity()
    // const wd = offscreen.width * d * d
    //
    // // Offset de la matrice
    // const ox = (width - NUM_X * CELL) / 2
    // const oy = (height - NUM_Y * CELL) / 2
    //
    //
    // const sx = Math.round(map(Math.sin(frameCount * 0.00), -1, 1, 0, 4))
    // const sy = Math.round(map(Math.sin(frameCount * 0.00), -1, 1, 0, 4))
    //
    // let sub = Math.random(map(Math.cos(frameCount * 2.02), 0, 1, 0, 2))
    //
    //
    // // numero de subdivisons: 1, 2, 4, 8, 16, 32, 64...
    // const subdivisions_x = Math.pow(2, sx)
    // const subdivisions_y = Math.pow(2, sy)
    //
    // const offs_x = (width - CELL * NUM_X) / 2
  	// const offs_y = (height - CELL * NUM_Y) / 2
    //
    //
    //
    //
    // const cell_w = NUM_X * CELL / subdivisions_x
    // const cell_h = NUM_Y * CELL / subdivisions_y
    //
    // const mouse_cell_x = Math.floor((mouseX-offs_x) / cell_w)
  	// const mouse_cell_y = Math.floor((mouseY-offs_y) / cell_h)
    //
    // // Affichage final
    // noStroke()

    // for (let j=0; j<subdivisions_y; j++) {
    //     for (let i=0; i<subdivisions_x; i++) {
    //         const x = i * cell_w + ox
    //         const y = j * cell_h + oy
    //
    //         const si = Math.floor(i * NUM_X / subdivisions_x)
    //         const sj = Math.floor(j * NUM_Y / subdivisions_y)
    //         const offs = ((offscreen.width - 1 - si) * d + sj * wd) * 4 // mirror
    //         const r = offscreen.pixels[offs    ]
    //         const g = offscreen.pixels[offs + 1]
    //         const b = offscreen.pixels[offs + 2]
    //
    //         if (i == mouse_cell_x && j == mouse_cell_y) {
    //         //  texture(img,10,10);
    //         fill(r,g,b)
    //
    //         push();
    //         imageMode(CENTER)
    //         translate(width/2,height/2); // flip image
    //         copy(img, mouseX/3,mouseY/2, 70, 70, -320, -320, 640,640); //haut droite
    //         pop();
    //
    //         } else {
    //         //  copy(img, mouseX/5,mouseY/2, 150, 150, width/2, height/2, 320, 320); //haut droite
    //          fill(r,g,b)
    //   			}
    //
    //           rect(x, y, cell_w, cell_h)
    //     }




//copy(img, mouseX/5,mouseY/2, 100, 100, 720, 112, 320, 320); //haut droite
  //   copy(img, mouseX/3,mouseY/2, 100, 100, 1040, 112, 320, 320); //haut droite
  //
  //
  //  copy(img, mouseX/4, mouseY/2, 100, 100, width/2, height/2, 320, 320); // bas droite
  //  copy(img, mouseX/5, mouseY/3, 100, 100, 1040, height/2, 320, 320); // bas droite
  //
  //
  //    copy(img, mouseX/3, mouseY/3, 100, 100, 80, 112, 320, 320); // haut gauche
  //    copy(img, mouseX/4, mouseY/5, 100, 100, 400, 112, 320, 320); // haut gauche
  //
  // copy(img, mouseX/7, mouseY/2, 100, 100, 400, height/2, 320, 320); // bas gauche
  // copy(img, mouseX/3, mouseY/2, 100, 100, 80, height/2, 320, 320); // bas gauche




  //  copy(img, mouseX/3, mouseY/3, 200, 200, 405, 105, 320, 320);


function keyPressed() {
  let img = capture.get();
//lettre
  if (key === 'b') {
    lettre.push(0)
  }
  if (key === 'o') {
    lettre.push(1)
  }
  if (key === 'n') {
    lettre.push(2)
  }
  if (key === 'j') {
    lettre.push(3)
  }

  if (key === 'u') {
    lettre.push(5)
  }
  if (key === 'r') {
    lettre.push(6)
  }

  if (key === 'u') {
    lettre.push(9)
  }
  if (key === 'u') {
    lettre.push(10)
  }











//Lettres fonctionnel
  if (keyCode === 8) {
    lettre.pop()
  }

  if (keyCode === 32) {
    lettre.push(4)
    //SPACE
  }
  // uncomment to prevent any default behavior
   return false;
}

function mousePressed() {
console.log('YO');
return false
}
function saveToFile() {
  // Save the current canvas to file as png
  //saveCanvas('mycanvas', 'png')
  //console.log('SAVE');
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight)
}
