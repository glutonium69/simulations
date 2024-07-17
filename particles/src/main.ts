import Vector2D from "./utils/Classes/Vector2D.js";
import Circle from "./utils/Classes/objects/Circle.js";
import Position from "./utils/Classes/vectors/Position.js";

const cnv = document.getElementById("cnv") as HTMLCanvasElement;
const ctx = cnv.getContext("2d");

cnv.width = window.innerWidth;
cnv.height = window.innerHeight;

const cir = new Circle(new Position(200, 200), 20, "blue");

cir.draw(ctx!);
cir.velocity = new Vector2D(100, 100);
document.body.addEventListener("mousemove", event => {
    cir.move(ctx!).to(new Position(event.clientX, event.clientY));
})