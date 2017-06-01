
/*
连线 class

*/
import { Point } from './point';
import { Node } from './node';
export class Link {
    public count: any; //总共次数
    public start: Node;
    public end: Node;
    public tag: any;
    constructor(tag, startNo, endNo) {
        this.tag = tag;
        this.count = 1;
        this.start = startNo;
        this.end = endNo;
        // this.position_x = x;
        // this.position_y = y;
    }
    public getMidPoint() {
        // return new Point(this.position.position_x, this.position.position_y + this.height);
        //.start.getSrcPoint().
        //end.getEndPoint().
        return new Point((this.start.getSrcPoint().position_x + this.end.getEndPoint().position_x)/2, (this.start.getSrcPoint().position_y + this.end.getEndPoint().position_y)/2);
    }


}
