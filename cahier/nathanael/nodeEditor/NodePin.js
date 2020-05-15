class NodePin {
    constructor(node, isInput) {
        this.data;
        this.x;
        this.y;
        this.link;
        this.node = node;
        this.label = "";
        this.slider;
        this.color = 200;

        this.isInput = true;
        this.isOutput = !this.isInput;
    }

    update() {
        //track
        this.y = this.node.y + (this.index + 1) * 30 + 160;
        if (this.isInput) {
            this.x = this.node.x;
        } else {
            this.x = this.node.x + this.node.width;
        }
        if (this.slider != null) {
            this.slider.position(this.x + 4, this.y + 2);
            noStroke();
            text(this.slider.value(), this.x + 120, this.y + 2);
        }
        //check for linking
        if (isGrabbed(this, this.x, this.y, SETTINGS.pinRadius) && mouseIsPressed) {
            if (!linking && this.link == null && dist(mouseX, mouseY, this.x, this.y)) {
                linking = true;
                grab(this, false);
                link1 = this;
            } else if (linking) {
                if (isGrabbed(this, this.x, this.y, SETTINGS.pinRadius) && link1 != this) {
                    stroke("orange");
                    line(this.x, this.y, link1.x, link1.y);

                    this.color = 255;
                    link2 = this;
                } else if (true) {
                    stroke("orange");
                    line(this.x, this.y, mouseX, mouseY);
                }
            } else if (this.link != null) {
                this.link.link = null;
                this.link = null;
            }
        } else {
            this.color = 200;
        }
        //transmit data;
        if (this.link != null) {
            if (this.isInput) {
                this.data = this.link.data;
                /*  console.log(this.data); */
            } else if (this.isOutput) {

            }
        }
    }

    draw() {
        stroke(23);
        fill(this.color);
        ellipse(this.x, this.y, SETTINGS.pinRadius);

        noStroke();
        text(this.label, this.x + 9, this.y + 2.5)

        if (this.link != null) {
            stroke("orange");
            line(this.x, this.y, this.link.x, this.link.y)
        }
    }
}