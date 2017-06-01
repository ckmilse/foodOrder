
// export type InternalStateType = {
//     [key: string]: any
// };
//
// let data: InternalStateType = {};

export class Point {
    public position_x: any;
    public position_y: any;
    constructor(x, y) {
        this.position_x = x;
        this.position_y = y;
    }
    public getString() {
        return this.position_x + ',' + this.position_y;
    }
}
