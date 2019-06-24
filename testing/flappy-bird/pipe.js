function Pipe() {
  this.top = random(0.85 * height);
  this.space = random(0.15 * height, 0.25 * height);
  this.x = width;
  this.w = 100;
  this.speed = 1;
  this.highlight = false;
  
  this.show = function() {
    fill(0, 255, 0);
    if(this.highlight){
      fill(255, 0, 0);
	}
	else{
      fill(0, 255, 0);
	}
    rect(this.x, 0, this.w, this.top);
    rect(this.x, this.top + this.space, this.w, height - this.space - this.top);
  }
  
  this.offscreen = function() {
    return this.x < -this.w;
  }
  
  this.hits = function(bird){
    if(bird.y < this.top || bird.y > this.top + this.space){
      if(bird.x > this.x && bird.x < this.x + this.w){
		this.highlight = true;
        return true;
      }
    }
	this.highlight = false;
    return false;
  }
  
  this.update = function() {
    this.x -= this.speed;
  }
}