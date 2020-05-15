/**
 * 	Example P5JS canvas
 */

let num_x  = 18
let num_y  = 12
let cell_w = 30
let cell_h = 30

let capture, offscreen

function setup(){
	createCanvas(windowWidth, windowHeight)
	offscreen = createGraphics(num_x, num_y)
	capture   = createCapture(VIDEO)
	capture.hide()
}

function draw(){

	//implement capture webcam----------------------------

	// Resize proportionel et centree de l’image (de la webcam)
	// sur le "offscreen"
	const ch = num_y
	const cw = Math.floor(capture.width / capture.height * ch)
	offscreen.image(capture, (num_x-cw)/2, 0, cw, ch)

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
	const ox = (width - num_x * cell_w) / 2
	const oy = (height - num_y * cell_h) / 2


	const sx = Math.round(map(Math.sin(mouseX * 0.0051), -1, 1, 0, 5))
	const sy = Math.round(map(Math.sin(mouseY * 0.0063), -1, 1, 0, 6))

	// const sx = Math.round(map(Math.sin(mouseX * 0.0051), -1, 1, 0, 5))
	// const sy = Math.round(map(Math.sin(mouseY * 0.0063), -1, 1, 0, 6))

	// numero de subdivisons: 1, 2, 4, 8, 16, 32, 64...
	const subdivisions_x = Math.pow(2, sx)
	const subdivisions_y = Math.pow(2, sy)

	 cell_w = num_x * cell_w / subdivisions_x
	 cell_h = num_y * cell_h / subdivisions_y


	//implement pixel grid-----------------------------------

	cell_w = map(sin(frameCount*0.011), -1, 1, 10, 400)
	cell_h = map(sin(frameCount*0.021), -1, 1, 10, 400)

	// cell_w = mouseX
	// cell_h = mouseY

	const offs_x = (width - cell_w * num_x) / 2
	const offs_y = (height - cell_h * num_y) / 2

	const mouse_cell_x = Math.floor((mouseX-offs_x) / cell_w)
	const mouse_cell_y = Math.floor((mouseY-offs_y) / cell_h)

	background(255)
	push()
	translate(width/2, height/2)
	scale(-1, 1)
	image(capture, (- num_x * cell_w)/2, (-num_y * cell_h)/2, num_x * cell_w, num_y * cell_h)
	pop()

	for (let j=0; j<num_y; j++) {
		for (let i=0; i<num_x; i++) {

			const x = i * cell_w + offs_x
			const y = j * cell_h + offs_y
			const offs = ((offscreen.width - 1 -i) * d + j * wd) * 4


			if (i == mouse_cell_x && j == mouse_cell_y) {
				fill(100, 200, 255, 0)
			} else {
				const r = offscreen.pixels[offs    ]
				const g = offscreen.pixels[offs + 1]
				const b = offscreen.pixels[offs + 2]
				fill(r, g, b)
			}
			noStroke()
			rect(x, y, cell_w, cell_h)

		}
	}
}

function windowResized(){
	resizeCanvas(windowWidth, windowHeight)
}
