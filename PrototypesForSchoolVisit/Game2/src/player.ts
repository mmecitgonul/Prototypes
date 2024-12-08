import Entity from "./entity";
import { _gravity, _friction, _size, _speed, Vector, _jump } from "./lib";

export default class Player extends Entity {
  public vel: Vector = {x: 0, y: 0};
  private grounded = false;
  public oldPos: Vector = this.pos;

  public constructor() {
    super({ x: -800, y: -300 }, { x: _size + 20 , y: _size + 20 }, "red");
  }

  public move(left: boolean, right: boolean) {
    if(left) this.vel.x -= _speed / this.size.x * 20;
    if(right) this.vel.x += _speed / this.size.x * 20;
  }

  public jump() {
    if (this.grounded) this.vel.y += _jump + this.size.x / 20;
  }

  public tick(tiles: Entity[]) {
    this.pos.x += this.vel.x;

    for (const tile of tiles) {
      if (this.checkCollision(tile)) {
        this.pos.x -= 
          this.vel.x > 0 
            ? this.bounds.right - tile.bounds.left
            : this.bounds.left - tile.bounds.right;
        this.vel.x = 0; 
      }
    }

    this.pos.y -= this.vel.y;
    this.grounded = false;

    for (const tile of tiles) {
      if(this.checkCollision(tile)) {
        this.pos.y -= 
          this.vel.y > 0 
            ? this.bounds.top - tile.bounds.bottom 
            : this.bounds.bottom - tile.bounds.top;
        this.vel.y = 0;
        this.grounded = this.pos.y < tile.getPosition.y;
      }
    }

    this.vel.x *= _friction;
    this.vel.y -= _gravity;
  }
}