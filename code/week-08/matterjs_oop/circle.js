class Circle extends Shape {
    constructor(world, pos, size, options) {
      super(world, pos, size, options);
    }
  
    createBody(pos, options) {
      return Matter.Bodies.circle(
        pos.x, pos.y, this.size.x, options);
    }
  
    display() {
      circle(this.body.position.x, 
           this.body.position.y, 
           this.size.x * 2);
    }
  }