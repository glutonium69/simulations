import { Direction } from "../enums.js";
import Vector2D from "./Vector2D.js";
import Position from "./vectors/Position.js";

interface BoundingBox {
    x: number, // top left croner x
    y: number, // top left croner y
    width: number,
    height: number
}

export default class Object {
    static ID_COUNTER: number = 0;
    private _animationId: number | null = null;

    constructor(
        public position: Position, // center of object
        public boundingBoxProps: BoundingBox,
    ) {
        Object.ID_COUNTER += 1;
        this.boundingBox = boundingBoxProps;
    }

    protected updateRealPos() {
        this._boundingBox.x = this.position.x - this._boundingBox.width / 2;
        this._boundingBox.y = this.position.y - this._boundingBox.height / 2;
    }

    protected startAnimation(fn: (...args: any[]) => boolean, ...args: any[]) {
        if (this.velocity.x === 0 && this.velocity.y === 0) return;
        if (this._animationId) this.stopAnimation();
        
        const fnCallback = () => {
            console.log("on going");
            const breakLoop = fn(...args);
            console.log(breakLoop);
            if(breakLoop) {
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