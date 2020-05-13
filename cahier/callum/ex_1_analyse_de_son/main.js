

//ces variables sont utiles au calcul des données sonores
let song, volume, amplitude, bass, mid, high, fft;
var r = 0.5;


function preload() {
	//le son est loadé ici
	song = loadSound("testfile.mp3");
}
function setup(){
	createCanvas(windowWidth, windowHeight)
	// et des variables de calcul sont initialisées ici
	amplitude = new p5.Amplitude();
	fft = new p5.FFT();
}


function draw(){
	//cette fonction effectue le calcul du volume global du son, ainsi que des basses, mids et highs
	calculateVolumes();
	background(0)
	fill(255);
	textAlign(CENTER, CENTER);
	textSize(20)
	rect(0,height, width/4, -volume*height);
	text("VOLUME", width/8, 100);
	rect(width/4,height, width/4, -bass*height);
	text("BASS", 3*width/8, 100);
	rect(width/2,height, width/4, -mid*height);
	text("MIDS", 5*width/8, 100);
	rect(3*width/4,height, width/4, -high*height);
	text("HIGHS", 7*width/8, 100);
}

function calculateVolumes() {
	volume = amplitude.getLevel();
	let spectrum = fft.analyze();
	//la fonction fft retourne un array avec les volumes respectifs
	// d'un certain nombre de bandes de fréquence
	// l'idée de la fonction getSpectrumMean est de retourner la moyenne d'une partie de ce spectre
	// il est donc possible d'ajuster les valeurs start et end pour etre plus precis dans les detections de certaines fréquences
	bass = getSpectrumMean(spectrum, 0, 0.05)/255
	mid = getSpectrumMean(spectrum, 0.05, 0.1)/255
	high = getSpectrumMean(spectrum, 0.1, .3)/255
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