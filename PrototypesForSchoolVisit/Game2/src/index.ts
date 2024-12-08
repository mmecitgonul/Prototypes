import Game from "./game";
import map from "./map.json";

let game = new Game(); 
game.loadMap(map);

const endGame = () => {
  if (game.player.pos.y > 1500 || game.player.size.x <= 10 || game.player.size.x >= 120) {
    game = new Game();
    game.loadMap(map);
  }
}

const loop = () => { 
  requestAnimationFrame(loop); 
  game.tick();
  endGame();
};

requestAnimationFrame(loop);
