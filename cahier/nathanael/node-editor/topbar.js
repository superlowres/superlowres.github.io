const TBS = {
    indexMargin: 45,
    indexSize: 80
}

class TopBar {
    constructor() {
        this.width;
        this.height = 25;
        this.active = false;

        this.elements = [];
        this.initMenu();
    }

    update() {
        fill(20);
        rect(0, 0, viewPortSize.x, this.height);

        for (var i = 0; i < this.elements.length; i++) {
            this.elements[i].update();
        }
    }
    initMenu() {
        var Load = new TopBarButton(0, "Load");
        var Save = new TopBarButton(1, "Save");
        var View = new TopBarButton(2, "Bg preview");
        this.elements.push(Load, Save, View);
    }
}

class TopBarCategory {
    constructor(i, name) {
        this.index = i;
        this.name = name;
        this.elements = [];
        this.selected = false;
        this.bg = 40;
        this.collisionCheck;
    }
    update() {
        if (this.selected) {
            this.collisionCheck = isSquareHovered(this.index * TBS.indexSize + TBS.indexMargin, 0, (this.index + 1) * TBS.indexSize + TBS.indexMargin, topBar.height)
        } else {
            this.collisionCheck = isSquareHovered(this.index * TBS.indexSize + TBS.indexMargin, 0, (this.index + 1) * TBS.indexSize + TBS.indexMargin, topBar.height + this.elements.length * 20);
            console.log("collsinoa sefasd")
        }
        fill(this.bg);
        rect(this.index * TBS.indexSize + TBS.indexMargin, 0, this.index * TBS.indexSize + 47, topBar.height);
        if (this.selected) {
            fill(200);
        }
        noStroke()
        fill(140);
        text(this.name, this.index * TBS.indexSize + TBS.indexMargin + 5, topBar.height * .7);
        /* isSquareHovered(this.index * TBS.indexSize + TBS.indexMargin, 0, (this.index + 1) * TBS.indexSize + TBS.indexMargin, topBar.height) */

        //mouse over 
        if (this.collisionCheck) {
            this.selected = true;
            this.bg = 80;
        } else if (!this.collisionCheck) {
            this.selected = false;
            this.bg = 40;
        }
        if (this.selected) {
            rect(this.index * TBS.indexSize + TBS.indexMargin, topBar.height, this.index * TBS.indexSize + TBS.indexMargin, this.elements.length * 40);
            for (var i = 0; i < this.elements.length; i++) {
                fill(0);
                text(this.elements[i].name, this.index * TBS.indexSize + TBS.indexMargin + 5, topBar.height + i * 20);
            }
        }


    }
}

class TopBarCategoryElement {
    constructor(i, name) {
        this.index = i;
        this.name = name;
    }

}

class TopBarButton {
    constructor(i, name) {
        this.index = i;
        this.name = name;
        this.elements = [];
        this.selected = false;
        this.bg = 40;
        this.shade = 80;
        this.active = false;
        if (this.name == "Bg preview") { this.active = true; };
    }
    update() {
        if (this.active) { this.shade = 100; } else { this.shade = 0 };
        /* this.bg = this.shade; */

        fill(this.bg);
        rect(this.index * TBS.indexSize + TBS.indexMargin, 0, (this.index + 1) * TBS.indexSize + TBS.indexMargin, topBar.height);
        if (this.selected) {
            fill(200);
        }
        fill(180 - this.shade * 2);
        text(this.name, this.index * TBS.indexSize + TBS.indexMargin + 5, topBar.height * .7);
        text(Math.round(frameRate()), 10, topBar.height * .7)

        //mouse over 
        if (isSquareHovered(this.index * TBS.indexSize + TBS.indexMargin, 0, (this.index + 1) * TBS.indexSize + TBS.indexMargin, topBar.height)) {
            this.selected = true;
            this.bg = this.shade - 50;
        } else {
            this.selected = false;
            this.bg = this.shade + 30;
        }
        if (this.selected) {
            if (mouseIsReleased) {
                var inverse = !this.active;
                this.active = inverse;
            }
        }

        if (this.name == "Save") {
            if (this.active) {
                Save();

                this.active = false;
                this.selected = false;
            }
        }

    }
}