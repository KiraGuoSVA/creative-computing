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

    isDead() {
      if (this.body.position.y > height) {
        Matter.Composite.remove(this.world, this.body);
        return true;
      }
      return false;
    }

    animAngle(targetAngle) {
      let angle = lerp(this.body.angle, targetAngle, 0.3);
      Matter.Body.setAngle(this.body, angle);
    }
  
  
  }