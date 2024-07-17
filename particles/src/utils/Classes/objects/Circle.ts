import { Direction } from "../../enums.js";
import Object from "../Object.js";
import Vector2D from "../Vector2D.js";
import Position from "../vectors/Position.js";


export default class Circle extends Object {

    readonly id = Object.ID_COUNTER;

    constructor(
        public position: Position,
        public radius: number,
        public color: string,
        public velocity: Vector2D = new Vector2D(0, 0),
    ) {
        super(
            position,
            velocity,
            {
                x: position.x - radius,
                y: position.y - radius,
                width: radius * 2,
                height: radius * 2
            }
        );
        this.position;
        this.radius;
        this.color;
        this.velocity;
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    private _animateFunc = (
        ctx: CanvasRenderingContext2D,
        distance: Vector2D,
        target: Vector2D,
        direction: [Direction.Left | Direction.Right, Direction.Up | Direction.Down]
    ): boolean => {

        this.clearObject(ctx);

        if (distance.x > 0) {
            switch (direction[0]) {
                case Direction.Left:
                    this.position.x -= this.velocity.x;
                    distance.x -= this.velocity.x;
                    if (this.position.x < target.x) {
                        this.position.x = target.x
                        distance.x = 0;
                    };
                    break;
                case Direction.Right:
                    this.position.x += this.velocity.x;
                    distance.x -= this.velocity.x;
                    if (this.position.x > target.x) {
                        this.position.x = target.x
                        distance.x = 0;
                    };
                    break;
            }
        }

        if (distance.y > 0) {
            switch (direction[1]) {
                case Direction.Up:
                    this.position.y -= this.velocity.y;
                    distance.y -= this.velocity.y;
                    if (this.position.y < target.y) {
                        this.position.y = target.y
                        distance.y = 0;
                    };
                    break;
                case Direction.Down:
                    this.position.y += this.velocity.y;
                    distance.y -= this.velocity.y;
                    if (this.position.y > target.y) {
                        this.position.y = target.y
                        distance.y = 0;
                    };
                    break;
            }
        }

        this.draw(ctx);
        this.updateRealPos();
        if (distance.x === 0 && distance.y === 0) return true;
        return false;
    }

    public move(ctx: CanvasRenderingContext2D) {
        return {
            to: (target: Position) => {
                const direction: [Direction.Left | Direction.Right, Direction.Up | Direction.Down] = [Direction.Left, Direction.Up];

                if (this.position.x < target.x)
                    direction[0] = Direction.Right;
                else if (this.position.x > target.x)
                    direction[0] = Direction.Left;

                if (this.position.y < target.y)
                    direction[1] = Direction.Down;
                else if (this.position.y > target.y)
                    direction[1] = Direction.Up;

                this.startAnimation(
                    this._animateFunc,
                    ctx,
                    new Vector2D(
                        Math.abs(target.x - this.position.x),
                        Math.abs(target.y - this.position.y)
                    ),
                    target,
                    direction
                )
            }
        }
    }
}