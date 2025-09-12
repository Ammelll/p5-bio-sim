class Tiger extends Organism{
  constructor(x,y,v,genome){
    super(x,y,v,50*genome.sizeGene.value,genome);
    this.saturation = 30;
    this.mating_cooldown = true;
    setTimeout(()=> {
          this.mating_cooldown = false;
        },1000);
    setInterval(()=>this.saturation-=this.genome.hungerGene.value,1000);
  }
  consume(prey){
    birds.splice(birds.indexOf(prey),1)
    this.saturation = Math.min(this.saturation+this.genome.saturationGene.value,100);
  }
  spawn(p1,p2){
    let genome = combineGenome(p1,p2);
    tigers.push(new Tiger(p1.x,p1.y,new Velocity(Math.random(),Math.random()),genome))
  }
  draw(){
    fill(this.genome.colorGene.value, this.genome.colorGene.value, 250);
    circle(this.x,this.y,this.d);
    noFill();
    stroke(0,0,0);
    textSize(20)
    text(this.saturation.toPrecision(3).toString(),this.x,this.y,)
    if(this.saturation < 0) this.starve();
  }
  starve(){
    tigers.splice(tigers.indexOf(this),1)
  }
}

