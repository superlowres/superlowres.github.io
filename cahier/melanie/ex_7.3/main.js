/**
 *  Example P5JS canvas
 */

 const NUM_X = 6;
 const NUM_Y = 6;
 const CELL = 80;

const data = new Array(NUM_X * NUM_Y).fill(0.4)

const palette = []

let img
let changeColor = 0

function preload(){
    img = loadImage("pal_0.png")
}

function setup(){
	noStroke();
    createCanvas(windowWidth, windowHeight)
    for (let i=0; i<img.width; i++){
        palette.push(img.get(i, 0))
    }
}


function mousePressed() {
	for(let j=0; j<NUM_Y; j++) {
        for(let i=0; i<NUM_X; i++) {
			const idx = i + j * NUM_X
			data[idx] = 0.4;
		}
	}




  }




function draw(){

    if (changeColor < 0.85){
        changeColor = changeColor + 0.15;

    } else {
        changeColor = 0.1;
    }




    const ox = (width - (NUM_X)*CELL)/2;
    const oy = (height - (NUM_Y)*CELL)/2;

	// const r  = Math.sin(frameCount * 0.0103) * 10

	// const variation = Math.floor(map(r, -1,1, 0, NUM_X));

    let posX = floor(map(mouseX, 0+ox, windowWidth-ox, 0, NUM_X));
	let posY = floor(map(mouseY, 0+oy, windowHeight-oy, 0, NUM_Y));




    data[(posX + NUM_X * posY)] = changeColor;

    // render
    //background(0)
    noStroke()
    // const ox = (width - NUM_X * CELL) / 2  // offset de la matrice
    // const oy = (height - NUM_Y * CELL) / 2
    for(let j=0; j<NUM_Y; j++) {
        for(let i=0; i<NUM_X; i++) {
            const x = i * CELL + ox
            const y = j * CELL + oy
            const idx = i + j * NUM_X
            const v = data[idx]
			const pal_idx = Math.floor(map(v, 0, 1, 0, palette.length))
            fill(palette[pal_idx])
            rect(x, y, CELL-1, CELL-1)
        }
    }
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight)
}
