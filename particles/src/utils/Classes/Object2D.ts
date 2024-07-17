import Vector2D from "./Vector2D.js";
import Position from "./vectors/Position.js";

interface BoundingBox {
    x: number, // top left croner x
    y: number, // top left croner y
    width: number,
    height: number,
}

export default class Object2D {
    static ID_COUNTER: number = 0;
    private _animationId: number | null = null;
    private _velocity: Vector2D = new Vector2D(0, 0);

    constructor(
        public position: Position, // center of object
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

    public setVelocity(x: number | null, y: number | null) {
        this._velocity.x = x ? x : this._velocity.x;
        this._velocity.y = y ? y : this._velocity.y;
    }

    protected updateRealPos() {
        this._boundingBox.x = this.position.x - this._boundingBox.width / 2;
        this._boundingBox.y = this.position.y - this._boundingBox.height / 2;
    }

    protected startAnimation(fn: (...args: any[]) => boolean, ...args: any[]) {
        if (this._velocity.x === 0 && this._velocity.y === 0) return;
        if (this._animationId) this.stopAnimation();

        const fnCallback = () => {
            const breakLoop = fn(...args);
            if (breakLoop) {
                this.stopAnimation();
                return;
            }
            this._animationId = requestAnimationFrame(fnCallback);
        }
        fnCallback();
    }

    protected stopAnimation() {
        if (this._animationId) {
            cancelAnimationFrame(this._animationId);
            this._animationId = null;
        }
    }

    public clearObject(ctx: CanvasRenderingContext2D) {
        ctx.clearRect(
            this._boundingBox.x,
            this._boundingBox.y,
            this._boundingBox.width,
            this._boundingBox.height
        );
    }
}