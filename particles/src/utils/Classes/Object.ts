export default class Object {
    private _id: number
    
    constructor() {
        this._id = Date.now();
        // this._context;
    }

    public id(){
        return this._id;
    }
}