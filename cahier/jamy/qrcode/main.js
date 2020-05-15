/**
 * 	Reduction d'une image
 */


const NUM_X = 25
const NUM_Y = 25
const CELL  = 16

let capture, offscreen

function setup(){
	createCanvas(windowWidth, windowHeight)
  	capture   = createCapture(VIDEO)
  	offscreen = createGraphics(NUM_X, NUM_Y)
}

function draw(){
  	background(255)

  	// Resize proportionel et centree de l’image (de la webcam)
  	// sur le "offscreen"
  	const ch = NUM_Y
  	const cw = Math.floor(capture.width / capture.height * ch)
  	offscreen.image(capture, (NUM_X-cw)/2, 0, cw, ch)

  	// Un peu de animation pour le debug:
  	const lx = map(sin(frameCount*0.045), -1, 1, 0, NUM_X-1)
  	const ly = map(sin(frameCount*0.035), -1, 1, 0, NUM_Y-1)
    
    offscreen. noStroke()
    
    if(frameCount%50 == 0){
        for(i = 0; i<NUM_X; i++){
        for(j = 0; j<NUM_Y; j++){
            offscreen.fill((round(random(0,1)))*255)
            offscreen.rect(i, j, 1, 1)
            }
        }
    }
    
    offscreen.push() // bloc haut droit
        offscreen.translate(0, 0)

        offscreen.fill(255)
        offscreen.rect(0,0, 8, 8)
    
        offscreen.fill(0)
        offscreen.rect(0,0, 7, 7)

        offscreen.fill(255)
        offscreen.rect(1, 1, 5, 5)

        offscreen.fill(0,0,0)
        offscreen.rect(2, 2, 3, 3)
    offscreen.pop() //pop
    
    offscreen.push() // bloc haut gauche
        offscreen.translate(NUM_X-7, 0)
    
        offscreen.fill(255)
        offscreen.rect(-1,0, 8, 8)

        offscreen.fill(0)
        offscreen.rect(0,0, 7, 7)

        offscreen.fill(255)
        offscreen.rect(1, 1, 5, 5)

        offscreen.fill(0,0,0)
        offscreen.rect(2, 2, 3, 3)
    offscreen.pop() //pop
    
    offscreen.push() // bloc bas gauche
        offscreen.translate(NUM_X-7, NUM_Y-7)
    
        offscreen.fill(255)
        offscreen.rect(-1,-1, 8, 8)

        offscreen.fill(0)
        offscreen.rect(0,0, 7, 7)

        offscreen.fill(255)
        offscreen.rect(1, 1, 5, 5)

        offscreen.fill(0,0,0)
        offscreen.rect(2, 2, 3, 3)
    offscreen.pop() //pop

  	// Preview de l'image:
  	image(offscreen, 20, 20)

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

	// Affichage final
	noStroke()
	for (let j=0; j<NUM_Y; j++) {
  		for (let i=0; i<NUM_X; i++) {
  			const x = i * CELL + ox
  			const y = j * CELL + oy
  			const offs = ((offscreen.width - 1 - i) * d + j * wd) * 4 // mirror
  			// const offs = ((offscreen.width - 1 - i) * d + j * wd) * 4 // non mirror
  			const r = offscreen.pixels[offs    ]
  			const g = offscreen.pixels[offs + 1]
  			const b = offscreen.pixels[offs + 2]
  			fill(r, g, b)
  			rect(x, y, CELL-0.1, CELL-0.1)
  		}
	}
}

function windowResized(){
	resizeCanvas(windowWidth, windowHeight)
}