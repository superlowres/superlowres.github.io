const NUM_X = 32
const NUM_Y = 32
const CELL  = 16
let checkbox;
const data = new Array(NUM_X * NUM_Y)
const data2 = new Array(NUM_X * NUM_Y)
let button
// Un canvas "offscreen" qu'on utilise pour lire des valeurs de luminosité
let offscreen

function setup(){
	createCanvas(windowWidth, windowHeight)

	//saveCanvas = createGraphics(NUM_X * CELL, NUM_Y * CELL)
	pixelDensity(5.0);

	//création boutton
	button = createButton("SAVE")
 	button.position(windowWidth/2-50,windowHeight-150)
 	button.mousePressed(saveToFile)
 	button.style("font-family", "Comic Sans MS")
  button.style("font-size", "40px")
  button.style("color","black")
	button.style("background","#fff")
	button.style("border-style","none")
	button.style("border","solid")
	//création checkbox
	checkbox = createCheckbox('label', false);
	checkbox.changed(myCheckedEvent);
	// Le canvas a la meme taille de la grille
	offscreen = createGraphics(NUM_X, NUM_Y)
	offscreen2 = createGraphics(NUM_X, NUM_Y)
}

function draw(){


	let ox = (width - NUM_X * CELL) / 8 + CELL/2  // offset de la matrice
	const oy = (height - NUM_Y * CELL) / 2 + CELL/2


	// Rendering sur le canvas offscreen
	offscreen.textSize(30)
	offscreen.textAlign(CENTER, CENTER)
	offscreen2.textSize(30)
	offscreen2.textAlign(CENTER, CENTER)

	// if (mouseIsPressed){
	// 		offscreen.ellipse(
	// 			map(mouseX, ox,(NUM_X * CELL)+ox,0,NUM_X),
	// 			map(mouseY, oy,(NUM_Y * CELL)+oy,0,NUM_Y),
	// 			5,5)
	// }
	offscreen.filter(BLUR, 0.6)
	offscreen2.filter(BLUR, 0.6)
	if (keyIsPressed === true && keyCode > 47 && keyCode < 91) {
		offscreen.clear()
		offscreen.fill(255)
 			offscreen.text(key.toUpperCase(), NUM_X/2, NUM_Y/2+2)
 	}
	if (keyIsPressed === true && keyCode > 47 && keyCode < 91) {
		offscreen2.clear()
		offscreen2.fill(255)
 			offscreen2.text(key.toLowerCase(), NUM_X/2, NUM_Y/2+2)
 	}


	for(let j=0; j<NUM_Y; j++) {
		for(let i=0; i<NUM_X; i++) {
			const idx = i + j * NUM_X
			const v = brightness(offscreen.get(i, j))
			data[idx] =  v
		}
	}

	for(let j=0; j<NUM_Y; j++) {
		for(let i=0; i<NUM_X; i++) {
			const idx = i + j * NUM_X
			const v = brightness(offscreen2.get(i, j))
			data2[idx] =  v
		}
	}

	// Preview

	//LowerCase
	noStroke()
	clear()
	for(let j=0; j<NUM_Y; j++) {

		for(let i=0; i<NUM_X; i++) {

				const x = i * CELL + ox
				const y = j * CELL + oy
				const idx = i + j * NUM_X
				const v = data2[idx]
				fill(0,v*255)
				rect(x, y, CELL+1, CELL+1)
		}
	}
	//LowerCase Italic
	push()
	translate(CELL* 45,0)
	for(let j=0; j<NUM_Y; j++) {
		ox += -16
		for(let i=0; i<NUM_X; i++) {

				const x = i * CELL + ox
				const y = j * CELL + oy
				const idx = i + j * NUM_X
				const v = data2[idx]
				fill(0,v*255)
				rect(x, y, CELL+1, CELL+1)
		}
	}
	//UpperCase
	translate(CELL* 45,0)

	for(let j=0; j<NUM_Y; j++) {
		for(let i=0; i<NUM_X; i++) {

				const x = i * CELL + ox
				const y = j * CELL + oy
				const idx = (i + j * NUM_X)
				const v = data[idx]
				fill(0, v * 255)
				rect(x, y, CELL+0.15, CELL+0.15)
		}
	}

	//UpperCase Italic

	translate(CELL * 50,0)

	for(let j=0; j<NUM_Y; j++) {
		ox += -16
		for(let i=0; i<NUM_X; i++) {

				const x = i * CELL + ox
				const y = j * CELL + oy
				const idx = (i + j * NUM_X)
				const v = data[idx]
				fill(0, v * 255)
				rect(x, y, CELL+0.15, CELL+0.15)
		}
	}
	pop()
	textAlign(CENTER,CENTER)
	textFont("Comic Sans MS")
	textSize(50)
	fill(0)
	text('Press a key',width/2, 150)
}

function myCheckedEvent() {
  if (this.checked()) {
    console.log('Checking!');
  } else {
    console.log('Unchecking!');
  }
}

function mousePressed() {
console.log('Press');
let savetoFile
//return false
}
function saveToFile() {
  // Save the current canvas to file as png
  saveCanvas('name', 'png')
  console.log('SAVE');
}


function windowResized(){
	resizeCanvas(windowWidth, windowHeight)
}
