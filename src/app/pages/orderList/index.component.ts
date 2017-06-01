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
    public choiceList = [];
    public listShow = [];
    public total = 0;
    constructor(
        private appHttp: AppHttp,
        private router: Router,
        public eventService: EventService) {
    }
    ngOnInit() {
        alert(123);
        this.choiceList.push({
            name: '新品推荐',
            id: '1233444',
            ifCurrent: true,
            orderList:[
                {
                    image:'/assets/img/1.png',
                    name: '法国加力果12个装 进口新鲜水果 嘎啦苹果 包邮',
                    value:'50',
                    measurement:'支',
                    choiceCount:0
                },
                {
                    image:'/assets/img/1.png',
                    name: '法国加力果12个装 进口新鲜水果 嘎啦苹果 包邮',
                    value:'50',
                    measurement:'支',
                    choiceCount:0
                },
                {
                    image:'/assets/img/1.png',
                    name: '法国加力果12个装 进口新鲜水果 嘎啦苹果 包邮',
                    value:'50',
                    measurement:'支',
                    choiceCount:0
                },
                {
                    image:'/assets/img/1.png',
                    name: '法国加力果12个装 进口新鲜水果 嘎啦苹果 包邮',
                    value:'50',
                    measurement:'支',
                    choiceCount:0
                }
            ]
        });
        this.choiceList.push({
            name: '热销',
            id: '1233444555',
            ifCurrent: false,
            orderList:[
                {
                    image:'/assets/img/1.png',
                    name: '鸡骨架',
                    measurement:'支',
                    value:'50',
                    choiceCount:0
                },
                {
                    image:'/assets/img/1.png',
                    name: '鸡脆骨',
                    measurement:'支',
                    value:'40',
                    choiceCount:0
                },
                {
                    image:'/assets/img/1.png',
                    name: '羊肉串',
                    measurement:'支',
                    value:'20',
                    choiceCount:0
                },
                {
                    image:'/assets/img/1.png',
                    name: '法国加力果12个装 进口新鲜水果 嘎啦苹果 包邮',
                    measurement:'支',
                    value:'10',
                    choiceCount:0
                }
            ]
        });

        this.listShow = this.choiceList[0].orderList;


    }
    public ngAfterContentInit() {
        // console.log('hello `Detail` component');


    }
    public resetCount() {
        this.choiceList.forEach((item)=>{
            item.orderList.forEach((itemOrder)=>{
                itemOrder.choiceCount = 0;
                // this.total = this.total + (itemOrder.choiceCount * 1) * itemOrder.value;
            });
        });
        this.countTotal();
    }
    public changeCount(order, flag) {
        order.choiceCount = order.choiceCount + flag;
        if(order.choiceCount <= 0) {
            order.choiceCount = 0;
        }
        this.countTotal();
    }
    public changeTab(choice) {
        this.choiceList.forEach((item)=>{
            item.ifCurrent = false;
        });
        choice.ifCurrent = true;
        this.listShow = choice.orderList;

    }

    public countTotal() {

        this.total = 0;
        this.choiceList.forEach((item)=>{
            // item.ifCurrent = false;
            item.orderList.forEach((itemOrder)=>{
                this.total = this.total + (itemOrder.choiceCount * 1) * itemOrder.value;
            });
        });
    }


}
