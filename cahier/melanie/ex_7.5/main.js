/**
 * 	Reduction d'une image
 */
//const TRIANGLE_W =  15


const data = [{
    image: "imgs_0.jpg",
    mot: "FOOD",
    mot2: "PET",
    reponse: 1
  },
  {
    image: "imgs_1.jpg",
    mot: "FOOD",
    mot2: "PET",
    reponse: 2
  },
  {
    image: "imgs_2.jpg",
    mot: "FOOD",
    mot2: "PET",
    reponse: 1
  },
  {
    image: "imgs_3.jpg",
    mot: "FOOD",
    mot2: "PET",
    reponse: 1
  },
  {
    image: "imgs_4.jpg",
    mot: "FOOD",
    mot2: "PET",
    reponse: 1
  },
  {
    image: "imgs_5.jpg",
    mot: "FOOD",
    mot2: "PET",
    reponse: 2
  },
  {
    image: "imgs_6.jpg",
    mot: "FOOD",
    mot2: "PET",
    reponse: 1
  },
  {
    image: "imgs_7.jpg",
    mot: "FOOD",
    mot2: "PET",
    reponse: 2
  },
  {
    image: "imgs_8.jpg",
    mot: "FOOD",
    mot2: "PET",
    reponse: 2
  },
  {
    image: "imgs_9.jpg",
    mot: "FOOD",
    mot2: "PET",
    reponse: 2
  },
  {
    image: "imgs_10.jpg",
    mot: "FOOD",
    mot2: "PET",
    reponse: 1
  },
  {
    image: "imgs_11.jpg",
    mot: "FOOD",
    mot2: "PET",
    reponse: 2
  },
]
let score = 0
let answer = 0
let level = 0


let num_click = 0



let fail_sound
let tada_sound

const NUM_X = 64
const NUM_Y = 64
const CELL = 9

let img, offscreen
let imgFull

function preload() {
  myFont = loadFont('PxGrotesk/PxGrotesk-Screen.otf')
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  offscreen = createGraphics(NUM_X, NUM_Y)
  fail_sound = createAudio('fail.mp3')
  tada_sound = createAudio('tada.mp3')
  //img = loadImage("imgs_"+Math.floor(random(7))+".jpg")

  //rajouter innerhtml
  setupNiveau()
}

function setupNiveau() {
  console.log(level)
  img = loadImage(data[level].image)
  imgFull = loadImage(data[level].image)

}




function draw() {
  background(0)


  // Resize proportionel et centree de l’image (de la webcam)
  // sur le "offscreen"
  const ch = NUM_Y
  const cw = Math.floor(img.width / img.height * ch)
  offscreen.image(img, (NUM_X - cw) / 2, 0, cw, ch) //chgm taille


  // Preview de l'image:
  image(offscreen, 0, 0)

  // HACK:
  // .get() ne marche pas avec "p5.img" (bug de P5JS?)
  // on est obligé de acceder directement le tableau des pixels[]
  offscreen.loadPixels()

  // Il faut considerer aussi la densité des pixels
  const d = offscreen.pixelDensity()
  const wd = offscreen.width * d * d


  // Offset de la matrice
  const ox = (width - NUM_X * CELL) / 2
  const oy = (height - NUM_Y * CELL) / 2

  //const sx = Math.round(map(Math.sin(frameCount * 0.0051), -1, 1, 0, 5))
  const sx = Math.round(map(frameCount * 0.9, 0, width, 0, 6))
  //const sy = Math.round(map(Math.sin(frameCount * 0.0063), -1, 1, 0, 6))
  const sy = Math.round(map(frameCount * 0.9, 0, height, 0, 6))

  if (frameCount > 1200) {
    frameCount = 1200
  }

  // numero de subdivisons: 1, 2, 4, 8, 16, 32, 64...
  const subdivisions_x = Math.pow(2, sx)
  const subdivisions_y = Math.pow(2, sy)

  const cell_w = NUM_X * CELL / subdivisions_x
  const cell_h = NUM_Y * CELL / subdivisions_y


  if (mouseX < width / 2) {
    cursor('hotdog2.png')
  } else {
    cursor('cat2.png')
  }

  // Affichage final
  noStroke()


  for (let j = 0; j < subdivisions_y; j++) {
    for (let i = 0; i < subdivisions_x; i++) {
      const x = i * cell_w + ox
      const y = j * cell_h + oy

      let xnormal = i / subdivisions_x
      let ynormal = j / subdivisions_y
      xnormal = xnormal * wd / 2
      ynormal = ynormal * offscreen.height


      const si = Math.floor(i * NUM_X / subdivisions_x) //si =numx
      //const si = i*NUM_X//si =numx //lol ca marche pas
      const sj = Math.floor(j * NUM_Y / subdivisions_y)
      //const sj = j // lol jarrive pas
      const offs = (si * d + sj * wd) * 4 // non mirror
      //const offs = (xnormal + ynormal * wd ) *4

      const r = offscreen.pixels[offs]
      const g = offscreen.pixels[offs + 1]
      const b = offscreen.pixels[offs + 2]
      fill(r, g, b)
      //ellipse(x,y,cell_w-1, cell_h-1)
      rect(x, y, cell_w + 1, cell_h + 1)
      //triangle(x,y,x+cell_w,y+cell_h,x+cell_w,y)
    }
  }
  fill(255)
  textSize(30)
  textFont(myFont);
  text(data[level].mot, width / 2 - 500, height / 2)
  text(data[level].mot2, width / 2 + 400, height / 2)
  textSize(60)
  text(score, width / 2 - 20, height - 50)


  rf()
	txtrep()
}

function mouseClicked() {

  frameCount = 1

  num_click++

  if (num_click % 2 == 0) {

    if (mouseX < windowWidth / 2) {
      console.log("gauche")
      if (data[level].reponse == 1) {
        console.log("right")
        score++
      } else {
        console.log("false")
      }

    } else {
      console.log("droite")
      if (data[level].reponse == 2) {
        console.log("right")
        score++
      } else {
        console.log("false")
      }
    }

    level++
    if (level >= data.length) {
      level = 0
    }

    setupNiveau()

  } else {
			if (mouseX < windowWidth / 2) {
			    if (data[level].reponse == 1) {
			      tada_sound.play()
			    } else {
			      fail_sound.play()
			    }
			}else{
				if (data[level].reponse == 2) {
					tada_sound.play()
				} else {
					fail_sound.play()
				}
			}



    console.log('click', num_click)

  }
}

function rf() {
  if (num_click % 2 == 1) {
    translate(-576 / 2, -576 / 2)
    image(imgFull, width / 2, height / 2, 577, 577)
  } else {

  }
}

function txtrep(){

	fill(255,0,0)
		if (num_click % 2 == 1) {

						if (data[level].reponse == 1) {
							text('YEAH', width / 2 - 20, height - 50)
						} else {

						}
						if (data[level].reponse == 2) {
							text('FAIL', width / 2 + 20, height + 50)
						} else {

						}

		}else{

		}

}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}
