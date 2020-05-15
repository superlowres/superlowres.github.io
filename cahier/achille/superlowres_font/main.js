const NUM_X = 24
const NUM_Y = 32


const data = new Array(NUM_X * NUM_Y)
const data2 = new Array(NUM_X * NUM_Y)

let button
let offscreen
let slider_fade
let slider_italic

function setup(){
	var myCanvas = createCanvas(windowWidth, windowHeight)
	myCanvas.parent("container2");

	//slider
	slider_fade = createSlider(1, 50, 25)
	slider_fade.parent("container2");
	slider_fade.position(windowWidth/2+160, windowHeight-180)
	slider_fade.style('width', '160px')

	slider_italic = createSlider(-10, -5)
	slider_italic.parent("container2");
	slider_italic.position(windowWidth/2-320, windowHeight-180)
	slider_italic.style('width', '160px')

	// Le canvas a la meme taille de la grille
	offscreen = createGraphics(NUM_X, NUM_Y)
	offscreen2 = createGraphics(NUM_X, NUM_Y)

	button = createButton("save")
	button.parent("container2");
	button.position(windowWidth/2-175,windowHeight-120)
	button.mousePressed(saveToFile)
	button.style("font-size", "40px")
	button.style("color","black")
	button.style("background","#fff")
	button.style("border-style","none")
	button.style("border-radius","35px")
	button.style("width","350px")
	button.style("border","solid")
	button.style("cursor","pointer")
}

function draw(){


	//saveCanvas = createGraphics(NUM_X * CELL, NUM_Y * CELL)
	//pixelDensity(5.0);

	//création boutton


	const CELL = Math.floor(width/(NUM_X*10)+3)
	let val = slider_fade.value();
	let italic = slider_italic.value();
  background(val);
	let ox = (width - NUM_X * CELL) / 10 + CELL/2  // offset de la matrice
	const oy = (height - NUM_Y * CELL) / 2 + CELL/2


	// Rendering sur le canvas offscreen
	offscreen.textSize(30)
	offscreen.textAlign(CENTER, CENTER)

	offscreen2.textSize(30)
	offscreen2.textAlign(CENTER, CENTER)

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
			data[idx] =  brightness(offscreen.get(i, j)) / val

			data2[idx] =  brightness(offscreen2.get(i, j)) / val
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
	translate(CELL* (NUM_X*2),0)
	for(let j=0; j<NUM_Y; j++) {
		ox += italic
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
	translate(CELL* (NUM_X*2),0)

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
		ox += italic
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
	fill(0)
	textSize(20)
	text('italic',windowWidth/2-240, windowHeight-140)
	text('fade',windowWidth/2+240, windowHeight-140)
	textAlign(CENTER,CENTER)
	//textFont(myFont);
	textSize(50)
	fill(0)
	text('SUPERLOWRES FONT',width/2, 150)

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
