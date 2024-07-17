export default class Vector2D {
    constructor(
        public x: number,
        public y: number
    ) {
        this.x = x;
        this.y = y;
    }

    subtract(vec: Vector2D) {
        return new Vector2D(this.x - vec.x, this.y - vec.y);
    }

    copy() {
        return new Vector2D(this.x, this.y);
    }
}