class Shape {
    constructor(world, pos, size, options) {
      // create physic body. store size information.
  
      this.world = world;
      this.pos = pos;
      this.size = size;
      this.body = this.createBody(pos, options);
      Matter.Composite.add(engine.world, this.body);
    }
  
    createBody(pos, options) {
  
    }
  
    display() {
      
    }
  
  
  }