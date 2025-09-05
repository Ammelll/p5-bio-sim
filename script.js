const speed_multiplier = 5
const CANVAS_WIDTH = CANVAS_HEIGHT = 800;
class Velocity{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
}
function oob(position, velocity,radius){
  if(position+radius > CANVAS_WIDTH|| position-radius < 0){
    return -velocity;
  }
  return velocity;
}

class Tiger{
  constructor(initial_mating_cooldown,x,y,v){
    this.r = 50;
    this.x = x;
    this.y = y;
    this.v = v;
    this.mating_cooldown = initial_mating_cooldown;
    setTimeout(()=> {
          this.mating_cooldown = false;
        },5000);
  }
  collisions(){
    for(const bird of birds){
      if(Math.abs(this.x - bird.x) < this.r && Math.abs(this.y - bird.y) < this.r){
        birds.splice(birds.indexOf(bird),1)
      }
    }
    for(const tiger of tigers){
      if(tiger == this){
        return
      }
      if(this.mating_cooldown){
        return
      }

      if(Math.abs(this.x - tiger.x) < this.r && Math.abs(this.y - tiger.y) < this.r){
        this.mate(tiger);
      }
    }
  }
  mate(tiger){
    this.mating_cooldown = true;
    tiger.mating_cooldown = true
    setTimeout(()=> {
      this.mating_cooldown = false;
      tiger.mating_cooldown = false;
    },10000);
    tigers.push(new Tiger(true,Math.random()*CANVAS_WIDTH,Math.random()*CANVAS_HEIGHT,new Velocity(Math.random()*speed_multiplier,Math.random()*speed_multiplier)))
  }
  move(){
    this.x = this.x+this.v.x;
    this.y = this.y+this.v.y;       
    this.v.x = oob(this.x,this.v.x,this.r)
    this.v.y = oob(this.y,this.v.y,this.r)
  }
  draw(){
    fill(20, 0, 250);
    circle(this.x,this.y,this.r);
    noFill();
  }
  starve(){
    tigers.splice(tigers.indexOf(this),1)
  }
}

class Bird{
  constructor(initial_mating_cooldown,x,y,v){
    this.r = 10;
    this.x = x;
    this.y = y;
    this.v = v;
    this.mating_cooldown = initial_mating_cooldown;
    setTimeout(()=> {
      this.mating_cooldown = false;
    },5000);
  }
  move(){
    this.x = this.x+this.v.x;
    this.y = this.y+this.v.y;       
    this.v.x = oob(this.x,this.v.x,this.r)
    this.v.y = oob(this.y,this.v.y,this.r)
  }
  draw(){
    fill(20, 150, 30);
    circle(this.x,this.y,this.r);
    noFill();
  }
  collisions(){
    for(const bird of birds){
      if(bird == this){
        return
      }
      if(this.mating_cooldown){
        return
      }
      if(Math.abs(this.x - bird.x) < this.r && Math.abs(this.y - bird.y) < this.r){
        this.mate(bird);
      }
    }
  }
  mate(bird){
    this.mating_cooldown = true;
    bird.mating_cooldown = true
    setTimeout(()=> {
      this.mating_cooldown = false;
      bird.mating_cooldown = false;
    },5000);
    birds.push(new Bird(true,Math.random()*CANVAS_WIDTH,Math.random()*CANVAS_HEIGHT,new Velocity(Math.random()*speed_multiplier,Math.random()*speed_multiplier)))
  }
}
const birds = spawnBirds();
const tigers = spawnTiger();
function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  background(200);
}

function draw() {
  background(200);
  for(const bird of birds){
    bird.collisions()
    bird.move();
    bird.draw();
  }
  for(const tiger of tigers){
    tiger.collisions()
    tiger.move();
    tiger.draw();
  }
}
function spawnBirds(){
  let birds = []
  for(let x = 0; x< CANVAS_WIDTH; x++){
    for(let y = 0; y < CANVAS_HEIGHT; y++){
      if(Math.random() < 0.0003){
        birds.push(new Bird(false,x,y,new Velocity(Math.random()*speed_multiplier,Math.random()*speed_multiplier)))
      }
    }
  }
  return birds;
}
function spawnTiger(){
  let tigers = []
  for(let x = 0; x< CANVAS_WIDTH; x++){
    for(let y = 0; y < CANVAS_HEIGHT; y++){
      if(Math.random() < 0.000004){
        tigers.push(new Tiger(false,x,y,new Velocity(Math.random()*speed_multiplier,Math.random()*speed_multiplier)))
      }
    }
  }
  return tigers;
}