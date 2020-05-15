var video;

var vScale = 16;

let num_x = 18
let num_y = 12
let cell_w = 30
let cell_h = 30

function setup() {
	createCanvas(windowWidth, windowHeight)
	pixelDensity(1);
	video = createCapture(VIDEO);
	video.size(width / vScale, height / vScale);
}

function draw() {

	console.log(video.width, video, height);


	cell_w = video.width
	cell_h = video.height
	// cell_w = map(sin(frameCount * 0.011), -1, 1, 10, 40)
	// cell_h = map(sin(frameCount * 0.021), -1, 1, 10, 40)

	const offs_x = (width - video.width * num_x) / 2
	const offs_y = (height - video.height * num_y) / 2

	const mouse_cell_x = Math.floor((mouseX - offs_x) / video.width)
	const mouse_cell_y = Math.floor((mouseY - offs_y) / video.height)

	background(200);
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

			const x = i * cell_w + offs_x
			const y = j * cell_h + offs_y

			if (i == mouse_cell_x && j == mouse_cell_y) {
				fill(100, 200, 255)
				stroke(50)
				stroke(50, 0, 0)
				// vScale += 1

			} else {
				noFill()
			}

			let m = map(mouseX, 0, width, -10, 10);
			let m2 = map(mouseY, 0, height, -10, 10)

			m3= map(sin(frameCount*0.011), -1, 1, 1, 3)
			m4= map(sin(frameCount*0.021), -1, 1, 1, 3)
			// console.log(m3,m4);
			
			fill(0);

			rectMode(CENTER);
			rect(i * vScale, j * vScale, w + m, w + m2);

			// rect(i * vScale, j * vScale, w, w);
			// rect(j  * vScale, i * vScale, w + m, w + m2);
			//moving
			// rect(i * vScale + cell_w, j * vScale + cell_h, w , w );
		}
	}
}
/*
	for (let j = 0; j < num_y; j++) {
		for (let i = 0; i < num_x; i++) {

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
			line(x, y, x + cell_w, y + cell_h)
			line(x + cell_w, y, x, y + cell_h)
		}
	}
}*/