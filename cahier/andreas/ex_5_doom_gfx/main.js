/**
 * 	Example DOOM fire
 */

const NUM_X = 32
const NUM_Y = 32
const CELL  = 16

const data = new Array(NUM_X * NUM_Y).fill(0)

const palette = []
let img

let offscreen

function preload(){
	img = loadImage("pal_3.png")
}

function setup(){
	createCanvas(windowWidth, windowHeight)
	offscreen = createGraphics(NUM_X, NUM_Y)

	for (let i=0; i<img.width; i++){
		palette.push(img.get(i, 0))
	}
}

function draw(){

	// Un peu de translate et de rotation
	const tx = Math.sin(frameCount * 0.0111) * 40
	const ty = Math.sin(frameCount * 0.0091) * 8
	const r  = Math.sin(frameCount * 0.0103) * 0.2

	// Rendering sur le canvas offscreen
	offscreen.background(255)
	offscreen.fill(0)
	offscreen.textAlign(CENTER, CENTER)
	offscreen.push()
	offscreen.textSize(30)
	offscreen.translate(offscreen.width/2 + tx, offscreen.height/2 + ty)
	offscreen.rotate(r)
	offscreen.text("XXX", 0, 0)
	offscreen.pop()

	for(let j=0; j<NUM_Y; j++) {
		for(let i=0; i<NUM_X; i++) {
			const v = 1.0 - brightness(offscreen.get(i, j)) / 100.0
			const idx = i + j * NUM_X
			data[idx] = Math.max(v, data[idx])
		}
	}

	// doom fire
	for(let j=0; j<NUM_Y-1; j++) {
		for(let i=0; i<NUM_X; i++) {
			const src  = (j + 1) * NUM_X + i
			const dest = j * NUM_X + i + Math.round(random(-1, 2))
			data[dest] = max(0, data[src] - random(0.01, 0.02))
		}
	}

	// render
	background(0)
	image(offscreen, 0, 0)
	noStroke()
	const ox = (width - NUM_X * CELL) / 2  // offset de la matrice
	const oy = (height - NUM_Y * CELL) / 2
	for(let j=0; j<NUM_Y; j++) {
		for(let i=0; i<NUM_X; i++) {
			const x = i * CELL + ox
			const y = j * CELL + oy
			const idx = i + j * NUM_X
			const v = data[idx]
			const pal_idx = Math.floor(map(v, 0, 1, 0, palette.length-1))
			fill(palette[pal_idx])
			rect(x, y, CELL-1, CELL-1)
		}
	}
}

function windowResized(){
	resizeCanvas(windowWidth, windowHeight)
}