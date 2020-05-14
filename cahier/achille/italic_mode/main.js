const NUM_X = 32
const NUM_Y = 32
const CELL  = 16

const data = new Array(NUM_X * NUM_Y)

// Un canvas "offscreen" qu'on utilise pour lire des valeurs de luminosité
let offscreen

function setup(){
	createCanvas(windowWidth, windowHeight)
	pixelDensity(5.0);
	// Le canvas a la meme taille de la grille
	offscreen = createGraphics(NUM_X, NUM_Y)
}

function draw(){
	let ox = (width - NUM_X * CELL) / 3 + CELL/2  // offset de la matrice
	const oy = (height - NUM_Y * CELL) / 2 + CELL/2

	offscreen.textSize(30)

	// Rendering sur le canvas offscreen
	offscreen.fill(255)
	offscreen.textAlign(CENTER, CENTER)

	if (mouseIsPressed){
			offscreen.ellipse(
				map(mouseX, ox,(NUM_X * CELL)+ox,0,NUM_X),
				map(mouseY, oy,(NUM_Y * CELL)+oy,0,NUM_Y),
				5,5)
	}
	//offscreen.push()
	offscreen.filter(BLUR, 0.6)

	if (keyIsPressed === true) {
 			offscreen.text(key, NUM_X/2, NUM_Y/2+2)
 	}
	//offscreen.pop()

	for(let j=0; j<NUM_Y; j++) {
		for(let i=0; i<NUM_X; i++) {
			const idx = i + j * NUM_X
			const v = brightness(offscreen.get(i, j))
			data[idx] = v
		}
	}

	// render
//background(220)

	// Preview

	noStroke()

	for(let j=0; j<NUM_Y; j++) {

		for(let i=0; i<NUM_X; i++) {

				const x = i * CELL + ox
				const y = j * CELL + oy
				const idx = i + j * NUM_X
				const v = data[idx]
				fill(v * 255)
				rect(x, y, CELL, CELL)
		}
	}
	push()
	translate(CELL*54,0)

	for(let j=0; j<NUM_Y/2; j++) {
		ox += -16
		for(let i=0; i<NUM_X/2; i++) {

				const x = i * CELL + ox
				const y = j * CELL + oy
				const idx = (i + j * NUM_X)* 2
				const v = data[idx]/2
				fill(v * 255)
				rect(x, y, CELL, CELL)
		}
	}

	pop()

	push()
	translate(CELL*54,CELL*18)

	for(let j=0; j<NUM_Y/4; j++) {
		for(let i=0; i<NUM_X/4; i++) {

				const x = i * CELL + ox
				const y = j * CELL + oy
				const idx = (i + j * NUM_X)* 4
				const v = data[idx]/4
				fill(v * 255)
				rect(x, y, CELL, CELL)
		}
	}

	pop()

}

function windowResized(){
	resizeCanvas(windowWidth, windowHeight)
}
