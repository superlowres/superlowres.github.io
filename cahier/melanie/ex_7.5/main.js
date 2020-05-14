/**
 * 	Reduction d'une image
 */
const TRIANGLE_W =  15


const data = [
	{image: "imgs_0.jpg",
	mot: "A",
	mot2:"B",
	reponse: 1},
	{image: "imgs_1.jpg",
	mot: "C",
	mot2:"D",
	reponse: 2},
]

let level = 0

const NUM_X = 64
const NUM_Y = 64
const CELL  = 10

let img, offscreen
let imgChange

function preload (){

}

function setup(){
	createCanvas(windowWidth, windowHeight)
  	offscreen = createGraphics(NUM_X, NUM_Y)
		//img = loadImage("imgs_"+Math.floor(random(7))+".jpg")
	setupNiveau()
}
function setupNiveau(){
	console.log(level)
	img= loadImage(data[level].image)
	document.getElementById('Achoice').innerHTML = data[level].mot
	document.getElementById('Bchoice').innerHTML = data[level].mot2

}


function draw(){
  	background(0)

  	// Resize proportionel et centree de l’image (de la webcam)
  	// sur le "offscreen"
  	const ch = NUM_Y
  	const cw = Math.floor(img.width / img.height * ch)
  	offscreen.image(img, (NUM_X-cw)/2, 0, cw, ch)


		// Preview de l'image:
		//image(offscreen, 0, 0)

  	// HACK:
  	// .get() ne marche pas avec "p5.img" (bug de P5JS?)
  	// on est obligé de acceder directement le tableau des pixels[]
  	offscreen.loadPixels()

  	// Il faut considerer aussi la densité des pixels
  	const d  = offscreen.pixelDensity()
  	const wd = offscreen.width * d * d


  	// Offset de la matrice
		const ox = (width - NUM_X * CELL) / 2
		const oy = (height - NUM_Y * CELL) / 2

		//const sx = Math.round(map(Math.sin(frameCount * 0.0051), -1, 1, 0, 5))
		const sx = Math.round(map(mouseX, 0, width, 0, 6))
		//const sy = Math.round(map(Math.sin(frameCount * 0.0063), -1, 1, 0, 6))
		const sy = Math.round(map(mouseY, 0, height, 0, 6))


		// numero de subdivisons: 1, 2, 4, 8, 16, 32, 64...
		const subdivisions_x = Math.pow(2, sx)
		const subdivisions_y = Math.pow(2, sy)

		const cell_w = NUM_X * CELL / subdivisions_x
		const cell_h = NUM_Y * CELL / subdivisions_y


	// Affichage final
	noStroke()

	for (let j=0; j<subdivisions_y; j++) {
			for (let i=0; i<subdivisions_x; i++) {
					const x = i * cell_w + ox
					const y = j * cell_h + oy

					let xnormal = i / subdivisions_x
					let ynormal = j /subdivisions_y
					xnormal = xnormal * wd/2
					ynormal = ynormal * offscreen.height

					const si = Math.floor(i * NUM_X / subdivisions_x)
					const sj = Math.floor(j * NUM_Y / subdivisions_y)
	  			//const offs = (si * d + sj * wd) * 4 // non mirror
					const offs = (xnormal + ynormal * wd ) *4

	  			const r = offscreen.pixels[offs    ]
	  			const g = offscreen.pixels[offs + 1]
	  			const b = offscreen.pixels[offs + 2]
	  			fill(r, g, b)
					//ellipse(x,y,cell_w-1, cell_h-1)
	  			rect(x, y, cell_w-1, cell_h-1)
					//triangle(x,y,x+cell_w,y+cell_h,x+cell_w,y)
  		}
	}
}
function mouseClicked() {

level ++
if (level >= data.length){
	level = 0
}
setupNiveau()
//img = loadImage("imgs_"+Math.floor(random(7))+".jpg")

}
function windowResized(){
	resizeCanvas(windowWidth, windowHeight)
}
