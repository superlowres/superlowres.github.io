/**
 * 	Example P5JS canvas
 */

const NUM_X = 32
const NUM_Y = 32
const CELL  = 16

const data = new Array(NUM_X * NUM_Y).fill(0)

const palette = []

let img

function preload(){
	img = loadImage("pal_"+Math.floor(random(5))+".png")
}

function setup(){
	createCanvas(windowWidth, windowHeight)
	for (let i=0; i<img.width; i++){
		palette.push(img.get(i, 0))
	}
}

function draw(){

	// Sur la derniere ligne on va écrire des valeurs (pseudo) random
	for (let i=0; i<NUM_X; i++){
		// data[i + NUM_X * (NUM_Y-1)] = (Math.sin(frameCount*0.02 + i*0.2) + 1.0) / 2
		data[i + NUM_X * (NUM_Y-1)] = noise(i*0.1, frameCount * 0.03)
		// data[i + NUM_X * (NUM_Y-1)] = random(1.0)
	}

	for(let j=0; j<NUM_Y-1; j++) {
		for(let i=0; i<NUM_X; i++) {
			const src  = (j + 1) * NUM_X + i
			const dest = j * NUM_X + i + Math.round(random(-1, 2))
			data[dest] = max(0, data[src] - random(0.01, 0.02))
		}
	}

	// render
	background(0)
	noStroke()
	const ox = (width - NUM_X * CELL) / 2  // offset de la matrice
	const oy = (height - NUM_Y * CELL) / 2
	for(let j=0; j<NUM_Y; j++) {
		for(let i=0; i<NUM_X; i++) {
			const x = i * CELL + ox
			const y = j * CELL + oy
			const idx = i + j * NUM_X
			const v = data[idx]
			const pal_idx = Math.floor(map(v, 0, 1, 0, palette.length))
			fill(palette[pal_idx])
			rect(x, y, CELL-1, CELL-1)
		}
	}
}

function windowResized(){
	resizeCanvas(windowWidth, windowHeight)
}