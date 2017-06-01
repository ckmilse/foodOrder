
// export type InternalStateType = {
//     [key: string]: any
// };
//
// let data: InternalStateType = {};
import { Point } from './point';

export class Node {
    public id: any;
    public position: any;
    public height: any;
    public width: any;
    public value: any;
    public treePosition: any;
    constructor(
        id,
        position,
        height,
        value,
        width,
        treePosition
    ) {
        this.id = new Date().getTime();
        this.position = position;
        this.height = height;
        this.value = value;
        this.width = width;
        this.treePosition = treePosition;
        // this.position_x = x;
        // this.position_y = y;
    }
    public getSrcPoint() {
        return new Point(this.position.position_x + (this.width/2), this.position.position_y + this.height);
    }
    public getEndPoint() {
        return new Point(this.position.position_x + (this.width/2), this.position.position_y );
    }
}
