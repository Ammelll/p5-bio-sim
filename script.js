
class Velocity{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
}
function oob(position, velocity){
  if(position > 409|| position < 0){
    return -velocity;
  }
  return velocity;
}

class Bird{
  constructor(r,m,x,y,v){
    this.r = r;
    this.x = x;
    this.y = y;
    this.v = v;
    this.m = m;
  }
  collisions(){
    for(const bird of birds){
      if(bird != this){
        if(Math.abs(this.x - bird.x) < this.r+bird.r && Math.abs(this.y - bird.y) < this.r+bird.r){
          this.v.x = -this.v.x * (this.m/bird.m);
          this.v.y = -this.v.y * (this.m/bird.m);

        }

      }
    }
  }
  move(){
    this.x = this.x+this.v.x;
    this.y = this.y+this.v.y;       
    this.v.x = oob(this.x,this.v.x,this.r)
    this.v.y = oob(this.y,this.v.y,this.r)
  }
  draw(){
    circle(this.x,this.y,this.r)
  }
}
const birds = spawnBirds();

function setup() {
  createCanvas(400, 400);
  background(200);
}

function draw() {
  background(200);
  for(const bird of birds){
    bird.collisions();
    bird.move();
    bird.draw();
  }
}
function spawnBirds(){
  let birds = []
  for(let x = 0; x< 400; x++){
    for(let y = 0; y < 400; y++){
      if(Math.random() < 0.0001){
        birds.push(new Bird(10,Math.random()*5,x,y,new Velocity(Math.random()*3,Math.random()*3)))
      }
    }
  }
  return birds;
}