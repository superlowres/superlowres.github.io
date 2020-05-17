class NodeBrowser {
    constructor() {
        this.width = 200;
        this.x = window.innerWidth - this.width;
        this.y = 25;

        this.sliderPos = 7;

        this.grabbed = false;

        this.nodes = Nodes;
    }

    update() {
        if (this.sliderPos < 7) {
            this.sliderPos = 7
        } else if (this.sliderPos > height - 7) {
            this.sliderPos = height - 7;
        }

        // bg
        fill(70);
        noStroke();
        rect(this.x, this.y, width, height);
        // slider
        fill(84);
        rect(width - SETTINGS.sliderWidth, this.y, width, height);
        fill(200);
        ellipse(width - SETTINGS.sliderWidth / 2, this.sliderPos, 8);
        // slider movement
        if (isGrabbed(this, width - SETTINGS.sliderWidth / 2, this.sliderPos, 12.5)) {
            grab(this, null, "sliderPos", null, null, 7, height - 7);
        }

        // node display
        const sliderRatio = Math.round(this.nodes.length / height);
        for (var i = 0; i < this.nodes.length; i++) {
            var node = this.nodes[i];
            node.x = width - this.width + (this.width - node.width - SETTINGS.sliderWidth) / 2;
            node.y = (300 * (i) - (this.sliderPos) + 30 * (i));
            node.y += 30 + this.y;
            node.update();
            node.draw();
        }

    }

    // scrolling
}