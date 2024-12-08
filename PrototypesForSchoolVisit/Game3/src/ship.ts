import { Vector } from "./lib"; import Cargo from "./cargo";

export default class Ship {
  private called: boolean = false;
  private sold: boolean = false; private bought: boolean = false;
  private pos: Vector; private size: Vector; private name: string;
  public gold: number = 0; private speed; private encumbrance; private baseSpeed: number;
  public travelling: boolean = true; private distance: number = 95; private location: string = "";
  private cargos: Cargo[] = [new Cargo("Vis", 1, 2, 3), new Cargo("Marmer", 4, 20, 5), new Cargo("Kaas", 2, 6, 3), new Cargo("Geweer", 4, 9, 12), new Cargo("Buskruit", 16, 4, 35)];
  private store: Cargo[] = [new Cargo("Papier", 3, 14, 32), new Cargo("Tarwe", 4, 2, 14)];

  public constructor(pos: Vector, name: string, baseSpeed: number) {
    this.pos = pos; this.size = { x: 250, y: 350 }; this.name = name; this.speed = 50; this.encumbrance = 0; this.baseSpeed = baseSpeed;
  }

  public calcSpeed(cargos: Cargo[]): number {
    for (let i = 0; i < this.cargos.length; i++) {this.encumbrance += this.cargos[i].weight;} return this.encumbrance;  
  }

  public travel(){
    this.encumbrance = 0;
    this.calcSpeed(this.cargos);
    this.speed = this.baseSpeed - this.encumbrance; 

    if(this.travelling) {
      this.distance -= this.speed;

      if(this.distance <= 0) {
        this.travelling = false;
        if(this.store.length === 0) {
          this.store.push(new Cargo("Goes Kaas", 2, 100, 3));
          this.store.push(new Cargo("Buskruit", 2, 40, 3));
        }
        else if(this.store.length === 1) {
          this.store.push(new Cargo("sieraden", 2, 20, 3));
        }
      }
    }
  }

  public draw(ctx: CanvasRenderingContext2D) {
    if(this.called === false) {const timer = setInterval(() => this.travel(), 1000); this.called = true;}

    ctx.fillStyle = "BurlyWood"; ctx.strokeStyle = "#84240c";
    ctx.shadowBlur = 2; ctx.shadowOffsetX = 5; ctx.shadowOffsetY = 5; ctx.shadowColor = "#563232";
    ctx.lineWidth = 2; ctx.font = "bold 20px Navigator";
    ctx.strokeRect(this.pos.x + 5, this.pos.y + 5, this.size.x, this.size.y);
    ctx.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
    ctx.fillStyle = "#1B1212"; ctx.shadowOffsetX = 1.1; ctx.shadowOffsetY = 1.1;
    ctx.fillText(this.name, this.pos.x + 20, this.pos.y + 25);
    ctx.fillRect(this.pos.x, this.pos.y + 35, this.size.x, 3);

    for (let i = 0; i < this.cargos.length; i++) {
      ctx.fillStyle = "#353935";
      ctx.lineWidth = 2; ctx.font = "italic 15px Arial"; 
      ctx.fillRect(this.pos.x, this.pos.y + 45 + i * 16, this.size.x, 1);
      ctx.fillText(this.cargos[i].name + " | " + this.cargos[i].value + " Gold | " + this.cargos[i].weight + "kg | x" + this.cargos[i].amount, this.pos.x + 5, this.pos.y + 60 + i * 15);
      ctx.fillRect(this.pos.x, this.pos.y + 60 + i * 16, this.size.x, 1);
    }

    ctx.fillStyle = "#1B1212"; ctx.shadowOffsetX = 1.1; ctx.shadowOffsetY = 1.1;
    ctx.fillRect(this.pos.x, this.pos.y + 132, this.size.x, 3);

    ctx.fillStyle = "#1B1212"; ctx.shadowOffsetX = 1.1; ctx.shadowOffsetY = 1.1;
    ctx.fillRect(this.pos.x, this.pos.y + 232, this.size.x, 3);

    ctx.fillStyle = "#1B1212"; ctx.shadowOffsetX = 1.1; ctx.shadowOffsetY = 1.1;
    ctx.fillRect(this.pos.x, this.pos.y + 285, this.size.x, 3);

    ctx.fillStyle = "#1B1212"; ctx.shadowOffsetX = 1.1; ctx.shadowOffsetY = 1.1;
    ctx.fillRect(this.pos.x + 145, this.pos.y + 290, 2, 58);

    if(this.travelling) {
      ctx.fillStyle = "#001f3f"; ctx.font = "bold 16px Navigator"; ctx.shadowBlur = 0;
      ctx.fillText("Reizen: " + this.distance + " km", this.pos.x + 10, this.pos.y + 320);
      ctx.lineWidth = 2; ctx.font = "bold 18px Navigator";
      ctx.fillStyle = "#4B5945"; ctx.shadowOffsetX = 1.1; ctx.shadowOffsetY = 1.1;
      ctx.fillText("Snelheid: " + this.speed + "km/h", this.pos.x + 20, this.pos.y + 205);
    }
    else if(!this.travelling) {
      ctx.fillStyle = "black"; ctx.font = "bold 25px Navigator"; ctx.shadowBlur = 0;
      ctx.fillText("aangemeerd" + this.location, this.pos.x + 10, this.pos.y + 320);

      for (let i = 0; i < this.store.length; i++) {
        ctx.fillStyle = "#353935"; ctx.lineWidth = 2; ctx.font = "italic 15px Arial";
        ctx.fillRect(this.pos.x, this.pos.y + 245 + i * 16, this.size.x, 1);
        ctx.fillText(this.store[i].name + " | " + this.store[i].value * 1.5 + " Gold | " + this.store[i].weight + "kg | x" + this.store[i].amount, this.pos.x + 5, this.pos.y + 260 + i * 15);
        ctx.fillRect(this.pos.x, this.pos.y + 260 + i * 16, this.size.x, 1);
      }
    }    

    ctx.lineWidth = 2; ctx.font = "bold 18px Navigator"; ctx.fillStyle = "brown";
    ctx.fillText("Belasting: " + this.encumbrance, this.pos.x + 20, this.pos.y + 180);
    ctx.lineWidth = 2; ctx.font = "bold 18px Navigator"; ctx.fillStyle = "#FFB200";
    ctx.fillText("Goud: " + this.gold, this.pos.x + 20, this.pos.y + 160);

    ctx.fillStyle = "#3D0301"; ctx.shadowOffsetX = 1.1; ctx.shadowOffsetY = 1.1;
    ctx.fillRect(this.pos.x + 150, this.pos.y + 295, 15, 15);
    ctx.fillRect(this.pos.x + 170, this.pos.y + 295, 15, 15);
    ctx.fillRect(this.pos.x + 190, this.pos.y + 295, 15, 15);
    ctx.fillRect(this.pos.x + 210, this.pos.y + 295, 15, 15);
    ctx.fillRect(this.pos.x + 230, this.pos.y + 295, 15, 15);

    ctx.fillStyle = "#EEDF7A"; ctx.shadowOffsetX = 1.1; ctx.shadowOffsetY = 1.1;
    ctx.fillRect(this.pos.x + 210, this.pos.y + 320, 15, 15);
    ctx.fillRect(this.pos.x + 230, this.pos.y + 320, 15, 15);

    ctx.fillStyle = "blue"; ctx.shadowOffsetX = 1.1; ctx.shadowOffsetY = 1.1;
    ctx.fillRect(this.pos.x + 150, this.pos.y + 320, 45, 15);
  }

  setSail(){
    if(this.travelling === false) {
      this.distance = 210;
      this.travelling = true;
    }
  }

  sellCargo(){
    for (let i = 0; i < this.cargos.length; i++) {
      if(i === this.cargos.length - 1 && this.sold === false && this.travelling === false) {
        this.gold += this.cargos[i].value * 1.5;
        this.cargos.pop();
        console.log(this.cargos);
        this.sold = true;
      }
    } 
    this.sold = false;
  }

  buyCargo(){
    for (let i = 0; i <= this.store.length; i++) {
      if(i === this.store.length - 1 && this.bought === false && this.store[i].value <= this.gold && this.travelling === false) {
        this.gold -= this.store[i].value;
        this.cargos.push(this.store[i]);
        this.store.pop();
        this.bought = true;
      }
    }
    this.bought = false;
  }
}
