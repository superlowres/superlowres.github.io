var video;

var vScale = 16;

function setup() {
	createCanvas(windowWidth, windowHeight)
	pixelDensity(1);
	video = createCapture(VIDEO);
	video.size(width / vScale, height / vScale);
}

function draw() {
	background(51);
	video.loadPixels();
	for (var j = 0; j < video.height; j++) {
		for (var i = 0; i < video.width; i++) {
			var index = (video.width - i + 1 + (j * video.width)) * 4;
			var r = video.pixels[index + 0];
			var g = video.pixels[index + 1];
			var b = video.pixels[index + 2];
			var bright = (r + g + b) / 3;
			var w = map(bright, 0, 255, 0, vScale);
			noStroke();
			fill(255);
			rectMode(CENTER);
			rect(i * vScale, j * vScale, w, w);
		}
	}

}