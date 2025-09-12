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
    fill(this.genome.colorGene.value, 255, this.genome.colorGene.value);
    circle(this.x,this.y,this.d);
    noFill();
  }
  collide(){

  }
  spawn(p1,p2){
    let genome = combineGenome(p1,p2);
    for(let i = 0; i < genome.litterGene.value; i++){
        birds.push(new Bird(true,p1.x,p1.y,new Velocity(Math.random(),Math.random()),genome))
    }    
  }
}