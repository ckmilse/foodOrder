import { Component, OnInit} from '@angular/core';
import { DataStore } from './../../services/dataStore';
import { AppHttp } from './../../services/appHttp';
import { EventService } from './../../services/globalEventEmitter';
import { Router } from '@angular/router';
import util from './../../services/utils';
import moment from 'moment';

let globalStore = new DataStore();
@Component({
    selector: 'real-time-tracking',
    providers: [AppHttp, EventService],
    styleUrls: ['./realTimeTracking.component.scss'],
    templateUrl: './realTimeTracking.component.html'
})
export class RealTimeTrackingComponent implements OnInit {
    public ifShowChoices = false;
    public product: any = {
        cn_name: ''
    };
    public productDetail = {};
    public traceList = [];
    public choice: any = {
        endTimeStr: '',
        startTimeStr: '',
        total: 1,
        page: 1, //初始化为1
        size: 30
    };
    constructor(
        private appHttp: AppHttp,
        private router: Router,
        public eventService: EventService) {
    }
    ngOnInit() {


        if (globalStore.getValue('product')) {
            this.product = globalStore.getValue('product');
            this.initPage();
        }
        //貌似没有initPage,就没有更新页面，脏值检测
        this.eventService.getChange().subscribe((value: any) => {
            this.product = value;
            this.initPage();
        })
        this.ifShowChoices = true;
    }
    public ngAfterContentInit() {
        // console.log('hello `Detail` component');

        $("#startTime").datetimepicker({
            step: 15,
            onShow: function(ct) {
                this.setOptions({
                    maxDate: $('#endTime').val() ? $('#endTime').val() : false
                })
            },
        });
        $("#endTime").datetimepicker({
            step: 15,
            onShow: function(ct) {
                this.setOptions({
                    maxDate: $('#endTime').val() ? $('#endTime').val() : false
                })
            },
        });
        setTimeout(() => {
            $("#startTime").val(moment().subtract(1, 'hour').format('YYYY/MM/DD HH:mm'));
            $("#endTime").val(moment().format('YYYY/MM/DD HH:mm'));
        }, 1000);
        // this.queryTrace();
    }
    private initPage() {

        this.appHttp.getData('productDetailApi', { productName: this.product.name })
            .subscribe((data) => {

                this.productDetail = data.data;
                // console.log(this.choice.page);
            });
    }
    public queryTrace() {

        if (!this.checkData(this.choice)) {
            return
        }
        this.choice.product = this.product.name;
        this.choice.startTime = (new Date(this.choice.startTimeStr)).getTime() * 1000;
        this.choice.endTime = (new Date(this.choice.endTimeStr)).getTime() * 1000;
        this.choice.range_depth = (this.choice.range_depth_start || '') + ',' + (this.choice.range_depth_end || '');
        this.choice.range_count = (this.choice.range_interactionTimes_start || '') + ',' + (this.choice.range_interactionTimes_end || '');
        this.choice.range_duration = (this.choice.range_costTime_start || '') + ',' + (this.choice.range_costTime_end || '');
        this.appHttp.getData('proTraceListApi', this.choice)
            .subscribe((data) => {
                this.traceList = data.data.list;
                this.choice.total = data.data.total * 1;
                this.choice.page = data.data.page * 1;
            });
    }

    public checkData(obj) {

        this.choice.startTimeStr = $("#startTime").val();
        this.choice.endTimeStr = $("#endTime").val();
        if (!(this.choice.startTimeStr && this.choice.endTimeStr)) {
            util.alertError('请选择起止时间');
            return false;
        }
        return true;
    }
    public changeShowChoices() {
        this.ifShowChoices = !this.ifShowChoices;
    }

    public toDetail(trace) {
        globalStore.setValue('product', {});

        this.router.navigate(['/trackDetail'], {
            queryParams: {
                traceId: trace.traceId
            }
        });
    }

}
