import { Vector } from "./lib"; import Ship from "./ship";

export default class Game {
  private canvas = document.querySelector("canvas") as HTMLCanvasElement; private ctx = this.canvas.getContext("2d")!;
  private ship_Sally = new Ship({ x: 50, y: 50 }, "Ship Zeelandia", 50);
  private ship_Corkus = new Ship({ x: 350, y: 50 }, "Ship Corkus", 35);
  private keys = {spc: false, one: false, two: false, z: false, x: false};
  private switched: boolean = false;

  public constructor() {
    window.addEventListener("resize", () => {
      this.canvas.width = window.innerWidth; this.canvas.height = window.innerHeight;
    });this.canvas.width = window.innerWidth; this.canvas.height = window.innerHeight;

    document.addEventListener("keydown", (ev) => this.handleKey(ev, true));
    document.addEventListener("keyup", (ev) => this.handleKey(ev, false));
  }

  public tick() {
    this.ctx.fillStyle = "black"; this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ship_Sally.draw(this.ctx); this.ship_Corkus.draw(this.ctx);

    if(this.keys.spc){
      if(this.switched) this.ship_Corkus.setSail();
      else this.ship_Sally.setSail();
    }
    else if(this.keys.one){
      if(this.switched) this.ship_Corkus.sellCargo();
      else this.ship_Sally.sellCargo();
    }
    else if(this.keys.two){
      if(this.switched) this.ship_Corkus.buyCargo();
      else this.ship_Sally.buyCargo();
    }

    if(this.keys.x){
      this.switched = true;
    }
    else if(this.keys.z){
      this.switched = false;
    }

    this.ctx.lineWidth = 2; this.ctx.font = "italic 18px Navigator"; this.ctx.fillStyle = "white";
    this.ctx.fillText("Press '1' to sell", 700, 200);
    this.ctx.fillText("Press '2' to buy", 700, 230);
    this.ctx.fillText("Press 'space' to travel", 700, 260);
    this.ctx.lineWidth = 2; this.ctx.font = "bold 20px Navigator"; this.ctx.fillStyle = "brown";
    this.ctx.fillText("Press 'x' to switch to: Ship Corkus", 700, 160);
    this.ctx.fillText("Press 'z' to switch to: Ship Zeelandia", 700, 130);

    this.ctx.lineWidth = 2; this.ctx.font = "bold 25px Navigator"; this.ctx.fillStyle = "gold";
    this.ctx.fillText("Treasury: " + (this.ship_Sally.gold + this.ship_Corkus.gold), 700, 350);

    this.ctx.lineWidth = 2; this.ctx.font = "italic 18px Navigator"; this.ctx.fillStyle = "wheat";
    this.ctx.fillText("Naval Trading Sim Prototype for improving math by Mecit", 920, 600);
  }

  private handleKey(ev: KeyboardEvent, down: boolean) {
    switch (ev.key) {
      default: return;
      case " ":
        this.keys.spc = down;
      break;
      case "1":
        this.keys.one = down;
      break;
      case "2":
        this.keys.two = down;
      break;
      case "z":
        this.keys.z = down;
      break;
      case "x":
        this.keys.x = down;
      break;
    }
  }
}
