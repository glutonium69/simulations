import Object from "../Object.js";
import Vector2D from "../Vector2D.js";
import Position from "../vectors/Position.js";

export default class Rectangle extends Object {
    private _realPos: Position;

    constructor(
        private _ctx: CanvasRenderingContext2D,
        public pos: Position,
        public width: number,
        public height: number,
        public color: string,
        public velocity: Vector2D = new Vector2D(0, 0),
    ) {
        super(
            pos,
            velocity,
            {
                x: pos.x - width / 2,
                y: pos.y - height / 2,
                width: width,
                height: height
            }
        )
        this._ctx;
        this.pos;
        this._realPos = new Position(this.pos.x - this.width / 2, this.pos.y - this.height / 2);
        this.width;
        this.height;
        this.color;
        this.velocity;
    }

    public draw(): void {
        this._ctx.beginPath();
        this._ctx.fillRect(this._realPos.x, this._realPos.y, this.width, this.height);
        this._ctx.fillStyle = this.color;
        this._ctx.fill();
    }

    private _animate() {
        this._ctx.clearRect(this.pos.x, this.pos.y, this.width, this.height);
        this.draw();
    }

    private _updateRealPos() {
        this._realPos.x = this.pos.x - this.width / 2;
        this._realPos.y = this.pos.y - this.height / 2;
        this._animate();
    }

    public move(vel: number | null) {
        return {

        }
    }
}