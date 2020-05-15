/**
 * 	Example P5JS canvas
 */
const NUM_X = 32;
const NUM_Y = 32;
const CELL = 16;

const data = new Array(NUM_X * NUM_Y).fill(0);

function setup(){
	createCanvas(windowWidth, windowHeight)
}

function sign(v){
	if(v < 0) return -1
	else return 1
}

function draw(){
background(0)
const x1 = Math.sin(frameCount*0.02)* 0.4
const y1 = Math.cos(frameCount*0.02)* 0.4
const x2 = Math.sin(frameCount*0.04)* 0.2
const y2 = Math.cos(frameCount*0.04)* 0.2
const y3 = Math.cos(frameCount*0.04)* 0.2

	for(let j=0; j<NUM_Y; j++){
		for (let i=0; i<NUM_X;i++){
			const idx = i + j * NUM_X;
			const u = (i* 2 - NUM_X) / NUM_X
			const v =  (j* 2 - NUM_Y) / NUM_Y
			let d = 1e100
			d = Math.min(dist(0,0,u+x1,v+y1) - 0.1,d)
			d = Math.min(dist(0,0,u+x2,v+y2) - 0.1,d)
			d = Math.min(dist(0,0,u-x2,v+y3) - 0.1,d)
			d = Math.min(dist(0,0,u-x2,v) - 0.1,d)
			d = Math.min(dist(0,15,u+x2,v) - 0.1,d)

			//data[idx]=sign(d); //	data[idx]=d;
		//	data[idx] = 1- Math.exp(-15*Math.abs(d))
			//data[idx] = Math.cos(1- Math.exp(-15*Math.abs(d)))
			//data[idx] = 1-Math.cos(d*10)
			data[idx]=d;

	// for(let j=0; j<NUM_Y; j++){
	// 	for (let i=0; i<NUM_X;i++){
	// 		const idx = i + j * NUM_X;
	// 		data[idx]=(i+j)%2;

		}
	}
	//rendering
	const ox = (width - (NUM_X)*CELL)/2;
	const oy = (height - (NUM_Y)*CELL)/2;

	for(let j=0; j<NUM_Y; j++){
		for(let i = 0; i < NUM_X; i++){
			const x = i * CELL + ox;
			const y = j * CELL + oy;
			const idx = i + j * NUM_X;
			const v = data[idx];
			fill(v*255,50,50);
			rect(x,y,CELL,CELL);
		}
	}
}



function windowResized(){
	resizeCanvas(windowWidth, windowHeight)
}
