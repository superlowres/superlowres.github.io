/**
 * 	Example P5JS canvas
 */

const NUM_X = 32
const NUM_Y = 24

const data = new Array(NUM_X * NUM_Y)

// Un canvas "offscreen" qu'on utilise pour lire des valeurs de luminosité
let offscreen
let moon

function preload(){
	moon = loadImage("moon.jpg")
}


function setup(){
	createCanvas(windowWidth, windowHeight)
	// Le canvas a la meme taille de la grille
	offscreen = createGraphics(NUM_X, NUM_Y)
}

function draw(){

	const CELL = Math.round(Math.min(height/(NUM_Y+4), width / (NUM_X+4)))

	const zoom = map(mouseY, 0, height, 2, 16)
	const w = moon.width/zoom
	const h = moon.height/zoom
	offscreen.image(moon, offscreen.width/2-w/2, offscreen.height/2-h/2, w, h)

	for(let j=0; j<NUM_Y; j++) {
		for(let i=0; i<NUM_X; i++) {
			const idx = i + j * NUM_X
			const v = brightness(offscreen.get(i, j)) / 100.0
			data[idx] = v
		}
	}

	// render
	background(0)

	// Preview
	image(offscreen, 0, 0)

	let ox = (width - NUM_X * CELL) / 2  // offset de la matrice
	let oy = (height - NUM_Y * CELL) / 2

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
	stroke(0)
	const c4 = CELL/4
	ox += CELL/2
	oy += CELL/2
	for(let j=0; j<NUM_Y; j++) {
		for(let i=0; i<NUM_X; i++) {
			const x = i * CELL + ox
			const y = j * CELL + oy
			line(x-c4, y, x+c4, y)
			line(x, y-c4, x, y+c4)
		}
	}
}

function windowResized(){
	resizeCanvas(windowWidth, windowHeight)
}