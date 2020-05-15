/**
 * 	Example SDF
 */

const NUM_X = 15
const NUM_Y = 15
const CELL  = 120 / NUM_Y

//ces variables sont utiles au calcul des données sonores
let song, currentSong = 0, fft;

const data = new Array(NUM_X * NUM_Y)
const data2 = new Array(NUM_X * NUM_Y)
const data3 = new Array(NUM_X * NUM_Y)

let bg_image
let lamps = []


function preload() {
	//le son est loadé ici
	//song = loadSound("Bass jazz_funk loop .mp3");
	song     = [loadSound("eliot_1.mp3"), loadSound("eliot_2.wav"), loadSound("eliot_3.mp3"), loadSound("eliot_4.mp3")]
	bg_image = loadImage("auditorium_4.jpg")
	lamps[0] = loadImage("amp_0.png")
	lamps[1] = loadImage("amp_1.png")
	lamps[2] = loadImage("amp_2.png")
	lamps[3] = loadImage("amp_3.png")
	lamps[4] = loadImage("amp_4.png")
	lamps[5] = loadImage("amp_5.png")
}

function setup(){
	createCanvas(windowWidth, windowHeight)
	// et des variables de calcul sont initialisées ici
	amplitude = new p5.Amplitude();
	fft = new p5.FFT();
}

// Fonction qui retourne -1 pour les numeros negatifs
// et 1 pour les numeros positifs (et pour zero)
function sign(v) {
	if (v < 0) return -1
	else return 1
}

function draw(){
	// cette fonction effectue e calcul du volume global du son,
	// ainsi que des basses, mids et highs
	let volume   = amplitude.getLevel();
	let spectrum = fft.analyze();
	let bass = (getSpectrumMean(spectrum, 0.0, 0.22)/ 255) * 2
	let mid  = (getSpectrumMean(spectrum, 0.2, 0.5) / 255) * 1
	let high = (getSpectrumMean(spectrum, 0.5, 1.0) / 255) * 2


	// cercle qui tourne en ellipse
	//tableau1
	const x1 = Math.sin(frameCount*0.011) * 0.5;
	const y1 = Math.cos(frameCount*0.052) *0.1;
	const x2 = Math.sin(frameCount*0.013) * 0.1;
	const y2 = Math.cos(frameCount*0.014) *0.1;
	const x3 = Math.cos(frameCount*0.5) * 0.2;
	const y3 = Math.cos(frameCount*0.12) * 0.2;


	//pour donner un exemple, j'ai mappé le diametre du cercle sur les highs,
	// mais tu peux faire ce que tu veux avec

	// On "remplit" le tableau des données "data"
	// avec des valeurs entre 0.0 et 1.0

	for (let j=0; j<NUM_Y; j++){
		for (let i=0; i<NUM_X; i++){

			// index du tableau en focntion de x et y de la celle
			const idx = i + j * NUM_X
			// coordonnées u et v normalisées entre -1.0 et 1.0
			const u = (i * 2 - NUM_X) / NUM_X
			const v = (j * 2 - NUM_Y) / NUM_Y

			// on calcule la distance de chaque celle par raport a un "centre"
			let d = 1e100
			// cercle 1
			d = Math.min(abs(v+x1) + abs(u+y1) -mid, d)

			//cercle 2
			d = Math.min(abs(v+x2) + abs(u+y2) -mid, d)

			//cercle 3
			d = Math.min(dist(0, 0, u-x3, v-y3) -high, d)  // ICI tu creer un cercle rm = largeur mid & high = largeur high & rb = largeur bass x

			// visualization distance
			// data[idx] = d

			// visualization step
			// data[idx] = constrain(sign(d), 0, 1)

			// visualization outline (avec abs())
			data[idx] = Math.exp(-30 * Math.abs(d))    // ICI EPAISSEUR DES TRAIT tu modifie le -20

			// visualization fill
			//data[idx] = 1.0 - Math.exp(-5 * abs(d))

			//data[idx] = d;

			// visualization fill
			//data[idx] = Math.cos(d * 5 + frameCount * 0.2)
		}
	}

	//tableau2
	const x4 = Math.cos(frameCount*0.011) * 0.5;
	const y4 = Math.cos(frameCount*0.411) *0.5;
	const x5 = Math.sin(frameCount*0.013) * 0.4;
	const y5 = Math.cos(frameCount*0.014) *0.5;
	const x6 = Math.sin(frameCount*0.1) * 0.4;
	const y6 = Math.cos(frameCount*0.12) * 0.1;
	const x7 = Math.sin(frameCount*0.013) * 0.3;
	const y7 = Math.sin(frameCount*0.013) * 0.3;


	//pour donner un exemple, j'ai mappé le diametre du cercle sur les highs,
	// mais tu peux faire ce que tu veux avec

	// On "remplit" le tableau des données "data"
	// avec des valeurs entre 0.0 et 1.0

	for (let j=0; j<NUM_Y; j++){
		for (let i=0; i<NUM_X; i++){

			// index du tableau en focntion de x et y de la celle
			const idx = i + j * NUM_X
			// coordonnées u et v normalisées entre -1.0 et 1.0
			const u = (i * 2 - NUM_X) / NUM_X
			const v = (j * 2 - NUM_Y) / NUM_Y

			// on calcule la distance de chaque celle par raport a un "centre"
			let d = 1e100
			// cercle 1
			d = Math.min(dist(0, 0, u+x4, v+y4) -bass, d)

			//cercle 2
			d = Math.min(dist(0, 0, u-x5, v-y5) -high, d)

			//cercle 3
			d = Math.min(dist(0, 0, u-x6, v-y6) -bass, d)  // ICI tu creer un cercle rm = largeur mid & high = largeur high & rb = largeur bass x

			//cercle 4
			d = Math.min(dist(0, 0, u-x7, v-y7) -bass, d)

			// visualization distance
			// data[idx] = d

			// visualization step
			// data[idx] = constrain(sign(d), 0, 1)

			// visualization outline (avec abs())
			//data2[idx] = Math.exp(-30 * Math.abs(d))    // ICI EPAISSEUR DES TRAIT tu modifie le -20

			// visualization fill
			data2[idx] = 1.0 - Math.exp(-5 * abs(d))

			//data[idx] = d;

			// visualization fill
			//data[idx] = Math.cos(d * 5 + frameCount * 0.2)
		}
	}

//tableau3
const x8 = Math.cos(frameCount*0.005) * 0.01;
const y8 = Math.cos(frameCount*0.61) *0.04;
const x9 = Math.cos(frameCount*0.081) * 0.06;
const y9 = Math.cos(frameCount*0.955) *0.08;
const x10 = Math.sin(frameCount*0.5) * 0.79;
const y10 = Math.cos(frameCount*0.21) * 0.10;
const x11 = Math.cos(frameCount*0.11) * 0.2;
const y11 = Math.cos(frameCount*0.91) * 0.33;
const x12 = Math.cos(frameCount*0.61) * 0.4;
const y12 = Math.cos(frameCount*0.9) * 0.11;


//pour donner un exemple, j'ai mappé le diametre du cercle sur les highs,
// mais tu peux faire ce que tu veux avec

// On "remplit" le tableau des données "data"
// avec des valeurs entre 0.0 et 1.0

for (let j=0; j<NUM_Y; j++){
	for (let i=0; i<NUM_X; i++){

		// index du tableau en focntion de x et y de la celle
		const idx = i + j * NUM_X
		// coordonnées u et v normalisées entre -1.0 et 1.0
		const u = (i * 2 - NUM_X) / NUM_X
		const v = (j * 2 - NUM_Y) / NUM_Y

		// on calcule la distance de chaque celle par raport a un "centre"
		let d = 1e100
		// cercle 1
		d = Math.min(dist(0, 0, u+x8, v+y8) -high, d)

		//cercle 2
		d = Math.min(dist(0, 0, u-x9, v-y9) -high, d)

		//cercle 3
		d = Math.min(dist(0, 0, u-x10, v-y10) -high, d)  // ICI tu creer un cercle rm = largeur mid & high = largeur high & rb = largeur bass x

		//cercle 4
		d = Math.min(dist(0, 0, u-x11, v-y11) -mid, d)

		//cercle 5
		d = Math.min(dist(0, 0, u-x12, v-y12) -high, d)

		// visualization distance
		// data[idx] = d

		// visualization step
		data3[idx] = constrain(sign(d), 0, 1)

		// visualization outline (avec abs())
		//data3[idx] = Math.exp(-30 * Math.abs(d))    // ICI EPAISSEUR DES TRAIT tu modifie le -20

		// visualization fill
	    //data3[idx] = 1.0 - Math.exp(-5 * abs(d))

		//data[idx] = d;

		// visualization fill
		//data3[idx] = Math.cos(d * 5 + frameCount * 0.2)
	}
}




	background(0)
	translate(width/2, height/2)

	//const z = map(Math.sin(frameCount * 0.01), -1, 1, 1, 1.6)

	//scale(z)


	image(bg_image, -bg_image.width/2, -bg_image.height/2, bg_image.width, bg_image.height)

	noStroke()

	const ox = 1   + (- NUM_X * CELL) / 2 - CELL/2
	const oy = 132 + (- NUM_Y * CELL) / 2 - CELL/2

	for(let j=0; j<NUM_Y; j++) {
		for(let i=0; i<NUM_X; i++) {
			const x = i * CELL + ox
			const y = j * CELL + oy
			const idx = i + j * NUM_X
			const v = data[idx]
			const l = Math.floor(v * (lamps.length-1))
			image(lamps[l], x, y, CELL, CELL)
		}
	}

	const ox2 = 130   + (- NUM_X * CELL) / 2 - CELL/2
	const oy2 = 132 + (- NUM_Y * CELL) / 2 - CELL/2

	for(let j=0; j<NUM_Y; j++) {
		for(let i=0; i<NUM_X; i++) {
			const x = i * CELL + ox2
			const y = j * CELL + oy2
			const idx = i + j * NUM_X
			const v = data2[idx]
			const l = Math.floor(v * (lamps.length-1))
			image(lamps[l], x, y, CELL, CELL)
		}
	}

	const ox3 = -130   + (- NUM_X * CELL) / 2 - CELL/2
	const oy3 = 132 + (- NUM_Y * CELL) / 2 - CELL/2

	for(let j=0; j<NUM_Y; j++) {
		for(let i=0; i<NUM_X; i++) {
			const x = i * CELL + ox3
			const y = j * CELL + oy3
			const idx = i + j * NUM_X
			const v = data3[idx]
			const l = Math.floor(v * (lamps.length-1))
			image(lamps[l], x, y, CELL, CELL)
		}
	}

}

function constrain(v, min, max){
	return Math.max(Math.min(v, 1.0), 0.0)
}

function getSpectrumMean(spec, start, end) {
	var total = 0
	for (let i = floor(start*spec.length); i< floor(end*spec.length); i++){
		total += spec[i];
	}
	return total / floor(spec.length*(end - start))
}

function windowResized(){
	resizeCanvas(windowWidth, windowHeight)
}
//pour jouer le son, j'ai mis start et stop quand on clique dans la fenetre
function mousePressed() {
	if (song[currentSong].isPlaying()) {
	  song[currentSong].stop();
	} else {
	  song[currentSong].play();
	}
 }

 function keyPressed() {
	if (song[currentSong].isPlaying()) {
	  song[currentSong].stop();
	} 
	currentSong = currentSong + 1
	if (currentSong >= song.length ) {
		currentSong = 0
	}
 }
