/**
 * 	Example P5JS canvas
 */

let num_x  = 18
let num_y  = 12
let cell_w = 30
let cell_h = 30

function setup(){
	createCanvas(windowWidth, windowHeight)
}

function draw(){

	const offs_x = (width - cell_w * num_x) / 2
	const offs_y = (height - cell_h * num_y) / 2

	const mouse_cell_x = Math.floor((mouseX-offs_x) / cell_w)
	const mouse_cell_y = Math.floor((mouseY-offs_y) / cell_h)

	background(255)

	for (let j=0; j<num_y; j++) {
		for (let i=0; i<num_x; i++) {

			const x = i * cell_w + offs_x
			const y = j * cell_h + offs_y

			if (i == mouse_cell_x && j == mouse_cell_y) {
				fill(100, 200, 255)
			} else {
				noFill()
			}
			stroke(0)
			rect(x, y, cell_w, cell_h)
			stroke(0, 20)
			line(x, y, x+cell_w, y+cell_h)
			line(x+cell_w, y, x, y+cell_h)
		}
	}
}

function windowResized(){
	resizeCanvas(windowWidth, windowHeight)
}
