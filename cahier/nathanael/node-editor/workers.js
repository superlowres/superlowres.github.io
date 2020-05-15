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
            s.pixels[i + 3] = v;
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
            if (i == 4) { console.log(this.buffer.pixels[i + 2]) }
            this.buffer.pixels[i + 2] += this.f;
            if (i == 4) { console.log(this.buffer.pixels[i + 2]) }
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

        this.capture = createCapture(VIDEO);
        this.capture.size(this.node.Shader.width, this.node.Shader.height);

    }
    work() {
        // update data

        // render node
        const s = this.node.Shader;

        s.image(this.capture, 0, 0);

        this.node.Outs[0].data = s;
    }
}