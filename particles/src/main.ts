import Vector2D from "./utils/Classes/Vector2D.js";
import Circle from "./utils/Classes/objects/Circle.js";
import Position from "./utils/Classes/vectors/Position.js";

const cnv = document.getElementById("cnv") as HTMLCanvasElement;
const ctx = cnv.getContext("2d");

cnv.width = window.innerWidth;
cnv.height = window.innerHeight;

const objects: Map<number | string, Circle> = new Map();

function init() {
    for (let i = 0; i < 10; i++) {
        const pos = new Position(
            Math.floor(Math.random() * (innerWidth - 20) + 10),
            Math.floor(Math.random() * (innerHeight - 20) + 10)
        )
        const vel = new Vector2D(
            Math.floor(Math.random() * 15 + 5),
            Math.floor(Math.random() * 15 + 5)
        )
        const col = `hsl(${Math.random() * 359 + 1}, 93%, 70%)`
        const cir = new Circle(pos, 10, col);
        cir.setVelocity(vel.x, vel.y);
        objects.set(cir.id, cir);
    }
}

init();

objects.forEach(cir => {
    cir.draw(ctx!);
    console.log(cir.getVelocity());
});

document.body.addEventListener("mousedown", event => {
    const x = event.clientX;
    const y = event.clientY;
    objects.forEach(cir => {
        cir.moveTo(ctx!, new Position(x, y))
    })
})

document.body.addEventListener("mouseup", () => {
    objects.forEach(cir => {
        const pos = new Position(
            Math.floor(Math.random() * (innerWidth - 20) + 10),
            Math.floor(Math.random() * (innerHeight - 20) + 10)
        )
        cir.moveTo(ctx!, pos);
    })
})

window.addEventListener("resize", () => {
    cnv.width = window.innerWidth;
    cnv.height = window.innerHeight;
})