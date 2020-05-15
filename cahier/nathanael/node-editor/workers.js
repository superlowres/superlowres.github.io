class worker_Noise {
    constructor(node) {
        this.node = node;
        this.scale = 1;
        this.f = .001;
        this.d = 1 + .01;
    }
    work() {
        // update data
        this.scale = this.node.Ins[0].slider.value();

        // render node
        const s = this.node.Shader;

        s.loadPixels();
        for (var i = 0; i < s.pixels.length; i += 4) {
            const coords = toCoords(i, s.width);
            const v = noise(coords.x * this.scale, coords.y * this.scale) * 255;
            s.pixels[i] = v;
            s.pixels[i + 1] = v;
            s.pixels[i + 2] = v;
            s.pixels[i + 3] = 255;
        }
        s.updatePixels();
        this.node.Outs[0].data = s;
    }
}

class worker_RD {
    constructor(node) {
        this.node = node;
        this.scale = 1;
        this.f = .02;
        this.d = 1 + .5;
        this.buffer = createGraphics(this.node.Shader.width, this.node.Shader.height);
        this.buffer.background(0);
        /* this.buffer.noSmooth(); */
        this.reseedRate = 10;

        this.randomSeed = Math.random();
        /* this.thresholdBuffer = createGraphics(this.node.Shader.width, this.node.Shader.height); */
    }
    work() {
        // update data
        this.seed = this.node.Ins[0].data;
        this.f = this.node.Ins[1].slider.value();
        this.d = this.node.Ins[2].slider.value() + 1;
        this.reseedRate = this.node.Ins[3].slider.value();

        // render node
        const s = this.node.Shader;
        if (this.seed != null) {
            if ((frameCount + Math.floor(this.randomSeed * 1000)) % this.reseedRate == 0) {
                this.buffer.image(this.seed, 0, 0);
            }
        } else if (this.node.Ins[0].link == null) {
            this.buffer.background(0);
        }
        this.buffer.loadPixels();

        for (var i = 0; i < this.buffer.pixels.length; i += 4) {
            this.buffer.pixels[i] += this.f;
            this.buffer.pixels[i + 1] += this.f;
            this.buffer.pixels[i + 2] += this.f;
            this.buffer.pixels[i + 3] = 255;
        }
        this.buffer.updatePixels();
        this.buffer.filter(BLUR, this.d);
        this.buffer.filter(THRESHOLD);
        /* this.thresholdBuffer.image(this.buffer, 0, 0);
        this.thresholdBuffer.filter(THRESHOLD);
        this.thresholdBuffer.tint(255, this.fMult * 255);
         this.buffer.image(this.thresholdBuffer, 0, 0); */
        s.image(this.buffer, 0, 0);
        this.node.Outs[0].data = s;
    }
}
class worker_Camera {
    constructor(node) {
        this.node = node;
        this.scale = 1;

        this.frameCount = 0;

        this.capture = createCapture(VIDEO);
        this.capture.hide();
        this.capture.size(this.node.Shader.width, this.node.Shader.height);
    }
    work() {
        // update data
        if (this.frameCount == 0) {

        }
        // render node
        const s = this.node.Shader;
        s.image(this.capture, 0, 0, this.node.Shader.width, this.node.Shader.height, 0, 0);

        this.node.Outs[0].data = s;
    }
}
class worker_Math {
    constructor(node) {
        this.node = node;
        this.scale = 1;
        this.data;
        this.operation = "add"
        this.number;
        this.other;
        this.b = 0;
        this.buffer = createGraphics(this.node.Shader.width, this.node.Shader.height);
        this.buffer2 = createGraphics(this.node.Shader.width, this.node.Shader.height);
    }
    work() {
        // update data
        if (this.data != null) {
            /* if (this.data.width != this.buffer.width) {
                this.buffer.width = this.data.width;
            }
            if (this.data.height != this.buffer.height) {
                this.buffer.height = this.data.height;
            } */
            this.buffer.resizeCanvas(this.data.width, this.data.height);
        }

        this.data = this.node.Ins[0].data;
        /* if (Array.isArray(this.node.Ins[1].data.pixels)) {
            this.b = this.node.Ins[1].data;
        } */
        /*   console.log((this.node.Ins[1].data == null)); */
        this.mult = this.node.Ins[3].slider.value();
        if (this.node.Ins[1].data == null) {
            this.b = this.node.Ins[1].slider.value();
            this.b *= this.mult;
        } else {
            this.vizData = this.node.Ins[1].data;
            this.b = createGraphics(this.vizData.width, this.vizData.height);
            this.b.image(this.vizData, 0, 0);
            this.b.loadPixels;
        }
        this.operation = this.node.Ins[2].select.value();
        // render node
        if (this.data != null) {
            this.buffer.image(this.data, 0, 0);
            this.buffer.loadPixels()
                /* console.log("proccssing") */
            if (this.b.pixels != null) {
                console.log("multiplying images");
                this.buffer2.resizeCanvas(this.b.width, this.b.height);
                this.buffer2.image(this.b, 0, 0);
                this.buffer2.loadPixels();
                for (var i = 0; i < this.buffer.pixels.length; i += 4) {
                    var r = this.doMath(this.buffer.pixels[i], this.buffer2.pixels[i] * this.mult);
                    var g = this.doMath(this.buffer.pixels[i + 1], this.buffer2.pixels[i + 1] * this.mult);
                    var b = this.doMath(this.buffer.pixels[i + 2], this.buffer2.pixels[i + 2] * this.mult);
                    this.buffer.pixels[i] = r;
                    this.buffer.pixels[i + 1] = g;
                    this.buffer.pixels[i + 2] = b;
                    this.buffer.pixels[i + 3] = 255;
                }
            } else {
                for (var i = 0; i < this.buffer.pixels.length; i += 4) {

                    var r = this.doMath(this.buffer.pixels[i], this.b);
                    var g = this.doMath(this.buffer.pixels[i + 1], this.b);
                    var b = this.doMath(this.buffer.pixels[i + 2], this.b);
                    this.buffer.pixels[i] = r;
                    this.buffer.pixels[i + 1] = g;
                    this.buffer.pixels[i + 2] = b;
                    this.buffer.pixels[i + 3] = 255;
                }
            }

            this.buffer.updatePixels();

            const s = this.node.Shader;
            s.image(this.buffer, 0, 0);

            this.node.Outs[0].data = this.buffer;
        }
    }

    doMath(n, b) {
        /* console.log(n) */
        /* console.log(n); */
        var a = n;

        if (this.operation == "add") {

            /* console.log(a); */
            a = n + b;
            /* console.log(a); */
        }
        if (this.operation == "sub") {
            a = n - b;
        }
        if (this.operation == "mult") {
            a = n * b;
        }
        if (this.operation == "div") {
            a = n / b;
        }
        if (this.operation == "pow") {
            a = Math.pow(n, b);
        }
        return Math.floor(a);
    }
}