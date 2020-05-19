/**
 * 	Reduction d'une image
 */
let num_x = 40 //nombre de carrés en x
let num_y = 30 //nombre de carrés en y
let cell_w = 20 //de loin
let cell_h = 20 //de loin
let capture, offscreen //hello la cam
let pause = false //pause de la touche
let data = []  // LE TABLAEAU en variable qui peux changer
let coulpose
let datadraw
let savecanvas 

let currentColor = 0;

function setup() {
	mycanvas = createCanvas(windowWidth, windowHeight)
	offscreen = createGraphics(num_x, num_y)   //ptite image en haut    //  0 1 2
	data = new Array(num_x * num_y).fill([0, 0, 0]) // [r,g,b] //new tableau donnant num x et y
	datadraw = new Array(num_x * num_y).fill([0, 0, 0])
	capture = createCapture(VIDEO) // webcam formula
	capture.hide() // webcam formula
	coulpose = [color('#aabf12'), color('#33ab12'), color('#165512'), color('#fe3fa2'), color('#a345cd')]
}

function draw() {

	const ch = num_y // c height
	const cw = Math.floor(capture.width / capture.height * ch) //nnr 0 & 1, capt L / cl * num y

	if (!pause) {  //OMG OMG OMG 
		offscreen.image(capture, (num_x - cw) / 2, 0, cw, ch) //OMG OMG OMG 
		offscreen.loadPixels() //OMG OMG OMG 
		const d = offscreen.pixelDensity() //OMG OMG OMG  // Il faut considerer aussi la densité des pixels
		const wd = offscreen.width * d * d //OMG OMG OMG 
		for (let j = 0; j < num_y; j++) { //OMG OMG OMG 
			for (let i = 0; i < num_x; i++) { //OMG OMG OMG 
				const offs = ((offscreen.width - 1 - i) * d + j * wd) * 4 //OMG OMG OMG 
				const r = offscreen.pixels[offs] //OMG OMG OMG 
				const g = offscreen.pixels[offs + 1] //OMG OMG OMG 
				const b = offscreen.pixels[offs + 2] //OMG OMG OMG 
				data[i + j * num_x] = [r, g, b]
			}
		}
	}

	// ----- output ----------------------------------

	const offs_x = (width - cell_w * num_x) / 2 //OMG OMG OMG 
	const offs_y = (height - cell_h * num_y) / 2 //OMG OMG OMG 

	const mouse_cell_x = Math.floor((mouseX - offs_x) / cell_w) //OMG OMG OMG 
	const mouse_cell_y = Math.floor((mouseY - offs_y) / cell_h) //OMG OMG OMG 


	if (mouse_cell_x >= 0 && mouse_cell_x < num_x && mouse_cell_y >= 0 && mouse_cell_y < num_y) { //OMG OMG OMG 
		floodfill(data, num_x, num_y, mouse_cell_x, mouse_cell_y, coulpose[currentColor]) //OMG OMG OMG, super ici c la couleur le reste je sais pas 
	}


	background(255)
	image(offscreen, 0, 0)

	const ox = (width - num_x * cell_w) / 2 //Constante o de x, width -num_x * cell_w
	const oy = (height - num_y * cell_h) / 2 //Constante o de y, 

	noStroke() //boucle qui déssine l'image
	for (let j = 0; j < num_y; j++) {
		for (let i = 0; i < num_x; i++) {
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

	for (let j = 0; j < num_y; j++) {
		for (let i = 0; i < num_x; i++) {
			const x = i * cell_w + ox
			const y = j * cell_h + oy
			const couleur = datadraw[i + j * num_x]
			const r = couleur[0]
			const g = couleur[1]
			const b = couleur[2]
			if (r == 0 && g == 0 && b == 0) {

			}
			else {
				fill(r, g, b)
				rect(x, y, cell_w, cell_h)
			}

		}
	}
}

function floodfill(data, w, h, x, y, col) {
	if (x < 0 || x >= w) return
	if (y < 0 || y >= h) return
	const offs = x + y * w
	const c = data[offs]
	const c2 = [red(col), green(col), blue(col)]
	if (c[0] == c2[0]) return
	if (Math.abs(c[0] - c2[0]) > 60) return
	data[offs] = c2
	floodfill(data, w, h, x, y - 1, col)
	floodfill(data, w, h, x, y + 1, col)
	floodfill(data, w, h, x - 1, y, col)
	floodfill(data, w, h, x + 1, y, col)
}


//add: -condition qui remet tout à 0
//	   -keypressed pour enregistrer 

function keyPressed() {
	if (keyCode == 32) {
		pause = !pause
	}
	if (keyCode === 38) {
		
		const ox = (width - num_x * cell_w) / 2 //Constante o de x, width -num_x * cell_w
		const oy = (height - num_y * cell_h) / 2 //Constante o de y, 

		savecanvas = createGraphics (num_x * cell_w, num_y * cell_h)
		savecanvas.image (mycanvas, 0,0, num_x * cell_w, num_y * cell_h, ox, oy,num_x * cell_w, num_y * cell_h )
		saveCanvas(savecanvas, "mypuzzle", "png")
	}
	if (keyCode === 40) {
		console.log(40);

		datadraw = new Array(num_x * num_y).fill([0, 0, 0])
		//revenir au début, tous les pixels doivent être black
		
		//data = new Array(num_x * num_y).fill([0, 0, 0])
		//data[i + j * num_x] = [0, 0, 0]
	}
	if (keyCode === 13) {
		
		//audio input
	}
}

function mousePressed(event) {
	console.log(event);
	for (let j = 0; j < num_y; j++) {
		for (let i = 0; i < num_x; i++) {


			let c2 = [red(coulpose[currentColor]), green(coulpose[currentColor]), blue(coulpose[currentColor])]

			if (c2[0] == data[i + j * num_x][0] &&
				c2[1] == data[i + j * num_x][1] &&
				c2[2] == data[i + j * num_x][2]) {

				datadraw[i + j * num_x] = [c2[0], c2[1], c2[2]]


			}
		}

	}

	currentColor++;
	if (currentColor >= coulpose.length) currentColor = 0;
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight)
}

