class Organism{
  constructor(x,y,v,d,genome){
    this.x = x;
    this.y = y;
    this.v = v;
    this.d = d;
    this.genome = genome;
  }
  collisions(species,prey){
    for(const p of prey){
      if(p.genome.stealthGene.value > this.genome.eyeSightGene.value){
        continue;
      }
      if(Math.sqrt(Math.pow(this.x-p.x,2) + Math.pow(this.y-p.y,2)) < this.d/2 + p.d/2){
        this.consume(p);
      }
    }
    for(const individual of species){
      if(individual == this){
        return
      }
      if(this.mating_cooldown || individual.mating_cooldown){
        return
      }
      if(this.saturation < 40 || individual.saturation < 40){
        return;
      }
      if(Math.abs(this.x - individual.x) < this.d && Math.abs(this.y - individual.y) < this.d){
        this.mate(individual,1000);
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
    this.spawn(this,ind)
  }
  move(){
    this.x = this.x+this.v.x*speed_multiplier*this.genome.speedGene.value;
    this.y = this.y+this.v.y*speed_multiplier*this.genome.speedGene.value;
    this.x = bump(this.x,this.d);
    this.v.x = oob(this.x,this.v.x,this.d);
    this.v.y = oob(this.y,this.v.y,this.d);
    this.v.x = divider(this.x,this.v.x,this.d);
  }
}
