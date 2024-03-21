class Rect extends Shape {
    constructor(world, pos, size, options) {
      super(world, pos, size, options);
    }
  
    createBody(pos, options) {
      return Matter.Bodies.rectangle(
        pos.x, pos.y, this.size.x, 
        this.size.y, options);
    }
  
    display() {
      push();
      translate(this.body.position.x, 
        this.body.position.y);
      rotate(this.body.angle);
      rect(0, 0,
           this.size.x, this.size.y);
      pop();
    }
  }