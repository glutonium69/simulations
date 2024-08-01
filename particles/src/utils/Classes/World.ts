import { Shapes } from "../tsUtils.js";
import Rectangle from "./objects/Rectangle.js";
import Position from "./vectors/Position.js";

interface CanvasProps {
    /** 
     * ### width of the canvas.
     * #### ` default: window.innerWidth `
     * */
    readonly width?: number,
    /** 
     * ### height of the canvas.
     * #### ` default: window.innerHeight `
     * */
    readonly height?: number,
    /** 
     * ### background of the canvas.
     * - Value: Image path || Color
     * #### ` default: "#101010" `
     * */
    readonly background?: string,
    /**
     * ### canvas parent element.
     * #### ` default: document.body `
     * */
    readonly parentElement?: HTMLElement
}

interface WorldProps {
    /** #### ` default: 0 ` */
    gravity?: number,
    /** #### ` default: 0 ` */
    airResistance?: number
}

export default class World {
    static CANVAS: HTMLCanvasElement;
    static CTX: CanvasRenderingContext2D;
    public worldObjects: Map<number | string, Shapes> = new Map();

    constructor(
        readonly canvasProps: CanvasProps = {
            width: innerWidth,
            height: innerHeight,
            background: "#101010",
            parentElement: document.body,
        },
        public worldProps: WorldProps = {
            gravity: 0,
            airResistance: 0
        }
    ) {
        this.canvasProps,
            this.worldProps
    }

    public init() {
        const {
            width = innerWidth,
            height = innerHeight,
            parentElement = document.body
        } = this.canvasProps;

        World.CANVAS = document.createElement("canvas");
        World.CANVAS.id = "scene";
        World.CANVAS.width = width;
        World.CANVAS.height = height;
        
        parentElement.appendChild(World.CANVAS);

        const ctx = World.CANVAS.getContext("2d");

        if (!ctx) {
            throw new Error("Canvas context not found");
        }

        World.CTX = ctx;
    }

    public addObjects(...objects: Shapes[]) {
        objects.forEach(object => {
            this.worldObjects.set(object.id, object);
        });
    }

    public removeObjects(...objects: Shapes[]) {
        objects.forEach(object => {
            this.worldObjects.delete(object.id);
        });
    }
}