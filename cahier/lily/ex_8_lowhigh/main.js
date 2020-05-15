/**
 * 	Example P5JS canvas
 */

let num_x  = 32
let num_y  = 32
let cell_w = 60
let cell_h = 55

let capture, offscreen

function setup(){
	createCanvas(windowWidth, windowHeight)

	offscreen = createGraphics(num_x, num_y)
	capture   = createCapture(VIDEO)
	capture.hide()

}



function draw(){

	// implement webcam -------------
	// Resize proportionel et centree de l’image (de la webcam)
	// sur le "offscreen"
	const ch = num_y
	const cw = Math.floor(capture.width / capture.height * ch)
	//offscreen.image(capture, (num_x-cw)/2, 0, cw, ch)
	offscreen.image(capture, 0,0, num_x,  num_y)
	// .get() ne marche pas avec "p5.Capture" (bug de P5JS?)
	// on est obligé de acceder directement le tableau des pixels[]
	offscreen.loadPixels()

	// Il faut considerer aussi la densité des pixels
	const d  = offscreen.pixelDensity()
	const wd = offscreen.width * d * d

	// Offset de la matrice
	const ox = (width - num_x * cell_w) / 2
	const oy = (height - num_y * cell_h) / 2




	//implement selection grid --------------

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
			//offscreen.mousePressed(keepCapture)

			noStroke()
			rect(x, y, cell_w, cell_h)

		}
	}
}

// function keepCapture(mouse_cell_x, mouse_cell_y){
// 	if ( mouse_cell_x &&  mouse_cell_y) {
// 		offscreen.image(capture,(- num_x * cell_w)/2, (-num_y * cell_h)/2, num_x * cell_w, num_y * cell_h)	}
// 		console.log('mouse is pressed');
// }

function windowResized(){
	resizeCanvas(windowWidth, windowHeight)
}
