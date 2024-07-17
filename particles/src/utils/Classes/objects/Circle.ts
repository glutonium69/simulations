import { Direction } from "../../enums.js";
import Object2D from "../Object2D.js";
import Vector2D from "../Vector2D.js";
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

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    public moveTo(ctx: CanvasRenderingContext2D, target: Position) {
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
                    this.getVelocity().x = 0;
                    this.position.x -= this.getVelocity().x;
                    distance.x -= this.getVelocity().x;
                    if (this.position.x < target.x) {
                        this.position.x = target.x
                        distance.x = 0;
                    };
                    break;
                case Direction.Right:
                    this.position.x += this.getVelocity().x;
                    distance.x -= this.getVelocity().x;
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
                    this.position.y -= this.getVelocity().y;
                    distance.y -= this.getVelocity().y;
                    if (this.position.y < target.y) {
                        this.position.y = target.y
                        distance.y = 0;
                    };
                    break;
                case Direction.Down:
                    this.position.y += this.getVelocity().y;
                    distance.y -= this.getVelocity().y;
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
}