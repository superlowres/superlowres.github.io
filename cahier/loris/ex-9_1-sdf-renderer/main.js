let NUM_X = 32;
let NUM_Y = 32;
let CELL = 16;

////LAYERS
const data1 = new Array(NUM_X * NUM_Y).fill(0)
const data2 = new Array(NUM_X * NUM_Y).fill(0)
const data3 = new Array(NUM_X * NUM_Y).fill(0)

let pos = [];
let value

const palette = []
let img

let s

function preload() {
	img = loadImage("pal_3.png")
}



//// EFFECT LIBRARY -----------------------------------------------------------------------------------------

function sign(v) {
	if (v < 0) return -1
	else return 1
}

function smoothUnion(d1, d2, k) {
	const h = clamp(0.5 + 0.5 * (d2 - d1) / k, 0.0, 1.0);
	return mix(d2, d1, h) - k * h * (1.0 - h);
}

function clamp(v, min, max) {
	if (v < min) return min
	if (v > max) return max
	return v
}

function mix(v1, v2, a) {
	return v1 * (1 - a) + v2 * a
}

//// --------------------------------------------------------------------------------------------------------

//// SHAPE LIBRARY ------------------------------------------------------------------------------------------

function sdCircle(u, v, r) {
	const d = Math.sqrt(u * u + v * v) - r
	return d
}

function sdEllipse(u, v, rx, ry) {
	const d = Math.sqrt(Math.pow(u, 2) / Math.pow(rx, 2) + Math.pow(v, 2) / Math.pow(ry, 2)) - 1
	return d
}

function sdBox(u, v, w, h) {
	const dx = Math.max(Math.abs(u) - w, 0)
	const dy = Math.max(Math.abs(v) - h, 0)
	return Math.sqrt(dx * dx + dy * dy)
}

function sdRhombus(u, v, w, h) {
	let qx = Math.abs(u);
	let qy = Math.abs(v);
	w = Math.abs(w);
	h = Math.abs(h);
	return (qx * h + qy * w - w * h)
}

// float sdEquilateralTriangle( in vec2 p )
// {
//     const float k = sqrt(3.0);
//     p.x = abs(p.x) - 1.0;
//     p.y = p.y + 1.0/k;
//     if( p.x+k*p.y>0.0 ) p = vec2(p.x-k*p.y,-k*p.x-p.y)/2.0;
//     p.x -= clamp( p.x, -2.0, 0.0 );
//     return -length(p)*sign(p.y);
// }

function sdTriangle(u, v, r) {
	let k = Math.sqrt(3.0)
	let px = Math.abs(u) - r
	let py = (v + 1 / k) + (r / PI)
	if (px + k * py > 0) {
		py = (px - k * py, -k * px - py) / 2.0;
	}
	px -= clamp(px, -1, 1);
	return Math.sqrt(px * px + py * py) * Math.sign(py)
}

//// --------------------------------------------------------------------------------------------------------

function setup() {
	createCanvas(windowWidth, windowHeight)
	for (let i = 0; i < img.width; i++) {
		palette.push(img.get(i, 0))
	}

	radio = createRadio();
	radio.option('', 1);
	radio.option('', 2);
	radio.option('', 3);
	radio.option('', 4);
	radio.option('', 5);
	radio.option('', 6);
	radio.option('', 7);

	radio.style('padding', '0px');
	radio.style('display', 'grid');
	radio.position(15, 27);

	slider = createSlider(0, 5, 3, 1);
	slider.position(15, 210);
}


function draw() {
	background(220)
	noStroke()


	if (slider.value() == 0) {
		NUM_X = 2
		NUM_Y = 2
		CELL = 256
	} else 	if (slider.value() == 1) {
		NUM_X = 4
		NUM_Y = 4
		CELL = 128
	} 
	else 	if (slider.value() == 2) {
		NUM_X = 8
		NUM_Y = 8
		CELL = 64
	} else 	if (slider.value() == 3) {
		NUM_X = 16
		NUM_Y = 16
		CELL = 32
	}else 	if (slider.value() == 4) {
		NUM_X = 32
		NUM_Y = 32
		CELL = 16
	} else 	if (slider.value() == 5) {
		NUM_X = 64
		NUM_Y = 64
		CELL = 8
	}

	//// CALCULATIONS ---------------------------------------------------------------------------------------

	for (let j = 0; j < NUM_Y; j++) {
		for (let i = 0; i < NUM_X; i++) {
			const idx = i + j * NUM_X
			const u = (i * 2 - NUM_X + 1) / NUM_X
			const v = (j * 2 - NUM_Y + 1) / NUM_Y
			let k = 0.3
			let a = frameCount * .01
			const rx = .5
			const ry = .5
			let h = .5
			let w = .5
			let d1 = 1e100
			let d2 = 1e100


			let tx = 0
			let ty = 0

			let x = u + tx
			let y = v + ty

			let xRot = x * cos(-a) - y * sin(-a)
			let yRot = x * sin(-a) + y * cos(-a)

			let xRotD = xRot + Math.cos(frameCount * .01) * .5
			let yRotD = yRot + Math.sin(frameCount * .01) * .5

			let x1 = u - tx
			let y1 = v - ty

			let xRot1 = x1 * cos(-a) - y1 * sin(-a)
			let yRot1 = x1 * sin(-a) + y1 * cos(-a)

			let xRotD1 = xRot1 + Math.cos(frameCount * .01) * .7
			let yRotD1 = yRot1 + Math.sin(frameCount * .01) * .7


			////SHAPES DRAWING

			d1 = sdEllipse(x, y, rx, ry)
			//d1 = sdCircle(x, y, rx)
			//d1 = sdBox(x, y, w, h, a)
			//d1 = sdEllipse(x, y, rx, ry)
			//d1 = sdRhombus(x, y, w, h)
			//d1 = sdTriangle(x, y,rx)

			//d1 = smoothUnion(sdBox(xRotD, yRotD, w, h), d1, k)
			// d1 = smoothUnion(sdBox(xRotD1, yRotD1, w, h), d1, k)
			// d2 = sdEllipse(x - tx, y - ty, rx, ry)
			// d3 = sdEllipse(x - tx, y - ty, rx, ry)


			////PRE RENDERER

			let val = radio.value()
			////SHAPES DRAWING
			if (val == 1) {
				data1[idx] = d1
			}
			if (val == 2) {
				data1[idx] = 1 - Math.exp(-10 * Math.abs(d1))
			}
			if (val == 3) {
				data1[idx] = sign(d1)
			}
			if (val == 4) {
				data1[idx] = Math.sin(d1 * 10 - frameCount * 0.2)
			}
			if (val == 5) {
				data1[idx] = Math.sin(d1 * 10 + frameCount * 0.2)
			}
			if (val == 6) {
				data1[idx] = Math.sin(d1 * 10 + sin(frameCount * 0.08)*10)
			}
			if (val == 7) {
				data1[idx] = 1.0 - Math.exp(-1 / d1)
			}
			
			//data1[idx] = d1//NORMAL
			//data1[idx] = 1 - Math.exp(-10 * Math.abs(d1)) //OULINE
			//data1[idx] = sign(d1) //PIXEL PERFECT
			//data1[idx] = Math.sin(d1 * 10 - frameCount * 0.2) // OUTLINE ANIMATED OUT
			//data1[idx] = Math.sin(d1 * 10 + frameCount * 0.2) // OUTLINE ANIMATED IN
			//data1[idx] = 1.0 - Math.exp(-15 / d1) //PIXEL PERFECT 2

			//data2[idx] = d2 //NORMAL
			//data2[idx] = Math.sin(d2 * 10 + frameCount * 0.2) // OUTLINE ANIMATED IN

			//data3[idx] = Math.sin(d3 * 10 - frameCount * 0.1) // OUTLINE ANIMATED OUT

		}
	}

	//// --------------------------------------------------------------------------------------------------------

	//// RENDERER -----------------------------------------------------------------------------------------------
	console.log(second() % 2)
	const ox = (width / 2 - (NUM_X * CELL) / 2)
	const oy = (height / 2 - (NUM_Y * CELL) / 2)

	for (let j = 0; j < NUM_Y; j++) {
		for (let i = 0; i < NUM_X; i++) {

			const x = i * CELL + ox
			const y = j * CELL + oy
			const idx = i + j * NUM_X;
			const v1 = data1[idx];
			const v2 = data2[idx];
			const v3 = data3[idx];

			noStroke()
			let pal_idx = Math.floor(map(v1, 0, 1, palette.length - 1, 0))
			//fill(palette[pal_idx])
			fill(v1 * 255)
			//if (v1 > 0.2) {
			rect(x, y, CELL, CELL)
			//}

			fill(v2 * 255, 0, 0)
			if (v2 > 0.2) {
				ellipse(x + CELL / 2, y + CELL / 2, CELL / 3, CELL / 3)
			}

			noFill()
			stroke(0, 0, v3 * 255)
			strokeWeight(CELL / 4)
			if (v3 > 0.2) {
				ellipse(x + CELL / 2, y + CELL / 2, CELL * 0.75, CELL * 0.75)
			}
		}

	}

	//// --------------------------------------------------------------------------------------------------------

	noStroke()
	fill(0)
	textLeading(19.1)

	text('Renderer: \n     normal \n     outline\n     pixel perfect\n     outline anim out\n     outline anim in\n     outline anim sin\n     glow\n' + '\n\nresolution = ' + NUM_X + 'x' + NUM_Y, 20, 20, )
}


function keyTyped() {
	if (key === 'a') {
		NUM_X = NUM_X / 2
		Math.round(NUM_X) + 1
		NUM_Y = NUM_Y / 2
		Math.round(NUM_Y) + 1
		CELL = CELL * 2
		CELL - 1
	} else if (key === 'd') {
		NUM_X = NUM_X * 2
		Math.round(NUM_X) - 1
		NUM_Y = NUM_Y * 2
		Math.round(NUM_Y) - 1
		CELL = CELL / 2
		CELL + 1
	} else if (key === '1') {
		value = 0
	} else if (key === '2') {
		value = 1
	} else if (key === '3') {
		value = 2
	} else if (key === '4') {
		value = 3
	} else if (key === '5') {
		value = 4
	} else if (key === '6') {
		value = 5
	} else if (key === '7') {
		value = 6
	} else if (key === '8') {
		value = 7
	} else if (key === '9') {
		value = 8
	} else if (key === '0') {
		value = 9
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight)
}