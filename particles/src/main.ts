import Vector2D from "./utils/Classes/Vector2D.js";
import World from "./utils/Classes/World.js";
import Circle from "./utils/Classes/objects/Circle.js";
import Rectangle from "./utils/Classes/objects/Rectangle.js";
import Position from "./utils/Classes/vectors/Position.js";
import { Shapes } from "./utils/tsUtils.js";

const world = new World();
world.init();

function init() {
    for (let i = 0; i < 1000; i++) {
        const pos = new Position(
            Math.floor(Math.random() * (innerWidth - 20) + 10),
            Math.floor(Math.random() * (innerHeight - 20) + 10)
        )
        const vel = new Vector2D(
            Math.floor(Math.random() * 15 + 5),
            Math.floor(Math.random() * 15 + 5)
        )
        const col = `hsl(${Math.random() * 359 + 1}, 93%, 70%)`
        const rec = new Rectangle(pos, 10, 10, col);
        rec.props.angularVelocity = Math.random() * 0.1 * (i % 2 === 0 ? 1 : -1);
        world.addObjects(rec);
    }
}

init();
let fps = 0;
function animate() {
    World.CTX.clearRect(
        0,0,
        World.CANVAS.width,
        World.CANVAS.height
    )
    world.worldObjects.forEach(obj => {
        obj.setPosition(obj.getPosition().x + 1)
        obj.draw();
        // obj.isOutsideCanvas() && world.removeObjects(obj);
        // obj.rotate();
    })
    fps++;
    requestAnimationFrame(animate);
}
animate();

setInterval(() => {
    document.querySelector(".fps")!.textContent = "FPS: " + fps;
    fps = 0;
    document.querySelector(".fps")!.style.color = "wheat"
    setTimeout(() => {document.querySelector(".fps")!.style.color = "white"}, 500)
}, 1000)