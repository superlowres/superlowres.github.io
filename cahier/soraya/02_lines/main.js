/**
 * 	Reduction d'une image
 */

//  const GUI = new dat.GUI();

// let GRID = {
// NUM_X = 30
// NUM_Y = 30
// CELL  = 20
// }

let NUM_X = 30
let NUM_Y = 30
let CELL  = 20



let capture, offscreen

function setup(){

	// GUI.add(GRID, 'NUM_X', NUM_X).min(1).max(80).step(1);
	// GUI.add(GRID, 'NUM_Y', NUM_Y).min(1).max(50).step(1);
	// GUI.add(GRID, 'CELL', CELL).min(1).max(32).step(1);

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
  			const offs = ((offscreen.width - 1 - i) * d*15 + j/2 * wd) * 4 // mirror
  			// const offs = ((offscreen.width - 1 - i) * d + j * wd) * 4 // non mirror
  			const r = offscreen.pixels[offs  + 30  ]
  			const g = offscreen.pixels[offs + 90]
  			const b = offscreen.pixels[offs + 100]
  			fill(r, g, b)

  			rect(x, y, CELL-1, CELL-1)
  		//	circle(x, y, mouseX/7)
				//rect(30, 20, mouseX, mouseY);

  		//	triangle(x, y,mouseX,mouseY, CELL-1, CELL-1)/7
  		}
	}
}

function windowResized(){
	resizeCanvas(windowWidth, windowHeight)
}
