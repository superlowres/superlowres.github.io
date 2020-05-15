/**
 *  Example P5JS canvas
 */

const GUI = new dat.GUI();
GUI.closed= false;

var customContainer = document.getElementById('my-gui-container');
customContainer.appendChild(GUI.domElement);

let saveCanvas;
let imgs = []
let imgIndex
let img
let palette = [];
let changeColor = 0

const numOfPalettes = 10;

const GRID = {
    num_x: 5,
    num_y: 5,
    cell_h: 100,
    cell_w: 100,
    imgIndex: 0,
    choosePalette: () => {
        GRID.imgIndex = floor(random(imgs.length));
        for (let j = 0; j < GRID.num_y; j++) {
            for (let i = 0; i < GRID.num_x; i++) {
                const idx = i + j * GRID.num_x
                data[idx] = 1;
            }
        }
    },
    saveInspo: () => {
        const offs_x = (width - GRID.cell_w * GRID.num_x) / 2
        const offs_y = (height - GRID.cell_h * GRID.num_y) / 2

        let c = get(offs_x, offs_y, GRID.cell_w * GRID.num_x, GRID.cell_h * GRID.num_y);

        saveCanvas = createGraphics(GRID.cell_w * GRID.num_x, GRID.cell_h * GRID.num_y);
        saveCanvas.image(c, 0, 0);
        save(saveCanvas, frameCount + ".png");
        saveCanvas.clear();
    },
    clearCanvas: () => {
        for (let j = 0; j < GRID.num_y; j++) {
            for (let i = 0; i < GRID.num_x; i++) {
                const idx = i + j * GRID.num_x
                data[idx] = 2;
            }
        }
    } 
}

const data = new Array(GRID.num_x * GRID.num_y).fill(5)

function preload() {
    for (var i = 0; i < numOfPalettes; i++) {
        imgs.push(loadImage("pal_" + i + ".png"));
    }
}

function setup() {
    noStroke();
    createCanvas(windowWidth-245, windowHeight)
    // saveCanvas =  createGraphics(GRID.cell_w * GRID.num_x, GRID.cell_h * GRID.num_y);
    saveCanvas = createGraphics(width, height);
    img = imgs[GRID.imgIndex]

    for (let i = 0; i < img.width; i++) {
        palette.push(img.get(i, 0))
    }

    const num_x_control = GUI.add(GRID, 'num_x', GRID.num_x).min(1).max(20).step(1);
    const num_y_control = GUI.add(GRID, 'num_y', GRID.num_x).min(1).max(20).step(1);
    GUI.add(GRID, 'cell_h', GRID.cell_size).min(5).max(150).step(1);
    GUI.add(GRID, 'cell_w', GRID.cell_size).min(5).max(150).step(1);
    const palette_control = GUI.add(GRID, 'choosePalette').name("Random Colors");
    const clear_canvas = GUI.add(GRID, 'clearCanvas').name("Clear Design");
    const save_button = GUI.add(GRID, 'saveInspo').name("Save PNG");
    
    num_x_control.onChange(function () {
        data.length = GRID.num_x * GRID.num_y;
        data.fill(0);
    });

    num_y_control.onChange(function () {
        data.length = GRID.num_x * GRID.num_y;
        data.fill(0);
    });

    palette_control.onChange(function () {
        palette = [];

        for (let j = 0; j < GRID.num_y; j++) {
            for (let i = 0; i < GRID.num_x; i++) {
                const idx = i + j * GRID.num_x
                data[idx] = 5;
            }
        }

        img = imgs[GRID.imgIndex]

        for (let i = 0; i < img.width; i++) {
            palette.push(img.get(i, 0))
        }
    });


}

function draw() {
    changeColor = (changeColor + 1) % palette.length;

    const offs_x = (width - GRID.cell_w * GRID.num_x) / 2
    const offs_y = (height - GRID.cell_h * GRID.num_y) / 2

    const mouse_cell_x = Math.floor((mouseX - offs_x) / GRID.cell_w)
    const mouse_cell_y = Math.floor((mouseY - offs_y) / GRID.cell_h)

    for (let j = 0; j < GRID.num_y; j++) {
        for (let i = 0; i < GRID.num_x; i++) {

            const x = i * GRID.cell_w + offs_x
            const y = j * GRID.cell_h + offs_y

            if (i == mouse_cell_x && j == mouse_cell_y) {
                data[(i + GRID.num_x * j)] = changeColor;
            }
            rect(x, y, GRID.cell_w, GRID.cell_h)
        }
    }

    // render
    background(255)
    noStroke()

    for (let j = 0; j < GRID.num_y; j++) {
        for (let i = 0; i < GRID.num_x; i++) {

            const x = i * GRID.cell_w + offs_x
            const y = j * GRID.cell_h + offs_y

            const idx = i + j * GRID.num_x
            const v = data[idx]
            fill(palette[v])
            rect(x, y, GRID.cell_w, GRID.cell_h)
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth-245, windowHeight)
}


