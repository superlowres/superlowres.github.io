/**
 * 	Reduction d'une image
 */
let num_y = 50
let num_x = 50
let cell_w = 10
let cell_h = 10
let capture, offscreen
let pause = false
let data = []

let mode_1 = true
let mode_2 = false
let mode_3 = false
let mode_4 = false
let mode_5 = false

let mode = 1

let v_scale = 1
let h_scale = 1

let v_speed = 0
let h_speed = 0

function setup() {
	createCanvas(windowWidth, windowHeight)
	offscreen = createGraphics(num_x, num_y) //  0 1 2
	data = new Array(num_x * num_y).fill([0, 0, 0]) // [r,g,b]
	capture = createCapture(VIDEO)
	capture.hide()
}




function draw() {

	let m = map(mouseX, 0, width, -10, 10);
	let m2 = map(mouseY, 0, height, -10, 10)

	m3 = map(sin(frameCount * 0.011), -1, 1, 1, 3)
	m4 = map(sin(frameCount * 0.021), -1, 1, 1, 3)
	// console.log(m3,m4);



	const ch = num_y
	const cw = Math.floor(capture.width / capture.height * ch)

	if (!pause) {
		offscreen.image(capture, (num_x - cw) / 2, 0, cw, ch)
		offscreen.loadPixels()
		const d = offscreen.pixelDensity() // Il faut considerer aussi la densité des pixels
		const wd = offscreen.width * d * d
		for (let j = 0; j < num_y; j++) {
			for (let i = 0; i < num_x; i++) {

				const offs = ((offscreen.width - 1 - i) * d + j * wd) * 4
				const r = offscreen.pixels[offs]
				const g = offscreen.pixels[offs + 1]
				const b = offscreen.pixels[offs + 2]
				data[i + j * num_x] = [r, g, b]
			}
		}
	}

	// ----- output ----------------------------------

	cell_w += h_speed
	cell_h += v_speed

	// cell_w = constrain(cell_w, .5, 50)
	// cell_h = constrain(cell_h, .5, 50)


	const offs_x = (width - cell_w * num_x) / 2
	const offs_y = (height - cell_h * num_y) / 2

	const mouse_cell_x = Math.floor((mouseX - offs_x) / cell_w)
	const mouse_cell_y = Math.floor((mouseY - offs_y) / cell_h)

	if (mouse_cell_x >= 0 && mouse_cell_x < num_x && mouse_cell_y >= 0 && mouse_cell_y < num_y) {

	}
	const ox = (width - num_x * cell_w) / 2
	const oy = (height - num_y * cell_h) / 2

	background(0)
	image(offscreen, 0, 0)

	//———— mode 1————————————————————————————————————————————
	if (mode == 1) {
		noStroke()
		fill(255)
		for (let j = 0; j < num_y; j++) {
			for (let i = 0; i < num_x; i++) {
				const x = i * cell_w + ox
				const y = j * cell_h + oy
				const couleur = data[i + j * num_x]
				const r = couleur[0] / 255
				const g = couleur[1] / 255
				const b = couleur[2] / 255
				push()
				translate(x + cell_w / 2, y + cell_h / 2)
				rotate(r * 2)
				rect(-cell_w / 2, -1, cell_w, 2)
				rect(-1, -cell_h / 2, 2, cell_h)
				pop()

			}
		}
	}

	// mode 2
	if (mode == 2) {
		noStroke()
		blendMode(ADD)
		for (let j = 0; j < num_y; j++) {
			for (let i = 0; i < num_x; i++) {
				const x = i * cell_w + ox
				const y = j * cell_h + oy
				const couleur = data[i + j * num_x]
				const r = couleur[0] / 255
				const g = couleur[1] / 255
				const b = couleur[2] / 255
				fill(255, 0, 0)
				rect(x, y, cell_w * r, cell_h)
				fill(0, 255, 0)
				rect(x, y, cell_w, cell_h * g)
				fill(0, 0, 255)
				ellipse(x + cell_w / 2, y + cell_h / 2, cell_w * b, cell_h * b)
			}
		}
		blendMode(BLEND)
	}

	// mode 3
	if (mode == 3) {
		noStroke()
		fill(255)

		const offs_r = frameCount * 2.32
		const offs_g = frameCount * 2.35
		const offs_b = frameCount * 2.39

		// var bright = (r + g + b) / 3;
		// var w = map(bright, 0, 255, 0, vScale);
		// noStroke();
		// fill(255);
		rectMode(CENTER);
		// rect(i * vScale, j * vScale, w, w);

		for (let j = 0; j < num_y; j += h_scale) {
			for (let i = 0; i < num_x; i += v_scale) {
				const x = i * cell_w + ox
				const y = j * cell_h + oy
				const couleur = data[i + j * num_x]
				const r = (couleur[0] + offs_r) % 256
				const g = (couleur[1] + offs_g) % 256
				const b = (couleur[2] + offs_b) % 256
				let vScale = i % j
				var bright = (r + g + b) / 3;
				var w = map(bright, 0, 255, 0, vScale) * 6;
				fill(r, g, b)
				rect(x, y, cell_w, cell_h)
			}
		}
	}

	// mode 4
	if (mode == 4) {
		noStroke()
		for (let j = 0; j < num_y; j++) {
			for (let i = 0; i < num_x; i++) {
				const x = i * cell_w + ox
				const y = j * cell_h + oy
				const couleur = data[i + j * num_x]
				// const r = Math.floor(couleur[0] / 128) * 128
				const g = Math.floor(couleur[1] / 64) * 64
				const b = Math.floor(couleur[2] / 64) * 64

				const r = couleur[0] > mouseX / 3 ? 255 : 0

				fill(r, r, r)
				rect(x, y, cell_w, cell_h)
			}
		}
	}


}

function keyPressed() {
	if (keyCode === UP_ARROW) {
		v_speed = 1.2
	} else if (keyCode === DOWN_ARROW) {
		v_speed = -1.2
	} else if (keyCode === RIGHT_ARROW) {
		h_speed = 1.2
	} else if (keyCode === LEFT_ARROW) {
		h_speed = -1.2
	}

	if (keyCode === 49)
		mode = 1
	if (keyCode === 50)
		mode = 2
	if (keyCode === 51)
		mode = 3
	if (keyCode === 52)
		mode = 4

	/*
	//W
	if (keyCode === 87) {
		num_x++
	}
	//S
	if (keyCode === 83) {
		num_x--
	}
	//D
	if (keyCode === 68) {
		num_y++
	}
	//A
	if (keyCode === 65) {
		num_y--
	}
	*/

	if (keyCode === 82) {
		cell_w = 10
		cell_h = 10
	}


}

function keyReleased() {
	if (keyCode === UP_ARROW || keyCode === DOWN_ARROW) {
		v_speed = 0

	}

	if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
		h_speed = 0

	}
}

// function keyPressed() {
// 	if (keyCode == 32) {
// 		pause = !pause
// 	}
// }

function windowResized() {
	resizeCanvas(windowWidth, windowHeight)
}