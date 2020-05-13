/**
 * 	Example P5JS canvas
 */

const NUM_X = 32
const NUM_Y = 32
const CELL  = 16

const data = new Array(NUM_X * NUM_Y)

// Un canvas "offscreen" qu'on utilise pour lire des valeurs de luminosité
let offscreen

function setup(){
	createCanvas(windowWidth, windowHeight)
	// Le canvas a la meme taille de la grille
	offscreen = createGraphics(NUM_X, NUM_Y)
}

function draw(){

	// Un peu de translate et de rotation
	const tx = Math.sin(frameCount * 0.0061) * 40
	const ty = Math.sin(frameCount * 0.0075) * 8
	const r  = Math.sin(frameCount * 0.0103) * 0.2

	// Rendering sur le canvas offscreen
	offscreen.background(255)
	offscreen.fill(0)
	offscreen.textAlign(CENTER, CENTER)
	offscreen.push()
	offscreen.textSize(40)
	offscreen.translate(offscreen.width/2 + tx, offscreen.height/2 + ty)
	offscreen.rotate(r)
	offscreen.text("ABCD", 0, 0)
	offscreen.filter(BLUR, 3.0)
	offscreen.pop()

	for(let j=0; j<NUM_Y; j++) {
		for(let i=0; i<NUM_X; i++) {
			const idx = i + j * NUM_X
			const v = brightness(offscreen.get(i, j)) / 100.0
			data[idx] = 1.0 - v
		}
	}

	// render
	background(220)

	// Preview
	image(offscreen, 0, 0)

	stroke(0)
	const ox = (width - NUM_X * CELL) / 2 + CELL/2  // offset de la matrice
	const oy = (height - NUM_Y * CELL) / 2 + CELL/2
	for(let j=0; j<NUM_Y; j++) {
		for(let i=0; i<NUM_X; i++) {
			const x = i * CELL + ox
			const y = j * CELL + oy
			const idx = i + j * NUM_X
			const v = data[idx]
			//fill(v * 255)
			//rect(x, y, CELL-1, CELL-1)
			//ellipse(x, y, CELL * v, CELL * v)
			const num = Math.floor(map(v, 0, 1, 3, 15))
			aster(x, y, CELL * 0.44, num)
		}
	}
}


// Fonction qui dessine un asterisque en position x, y, avec rayon r
// et numéro doi pointes num
function aster(x, y, r, num) {
	for (let i=0; i<num; i++){
		const a = TAU / num * i - HALF_PI
		const x1 = x + Math.cos(a) * r
		const y1 = y + Math.sin(a) * r
		line(x, y, x1, y1)

	}
}

function windowResized(){
	resizeCanvas(windowWidth, windowHeight)
}