import { Direction } from "../../enums.js";
import Object from "../Object.js";
import Vector2D from "../Vector2D.js";
import Position from "../vectors/Position.js";


export default class Circle extends Object {
    private _animateFrameId: number;

    constructor(
        public pos: Position,
        public radius: number,
        public color: string,
        public velocity: Vector2D = new Vector2D(0, 0),
    ) {
        super()
        this.pos;
        this.radius;
        this.color;
        this.velocity;
        this._animateFrameId = 0;
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    private _animate = (
        ctx: CanvasRenderingContext2D,
        distance: Vector2D,
        target: Vector2D,
        direction: [Direction.Left | Direction.Right, Direction.Up | Direction.Down]
    ) => {
        if(this.velocity.x === 0 && this.velocity.y === 0) return;

        ctx.clearRect(this.pos.x - this.radius, this.pos.y - this.radius, this.radius * 2, this.radius * 2);

        if(distance.x > 0) {
            switch (direction[0]) {
                case Direction.Left:
                    this.pos.x -= this.velocity.x;
                    if(this.pos.x < target.x) {
                        this.pos.x = target.x
                        distance.x = 0;
                    };
                    break;
                case Direction.Right:
                    this.pos.x += this.velocity.x;
                    if(this.pos.x > target.x) {
                        this.pos.x = target.x
                        distance.x = 0;
                    };
                    break;
            }
        }

        if(distance.y > 0) {
            switch (direction[1]) {
                case Direction.Up:
                    this.pos.y -= this.velocity.y;
                    if(this.pos.y < target.y) {
                        this.pos.y = target.y
                        distance.y = 0;
                    };
                    break;
                case Direction.Down:
                    this.pos.y += this.velocity.y;
                    if(this.pos.y > target.y) {
                        this.pos.y = target.y
                        distance.y = 0;
                    };
                    break;
            }
        }

        this.draw(ctx);

        if(distance.x > 0 || distance.y > 0)
            this._animateFrameId = requestAnimationFrame(() => this._animate(ctx, distance, target, direction));
    }

    public move(ctx: CanvasRenderingContext2D) {
        cancelAnimationFrame(this._animateFrameId);
        return {
            to: (target: Position) => {
                const direction: [Direction.Left | Direction.Right, Direction.Up | Direction.Down] = [Direction.Left, Direction.Up];
                
                if(this.pos.x < target.x)
                    direction[0] = Direction.Right;
                else if(this.pos.x > target.x)
                    direction[0] = Direction.Left;

                if(this.pos.y < target.y)
                    direction[1] = Direction.Down;
                else if(this.pos.y > target.y)
                    direction[1] = Direction.Up;

                this._animate(
                    ctx,
                    new Vector2D(
                        Math.abs(this.pos.x - target.x),
                        Math.abs(this.pos.y - target.y)
                    ),
                    target,
                    direction
                )
            }
        }
    }
}