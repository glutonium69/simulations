import Object2D from "../Object2D.js";
import World from "../World.js";
import Position from "../vectors/Position.js";

export default class Rectangle extends Object2D {

    readonly id = Object2D.ID_COUNTER;

    constructor(
        private _pos: Position,
        public width: number,
        public height: number,
        public color: string,
    ) {
        super(
            _pos,
            color,
            {
                x: _pos.x - width / 2,
                y: _pos.y - height / 2,
                width: width,
                height: height
            }
        )
    }

    public draw(): void {
        const ctx = World.CTX;
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.getBoundingBox().x, this.getBoundingBox().y, this.width, this.height);
    }

    public rotate(): void {
        const ctx = World.CTX;
        const { width, height } = this.getBoundingBox();
        ctx.restore();
        ctx.save();
        ctx.translate(this._pos.x, this._pos.y);
        ctx.rotate(this.props.angularVelocity + this.props.angle);
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(-width / 2, -height / 2, width, height);
        ctx.restore();
        this.props.angle += this.props.angularVelocity;
    }
}