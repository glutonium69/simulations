import Vector2D from "../Vector2D.js";

export default class Position extends Vector2D {
    constructor(
        public x: number,
        public y: number
    ) {
        super(x, y);
        this.x = x;
        this.y = y;
    }

    public distanceTo(vector: Vector2D) {
        const dx = this.x - vector.x;
        const dy = this.y - vector.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    public copy() {
        return new Position(this.x, this.y);
    }
}