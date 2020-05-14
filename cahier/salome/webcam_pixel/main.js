/**
 * 	Reduction d'une image
 */
let num_x  = 40 //nombre de carrés en x
let num_y  = 30 //nombre de carrés en y
let cell_w = 20 //de loin
let cell_h = 20 //de loin
let capture, offscreen //hello la cam
let pause = false //pause de la touche
let data = []  // LE TABLAEAU en variable qui peux changer

function setup(){
	createCanvas(windowWidth, windowHeight) 
  	offscreen = createGraphics(num_x, num_y)   //ptite image en haut    //  0 1 2
  	data      = new Array(num_x * num_y).fill([0,0,0]) // [r,g,b] //new tableau donnant num x et y
  	capture   = createCapture(VIDEO) // webcam formula
    capture.hide() // webcam formula
}

function draw(){

	const ch = num_y // c height
  	const cw = Math.floor(capture.width / capture.height * ch) //nnr 0 & 1, capt L / cl * num y

  	if (!pause) {  //OMG OMG OMG 
		offscreen.image(capture, (num_x - cw)/2, 0, cw, ch) //OMG OMG OMG 
		offscreen.loadPixels() //OMG OMG OMG 
  		const d  = offscreen.pixelDensity() //OMG OMG OMG  // Il faut considerer aussi la densité des pixels
	  	const wd = offscreen.width * d * d //OMG OMG OMG 
		for (let j=0; j<num_y; j++) { //OMG OMG OMG 
  			for (let i=0; i<num_x; i++) { //OMG OMG OMG 
		  		const offs = ((offscreen.width - 1 - i) * d + j * wd) * 4 //OMG OMG OMG 
	  			const r = offscreen.pixels[offs    ] //OMG OMG OMG 
	  			const g = offscreen.pixels[offs + 1] //OMG OMG OMG 
	  			const b = offscreen.pixels[offs + 2] //OMG OMG OMG 
	  			data[i + j * num_x] = [r,g,b]
  			}
		}
	}

	// ----- output ----------------------------------

	const offs_x = (width - cell_w * num_x) / 2 //OMG OMG OMG 
	const offs_y = (height - cell_h * num_y) / 2 //OMG OMG OMG 

	const mouse_cell_x = Math.floor((mouseX-offs_x) / cell_w) //OMG OMG OMG 
	const mouse_cell_y = Math.floor((mouseY-offs_y) / cell_h) //OMG OMG OMG 


	if (mouse_cell_x >= 0 && mouse_cell_x < num_x && mouse_cell_y >= 0 && mouse_cell_y < num_y) { //OMG OMG OMG 
		floodfill(data, num_x, num_y, mouse_cell_x, mouse_cell_y, [255,150,30]) //OMG OMG OMG, super ici c la couleur le reste je sais pas 
	}


	background(255)
	image(offscreen, 0, 0)

	const ox = (width - num_x * cell_w) / 2 //Constante o de x, width -num_x * cell_w
	const oy = (height - num_y * cell_h) / 2 //Constante o de y, 

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

function floodfill(data, w, h, x, y, col,){
	if (x < 0 || x >= w) return
	if (y < 0 || y >= h) return
	const offs = x + y * w 
	const c = data[offs]
	if (c[0] == col[0]) return
	if (Math.abs(c[0] - col[0]) > frameCount % 255 ) return
	if(c[0]< 100) return //frontière
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

function mousePressed(event) {
	console.log(event);
  }
function windowResized(){
	resizeCanvas(windowWidth, windowHeight)
}
