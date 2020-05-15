/**
 * 	Reduction d'une image
 */

let NUM_X = 100
let NUM_Y = 70
let CELL  = 5
const EYE_SPACING = 10
const DISTANCE = 50
let x, y, z
const MAX_TIME = 50
const speed = 10
let on = 1;

let capture, offscreenG,offscreenD

let timerValue = 0

function preload() {
  fontRegular = loadFont('https://cdn.glitch.com/926b32ab-1e6d-4646-8e50-adbc5d3eecb4%2FRoboto-Bold.ttf?v=1589459310575')
}

function setup(){
    createCanvas(windowWidth, windowHeight, WEBGL)
    setInterval(timeIt, 1000);
    textFont(fontRegular)
    textSize(width / 3)
    textAlign(CENTER, CENTER)
            
    //ESPACE BLOC
    slider = createSlider(0, 255, 60.25);
    slider.position(20, 40);
    slider.style('width', '80px');
    
    //ESPACE CAM X
    slider02 = createSlider(0, 255, 125.25)
    slider02.position(170, 40)
    slider02.style('width', '80px')
    
    //ZOOM
    slider04 = createSlider(0, 255, 255)
    slider04.position(320, 40)
    slider04.style('width', '80px')
    
    //ESPACE YEUX
    slider03 = createSlider(0, 255, 80)
    slider03.position(width*10, 40)
    slider03.style('width', '80px')
    
     //INVERT IMAGE
    slider05 = createSlider(0, 255, 0)
    slider05.position(470, 40)
    slider05.style('width', '80px')
    
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
    
    let html = document.getElementById('html');
}

function draw(){

    let invert = map(slider05.value(),0,255,0,2)
    if(invert<1){
        on = 1
    } else if(invert>1){
        on = -1
    }
    
    let cam_dist = map(slider02.value(),0,255,0,width/2)
    let EYE_SPACING = map(slider03.value(),0,100,-20,20)
    let CELL = map(slider04.value(),0,100,3,8)
    let val = map(slider.value(),0,255,width/3,-width/3 + CELL*210)
    // Resize proportionel et centree de l’image (de la webcam)
    // sur le "offscreen"
    offscreenG.noStroke()
    offscreenD.noStroke()

    clear()
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
        translate((-on*NUM_X*CELL)/2 + on*val,0)
        push()//--------------------------------------------- OBJET //
            offscreenG.push()
                offscreenG.translate(-EYE_SPACING,0,-cam_dist)
                x+=accelerationX*0.05
                y+=accelerationY*0.05
                z+=accelerationZ*0.05
                offscreenG.normalMaterial()
                //offscreenG.camera(-EYE_SPACING, 0, cam_dist + DISTANCE + sin(frameCount * 0.01) *10, 0, 0, 0, 0, 1, 0)
    
                if(timerValue< speed){
                    //TEXT
                    offscreenG.push()
                    offscreenG.translate(0,-5,sin(frameCount * 0.5) *5)
                    offscreenG.rotateY(sin(frameCount * 0.25)/4)
                    offscreenG.fill(0,0,0)
                    offscreenG.strokeWeight(0)
                    offscreenG.textSize(10)
                    offscreenG.textFont(fontRegular)
                    offscreenG.text('LOWERED', 0, 0)
                    offscreenG.text('REALITY', 0, 10)
                    offscreenG.pop()
                     //TEXT
                    offscreenG.push()
                    offscreenG.translate(0,-5,sin(frameCount * 0.5) * 5 + 3)
                    offscreenG.rotateY(sin(frameCount * 0.25)/4)
                    offscreenG.fill(0,0,254)
                    offscreenG.strokeWeight(0)
                    offscreenG.textSize(10)
                    offscreenG.textFont(fontRegular)
                    offscreenG.text('LOWERED', 0, 0)
                    offscreenG.text('REALITY', 0, 10)
                    offscreenG.pop()
                 }
    
                if(timerValue < speed*2 && timerValue>= speed*1){
                    //CUBE
                    offscreenG.push()
                    offscreenG.rotateX(frameCount/10)
                    offscreenG.rotateY(frameCount/10)
                    //offscreenG.rotateZ()
                    offscreenG.box(20, 20, 20)
                    offscreenG.pop()
                }
    
                if(timerValue < speed*3 && timerValue>= speed*2){
                    //SPHERE
                    offscreenG.push()
                    offscreenG.rotateX(frameCount/10)
                    offscreenG.rotateY(frameCount/10)
                    //offscreenG.rotateZ()
                    offscreenG.stroke(0)
                    offscreenG.strokeWeight(0.7)
                    offscreenG.sphere(10 + sin(frameCount * 0.1) *5)
                    offscreenG.pop()
                }
            
                if(timerValue < speed*4 && timerValue>= speed*3){
                    //CONE
                    offscreenG.push()
                    offscreenG.rotateX(frameCount/10)
                    offscreenG.rotateY(frameCount/10)
                    offscreenG.rotateZ(frameCount/15)
                    offscreenG.cone(10,25)
                    offscreenG.pop()
                }
    
                if(timerValue < speed*5 && timerValue> speed*4){
                    //COULOIR
                    offscreenG.push()
                    //offscreenD.rotateX(frameCount/10)
                    //offscreenD.rotateY(frameCount/10)
                    //offscreenD.rotateZ(frameCount/15)
                    offscreenG.translate(0,0,-sin(frameCount * 0.1) *100)
                    offscreenG.noFill()
                    offscreenG.stroke(0)
                    offscreenG.strokeWeight(1.8)
                    
                    for(i = 0; i<20;i++){
                        offscreenG.translate(0,0,-i*20)
                          offscreenG.box(50-i,60-i,20)
                    }
                    offscreenG.pop()
                }
            offscreenG.pop()
        pop()//--------------------------------------------- OBJET //


        // Preview de l'image:
        //image(offscreenG, 20, 20)

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
                if(r != 255 && g != 255 && b != 255){
                    noStroke()
                    rect(x, y, CELL, CELL)
                }
            }
        }
    pop()//--------------------------------------------- OEIL GAUCHE //

    push()//----------------------------------------------------------------- OEIL DROIT //
        translate((on*NUM_X*CELL)/2 - on*val,0)
        push()//--------------------------------------------- OBJET //
            //offscreenD.translate(+EYE_SPACING/2,0)
            offscreenD.push()
                offscreenD.translate(EYE_SPACING,0,-cam_dist)
                x+=accelerationX*0.05
                y+=accelerationY*0.05
                z+=accelerationZ*0.05
                offscreenD.normalMaterial()
                //offscreenD.camera(+EYE_SPACING, 0,  cam_dist + DISTANCE + sin(frameCount * 0.01) *10, 0, 0, 0, 0, 1, 0)
    
                if(timerValue< speed){
                    //TEXT
                    offscreenD.push()
                    offscreenD.translate(0,-5,sin(frameCount * 0.5) *5)
                    offscreenD.rotateY(sin(frameCount * 0.25)/4)
                    offscreenD.fill(0,0,0)
                    offscreenD.strokeWeight(0)
                    offscreenD.textSize(10)
                    offscreenD.textFont(fontRegular)
                    offscreenD.text('LOWERED', 0, 0)
                    offscreenD.text('REALITY', 0, 10)
                    offscreenD.pop()
                     //TEXT
                    offscreenD.push()
                    offscreenD.translate(0,-5,sin(frameCount * 0.5) * 5 + 3)
                    offscreenD.rotateY(sin(frameCount * 0.25)/4)
                    offscreenD.fill(0,0,254)
                    offscreenD.strokeWeight(0)
                    offscreenD.textSize(10)
                    offscreenD.textFont(fontRegular)
                    offscreenD.text('LOWERED', 0, 0)
                    offscreenD.text('REALITY', 0, 10)
                    offscreenD.pop()
                 }
                
                if(timerValue < speed*2 && timerValue>= speed*1){
                    //CUBE
                    offscreenD.push()
                    offscreenD.rotateX(frameCount/10)
                    offscreenD.rotateY(frameCount/10)
                    //offscreenD.rotateZ()
                    offscreenD.box(20, 20, 20)
                    offscreenD.pop()
                }
                
                if(timerValue < speed*3 && timerValue>= speed*2){
                    //SPHERE
                    offscreenD.push()
                    offscreenD.rotateX(frameCount/10)
                    offscreenD.rotateY(frameCount/10)
                    //offscreenG.rotateZ()
                    offscreenD.stroke(0)
                    offscreenD.strokeWeight(0.7)
                    offscreenD.sphere(10 + sin(frameCount * 0.1) *5)
                    offscreenD.pop()
                }
    
                if(timerValue < speed*4 && timerValue>= speed*3){
                    //CONE
                    offscreenD.push()
                    offscreenD.rotateX(frameCount/10)
                    offscreenD.rotateY(frameCount/10)
                    offscreenD.rotateZ(frameCount/15)
                    offscreenD.cone(10,25)
                    offscreenD.pop()
                }
    
                if(timerValue < speed*5 && timerValue> speed*4){
                    //COULOIR
                    offscreenD.push()
                    //offscreenD.rotateX(frameCount/10)
                    //offscreenD.rotateY(frameCount/10)
                    //offscreenD.rotateZ(frameCount/15)
                    offscreenD.translate(0,0,-sin(frameCount * 0.1) *100)
                    offscreenD.noFill()
                    offscreenD.stroke(0)
                    offscreenD.strokeWeight(1.8)
                    
                    for(i = 0; i<20;i++){
                        offscreenD.translate(0,0,-i*20)
                          offscreenD.box(50-i,60-i,20)
                    }
                    offscreenD.pop()
                }
            offscreenD.pop()
        pop()//--------------------------------------------- OBJET //


        // Preview de l'image:
        //image(offscreenD, 20, 20)

        // HACK:
        // .get() ne marche pas avec "p5.Capture" (bug de P5JS?)
        // on est obligé de acceder directement le tableau des pixels[]
        offscreenD.loadPixels()


        // Il faut considerer aussi la densité des pixels
        const d2  = offscreenD.pixelDensity()
        const wd2 = offscreenD.width * d2 * d2
    
        // Affichage final 
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
                if(r != 255 && g != 255 && b != 255){
                    noStroke()
                    rect(x, y, CELL, CELL)
                }
            }
        }
    pop()//--------------------------------------------- OEIL DROIT //
    //console.log(frameCount)
    
    html.style.filter = "hue-rotate(" + frameCount + "deg)"
}

function timeIt() {
  if (timerValue < MAX_TIME) {
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