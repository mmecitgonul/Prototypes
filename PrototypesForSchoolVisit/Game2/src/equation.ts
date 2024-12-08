import { Declared, Vector, _sheetNum, _sheetOpr, _follow } from "./lib";
import Player from "./player";

export default class Equation {
  private coefficent: Declared;
  private operator: Declared;
  private constant: Declared;
  public sum: number;

  constructor(coefficent: Declared, operator: Declared, constant: Declared, sum: number) {
    this.coefficent = coefficent;
    this.operator = operator;
    this.constant = constant;
    this.sum = sum;
    console.log(this.coefficent.n);
  }

  public setCoeffient(player: Player) {
    if(this.coefficent.set == false) {
      this.coefficent.n = player.size.x;
      this.coefficent.set = false;
      console.log(this.coefficent.n);
    }
  }

  public setOperator(i: number) {
    if(this.operator.set == false && this.coefficent.set == true) {
      this.operator.set = true;
      this.operator.n = i;
      console.log(this.operator.set);
    }
  }

  public setConstant(num: number, player: Player) {
    player.oldPos = player.pos;
    if(this.constant.set == false && this.operator.set == true) {
      this.constant.set = true;
      this.constant.n = num;
      if(this.operator.n == 1) {
        this.sum = this.coefficent.n / this.constant.n;
        console.log(this.coefficent.n, " / ", this.constant.n, " = ", this.coefficent.n / this.constant.n);
        this.coefficent.n = this.sum;
        player.size.x = this.sum;
        player.size.y = this.sum;
      }
      else if(this.operator.n == 2) {
        this.sum = this.coefficent.n * this.constant.n;
        console.log(this.coefficent.n, " * ", this.constant.n, " = ", this.coefficent.n * this.constant.n);
        this.coefficent.n = this.sum;
        player.pos.y = player.pos.y - 10 - player.size.x / .5;
        player.size.x = this.sum;
        player.size.y = this.sum; 
      }
      else if(this.operator.n == 3) {
        this.sum = this.coefficent.n - this.constant.n;
        console.log(this.coefficent.n, " - ", this.constant.n, " = ", this.coefficent.n - this.constant.n);
        this.coefficent.n = this.sum;
        player.size.x = this.sum;
        player.size.y = this.sum;
      }
      this.operator.set = false;
      this.constant.set = false;
    }
  }

  public draw(ctx: CanvasRenderingContext2D, cam: Vector, player: Player) {
    ctx.fillStyle = "azure";
    ctx.font = "40px Arial";

    if(this.operator.set == true) {
      if(this.operator.n == 1) {
        ctx.fillText("" + this.coefficent.n + " / ", 100, 100, 500);
      }
      else if(this.operator.n == 2) {
        ctx.fillText("" + this.coefficent.n + " * ", 100, 100, 500);
      }
      else if(this.operator.n == 3) {
        ctx.fillText("" + this.coefficent.n + " - ", 100, 100, 500);
      }
    }
    else if(this.coefficent.set == true) {
      ctx.fillText("" + this.coefficent.n, 100, 100, 500);
    }
  }
}  