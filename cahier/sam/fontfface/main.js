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
let colw = 13;
let colh = 7;
let textsize = 80

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
	textSize(textsize)

	//console.log(capture.width,capture.height);
	textureMode(NORMAL)

  let xoffset = 0
	let yoffset = 0
  let offx = width/colw
	let offy = height/colh
  let mx = map(mouseX, 0, width, 0, 1);
  let my = map(mouseY, 0, width, 0, 1);
 textAlign(CENTER,CENTER);

 trect(xoffset, yoffset, offx,offy,mx,my,0.1,0.1)
 trect(xoffset+offx, yoffset, offx,offy,mx/0.8,my,0.05,0.05)
 trect(xoffset+offx*2, yoffset, offx,offy,mx/0.9,my,0.03,0.03)
 trect(xoffset+offx*3, yoffset, offx,offy,mx/0.8,my,0.05,0.05)
 trect(xoffset+offx*3, yoffset, offx,offy,mx/0.8,my,0.05,0.05)


 trect(xoffset+offx*4, yoffset, offx,offy,mx/5,my,0.05,0.05)
 trect(xoffset+offx*5, yoffset, offx,offy,mx/2,my,0.09,0.09)
 trect(xoffset+offx*6, yoffset, offx,offy,mx,my,0.1,0.1)
 trect(xoffset+offx*7, yoffset, offx,offy,mx/3,my,0.08,0.08)
 trect(xoffset+offx*8, yoffset, offx,offy,mx,my,0.05,0.05)
 trect(xoffset+offx*9, yoffset, offx,offy,mx/2,my,0.05,0.05)
 trect(xoffset+offx*10, yoffset, offx,offy,mx/2,my,0.05,0.05)
 trect(xoffset+offx*11, yoffset, offx,offy,mx,my,0.099,0.099)
 trect(xoffset+offx*12, yoffset, offx,offy,mx,my,0.05,0.05)
 trect(xoffset+offx*13, yoffset, offx,offy,mx,my,0.05,0.05)


 text('t', xoffset+offx/2, yoffset+offy/2.5);
 text('y', (xoffset+offx*3)/2, yoffset+offy/3);
 text('p', (xoffset+offx*5)/2, yoffset+offy/3);
 text('e', (xoffset+offx*7)/2, yoffset+offy/3);

 text('s', (xoffset+offx*9)/2, yoffset+offy/3);
 text('o', (xoffset+offx*11)/2, yoffset+offy/3);
 text('m', (xoffset+offx*13)/2, yoffset+offy/3);
 text('e', (xoffset+offx*15)/2, yoffset+offy/3);
 text('t', (xoffset+offx*17)/2, yoffset+offy/3);
 text('h', (xoffset+offx*19)/2, yoffset+offy/3);
 text('i', (xoffset+offx*21)/2, yoffset+offy/3);
 text('n', (xoffset+offx*23)/2, yoffset+offy/3);
 text('g', (xoffset+offx*25)/2, yoffset+offy/3);



 //text('y', xoffset+offx/2, yoffset+offy/2.5);





			for (var i = 0; i < lettre.length; i++) {
	      if (lettre[i] == 0) {


          trect(xoffset, yoffset+offy, offx,offy,mx,my,0.05,0.05)
          xoffset = xoffset + offx
          push()
        //   translate(-70,75)
          text('a', xoffset-offx/2, (yoffset+offy)+offy/2.5);

          pop()
				} if (lettre[i] == 1){
					push()
					fill(255)
          noStroke()
					trect(xoffset, yoffset+offy, offx,offy,mx,my,0.05,0.05)
          xoffset = xoffset + offx

          pop()

					// push()
	        // noStroke();
	        // translate(-225,+60)
	        // ellipse(xoffset,yoffset,offx,offy)
          //
	        // pop()

				} if (lettre[i] == 2) {

					trect(xoffset, yoffset+offy, offx,offy,mx/2,my,0.075,0.075)
					xoffset = xoffset + offx
					push()
          text('z', xoffset-offx/2, (yoffset+offy)+offy/2.5);
	        pop()

        } if (lettre[i] == 3) {

          trect(xoffset, yoffset+offy, offx,offy,mx/2,my/2,0.1,0.1)
          xoffset = xoffset + offx
          push()
          text('e', xoffset-offx/2, (yoffset+offy)+offy/2.5);
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
        function lettres(){

          trect(xoffset, yoffset, offx,offy,mx,my,0.05,0.05)
          xoffset = xoffset + offx
          push()
        //   translate(-70,75)
          text('a', xoffset-offx/2, yoffset+offy/2.5);
          pop()
          return false

        }

				function mouseClicked() {
          if (mouseX < width/2) {
            colw = colw/2
            colh = colw/2
            textsize = textsize*2

  } if(mouseX > width/2) {

    colw = colw*2
    colh = colh*2
    textsize = textsize/2


  }


}
function keyPressed() {
//lettre
  if (key === 'a') {
    console.log("debug");
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
