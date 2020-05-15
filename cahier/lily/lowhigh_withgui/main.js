/**
 * 	Example P5JS canvas
 */
 let PARAMS = {
 	count_x: 32,
 	count_y:	32,
 	box_w: 60,
 	box_h: 55, // 0 - 1

 	saveImage: function() {
 		saveCanvas();
 	}
 }


let capture, offscreen, offscreen2

function setup(){
	
	createCanvas(windowWidth, windowHeight)
	let gui = new dat.GUI();

	gui.add(PARAMS, 'count_x', PARAMS.count_x).min(0).max(50);
	gui.add(PARAMS, 'count_y', PARAMS.count_y).min(0).max(50);
	gui.add(PARAMS, 'box_w', PARAMS.box_w).min(0).max(50);
	gui.add(PARAMS, 'box_h', PARAMS.box_h).min(0).max(50);
	gui.add(PARAMS, 'saveImage');

	var customContainer = document.getElementById('my-gui-container');
customContainer.appendChild(gui.domElement);

	offscreen = createGraphics(60, 60)
	offscreen2 = createGraphics(width, height)
	capture   = createCapture(VIDEO)
	capture.hide()

}



function draw(){
	let num_x = PARAMS.count_x;
	let num_y = PARAMS.count_y;
	let cell_w = PARAMS.box_w;
	let cell_h = PARAMS.box_h;



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
			const offs = (Math.floor((num_x) - i) * d + j * wd) * 4
			if(i == 0 && j == 0) console.log(offs)
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
	image(offscreen2, 0, 0)

	// offscreen.mousePressed(console.log('mouse is pressed'));
	// image(offscreen, 0, 0)
	//offscreen.mousePressed(stockCell)
	// capture.mousePressed(stockCell)
}

function stockCell(){
	const offs_x = (width - PARAMS.box_w * PARAMS.count_x) / 2
	const offs_y = (height - PARAMS.box_h * PARAMS.count_y) / 2

	const mouse_cell_x = Math.floor((mouseX-offs_x) / PARAMS.box_w) + 1
	const mouse_cell_y = Math.floor((mouseY-offs_y) / PARAMS.box_h)
	//image(capture, (- num_x * cell_w)/2, (-num_y * cell_h)/2, num_x * cell_w, num_y * cell_h)
	const x = mouse_cell_x * PARAMS.box_w + offs_x
	const y = mouse_cell_y * PARAMS.box_h + offs_y
	let stock = capture.get();
	// image(stock, num_x, num_y, cell_w, cell_h)
	console.log(mouse_cell_x);
	
	console.log("2222")
	fill(255, 0, 0)
	rect(x, y, PARAMS.box_w, PARAMS.box_h)
	console.log(capture.height)
	offscreen2.push()
	offscreen2.translate(offscreen2.width, 0)
	offscreen2.scale(-1, 1)
	offscreen2.copy(capture, 
		Math.floor(capture.width * ((PARAMS.count_x - mouse_cell_x)*PARAMS.box_w)/(PARAMS.box_w*PARAMS.count_x)), 
		Math.floor(capture.height * (mouse_cell_y*PARAMS.box_h)/(PARAMS.box_h*PARAMS.count_y)), 
		Math.floor(capture.width /PARAMS.count_x), 
		Math.floor(capture.height /PARAMS.count_y), 
		Math.floor(width - x), 
		Math.floor(y), 
		Math.floor(PARAMS.box_w), 
		Math.floor(PARAMS.box_h)
		);
		offscreen2.pop()
}
function mousePressed() {
	stockCell();
}

// function keepCapture(mouse_cell_x, mouse_cell_y){
// 	if ( mouse_cell_x &&  mouse_cell_y) {
// 		offscreen.image(capture,(- num_x * cell_w)/2, (-num_y * cell_h)/2, num_x * cell_w, num_y * cell_h)	}
// 		console.log('mouse is pressed');
// }

function windowResized(){
	resizeCanvas(windowWidth, windowHeight)
}
