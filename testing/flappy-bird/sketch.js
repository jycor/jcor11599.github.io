var bird;
var pipes = [];

function setup() {
  createCanvas(400, 600);
  bird = new Bird();
  pipes.push(new Pipe());
}

function draw() {
  background(0, 255, 255);
  bird.update();
  bird.show();
  
  if (frameCount % 225 == 0){
    pipes.push(new Pipe());
  }
  
  for(var i = pipes.length - 1; i >= 0; i--){
    pipes[i].update();
    pipes[i].show();
    
    if(pipes[i].hits(bird)){
      //clear();
      console.log('hit');
    }
    
    if(pipes[i].offscreen()){
      pipes.splice(i, 1)
    }
  }
  
  
}

function keyPressed() {
  if(key == ' '){
    bird.up();
  }
}