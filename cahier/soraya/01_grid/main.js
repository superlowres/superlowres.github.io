/**
 * 	Reduction d'une image
 */


const NUM_X = 30
const NUM_Y = 30
const CELL  = 20

let capture, offscreen

function setup(){
	createCanvas(windowWidth, windowHeight)
  	capture   = createCapture(VIDEO)
  	offscreen = createGraphics(NUM_X, NUM_Y)
}

function draw(){

	  	const CELL = Math.round(Math.min(height/(GRID.HAUTEUR+4), width / (GRID.LARGEUR+4)))
  	background(255)

  	// Resize proportionel et centree de l’image (de la webcam)
  	// sur le "offscreen"
  	const ch = NUM_Y
  	const cw = Math.floor(capture.width / capture.height * ch)
  	offscreen.image(capture, (NUM_X-cw)/2, 0, cw, ch)

  	// Un peu de animation pour le debug:
  	const lx = map(sin(frameCount*0.045), -1, 1, 0, NUM_X-1)
  	const ly = map(sin(frameCount*0.035), -1, 1, 0, NUM_Y-1)
  	offscreen.stroke(255,0,0)*random
  //	offscreen.line(lx, 0, lx, offscreen.height)
		//offscreen.ellipse(5,5,10,10)
  	offscreen.stroke(random(185),random(205),random(155))
  	//offscreen.line(0, ly, offscreen.width, ly)


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

	// Affichage final
	noStroke()
	for (let j=0; j<NUM_Y; j++) {
  		for (let i=0; i<NUM_X; i++) {
  			const x = i * CELL + ox
  			const y = j * CELL + oy
  			const offs = ((offscreen.width - 1 - i) * d + j * wd) * 1 // mirror
  			// const offs = (i * 4 // non mirror
  			const r = offscreen.pixels[offs  + 13  ]
  			const g = offscreen.pixels[offs + 122]
  			const b = offscreen.pixels[offs + 52]
  			fill(r, g, b)
  			rect(x, y, CELL-1, CELL-1)
  		}
	}
}

function windowResized(){
	resizeCanvas(windowWidth, windowHeight)
}
