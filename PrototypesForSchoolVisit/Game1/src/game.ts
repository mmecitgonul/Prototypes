import planeImage from '../res/plane.png';
import Panel from './panel';

export default class Game {
  private canvas = document.querySelector('canvas') as HTMLCanvasElement;
  private ctx = this.canvas.getContext('2d')!;
  private plane = new Image() as HTMLImageElement;
  public  panel = new Panel(30, 30, 0);
  private timer = setInterval(() => this.timed(), 500);
  
  //Constructors are properties to be defined for every parameter inside the constructor for each instantiation of the class.
  //properties set inside the the constructor are only self setters for the class and don't need to be defined for each instantiation of the class.
  //through "super" method inside the constructor we can access and declare the parent class construct parameters within as an extender(child) class.
  constructor() {
    //Set the canvas size to the window size
    window.addEventListener('resize', () => {
      this.canvas.width = window.innerWidth; this.canvas.height = window.innerHeight;
    });this.canvas.width = window.innerWidth; this.canvas.height = window.innerHeight;

    this.plane.src = planeImage;
  }

  //---Called once at the start of the game
  public start(): void {
    this.timer;
  }

  //---Called every frame
  public update(): void {
    this.draw();

    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if(e.key === '5') {
        this.panel.accelerate = true;

        this.ctx.fillStyle = 'green';
        this.ctx.font = '60px Arial';
        this.ctx.fillText(`Correct!!!`, 250, 550, 1000);

        this.ctx.fillStyle = 'white';
        this.ctx.fillText("Vroom!!", 670, 290, 70);
      }
      else {
        this.ctx.fillStyle = 'red';
        this.ctx.font = '60px Arial';
        this.ctx.fillText(`Wrong!!!`, 250, 550, 1000);
      }
    });
  } 

  //---Draws the canvas items
  private draw(): void {

    this.plane.onload = () => {
      //Plane
      this.ctx.drawImage(this.plane, 700, 200, 100, 50);
      this.ctx.fillRect(100, 100, 100, 100);
    }

    //panel props
    this.ctx.font = '20px Arial';
    this.ctx.fillStyle = 'blue';
    this.ctx.fillText(`Speed: ${this.panel.speed}m/s`, 500, 50, 1000);
    this.ctx.fillStyle = 'yellow';
    this.ctx.fillText(`Altitude: ${this.panel.height}m`, 500, 80, 1000);
    this.ctx.fillStyle = 'green';
    this.ctx.fillText(`Distance: ${this.panel.distance}m`, 500, 110, 1000);

    this.ctx.fillStyle = 'white';
    this.ctx.fillText(`20 - 15 =`, 250, 350, 1000);

    this.ctx.fillStyle = 'brown';
    this.ctx.fillText(`'press the right number key'`, 350, 350, 1000);

    this.ctx.fillStyle = 'White';
    this.ctx.font = 'italic 15px Arial';
    this.ctx.fillText(`prototype paper airplane game for improving math by Mecit`, 950, 590, 1000);
  }

  //---called every second
  public timed(): void {
    this.panel.flight();
    this.canvas.width = this.canvas.width;

    //Background
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.drawImage(this.plane, 700, 200, 100, 50);
    this.ctx.fillRect(100, 100, 100, 100);

    
  }
}