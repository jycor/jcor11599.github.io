function Bird() {
  this.y = height / 2;
  this.x = 64;
  this.size = 32;
  
  this.gravity = 0.75;
  this.lift = -20;
  this.velocity = 0;
  
  this.show = function() {
    fill(255, 255, 0);
    ellipse(this.x, this.y, this.size, this.size);
  }
  
  this.up = function() {
    this.velocity += this.lift;
  }
  
  this.update = function() {
	  
    this.velocity += this.gravity;
    this.velocity *= 0.95;
    this.y += this.velocity;
	
	//this.x = mouseX;
	//this.y = mouseY;
    
    // Stop bird from exiting bounds
    if(this.y > height) {
      this.y = height;
      this.velocity = 0;
    }
    else if(this.y < 0){
      this.y = 0;
      this.velocity = 0;
    }
            
  }
}