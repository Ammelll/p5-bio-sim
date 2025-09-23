let speed_multiplier = 5;
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;
let disaster = false;
class Velocity{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
}
function combineGenome(p1,p2){
  let genome = new Genome(
    new Gene(Math.sqrt(p1.genome.speedGene.value*p2.genome.speedGene.value)),
    new Gene(Math.sqrt(p1.genome.sizeGene.value*p2.genome.sizeGene.value)),
    new Gene(Math.sqrt(p1.genome.stealthGene.value*p2.genome.stealthGene.value)),
    new Gene(Math.sqrt(p1.genome.litterGene.value*p2.genome.litterGene.value)),
    new Gene(Math.sqrt(p1.genome.eyeSightGene.value*p2.genome.eyeSightGene.value)),
    new Gene(Math.sqrt(p1.genome.saturationGene.value*p2.genome.saturationGene.value)),
    new Gene(Math.sqrt(p1.genome.hungerGene.value*p2.genome.hungerGene.value)),
    new Gene(Math.sqrt(p1.genome.colorGene.value*p2.genome.colorGene.value)),
  );
  if(Math.random() > 0.8){
    return mutateGenome(genome);
  }
  return genome;
}
function mutateGenome(genome){
  for(let gene of genome.genes){
    if(Math.random() > 0.5){
      gene.value = gene.value+Math.random()/2
    } 
  }
  return genome;
}
function randomGenome(){
  return new Genome(
    new Gene(Math.max(0.5,Math.random()*2)), //speed
    new Gene(Math.max(0.25,Math.random()*2)), //size
    new Gene(Math.max(0.5,Math.random()*1.5)), //stealth
    new Gene(Math.max(8,Math.random()*35)), //litter
    new Gene(Math.max(0.5,Math.random()*2)), //eyesight
    new Gene(Math.max(10,Math.random()*20)), //saturationm
    new Gene(Math.max(10,Math.random()*20)), //hunger
    new Gene(Math.random()*255), //color
  );
}


function randomCoordinate(boundary){
  return Math.max(boundary,Math.random()*CANVAS_HEIGHT-boundary)
}
function divider(position, velocity, diameter){
  if(!disaster) return velocity;
  if(position+diameter/2 > CANVAS_WIDTH/2-50 && position-diameter/2 < CANVAS_WIDTH/2 + 50){
    return -velocity;
  }
  return velocity;
}
function bump(position,diameter){
  if(!disaster) return position;
  if(position+diameter/2 > CANVAS_WIDTH/2-45 && position-diameter/2 < CANVAS_WIDTH/2 + 45){
    if(Math.abs(position+diameter/2 -CANVAS_WIDTH/2-45) > Math.abs(position-diameter/2 -CANVAS_WIDTH/2 + 45)){
      return position-50-diameter;
    }
    return position+50+diameter;
  }
  return position;
}
function oob(position, velocity,diameter){
  if(position+diameter/2 > CANVAS_WIDTH|| position-diameter/2 < 0){
    return -velocity;
  }
  return velocity;
}


const pinkertons = spawnPinkertons();
const birds = spawnBirds();
const tigers = spawnTiger();
const initial_genes = initialGenes();
const initial_birds_size = birds.length;
const inital_tigers_size = tigers.length;
function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  background(200);
}
function drawDisaster(){
  fill(0,0,0);
  rect(CANVAS_WIDTH/2-50,0,100,CANVAS_HEIGHT)
}
function draw() {
  background(200);
  if(Math.random() > 0.9995){
    disaster = !disaster;
  }
  if(disaster){
    drawDisaster();
  }
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
  for(const pinkerton of pinkertons){
    pinkerton.move();
    pinkerton.draw();
    pinkerton.collisions(tigers,birds)
  }
}

function spawnBirds(){
  let birds = []
  for(let x = 10; x< CANVAS_WIDTH-10; x++){
    for(let y = 10; y < CANVAS_HEIGHT-10; y++){
      if(Math.random() < 0.002){
        birds.push(new Bird(false,x,y,new Velocity(Math.random(),Math.random()),randomGenome()))
      }
    }
  }
  return birds;
}
function spawnPinkertons(){
  let pinkertons = [];
  pinkertons.push(new Pinkerton(50,50, new Velocity(Math.random(),Math.random()), randomGenome()));
  return pinkertons;
}
function spawnTiger(){
  let tigers = []
  for(let x = 50; x < CANVAS_WIDTH-50; x++){
    for(let y = 50; y < CANVAS_HEIGHT-50; y++){
      if(Math.random() < 0.00001){
        tigers.push(new Tiger(x,y,new Velocity(Math.random(),Math.random()),randomGenome()))
      }
    }
  }
  return tigers;
}

function initialGenes(){
  let speed = 0;
  let size = 0;
  let stealth = 0;
  let litter = 0;
  let eyesight = 0
  let sat = 0;
  let hunger = 0;
  for(const bird of birds){
    speed+=bird.genome.speedGene.value;
    size+=bird.genome.sizeGene.value;
    stealth+=bird.genome.stealthGene.value;
    litter+=bird.genome.litterGene.value;
  }
  for(const tiger of tigers){
    eyesight+=tiger.genome.eyeSightGene.value;
    sat+=tiger.genome.saturationGene.value;
    hunger+=tiger.genome.hungerGene.value;
  }
  return [speed,size,stealth,litter,eyesight,sat,hunger];
}

function speedUp(){
  speed_multiplier*=1.5;
}
function slowDown(){
  speed_multiplier/=1.5;
}
function enableDisaster(){
  disaster = !disaster;
}
function summonTiger(){
  tigers.push(new Tiger(randomCoordinate(50),randomCoordinate(50),new Velocity(Math.random(),Math.random()),randomGenome()))
}
function displayGenes(){
  let speed = 0;
  let size = 0;
  let stealth = 0;
  let litter = 0;
  let eyesight = 0
  let sat = 0;
  let hunger = 0;
  for(const bird of birds){
    speed+=bird.genome.speedGene.value;
    size+=bird.genome.sizeGene.value;
    stealth+=bird.genome.stealthGene.value;
    litter+=bird.genome.litterGene.value;
  }
  for(const tiger of tigers){
    eyesight+=tiger.genome.eyeSightGene.value;
    sat+=tiger.genome.saturationGene.value;
    hunger+=tiger.genome.hungerGene.value;
  }
  console.log("Speed: "+ (speed/birds.length-initial_genes[0]/initial_birds_size).toString());
  console.log("Size: "+ (size/birds.length-initial_genes[1]/initial_birds_size).toString());
  console.log("Stealth: "+ (stealth/birds.length-initial_genes[2]/initial_birds_size).toString());
  console.log("Litter: "+ (litter/birds.length-initial_genes[3]/initial_birds_size).toString());
  console.log("Eyesight: " + (eyesight/tigers.length-initial_genes[4]/inital_tigers_size).toString());
  console.log("Saturation: " + (sat/tigers.length-initial_genes[5]/inital_tigers_size).toString());
  console.log("Hunger: " + (hunger/tigers.length-initial_genes[6]/inital_tigers_size).toString());


}
window.onload = function () {

var bird_dps = []; 
var bird_chart = new CanvasJS.Chart("birdContainer", {
	title :{
		text: "Bird Population"
	},
	data: [{
		type: "line",
		dataPoints: bird_dps
	}],
});

var xValBird = 0;
var updateInterval = 250;
var dataLength = 1000; 

var updateBirdChart = function (count) {

	count = count || 1;

	for (var j = 0; j < count; j++) {
		
		bird_dps.push({
			x: xValBird,
			y: birds.length
		});
		xValBird++;
	}

	if (bird_dps.length > dataLength) {
		bird_dps.shift();
	}

	bird_chart.render();
};

updateBirdChart(dataLength);
setInterval(function(){updateBirdChart()}, updateInterval);

var tiger_dps = []; 
var tiger_chart = new CanvasJS.Chart("tigerContainer", {
	title :{
		text: "Tiger Population"
	},
	data: [{
		type: "line",
		dataPoints: tiger_dps
	}],
});
var xValTiger = 0;

var updateTigerChart = function (count) {

	count = count || 1;

	for (var j = 0; j < count; j++) {
		
		tiger_dps.push({
			x: xValTiger,
			y: tigers.length
		});
		xValTiger++;
	}

	if (tiger_dps.length > dataLength) {
		tiger_dps.shift();
	}

	tiger_chart.render();
};
updateTigerChart(dataLength);
setInterval(function(){updateTigerChart()}, updateInterval);
}


