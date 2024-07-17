import Object2D from "../Object2D.js";
import Position from "../vectors/Position.js";

export default class Rectangle extends Object2D {

    readonly id = Object2D.ID_COUNTER;

    constructor(
        public pos: Position,
        public width: number,
        public height: number,
        public color: string,
    ) {
        super(
            pos,
            color,
            {
                x: pos.x - width / 2,
                y: pos.y - height / 2,
                width: width,
                height: height
            }
        )
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.fillRect(this.getBoundingBox().width, this.getBoundingBox().height, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    private _animate(ctx: CanvasRenderingContext2D) {
        ctx.clearRect(this.pos.x, this.pos.y, this.width, this.height);
        this.draw(ctx);
    }

    public move(vel: number | null) {
        return {

        }
    }
}