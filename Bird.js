class Bird extends Organism{
  constructor(initial_mating_cooldown,x,y,v,genome){
    super(x,y,v,10*genome.sizeGene.value,genome)
    this.saturation = 100;
    this.mating_cooldown = initial_mating_cooldown;
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
  spawn(p1,p2){
    let genome = combineGenome(p1,p2);
    for(let i = 0; i < genome.litterGene.value; i++){
        birds.push(new Bird(true,randomCoordinate(10),randomCoordinate(10),new Velocity(Math.random(),Math.random()),genome))
    }    
  }
}