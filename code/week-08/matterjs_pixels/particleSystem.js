class ParticleSystem {
    constructor(img) {
      this.img = img;
      this.particles = [];
    }
  
    addParticles(num, loc) {
      for (let i = 0; i < num; i++) {
        let size = 5;
        let p = new RigidBody(loc.x, loc.y, size);
        let rf = p5.Vector.random2D().mult(random(2));
        p.applyForce(rf);
        this.particles.push(p);
      }
    }
  
    update() {
      for (let i = 0; i < this.particles.length; i++) {
        let p = this.particles[i];
        const x = floor(p.loc.x);
        const y = floor(p.loc.y);
  
        const pixelIndex = (x + y * width) * 4;
        const r = this.img.pixels[pixelIndex];
        const g = this.img.pixels[pixelIndex + 1];
        const b = this.img.pixels[pixelIndex + 2];
        const brightness = (r+g+b)/3/255;
        
        for (let j = i+1; j < this.particles.length; j++) {
          let otherP = this.particles[j];
          let distance = p.loc.dist(otherP.loc);
          if ( distance < (p.size + otherP.size)/2) {
            let push = p5.Vector.sub(p.loc, otherP.loc);
            push.normalize();
            push.div(distance*4);
            push.limit(0.05);
            p.applyForce(push);
            otherP.applyForce(push.mult(-1));
          }
        }
  
        p.update(brightness);
        //p.bounce();
      }
    }
  
    display() {
      this.particles.forEach( p => {
        p.display();
      })
    }
  }