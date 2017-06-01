import {Component, Injectable, EventEmitter} from '@angular/core';
let change: any;
@Injectable()
export class EventService {
    // public change: any;
    constructor() {
        change = new EventEmitter();
    }
    getChange() {
        return change;
    }
}
