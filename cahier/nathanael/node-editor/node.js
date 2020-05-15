class Node {
    constructor(x, y) {
        this.x = x || 10;
        this.y = y || 10;
        this.width = 170;
        this.height = 290;

        this.name = "";
        this.type = "";
        this.Ins = [];
        this.Outs = [];

        this.running = true;
        this.Shader = createGraphics(ShaderRes, ShaderRes);
        this.Worker = null;

        this.canGrab = true;
        this.grabbed = false;
    }

    update() {
        if (this.running) {
            if (this.Worker != null) {
                this.Worker.work();
            }
        }
        if (this.isBrowser) {
            //      drag and drop from node browser
            if (isSquareGrabbed(this, this.x, this.y - 20, this.x + this.width, this.y + 5) && !dragNdropping && !grabbing && !linking) {
                dragNdropping = true;
                console.log("drag n drop");
                spawnNode(mouseX, mouseY, this.type);
                const newNode = activeNodes[activeNodes.length - 1];
                console.log(newNode);
                grab(newNode, null, null, 0, viewPortSize.x - newNode.width, topBar.height, viewPortSize.y - newNode.height);
            }
        }
    }

    createPin(isIn) {
        var newPin = new NodePin(this, isIn);
        if (isIn) {
            newPin.isInput = true;
            newPin.index = this.Ins.length;
            this.Ins.push(newPin);
        } else {
            newPin.isInput = false;
            newPin.index = this.Outs.length;
            this.Outs.push(newPin);
        }
    }

    draw() {
        if (this.Ins.length > 3) {
            this.height = 290 + (this.Ins.length - 3) * 20;
        }
        noStroke()
            // bg
        fill(SETTINGS.nodeBgColor);
        rect(this.x, this.y, this.x + this.width, this.y + this.height, 7);
        //title & header
        fill(30);
        rect(this.x, this.y - 20, this.x + this.width, this.y + 5, 7, 8, 0, 0)
        fill(200);
        text(this.name, this.x + 5, this.y)
            // grab check
        if (isSquareGrabbed(this, this.x, this.y - 20, this.x + this.width, this.y + 5)) {
            grab(this, null, null, 0, viewPortSize.x - this.width, topBar.height, viewPortSize.y - this.height);
            if (userDoubleClicked) {
                previewedNode = this.Shader;
            }
        }

        // preview screen
        if (this.Worker == null) {
            this.Shader.background(0);
        }
        if (previewedNode == this.Shader) {

            fill("orange");
            rect(this.x + SETTINGS.nodeMargin - 2, this.y + SETTINGS.nodeMargin - 2, this.x + this.width - SETTINGS.nodeMargin * 2 + 2, this.y + this.width - SETTINGS.nodeMargin * 2 + 2);
        }

        image(this.Shader, this.x + SETTINGS.nodeMargin, this.y + SETTINGS.nodeMargin, this.width - SETTINGS.nodeMargin * 2, this.width - SETTINGS.nodeMargin * 2);

        //------pins

        // in
        for (var i = 0; i < this.Ins.length; i++) {
            const p = this.Ins[i];
            p.update();
            p.draw();
        }

        // out
        for (var i = 0; i < this.Outs.length; i++) {
            const p = this.Outs[i];
            p.update();
            p.draw();
        }

        // delete button
        noStroke();
        fill(150, 50, 50);
        if (dist(this.x + this.width - 10, this.y - 10, mouseX, mouseY) < 10) {
            fill(200, 100, 100);
        }
        ellipse(this.x + this.width - 10, this.y - 10, 10);
        if ((dist(this.x + this.width - 10, this.y - 10, mouseX, mouseY) < 10 && (this.isBrowser != true) && mouseIsPressed) && this.grabbed) {
            console.log("kill");
            // kill pins & sliders
            for (var i = 0; i < this.Ins.length; i++) {
                if (this.Ins[i].link != null) {
                    this.Ins[i].link.link = null;
                    this.Ins[i].link.linkedTo = [];
                    this.Ins[i].link = null;
                }
                this.Ins[i].linkedTo = null;
                if (this.Ins[i].slider != null) {
                    console.log("removing slider")
                    this.Ins[i].slider.remove();
                }
                if (this.Ins[i].select != null) {
                    this.Ins[i].select.remove();
                }
                /* this.Ins.splice(i, 1); */
            }
            for (var i = 0; i < this.Outs.length; i++) {
                if (this.Outs[i].link != null) {
                    this.Outs[i].link.link = null;
                    this.Outs[i].link.linkedTo = [];
                    this.Outs[i].link = null;
                }
                console.log(this.Outs[i]);
                this.Outs[i].linkedTo = null;
                if (this.Outs[i].slider != null) {

                    this.Outs[i].slider.remove();
                }
                /* this.Outs.splice(i, 1); */
            }
            this.kill = true;
            release();
        }
    }

    selectPreviewNode() {
        if (previewingInBackground) {

        }
    }
}