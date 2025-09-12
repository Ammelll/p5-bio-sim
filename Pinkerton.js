class Pinkerton extends Organism{
  constructor(x,y,v,genome){
    super(x,y,v,10*genome.sizeGene.value,genome);
  }
  draw(){
    fill(255, this.genome.colorGene.value, 250);
    circle(this.x,this.y,this.d);
    noFill();
  }
    collisions(growth, prey){
    for(const p of prey){
      if(Math.sqrt(Math.pow(this.x-p.x,2) + Math.pow(this.y-p.y,2)) < this.d/2 + p.d/2){
        if(p.genome.stealthGene.value > 1.5){
          this.consume(p);
        }
      }
    }
    for(const g of growth){
      if(Math.sqrt(Math.pow(this.x-g.x,2) + Math.pow(this.y-g.y,2)) < this.d/2 + g.d/2){
        g.d-=0.5
      }
    }
  }
  consume(prey){
    birds.splice(birds.indexOf(prey),1)
  }
}