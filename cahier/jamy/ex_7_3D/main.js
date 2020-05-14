/**
 * 	Reduction d'une image
 */

let NUM_X = 70
let NUM_Y = 70
let CELL  = 5
const EYE_SPACING = 10
const DISTANCE = 50
let x, y, z
const MAX_TIME = 60
const speed = 10

let capture, offscreenG,offscreenD

let timerValue = 0

function preload() {
  fontRegular = loadFont('https://cdn.glitch.com/926b32ab-1e6d-4646-8e50-adbc5d3eecb4%2FRoboto-Bold.ttf?v=1589459310575')
}

function setup(){
    createCanvas(windowWidth, windowHeight, WEBGL)
    setInterval(timeIt, 1000);
            
    slider = createSlider(0, 255, 100);
    slider.position(20, 20);
    slider.style('width', '80px');
    slider02 = createSlider(0, 255, 100);
    slider02.position(170, 20);
    slider02.style('width', '80px');
    
    slider03 = createSlider(0, 255, 100);
    slider03.position(330, 20);
    slider03.style('width', '80px');
    
    x = 0
    y = 0
    z = 0

    offscreenG = createGraphics(NUM_X, NUM_Y,WEBGL)
    offscreenD = createGraphics(NUM_X, NUM_Y,WEBGL)
    
    offscreenG.textFont(fontRegular)
    offscreenG.textSize(width / 3)
    offscreenG.textAlign(CENTER, CENTER)
    
    offscreenD.textFont(fontRegular)
    offscreenD.textSize(width / 3)
    offscreenD.textAlign(CENTER, CENTER)
}

function draw(){

    let val = map(slider.value(),0,100,30,-width/12 - 30)
    let cam_dist = map(slider02.value(),0,100,0,width/12)
    let nbCELL = map(slider03.value(),0,100,0,width/12)
    // Resize proportionel et centree de l’image (de la webcam)
    // sur le "offscreen"
    offscreenG.noStroke()
    offscreenD.noStroke()

    background(255, 255, 255, 255)
    translate(-width/2, -height/2, -height/2)

    offscreenG.background(255, 255, 255, 255)
    offscreenD.background(255, 255, 255, 255)

    // Offset de la matrice
    const ox = (width - NUM_X * CELL) / 2
    const oy = (height - NUM_Y * CELL) / 2

    // rotate the box based on accelerometer data
    // we could use rotationX,Y here but demonstrating
    // acceleration


    push()//---------------------------------------------------------------- OEIL GAUCHE //
        translate((-NUM_X*CELL)/2 + val,0)
        push()//--------------------------------------------- OBJET //
            push()
                x+=accelerationX*0.05
                y+=accelerationY*0.05
                z+=accelerationZ*0.05
                offscreenG.normalMaterial()
                offscreenG.camera(-EYE_SPACING, 0, cam_dist + DISTANCE + sin(frameCount * 0.01) *10, 0, 0, 0, 0, 1, 0)
                offscreenG.rotateX(x)
                offscreenG.rotateY(y)
                offscreenG.rotateZ(z)
    
                if(timerValue<= speed *1){
                    //CUBE
                    offscreenG.push()
                    offscreenG.rotateX(frameCount/10)
                    offscreenG.rotateY(frameCount/10)
                    //offscreenG.rotateZ()
                    offscreenG.box(20, 20, 20)
                    offscreenG.pop()
                }
    
                if(timerValue>= speed*1 && timerValue < speed*2){
                    //SPHERE
                    offscreenG.push()
                    offscreenG.rotateX(frameCount/10)
                    offscreenG.rotateY(frameCount/10)
                    //offscreenG.rotateZ()
                    offscreenG.sphere(20 + sin(frameCount * 0.1) *5)
                    offscreenG.pop()
                }
            
                if(timerValue>= speed*2 && timerValue < speed*3){
                    //SPHERE
                    offscreenG.push()
                    offscreenG.rotateX(frameCount/10)
                    offscreenG.rotateY(frameCount/10)
                    offscreenG.rotateZ(frameCount/15)
                    offscreenG.cone(20,20)
                    offscreenG.pop()
                }
    
                //TEXT
                offscreenG.push()
                offscreenG.translate(0,20,0)
                //offscreenG.rotateX(rotate(0.001))
                offscreenG.fill(0)
                offscreenG.strokeWeight(0)
                offscreenG.textSize(7)
                offscreenG.textFont(fontRegular)
                offscreenG.text('LOWERED REALITY', 0, 0)
                offscreenG.pop()
            pop()
        pop()//--------------------------------------------- OBJET //

        //------------------------- GRID OEIL
        push()
            fill(255,255,255,0)
            strokeWeight(1)
            stroke(0)
            rect(ox,oy,NUM_X*CELL,NUM_Y*CELL)
        pop()


        // Preview de l'image:
        image(offscreenG, 20, 20)

        // HACK:
        // .get() ne marche pas avec "p5.Capture" (bug de P5JS?)
        // on est obligé de acceder directement le tableau des pixels[]
        offscreenG.loadPixels()

        // Il faut considerer aussi la densité des pixels
        const d  = offscreenG.pixelDensity()
        const wd = offscreenG.width * d * d

        noStroke()
        for (let j=0; j<NUM_Y; j++) {
            for (let i=0; i<NUM_X; i++) {
                const x = i * CELL + ox
                const y = j * CELL + oy
                const offs = ((offscreenG.width - 1 - i) * d + j * wd) * 4 // mirror
                // const offs = ((offscreen.width - 1 - i) * d + j * wd) * 4 // non mirror
                const r = offscreenG.pixels[offs    ]
                const g = offscreenG.pixels[offs + 1]
                const b = offscreenG.pixels[offs + 2]
                fill(r, g, b)
                rect(x, y, CELL, CELL)
            }
        }
    pop()//--------------------------------------------- OEIL GAUCHE //






    push()//----------------------------------------------------------------- OEIL DROIT //
        translate((NUM_X*CELL)/2 - val,0)
        push()//--------------------------------------------- OBJET //
            //offscreenD.translate(+EYE_SPACING/2,0)
            push()
                x+=accelerationX*0.05
                y+=accelerationY*0.05
                z+=accelerationZ*0.05
                offscreenD.normalMaterial()
                offscreenD.camera(+EYE_SPACING, 0,  cam_dist + DISTANCE + sin(frameCount * 0.01) *10, 0, 0, 0, 0, 1, 0)
                
                if(timerValue<= speed){
                    //CUBE
                    offscreenD.push()
                    offscreenD.rotateX(frameCount/10)
                    offscreenD.rotateY(frameCount/10)
                    //offscreenD.rotateZ()
                    offscreenD.box(20, 20, 20)
                    offscreenD.pop()
                }
                
                if(timerValue>= speed*1 && timerValue < speed*2){
                    //SPHERE
                    offscreenD.push()
                    offscreenD.rotateX(frameCount/10)
                    offscreenD.rotateY(frameCount/10)
                    //offscreenG.rotateZ()
                    offscreenD.sphere(20 + sin(frameCount * 0.1) *5)
                    offscreenD.pop()
                }
    
                if(timerValue>= speed*2 && timerValue < speed*3){
                    //SPHERE
                    offscreenD.push()
                    offscreenD.rotateX(frameCount/10)
                    offscreenD.rotateY(frameCount/10)
                    offscreenD.rotateZ(frameCount/15)
                    offscreenD.cone(20,20)
                    offscreenD.pop()
                }
    
                    //TEXT
                    offscreenD.push()
                    offscreenD.translate(0,20,0)
                    //offscreenG.rotateX(rotate(0.001))
                    offscreenD.fill(0)
                    offscreenD.strokeWeight(0)
                    offscreenD.textSize(7)
                    offscreenD.textFont(fontRegular)
                    offscreenD.text('LOWERED REALITY', 0, 0)
                    offscreenD.pop()
            pop()
        pop()//--------------------------------------------- OBJET //
    
    
        //------------------------- GRID OEIL
        push()
            fill(255,255,255,0)
            strokeWeight(1)
            stroke(0)
            rect(ox,oy,NUM_X*CELL,NUM_Y*CELL)
        pop()


        // Preview de l'image:
        image(offscreenD, 20, 20)

        // HACK:
        // .get() ne marche pas avec "p5.Capture" (bug de P5JS?)
        // on est obligé de acceder directement le tableau des pixels[]
        offscreenD.loadPixels()


        // Il faut considerer aussi la densité des pixels
        const d2  = offscreenD.pixelDensity()
        const wd2 = offscreenD.width * d2 * d2
    
        // Affichage final 
        noStroke()
        for (let j=0; j<NUM_Y; j++) {
            for (let i=0; i<NUM_X; i++) {
                const x = i * CELL + ox
                const y = j * CELL + oy
                const offs = ((offscreenD.width - 1 - i) * d2 + j * wd2) * 4 // mirror
                // const offs = ((offscreen.width - 1 - i) * d2 + j * wd2) * 4 // non mirror
                const r = offscreenD.pixels[offs    ]
                const g = offscreenD.pixels[offs + 1]
                const b = offscreenD.pixels[offs + 2]
                fill(r, g, b)
                rect(x, y, CELL, CELL)
            }
        }
    pop()//--------------------------------------------- OEIL DROIT //
    
    //console.log(frameCount)
}

function timeIt() {
  if (timerValue <= MAX_TIME) {
    timerValue++;
  } else{
      timerValue = 0;
  }
console.log(timerValue)
    
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight)
}

// Jiashan Wu
// https://github.com/OhJia/p5MobileWebExamples -------------------------------------------------------------------------
// revised Daniel Shiffman
// var x, y, z;

/*function setup(){
  createCanvas(windowWidth, windowHeight, WEBGL);
	x = 0;
  y = 0;
  z = 0;
}

function draw(){
  background(255, 255, 255, 255);
  translate(-width/2, 0, -600);

  // rotate the box based on accelerometer data
  // we could use rotationX,Y here but demonstrating
  // acceleration
  x+=accelerationX*0.05;
  y+=accelerationY*0.05;
  z+=accelerationZ*0.05;
  normalMaterial();
  rotateX(x);
  rotateY(y);
  rotateZ(z);
  box(200, 200, 200);

}*/