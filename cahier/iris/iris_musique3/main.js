/**
 * 	Example SDF
 */


const NUM_X = 32
const NUM_Y = 32
const CELL  = 16

//ces variables sont utiles au calcul des données sonores
let song, volume, amplitude, bass, mid, high, fft;
var r = 0.5;

const data = new Array(NUM_X * NUM_Y)

function preload() {
	//le son est loadé ici
	//song = loadSound("Bass jazz_funk loop .mp3");
	song = loadSound("eliot_1.mp3");
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
	//cette fonction effectue e calcul du volume global du son, ainsi que des basses, mids et highs
	calculateVolumes();


	// cercle qui tourne en ellipse
	const x1 = Math.sin(frameCount*0.011) * 0.5;
	const y1 = Math.cos(frameCount*0.052) *0.4;


	const x2 = Math.sin(frameCount*0.013) * 0.4;
	const y2 = Math.cos(frameCount*0.014) *0.5;


	const x3 = Math.sin(frameCount*0.5) * 0.4;
	const y3 = Math.cos(frameCount*0.12) * 0.9;

	//Cercle vertical
	//const x3 = 0							// entre -1 et 1 position haut ou bas
	//const y3 = Math.sin(frameCount*0.014) * 0.5;                   // le 0.5 c'est la distance max (entre 0 et 1) - le 0.014 c'est la vitesse

	//Cercle Horizontal
	//const x3 = Math.sin(frameCount*0.014) *0.8;
	//const y3 = 0

        //Cercle qui saute  :
	//const x3 = 0.6							// entre -1 et 1 ça
	//const y3 = -1*abs(Math.sin(frameCount*mid*0.01) *0.5)+ 0.8;  // -1 c'est le sens, 0.01 c'est la vitesse, 0.5 c'est amplitude, + 0.6


	//pour donner un exemple, j'ai mappé le diametre du cercle sur les highs, mais tu peux faire ce que tu veux avec
	rh = high*4;
	rb = bass*0.5;
	rm = mid*0.5;               // Taille des cercle 0.5 à modifier
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
			d = Math.min(dist(0, 0, u+x1, v+y1) -rb, d)

			//cercle 2
			d = Math.min(dist(0, 0, u-x2, v-y2) -rh, d)

			//cercle 3
			d = Math.min(dist(0, 0, u-x3, v-y3) -rb, d)  // ICI tu creer un cercle rm = largeur mid & rh = largeur high & rb = largeur bass x

			// visualization distance
			// data[idx] = d

			// visualization step
			data[idx] = sign(d)

			// visualization outline (avec abs())
			//data[idx] = 1.0 - Math.exp(-30 * Math.abs(d))    // ICI EPAISSEUR DES TRAIT tu modifie le -20

			// visualization fill
			//data[idx] = 1.0 - Math.exp(-5 * abs(d))
			//data[idx] = d;
			// visualization fill
			//data[idx] = Math.cos(d * 5 + frameCount * 0.2)
		}
	}


	// Visualization du contenu du tableau (rendering)
	// textSize(9)
	// textAlign(CENTER, CENTER)

	background(0)
	//fill(10, 220, 55)

	noStroke()

	const ox = (width - NUM_X * CELL) / 2  // offset de la matrice
	const oy = (height - NUM_Y * CELL) / 2

	for(let j=0; j<NUM_Y; j++) {
		for(let i=0; i<NUM_X; i++) {
			const x = i * CELL + ox
			const y = j * CELL + oy
			const idx = i + j * NUM_X
			const v = data[idx]
			fill(v * 255)
			stroke (0);
			strokeWeight(0.3);
			circle(x, y, CELL-1)
			//fill(255,0,0)
			// text(v, x+CELL/2, y+CELL/2)
		}
	}
}

function calculateVolumes() {
	volume = amplitude.getLevel();
	let spectrum = fft.analyze();
	bass = getSpectrumMean(spectrum, 0, 0.22)/255
	mid = getSpectrumMean(spectrum, 0.2, 0.5)/255
	high = getSpectrumMean(spectrum, 0.5, 1.)/255
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
	if (song.isPlaying()) {
	  // .isPlaying() returns a boolean
	  song.stop();
	//   background(255, 0, 0);
	} else {
	  song.play();
	//   background(0, 255, 0);
	}
  }
