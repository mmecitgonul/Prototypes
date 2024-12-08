import { Vector, _1, _2, _3, _follow, _size, _sheetNum, _sheetOpr } from "./lib";
import Entity from "./entity";
import Player from "./player";
import Equation from "./equation";

export default class Game {
  public canvas = document.querySelector("canvas") as HTMLCanvasElement;
  private ctx = this.canvas.getContext("2d")!;
  private cam: Vector = {x: -window.innerWidth / 2, y: -window.innerHeight / 2};
  public player = new Player();
  private keys = {left: false, right: false, jump: false,};
  private tiles: Entity[] = [];
  public equation = new Equation({n: this.player.size.x, set: true}, {n: 0, set: false}, {n: 0, set: false}, 0);

  public constructor() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    window.addEventListener("resize", () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    });

    document.addEventListener("keydown", (ev) => this.handleKey(ev, true));
    document.addEventListener("keyup", (ev) => this.handleKey(ev, false));
  }

  public tick() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.player.move(this.keys.left, this.keys.right);
    if(this.keys.jump) this.player.jump();
    this.player.tick(this.tiles);
    this.player.draw(this.ctx, this.cam);
    this.equation.draw(this.ctx, this.cam, this.player);
    for (const tile of this.tiles) {tile.draw(this.ctx, this.cam)};

    this.cam.x = Math.round(this.cam.x - (this.cam.x + this.canvas.width / 2 -  this.player.getPosition.x) * _follow.x);
    this.cam.y = Math.round(this.cam.y - (this.cam.y + this.canvas.height / 2 -  this.player.getPosition.y) * _follow.y);

    this.ctx.fillStyle = "brown";
    this.ctx.font = "20px Arial";
    this.ctx.fillText("if <= 10 mislukking", 50, 550);
    this.ctx.fillText("if => 120 mislukking", 50, 580);

    this.ctx.fillStyle = "azure";
    this.ctx.font = "20px sans";
    this.ctx.fillText("Groter = langzamere, sterkere sprong", 50, 500);
    this.ctx.fillText("Kleiner = snellere, zwakkere sprong", 50, 520);

    this.ctx.font = "italic 15px Arial";
    this.ctx.fillText("Puzzelplatformer-prototype voor het verbeteren van wiskunde door Mecit", 960, 600);

    this.ctx.font = "italic 30px Navigator";
    this.ctx.fillText(_sheetNum, 50, 150, 250);
    this.ctx.fillText(_sheetOpr, 17, 200, 250);
  }

  public loadMap(map: number[][]) {
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        if (map[i][j] == 1) {
          this.tiles.push(
            new Entity(
              {
                x: (j - (map[i].length - 1) / 2) * _size,
                y: (i - (map.length - 1) / 2) * _size
              }, 
              { x: _size, y: _size },
              "white"
            )
          );
        }
      }
    }
  }

  private handleKey(ev: KeyboardEvent, down: boolean) {
    switch (ev.key) {
      default: return;
      case "ArrowLeft":
      case "a":
        this.keys.left = down;
      break;   
      case "ArrowRight":
      case "d":
        this.keys.right = down;
      break;   
      case "ArrowUp":
      case "w":
      case " ":
        this.keys.jump = down;
      break;
      case "z":
        this.equation.setOperator(1);
      break;
      case "x":
        this.equation.setOperator(2);
      break;
      case "c":
        this.equation.setOperator(3);
      break;
      case "2":
        this.equation.setConstant(_1, this.player);
      break;
      case "3":
        this.equation.setConstant(_2, this.player);
      break;
      case "4":
        this.equation.setConstant(_3, this.player);
      break;
    }
  }
}
