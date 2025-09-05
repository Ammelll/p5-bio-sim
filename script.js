let speed_multiplier = 10
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
class Organism{
  constructor(x,y,v,d){
    this.x = x;
    this.y = y;
    this.v = v;
    this.d = d;
  }
  collisions(species,prey){
    for(const p of prey){
      if(Math.sqrt(Math.pow(this.x-p.x,2) + Math.pow(this.y-p.y,2)) < this.d/2 + p.d/2){
        this.consume(p);
      }
    }
    for(const individual of species){
      if(individual == this){
        return
      }
      if(this.mating_cooldown){
        return
      }

      if(Math.abs(this.x - individual.x) < this.d && Math.abs(this.y - individual.y) < this.d){
        this.mate(individual,this.mating_cooldown_length);
      }
    }
  }
  mate(ind,cooldown){
    this.mating_cooldown = true;
    ind.mating_cooldown = true
    setTimeout(()=> {
      this.mating_cooldown = false;
      ind.mating_cooldown = false;
    },cooldown);
    this.spawn()
  }
  move(){
    this.x = this.x+this.v.x*speed_multiplier;
    this.y = this.y+this.v.y*speed_multiplier;       
    this.v.x = oob(this.x,this.v.x,this.d)
    this.v.y = oob(this.y,this.v.y,this.d)
  }
}
class Tiger extends Organism{
  constructor(initial_mating_cooldown,x,y,v){
    super(x,y,v,50);
    this.saturation = 30;
    this.mating_cooldown = initial_mating_cooldown;
    this.mating_cooldown_length = 10000;
    setTimeout(()=> {
          this.mating_cooldown = false;
        },5000);
    setInterval(()=>this.saturation-=10,1000);
  }
  consume(prey){
    birds.splice(birds.indexOf(prey),1)
    this.saturation = Math.min(this.saturation+10,100);
  }
  spawn(){
    tigers.push(new Tiger(true,randomCoordinate(50),randomCoordinate(50),new Velocity(Math.random(),Math.random())))
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

class Bird extends Organism{
  constructor(initial_mating_cooldown,x,y,v){
    super(x,y,v,10)
    this.mating_cooldown = initial_mating_cooldown;
    this.mating_cooldown_length = 5000;
    setTimeout(()=> {
      this.mating_cooldown = false;
    },5000);
  }

  draw(){
    fill(20, 150, 30);
    circle(this.x,this.y,this.d);
    noFill();
  }
  collide(){

  }
  spawn(){
    birds.push(new Bird(true,randomCoordinate(10),randomCoordinate(10),new Velocity(Math.random(),Math.random())))
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
    bird.collisions(birds,[])
    bird.move();
    bird.draw();
  }
  for(const tiger of tigers){
    tiger.collisions(tigers,birds)
    tiger.move();
    tiger.draw();
  }
  drawGraph()
}
function drawGraph(){
  window.onload = function () {

    var dps = []; // dataPoints
    var chart = new CanvasJS.Chart("chartContainer", {
      title :{
        text: "Dynamic Data"
      },
      data: [{
        type: "line",
        dataPoints: dps
      }]
    });
  }
}

function spawnBirds(){
  let birds = []
  for(let x = 10; x< CANVAS_WIDTH-10; x++){
    for(let y = 10; y < CANVAS_HEIGHT-10; y++){
      if(Math.random() < 0.0003){
        birds.push(new Bird(false,x,y,new Velocity(Math.random(),Math.random())))
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
        tigers.push(new Tiger(false,x,y,new Velocity(Math.random(),Math.random())))
      }
    }
  }
  return tigers;
}
function speedUp(){
  speed_multiplier*=1.5;
}
function slowDown(){
  speed_multiplier/=1.5;
}

window.onload = function () {

var dps = []; 
var chart = new CanvasJS.Chart("chartContainer", {
	title :{
		text: "Bird Population"
	},
	data: [{
		type: "line",
		dataPoints: dps
	}],
});

var xVal = 0;
var updateInterval = 200;
var dataLength = 100; 

var updateChart = function (count) {

	count = count || 1;

	for (var j = 0; j < count; j++) {
		
		dps.push({
			x: xVal,
			y: birds.length
		});
		xVal++;
	}

	if (dps.length > dataLength) {
		dps.shift();
	}

	chart.render();
};

updateChart(dataLength);
setInterval(function(){updateChart()}, updateInterval);

var dps = []; 
var chart = new CanvasJS.Chart("tigerContainer", {
	title :{
		text: "Tiger Population"
	},
	data: [{
		type: "line",
		dataPoints: dps
	}],
});
var tig = []
var xVal = 0;
var updateInterval = 200;
var dataLength = 100; 

var updateTiger = function (count) {

	count = count || 1;

	for (var j = 0; j < count; j++) {
		
		tig.push({
			x: xVal,
			y: tigers.length
		});
		xVal++;
	}

	if (tig.length > dataLength) {
		tig.shift();
	}

	chart.render();
};
updateChart(dataLength);
setInterval(function(){updateTiger()}, updateInterval);
}
