function Pipe() {
  this.top = random(0.75 * height);
  this.space = random(0.20 * height, 0.30 * height);
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
    if(bird.y - (bird.size / 2) < this.top || bird.y + (bird.size / 2) > this.top + this.space){
      if(bird.x + (bird.size / 2) > this.x && bird.x - (bird.size / 2) < this.x + this.w){
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