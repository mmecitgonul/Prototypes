import Game from "./game";

let game = new Game(); 

const loop = () => { 
  requestAnimationFrame(loop); game.tick();
};requestAnimationFrame(loop);
