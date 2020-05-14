class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.scaledX = this.x * scalingFactor;
    this.scaledY = this.y * scalingFactor;
    this.density = 0;
    this.prevDensity = 0;
    this.velocity = createVector(0, 0);
    /* if (this.x == 32) {
      this.velocity.x = 1;
    } */
    this.pressure = 0;
    this.div = 0;
  }

  draw() {
    /* if (this.x+this.y == 32){
      console.log(this);
    } */

    /* console.log(this.density, this.prevDensity); */
    noStroke();
    if (this.density > 0) {
      /* fill(this.density * 255, this.density * 255, this.density * 255, 120); */
      fill(this.density*255);
      rect(this.scaledX, this.scaledY, 12, 12);
    }
    /* stroke(255);
    line(
      this.scaledX,
      this.scaledY,
      this.scaledX + this.velocity.x*13,
      this.scaledY + this.velocity.y*13
    ); */

   /*  textSize(10);
    text(this.density, this.scaledX, this.scaledY); */

    this.prevDensity = this.density;
    const velDecay = .9;
    this.velocity.x *= velDecay;
    this.velocity.y *= velDecay;
  }

  refreshScaling() {
    this.scaledX = this.x * scalingFactor;
    this.scaledY = this.y * scalingFactor;
  }
}
