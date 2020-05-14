/**
 * 	Reduction d'une image
 */
let num_x  = 40
let num_y  = 30
let cell_w = 20
let cell_h = 20
let capture, offscreen
let pause = false
let data = []

function setup(){
	createCanvas(windowWidth, windowHeight)
  	offscreen = createGraphics(num_x, num_y)           //  0 1 2
  	data      = new Array(num_x * num_y).fill([0,0,0]) // [r,g,b]
  	capture   = createCapture(VIDEO)
    capture.hide()
}

function draw(){

	const ch = num_y
  	const cw = Math.floor(capture.width / capture.height * ch)

  	if (!pause) {
		offscreen.image(capture, (num_x - cw)/2, 0, cw, ch)
		offscreen.loadPixels()
  		const d  = offscreen.pixelDensity() // Il faut considerer aussi la densité des pixels
	  	const wd = offscreen.width * d * d
		for (let j=0; j<num_y; j++) {
  			for (let i=0; i<num_x; i++) {
		  		const offs = ((offscreen.width - 1 - i) * d + j * wd) * 4
	  			const r = offscreen.pixels[offs    ]
	  			const g = offscreen.pixels[offs + 1]
	  			const b = offscreen.pixels[offs + 2]
	  			data[i + j * num_x] = [r,g,b]
  			}
		}
	}

	// ----- output ----------------------------------

	const offs_x = (width - cell_w * num_x) / 2
	const offs_y = (height - cell_h * num_y) / 2

	const mouse_cell_x = Math.floor((mouseX-offs_x) / cell_w)
	const mouse_cell_y = Math.floor((mouseY-offs_y) / cell_h)


	if (mouse_cell_x >= 0 && mouse_cell_x < num_x && mouse_cell_y >= 0 && mouse_cell_y < num_y) {
		floodfill(data, num_x, num_y, mouse_cell_x, mouse_cell_y, [255,0,0])
	}


	background(255)
	image(offscreen, 0, 0)

	const ox = (width - num_x * cell_w) / 2
	const oy = (height - num_y * cell_h) / 2

	noStroke()
	for (let j=0; j<num_y; j++) {
  		for (let i=0; i<num_x; i++) {
  			const x = i * cell_w + ox
  			const y = j * cell_h + oy
  			const couleur = data[i + j * num_x]
  			const r = couleur[0]
  			const g = couleur[1]
  			const b = couleur[2]
  			fill(r, g, b)
  			rect(x, y, cell_w, cell_h)
  		}
	}
}

function floodfill(data, w, h, x, y, col){
	if (x < 0 || x >= w) return
	if (y < 0 || y >= h) return
	const offs = x + y * w
	const c = data[offs]
	if (c[0] == col[0]) return
	if (Math.abs(c[0] - col[0]) > 60) return
	data[offs] = col
	floodfill(data, w, h, x, y-1, col)
	floodfill(data, w, h, x, y+1, col)
	floodfill(data, w, h, x-1, y, col)
	floodfill(data, w, h, x+1, y, col)
}

function keyPressed() {
	if (keyCode == 32) {
		pause = !pause
	}
}

function windowResized(){
	resizeCanvas(windowWidth, windowHeight)
}
