import Vector2D from "./Vector2D.js";
import World from "./World.js";
import Position from "./vectors/Position.js";

interface BoundingBox {
    x: number, // top left croner x
    y: number, // top left croner y
    width: number,
    height: number,
}

interface ObjectProps {
    angle: number,
    angularVelocity: number,
}

export default class Object2D {
    static ID_COUNTER: number = 0;
    private _velocity: Vector2D = new Vector2D(0, 0);
    public props: ObjectProps = {
        angle: 0,
        angularVelocity: 0
    };

    constructor(
        private _position: Position, // center of object
        public color: string,
        // the reason to have it private is cause we have to get the value of bounding box from the sub class
        // at the time of initialization since its calculation varies between the shapes
        // at the same time i dont want it to get updated outside this class
        private _boundingBox: BoundingBox,
    ) {
        Object2D.ID_COUNTER += 1;
        // no need for furthur initialization as using public keyword in constructor does it implicitly
    }

    // we r sending a copy of the original data
    // otherwise the reference of the original data is sent
    // in which case the properties can be updated from outside
    // defeating the whole point of private prop
    public getBoundingBox = (): BoundingBox => {
        return { ...this._boundingBox };
    };

    public getVelocity = (): Vector2D => this._velocity.copy();

    public setVelocity(x?: number, y?: number): void {
        this._velocity.x = x ? x : this._velocity.x;
        this._velocity.y = y ? y : this._velocity.y;
    }

    public getPosition = (): Position => this._position.copy();

    public setPosition(x?: number, y?: number): void {
        if (x) this._position.x = x;
        if (y) this._position.y = y;

        if (x || y) this.updateRealPos();
    }

    public isOutsideCanvas() {
        const { height, width, x, y } = this.getBoundingBox();
        return x + width <= World.CANVAS.offsetLeft ||
            x >= World.CANVAS.offsetLeft + World.CANVAS.offsetWidth ||
            y + height <= World.CANVAS.offsetTop ||
            y >= World.CANVAS.offsetTop + World.CANVAS.offsetHeight
    }

    protected updateRealPos(): void {
        this._boundingBox.x = this._position.x - this._boundingBox.width / 2;
        this._boundingBox.y = this._position.y - this._boundingBox.height / 2;
    }
}