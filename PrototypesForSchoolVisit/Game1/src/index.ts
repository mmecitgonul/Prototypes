import Main from "./game";

let finish: boolean = false;

//Make game instance
const main = new Main();
main.start();

//---Update & Start through animation frames
const loop = () => {
  main.update();
  requestAnimationFrame(loop);

  if(main.panel.height <= 0 && finish === false) {
    finish = true;
    window.alert('Game Over YOUR score: ' + main.panel.distance + " meters");
    window.location.reload();
  }
};requestAnimationFrame(loop);
