import { Direction } from "../../tsUtils.js";
import Object2D from "../Object2D.js";
import Vector2D from "../Vector2D.js";
import World from "../World.js";
import Position from "../vectors/Position.js";


export default class Circle extends Object2D {

    readonly id = Object2D.ID_COUNTER;

    constructor(
        public position: Position,
        public radius: number,
        public color: string,
    ) {
        super(
            position,
            color,
            {
                x: position.x - radius,
                y: position.y - radius,
                width: radius * 2,
                height: radius * 2
            }
        );
        // no need for furthur initialization as using public keyword in constructor does it implicitly
    }

    public draw(): void {
        const ctx = World.CTX;
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    public rotate(): void {}
}