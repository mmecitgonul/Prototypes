export default class Panel {
  speed: number;
  height: number;
  distance: number;
  accelerate: boolean;

  constructor(speed: number, height: number, distance: number) {
    this.speed = speed;
    this.distance = distance;
    this.height = height;
    this.accelerate = false;
  }

  flight() {
    if(this.accelerate) {
      this.speed += 40;
      this.height += 30;
      this.accelerate = false;
    }  
    else if(!this.accelerate) {
      this.height -= 2;
      this.speed -= 5;
      if(this.speed <= 0) {
        this.speed = 0;
      }
      if(this.speed <= 0){
        this.height -= 5;
      }
      if(this.height <= 0) {
        this.height = 0;
      }
    }
    this.distance += this.speed;
  }
}