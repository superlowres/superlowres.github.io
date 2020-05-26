/**
 * 	Example P5JS canvas
 */

const NUM_X = 42
const NUM_Y = 42
const CELL = 16

const data = new Array(NUM_X * NUM_Y)

// Un canvas "offscreen" qu'on utilise pour lire des valeurs de luminosité
let offscreen

//VALUE MATRICE
let ox;//const a la base
let oy;//const a la base

//ANTOINE NOISE SET VALUE
let inc = 0.01;
let relief = [];
let scale = 100;

const palette = [];

//MOUSE
// let mouseMapX = 0;
// let mouseMapY = 0;
let Mx = 1;
let My = 1;
let MxLast = 1;
let MyLast = 1;
let SpeedX = 0;
let SpeedY = 0;
let easing = 0.1;
let dx = 0;
let dy = 0;
let sensibility = 10;

let displayImg = false;
//DAT GUI
let params = {
	scale: 2,
	load: 2.7,
	falloff: 0.65,
	scale2: 4,
	// intensity: 0.1,
}

//INTERACTION VALUE
//MOUSE
let mouseRoll = 0;
let mouseRoll2 = 50;
//DAT GUI
// let gui = new dat.GUI();
// gui.add(params, "scale").min(2).max(100);
// gui.add(params, "load").min(2.7).max(17);
// gui.add(params, "falloff").min(0.5).max(0.69);
// gui.add(params, "intensity").min(0.01).max(0.8);

//ICON VALUE
let icon = [];

function preload() {
	// img = loadImage("pal_"+Math.floor(random(5))+".png")
	img = loadImage("pal_" + 5 + "moutain.png");
	for (let i = 0; i < 6; i++) {
		icon[i] = loadImage("icon/icon_" + i + ".png")
	}

}
function setup() {
	createCanvas(windowWidth, windowHeight);
	// Le canvas a la meme taille de la grille
	offscreen = createGraphics(NUM_X, NUM_Y);
	// pixelDensity(2);
	// noiseDetail(8, 0.65);	
	noiseDetail(6.4, 0.61);
	for (let i = 0; i < img.width; i++) {//IMG INITIALISATIONS
		palette.push(img.get(i, 0))

	}
}

function draw() {

	// const tx = Math.sin(frameCount * 0.0061) * 40
	// const ty = Math.sin(frameCount * 0.0075) * 8
	// const r = Math.sin(frameCount * 0.0103) * 0.2
	background(220)
	// Preview
	image(offscreen, 0, 0)
	// stroke(0)
	noStroke();
	ox = (width - NUM_X * CELL) / 2 + CELL / 2  // offset de la matrice
	oy = (height - NUM_Y * CELL) / 2 + CELL / 2

	//RENDER RELIEF
	reliefBuild(params.scale, 200);

	// reliefBuild(params.scale,200);



	if (mouseIsPressed) {
		MxLast = Mx;
		MyLast = My;
		dx = mouseX - mouseStart.x;
		dy = mouseY - mouseStart.y;
		Mx = dx/params.scale + mapStart.x;
		My = dy/params.scale + mapStart.y;
		SpeedX = Mx - MxLast;
		SpeedY = My - MyLast;
	}
	else {
		Mx += SpeedX;
		My += SpeedY;

		SpeedX *= 0.95;
		SpeedY *= 0.95;

		if(Math.abs(SpeedX) < 0.3) SpeedX = 0;
		if(Math.abs(SpeedY) < 0.3) SpeedY = 0;
	}

	// Mx = (MxTarget - Mx)*0.9 + Mx;
	// My = (MyTarget - My)*0.9 + My;



	ellipse(Mx, My, 33, 33);

	// mouseMapX += map(mouseX, 0, width, -intensity, intensity);
	// mouseMapY += map(mouseY, 0, height, -intensity, intensity)
}


function windowResized() {
	resizeCanvas(windowWidth, windowHeight)
}

var mouseStart = {x : 0, y: 0}
var mapStart = {x: 0 ,  y : 0}
function mousePressed() {
	mouseStart.x = mouseX;
	mouseStart.y = mouseY;
	mapStart.x = Mx;
	mapStart.y = My;
}
function mouseReleased() {

}
function mouseWheel(event) {
	// console.log(event.delta)
	mouseRoll += 2;
	// mouseRoll2 += 2;
	let reform = map(mouseRoll, 2, 100, 2.7, 17, true)
	// params.scale++;
	params.scale = 1 + Math.pow(2, mouseRoll / 10)
	// params.scale2 = 1 + Math.pow(2, (mouseRoll2) / 10)
	params.load = reform;
	if (mouseRoll >= 80) {
		mouseRoll = 0;
		params.scale = 1;
		params.load = 1.1;

	}
	if(mouseRoll>50){
		displayImg = true;
	}else{
		displayImg = false;
	}
	// if (mouseRoll2 >= 100) {
	// 	mouseRoll2 = 0;

	// }


}
function reliefBuild(scalePerso, opacityP) {
	for (let j = 0; j < NUM_Y; j++) {
		for (let i = 0; i < NUM_X; i++) {
			const x = i * CELL + ox
			const y = j * CELL + oy
			const idx = i + j * NUM_X

			// const v = data[idx]
			//normalisation de la position du carre
			var _x = (i - NUM_X / 2) / (NUM_X / 2);
			var _y = (j - NUM_Y / 2) / (NUM_Y / 2);
			var scaleX = map(_x, -1.1, 1.1, 100 + Mx/100 - 10 / scalePerso, 100 + Mx/100 + 10 / scalePerso)
			var scaleY = map(_y, -1.1, 1.1, 100 + My/100 - 10 / scalePerso, 100 + My/100 + 10 / scalePerso)
			// if((i==0 || i == 1 || i == 2) && (j==0 || j==1)) {
			// 	console.log(_x, _y)
			// }
			// var scalePerso2 = params.scale2;
			// var scaleX2 = map(_x, -1, 1, 100 - 10 / scalePerso2, 100 + 10 / scalePerso2)
			// var scaleY2 = map(_y, -1, 1, 100 - 10 / scalePerso2, 100 + 10 / scalePerso2)



			let vNoise = map(noise(scaleX, scaleY), 0.4, 1, 0, 255); 	//vNoise negatif
			// let vNoise2 = map(noise(scaleX2, scaleY2), 0.4, 1, 0, 255); //vNoise2
			// let vNoise = map(noise(scaleX, scaleY), 0, 1, 0, 255);
			const v = 1 - vNoise / 255

			const pal_idx = Math.floor(map(vNoise, 0, 255, 0, palette.length))
			// let vNoiseMix;
			// if(mouseRoll < 50) {
			// 	vNoiseMix = lerp(vNoise, vNoise2, mouseRoll/50)
			// 	// console.log(mouseRoll/50)
			// }
			// else {
			// 	vNoiseMix = lerp(vNoise2, vNoise, (mouseRoll-50)/50)
			// }
			fill(vNoise);
			
			// const pal_idx = Math.floor(Math.max(Math.min(vNoiseMix*2, 254), 1));
			if (vNoise >= 0 && vNoise <= 255) {
				fill(palette[pal_idx])
			}
			rect(x, y, CELL - 1, CELL - 1)

			

			if(displayImg){
				if (vNoise >= 0 && vNoise < 8) {
					image(icon[0], x, y, CELL - 1, CELL - 1);
				}
				else if (vNoise >= 50 && vNoise < 55)
					image(icon[0], x, y, CELL - 1, CELL - 1);
				else if (vNoise >= 60 && vNoise < 61)
					
					image(icon[4], x, y, CELL - 1, CELL - 1);
				else if (vNoise >= 100 && vNoise < 101)
					image(icon[5], x, y, CELL - 1, CELL - 1);
				else if (vNoise >= 150 && vNoise <= 160)
					image(icon[3], x, y, CELL - 1, CELL - 1);
				else if (vNoise >= 210 && vNoise <= 215)
					image(icon[2], x, y, CELL - 1, CELL - 1);
	
			}
		


			// else {
			// 	if (i == 10 && j == 10) console.log("fail")
			// }
			// fill(vNoise)
			// fill(255*(i % 2), 0, 0)
			// fill(vNoise, vN, vNoiseMix)


			// rectMode(CENTER); 

			//ellipse(x, y, CELL * v, CELL * v)
			const num = Math.floor(map(v, 0, 1, 3, 15))
		}
	}
	// noLoop();
}