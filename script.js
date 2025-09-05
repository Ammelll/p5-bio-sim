const speed_multiplier = 3
const CANVAS_WIDTH = CANVAS_HEIGHT = 800;
class Velocity{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
}
function randomCoordinate(boundary){
  return Math.max(boundary,Math.random()*CANVAS_HEIGHT-boundary)
}
function oob(position, velocity,diameter){
  if(position+diameter/2 > CANVAS_WIDTH|| position-diameter/2 < 0){
    return -velocity;
  }
  return velocity;
}

class Tiger{
  constructor(initial_mating_cooldown,x,y,v){
    this.d = 50;
    this.x = x;
    this.y = y;
    this.v = v;
    this.saturation = 30;
    this.mating_cooldown = initial_mating_cooldown;
    setTimeout(()=> {
          this.mating_cooldown = false;
        },5000);
    setInterval(()=>this.saturation-=10,1000);
    }
  collisions(){
    for(const bird of birds){
      if(Math.sqrt(Math.pow(this.x-bird.x,2) + Math.pow(this.y-bird.y,2)) < this.d/2 + bird.d/2){
        birds.splice(birds.indexOf(bird),1)
        this.saturation = Math.min(this.saturation+10,100);
      }
    }
    for(const tiger of tigers){
      if(tiger == this){
        return
      }
      if(this.mating_cooldown){
        return
      }

      if(Math.abs(this.x - tiger.x) < this.d && Math.abs(this.y - tiger.y) < this.d){
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
    tigers.push(new Tiger(true,randomCoordinate(50),randomCoordinate(50),new Velocity(Math.random()*speed_multiplier,Math.random()*speed_multiplier)))
  }
  move(){
    this.x = this.x+this.v.x;
    this.y = this.y+this.v.y;       
    this.v.x = oob(this.x,this.v.x,this.d)
    this.v.y = oob(this.y,this.v.y,this.d)
  }
  draw(){
    fill(20, 0, 250);
    circle(this.x,this.y,this.d);
    noFill();
    stroke(0,0,0)
    text(this.saturation.toString(),this.x,this.y,)
    if(this.saturation < 0) this.starve();
  }
  starve(){
    tigers.splice(tigers.indexOf(this),1)
  }
}

class Bird{
  constructor(initial_mating_cooldown,x,y,v){
    this.d = 10;
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
    this.v.x = oob(this.x,this.v.x,this.d)
    this.v.y = oob(this.y,this.v.y,this.d)
  }
  draw(){
    fill(20, 150, 30);
    circle(this.x,this.y,this.d);
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
      if(Math.sqrt(Math.pow(this.x-bird.x,2) + Math.pow(this.y-bird.y,2)) < this.d/2 + bird.d/2){
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
    birds.push(new Bird(true,randomCoordinate(10),randomCoordinate(10),new Velocity(Math.random()*speed_multiplier,Math.random()*speed_multiplier)))
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
  for(let x = 10; x< CANVAS_WIDTH-10; x++){
    for(let y = 10; y < CANVAS_HEIGHT-10; y++){
      if(Math.random() < 0.0003){
        birds.push(new Bird(false,x,y,new Velocity(Math.random()*speed_multiplier,Math.random()*speed_multiplier)))
      }
    }
  }
  return birds;
}
function spawnTiger(){
  let tigers = []
  for(let x = 50; x < CANVAS_WIDTH-50; x++){
    for(let y = 50; y < CANVAS_HEIGHT-50; y++){
      if(Math.random() < 0.000005){
        tigers.push(new Tiger(false,x,y,new Velocity(Math.random()*speed_multiplier,Math.random()*speed_multiplier)))
      }
    }
  }
  return tigers;
}
