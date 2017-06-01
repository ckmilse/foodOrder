import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppHttp } from '../../../services/appHttp';
import { EventService } from '../../../services/globalEventEmitter';
import { DataStore } from '../../../services/dataStore';
import $ from 'jquery';

let globalStore = new DataStore();

@Component({
    selector: 'app-navigation',
    styleUrls: ['navbar.scss'],
    providers: [AppHttp, EventService],
    templateUrl: 'navbar.html'
})
export class NavbarComponent {

    public userName: string = '';
    public productId = '';
    public proList = [];
    public navListFlag = [ false, false, false, false, false];

    constructor(
        private router: Router,
        private eventEervice: EventService,
        private appHttp: AppHttp
    ) { }
    public ngOnInit() {

        this.navListFlag[0] = true;

        this.appHttp.getData('getUserApi', {}).subscribe(params => {
            // if (params.code * 1 === -3) {
            //   console.log('not login--naver');
            //   window.location.href = '/api/login';
            //   alert(params.description);
            // }
            if (params.code * 1 == 0) {
                this.userName = params.data;
            }
        }, err => {
            console.log(err);
        });
        this.appHttp.getData('productListApi', {}).subscribe(params => {
            this.proList = params.data.list;
            this.productId = this.proList[0].id;
            globalStore.setValue('product', this.proList[0]);
            this.eventEervice.getChange().emit(this.proList[0]);

        }, err => {
            console.log(err);
        });

    }
    public isNavItemActive(location: any) {
        return location === this.router.url ? 'active' : '';
    }
    public productChange() {
        console.log('change');
        console.log(this.productId);
        let tempPro = this.proList.find((item, index, arr) => {

            return item.id == this.productId;
        });
        this.eventEervice.getChange().emit(tempPro);
    }
    public changeNav(index) {
        this.navListFlag.forEach((item, ind)=>{
            this.navListFlag[ind] = false;
        });
        this.navListFlag[index] = true;
    }
}
