import { Component, OnInit} from '@angular/core';
import { DataStore } from './../../services/dataStore';
import { AppHttp } from './../../services/appHttp';
import { EventService } from './../../services/globalEventEmitter';
import { Router } from '@angular/router';
import util from './../../services/utils';
import moment from 'moment';

let globalStore = new DataStore();
@Component({
    selector: 'order-list',
    providers: [AppHttp, EventService],
    styleUrls: ['./index.component.scss'],
    templateUrl: './index.component.html'
})
export class IndexComponent implements OnInit {

    constructor(
        private appHttp: AppHttp,
        private router: Router,
        public eventService: EventService) {
    }
    ngOnInit() {



    }
    public ngAfterContentInit() {
        // console.log('hello `Detail` component');


    }


}
