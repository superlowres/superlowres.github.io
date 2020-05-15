/**
 * 	Reduction d'une image
 */


const NUM_X = 32
const NUM_Y = 32
const CELL  = 16

let capture, offscreen
let yoffset
let xoffset
let lettre = []
let colw = 12;
let colh = 7;
let offx
let offy
let mx
let my
function preload(){
  font = loadFont('fonts/NeueHaasGrotesk-Roman.otf');
	filter = loadImage('img/filter.svg');




}

function setup(){
	createCanvas(windowWidth, windowHeight, WEBGL)
  	offscreen = createGraphics(NUM_X, NUM_Y)
  	capture   = createCapture(VIDEO)
    capture.hide()
}

function draw(){
	background(255)
	translate(-width/2, -height/2)
  texture(capture)
	textFont(font)
	textSize(100)

	//console.log(capture.width,capture.height);
	textureMode(NORMAL)
  let xoffset = 0
	let yoffset = 0
  let offx = width/colw
	let offy = height/colh
	let invers
  let mx = map(mouseX, 0, width, 0, 1);
  let my = map(mouseY, 0, width, 0, 1);
			for (var i = 0; i < lettre.length; i++) {
	      if (lettre[i] == 0) {

					trect(xoffset, yoffset, offx,offy,mx,my,0.05,0.05)
					xoffset = xoffset + offx
					push()
	        translate(-100,75)
	        text('a', xoffset, yoffset);
	        pop()


				} if (lettre[i] == 1){
					push()
					fill(255)
          noStroke()
					trect(xoffset, yoffset, offx,offy,mx,my,0.05,0.05)
          xoffset = xoffset + offx

          pop()

					// push()
	        // noStroke();
	        // translate(-225,+60)
	        // ellipse(xoffset,yoffset,offx,offy)
          //
	        // pop()

				} if (lettre[i] == 2) {

					trect(xoffset, yoffset, offx,offy,mx/2,my,0.075,0.075)
					xoffset = xoffset + offx
					push()
	        translate(-100,75)
	        text('z', xoffset, yoffset);
	        pop()

        } if (lettre[i] == 3) {

          trect(xoffset, yoffset, offx,offy,mx/2,my/2,0.1,0.1)
          xoffset = xoffset + offx
          push()
          translate(-100,75)
          text('e', xoffset, yoffset);
          pop()

        } if (xoffset > width) {
			           yoffset = yoffset + offy
			           xoffset = 0
			         }
			       }

             if (mouseX < width/2) {
               cursor('img/cursorplus.png')
              // console.log('cursor');

             } if(mouseX > width/2) {
               cursor('img/cursorminor.png')

             }
	// trect(-100, -100, 200,200,0.2,0.4,0.4,0.3)
	// trect(-100, -100, 200,200,0.5,0.6,0.4,0.3)
				}

				function mouseClicked() {
          if (mouseX < width/2) {
            colw = colw/2
            colh = colw/2
  } if(mouseX > width/2) {

    colw = colw*2
    colh = colh*2

  }


}
function keyPressed() {
//lettre
  if (key === 'a') {
    lettre.push(0)
  }
  if (key === 'z') {
    lettre.push(2)
  }
  if (key === 'e') {
    lettre.push(3)
  }

	//lettre
	  if (keyCode=== 8) {
	    lettre.pop()
	  }

		if (keyCode === 32) {
	    lettre.push(1)
	    //SPACE
	  }
}

function trect(x, y, w, h, u, v, uw, vh){

beginShape()
vertex(x,    y,    u,      v)
vertex(x+w  ,y,    u+uw,   v)
vertex(x+w , y+h  ,u+uw,   v+vh)
vertex(x,    y+h,  u ,     v+vh )
endShape()

}
function windowResized(){
	resizeCanvas(windowWidth, windowHeight)
}
