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
let plus
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
  let offx = width/colw
	let offy = height/colh

  let xoffset = width/2-(13*offx)/2
	let yoffset = 0

  let plus = offx


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


 text('t', xoffset+offx/2, yoffset+offy/2.5);
 text('y', (xoffset+offx/0.67), yoffset+offy/3);
 text('p', (xoffset+offx/0.4), yoffset+offy/3);
 text('e', (xoffset+offx/0.287), yoffset+offy/3);

 text('s', (xoffset+offx/0.222), yoffset+offy/3);
 text('o', (xoffset+offx/0.182), yoffset+offy/3);
 text('m', (xoffset+offx/0.154), yoffset+offy/3);
 text('e', (xoffset+offx/0.133), yoffset+offy/3);
 text('t', (xoffset+offx/0.118), yoffset+offy/2.5);
 text('h', (xoffset+offx/0.105), yoffset+offy/2.5);
 text('i', (xoffset+offx/0.0945), yoffset+offy/2.5);
 text('n', (xoffset+offx/0.087), yoffset+offy/3);
 text('g', (xoffset+plus/0.080), yoffset+offy/3);



 //text('y', xoffset+offx/2, yoffset+offy/2.5);



xoffset = 0


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

          trect(xoffset, yoffset+offy, offx,offy,mx/4,my,0.1,0.1)
          xoffset = xoffset + offx
          push()
          text('e', xoffset-offx/2, (yoffset+offy)+offy/2.5);
          pop()
        }
        if (lettre[i] == 4) {

          trect(xoffset, yoffset+offy, offx,offy,mx/2,my/2,0.1,0.1)
          xoffset = xoffset + offx
          push()
          text('r', xoffset-offx/2, (yoffset+offy)+offy/2.5);
          pop()
        } if (lettre[i] == 5) {

          trect(xoffset, yoffset+offy, offx,offy,mx/2,my/2,0.2,0.2)
          xoffset = xoffset + offx
          push()
          text('t', xoffset-offx/2, (yoffset+offy)+offy/2.5);
          pop()
        } if (lettre[i] == 6) {

          trect(xoffset, yoffset+offy, offx,offy,mx/2,my,0.05,0.05)
          xoffset = xoffset + offx
          push()
          text('y', xoffset-offx/2, (yoffset+offy)+offy/2.5);
          pop()
        } if (lettre[i] == 7) {

          trect(xoffset, yoffset+offy, offx,offy,mx/3,my*2,0.095,0.095)
          xoffset = xoffset + offx
          push()
          text('u', xoffset-offx/2, (yoffset+offy)+offy/2.5);
          pop()
        } if (lettre[i] == 8) {

          trect(xoffset, yoffset+offy, offx,offy,mx/5,my/2,0.01,0.01)
          xoffset = xoffset + offx
          push()
          text('i', xoffset-offx/2, (yoffset+offy)+offy/2.5);
          pop()
        } if (lettre[i] == 9) {

          trect(xoffset, yoffset+offy, offx,offy,mx/7,my,0.15,0.15)
          xoffset = xoffset + offx
          push()
          text('o', xoffset-offx/2, (yoffset+offy)+offy/2.5);
          pop()
        } if (lettre[i] == 10) {

          trect(xoffset, yoffset+offy, offx,offy,mx/3,my*2,0.03,0.03)
          xoffset = xoffset + offx
          push()
          text('p', xoffset-offx/2, (yoffset+offy)+offy/2.5);
          pop()
        } if (lettre[i] == 11) {

          trect(xoffset, yoffset+offy, offx,offy,mx/3,my/5,0.1,0.1)
          xoffset = xoffset + offx
          push()
          text('q', xoffset-offx/2, (yoffset+offy)+offy/2.5);
          pop()
        } if (lettre[i] == 12) {

          trect(xoffset, yoffset+offy, offx,offy,mx/4,my/2,0.1,0.1)
          xoffset = xoffset + offx
          push()
          text('s', xoffset-offx/2, (yoffset+offy)+offy/2.5);
          pop()
        } if (lettre[i] == 13) {

          trect(xoffset, yoffset+offy, offx,offy,mx/2,my*2,0.01,0.01)
          xoffset = xoffset + offx
          push()
          text('d', xoffset-offx/2, (yoffset+offy)+offy/2.5);
          pop()
        } if (lettre[i] == 14) {

          trect(xoffset, yoffset+offy, offx,offy,mx,my/2,0.12,0.12)
          xoffset = xoffset + offx
          push()
          text('f', xoffset-offx/2, (yoffset+offy)+offy/2.5);
          pop()
        } if (lettre[i] == 15) {

          trect(xoffset, yoffset+offy, offx,offy,mx/4,my/2,0.2,0.2)
          xoffset = xoffset + offx
          push()
          text('g', xoffset-offx/2, (yoffset+offy)+offy/2.5);
          pop()
        } if (lettre[i] == 16) {

          trect(xoffset, yoffset+offy, offx,offy,mx/4,my,0.130,0.130)
          xoffset = xoffset + offx
          push()
          text('h', xoffset-offx/2, (yoffset+offy)+offy/2.5);
          pop()
        } if (lettre[i] == 17) {

          trect(xoffset, yoffset+offy, offx,offy,mx/4,my,0.05,0.05)
          xoffset = xoffset + offx
          push()
          text('j', xoffset-offx/2, (yoffset+offy)+offy/2.5);
          pop()
        } if (lettre[i] == 18) {

          trect(xoffset, yoffset+offy, offx,offy,mx/2,my*2,0.1,0.1)
          xoffset = xoffset + offx
          push()
          text('k', xoffset-offx/2, (yoffset+offy)+offy/2.5);
          pop()
        } if (lettre[i] == 19) {

          trect(xoffset, yoffset+offy, offx,offy,mx/6,my/3,0.15,0.15)
          xoffset = xoffset + offx
          push()
          text('l', xoffset-offx/2, (yoffset+offy)+offy/2.5);
          pop()
        } if (lettre[i] == 20) {

          trect(xoffset, yoffset+offy, offx,offy,mx/4,my/2,0.05,0.05)
          xoffset = xoffset + offx
          push()
          text('m', xoffset-offx/2, (yoffset+offy)+offy/2.5);
          pop()
        } if (lettre[i] == 21) {

          trect(xoffset, yoffset+offy, offx,offy,mx/6,my/2,0.15,0.15)
          xoffset = xoffset + offx
          push()
          text('w', xoffset-offx/2, (yoffset+offy)+offy/2.5);
          pop()
        } if (lettre[i] == 22) {

          trect(xoffset, yoffset+offy, offx,offy,mx/3,my,0.05,0.05)
          xoffset = xoffset + offx
          push()
          text('x', xoffset-offx/2, (yoffset+offy)+offy/2.5);
          pop()
        } if (lettre[i] == 23) {

          trect(xoffset, yoffset+offy, offx,offy,mx/6,my/3,0.09,0.09)
          xoffset = xoffset + offx
          push()
          text('c', xoffset-offx/2, (yoffset+offy)+offy/2.5);
          pop()
        } if (lettre[i] == 24) {

          trect(xoffset, yoffset+offy, offx,offy,mx/2,my/5,0.25,0.25)
          xoffset = xoffset + offx
          push()
          text('v', xoffset-offx/2, (yoffset+offy)+offy/2.5);
          pop()
        } if (lettre[i] == 25) {

          trect(xoffset, yoffset+offy, offx,offy,mx/2,my/2,0.12,0.12)
          xoffset = xoffset + offx
          push()
          text('b', xoffset-offx/2, (yoffset+offy)+offy/2.5);
          pop()
        } if (lettre[i] == 26) {

          trect(xoffset, yoffset+offy, offx,offy,mx/2,my,0.05,0.05)
          xoffset = xoffset + offx
          push()
          text('n', xoffset-offx/2, (yoffset+offy)+offy/2.5);
          pop()
        } if (lettre[i] == 27) {

          trect(xoffset, yoffset+offy, offx,offy,mx/2,my/2,0.15,0.15)
          xoffset = xoffset + offx
          push()
          text("'", xoffset-offx/2, (yoffset+offy)+offy/2.5);
          pop()
        } if (lettre[i] == 28) {

          trect(xoffset, yoffset+offy, offx,offy,mx/2,my*2,0.1,0.1)
          xoffset = xoffset + offx
          push()
          text("1", xoffset-offx/2, (yoffset+offy)+offy/2.5);
          pop()
        } if (lettre[i] == 29) {

          trect(xoffset, yoffset+offy, offx,offy,mx/2,my/2,0.1,0.1)
          xoffset = xoffset + offx
          push()
          text("2", xoffset-offx/2, (yoffset+offy)+offy/2.5);
          pop()
        } if (lettre[i] == 30) {

          trect(xoffset, yoffset+offy, offx,offy,mx/2,my*1.5,1)
          xoffset = xoffset + offx
          push()
          text("3", xoffset-offx/2, (yoffset+offy)+offy/2.5);
          pop()
        } if (lettre[i] == 31) {

          trect(xoffset, yoffset+offy, offx,offy,mx/2,my/2,0.01,0.01)
          xoffset = xoffset + offx
          push()
          text("4", xoffset-offx/2, (yoffset+offy)+offy/2.5);
          pop()
        } if (lettre[i] == 32) {

          trect(xoffset, yoffset+offy, offx,offy,mx/2,my*2,0.1,0.1)
          xoffset = xoffset + offx
          push()
          text("5", xoffset-offx/2, (yoffset+offy)+offy/2.5);
          pop()
        } if (lettre[i] == 33) {

          trect(xoffset, yoffset+offy, offx,offy,mx/2,my*2,0.01,0.01)
          xoffset = xoffset + offx
          push()
          text("6", xoffset-offx/2, (yoffset+offy)+offy/2.5);
          pop()
        } if (lettre[i] == 34) {

          trect(xoffset, yoffset+offy, offx,offy,mx/2,my/2,0.1,0.1)
          xoffset = xoffset + offx
          push()
          text("7", xoffset-offx/2, (yoffset+offy)+offy/2.5);
          pop()
        } if (lettre[i] == 35) {

          trect(xoffset, yoffset+offy, offx,offy,mx/2,my*1.5,0.1,0.1)
          xoffset = xoffset + offx
          push()
          text("8", xoffset-offx/2, (yoffset+offy)+offy/2.5);
          pop()
        } if (lettre[i] == 36) {

          trect(xoffset, yoffset+offy, offx,offy,mx/2,my*2.3,0.22,0.22)
          xoffset = xoffset + offx
          push()
          text("9", xoffset-offx/2, (yoffset+offy)+offy/2.5);
          pop()
        }
        if (xoffset > width) {
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
  if (key === 'r') {
    lettre.push(4)
  }
  if (key === 't') {
    lettre.push(5)
  }
  if (key === 'y') {
    lettre.push(6)
  }
  if (key === 'u') {
    lettre.push(7)
  }
  if (key === 'i') {
    lettre.push(8)
  }
  if (key === 'o') {
    lettre.push(9)
  }
  if (key === 'p') {
    lettre.push(10)
  }
  if (key === 'q') {
    lettre.push(11)
  }
  if (key === 's') {
    lettre.push(12)
  }
  if (key === 'd') {
    lettre.push(13)
  }
  if (key === 'f') {
    lettre.push(14)
  }
  if (key === 'g') {
    lettre.push(15)
  }
  if (key === 'h') {
    lettre.push(16)
  }
  if (key === 'j') {
    lettre.push(17)
  }
  if (key === 'k') {
    lettre.push(18)
  }
  if (key === 'l') {
    lettre.push(19)
  }
  if (key === 'm') {
    lettre.push(20)
  }
  if (key === 'w') {
    lettre.push(21)
  }
  if (key === 'x') {
    lettre.push(22)
  }
  if (key === 'c') {
    lettre.push(23)
  }
  if (key === 'v') {
    lettre.push(24)
  }
  if (key === 'b') {
    lettre.push(25)
  }
  if (key === 'n') {
    lettre.push(26)
  }

//chiffre
if (key === "1") {
  lettre.push(28)
}
if (key === "2") {
  lettre.push(29)
}
if (key === "3") {
  lettre.push(30)
}
if (key === "4") {
  lettre.push(31)
}
if (key === "5") {
  lettre.push(32)
}
if (key === "6") {
  lettre.push(33)
}
if (key === "7") {
  lettre.push(34)
}
if (key === "8") {
  lettre.push(35)
}
if (key === "9") {
  lettre.push(36)
}



	//lettre special
  if (key === "'") {
    lettre.push(27)
  }

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
