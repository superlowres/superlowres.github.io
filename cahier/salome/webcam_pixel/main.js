/**
 * 	Reduction d'une image
 */
const num_X = 32
const num_Y = 32
const cell_w = 10
const cell_h = 10
//const CELL  = 16



saveCount = 0;

let capture, offscreen

function setup(){
	createCanvas(windowWidth, windowHeight)
  	offscreen = createGraphics(num_X, num_Y)
  	capture   = createCapture(VIDEO)
    capture.hide()
}

function draw(){

	

	  background(255)
	  


  	// Resize proportionel et centree de l’image (de la webcam)
  	// sur le "offscreen"
	  const ch = num_Y
	  const cw = num_X
	  
  	const cw1= Math.floor(capture.width / capture.height * ch)
	  offscreen.image(capture, (num_X-cw1)/2, 0, cw1, ch)
	
	
	const offs_x = (width - cell_w * num_X) / 2
	const offs_y = (height - cell_h * num_Y) / 2

	  
	const mouse_cell_x = Math.floor((mouseX-offs_x) / cell_w)
	const mouse_cell_y = Math.floor((mouseY-offs_y) / cell_h)

	for (let j=0; j<offsceen; j++) {
		for (let i=0; i<offscreen; i++) {

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

  	// Un peu de animation pour le debug:
  	
  

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
	const ox = (width - num_X * cell_w) / 2
	const oy = (height - num_Y * cell_h) / 2

	// Affichage final
	noStroke()
	for (let j=0; j<num_Y; j++) {
  		for (let i=0; i<num_X; i++) {
  			const x = i * cell_w + ox
  			const y = j * cell_h + oy
  			const offs = ((offscreen.width - 1 - i) * d + j * wd) * 4 // mirror
  			// const offs = ((offscreen.width - 1 - i) * d + j * wd) * 4 // non mirror
  			const r = offscreen.pixels[offs    ]
  			const g = offscreen.pixels[offs + 1]
  			const b = offscreen.pixels[offs + 2]
  			fill(r, g, b)
  			rect(x, y, cell_w -1, cell_h -1)
  		}
	}	
}

function keyPressed() {
	if (keyCode === LEFT_ARROW) {
	  save("UP_ARROW" + saveCount + ".png");
	  saveCount++;
	}
  }


  function windowResized(){
	resizeCanvas(windowWidth, windowHeight)
}