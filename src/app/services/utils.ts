// const Rx = require('rxjs/Rx');
import {Injectable} from '@angular/core';
import Rx from 'rxjs/Rx';
import {MdDialog, MdDialogRef} from '@angular/material';
// @Injectable()
class Utils {
    constructor() {}
    public objToStr(obj) {
        //{ck:12,dd:22}
        //to==> serverConfig=weight=9;port=12346;version=2
        //不做数据类型检查
        if (typeof obj != 'object') {
            return '';
        }
        let tempArr = [];
        for (let item in obj) {
            if (obj[item] == null) {
                tempArr.push(self['encodeURIComponent'](item) + '=' + self['encodeURIComponent'](''));
            }
            if (typeof obj[item] == 'string' || typeof obj[item] == 'number') {
                tempArr.push(self['encodeURIComponent'](item) + '=' + self['encodeURIComponent'](obj[item]));
            }
            //obj的时候，可以递归一下
        }
        return tempArr.join(';');
    }
    
    public deepCopy(source) {
        let result = {};
        if (source.constructor === Array) {
            result = [];
        }
        for (var key in source) {
            result[key] = typeof source[key] === 'object' ? this.deepCopy(source[key]) : source[key];
        }
        return result;
    }

    public alertError(str: string) {
        let window_copy: any = self;
        window_copy.swal({
            title: str,
            type: 'warning',
            timer: 3000
        });
    }

    public alertSuccess(str: string) {
        let window_copy: any = self;
        console.log('success');
        window_copy.swal(str, '', 'success')
    }

    public confirm(str: string, config?: any) {
        let window_copy: any = self;
        //看看需不需要销毁？and how
        let defaultConfig = Object.assign({
            title: str,
            // text: '您确定要删除这条数据？',
            type: 'warning',
            showCancelButton: true,
            closeOnConfirm: false,
            cancelButtonText:'取消',
            confirmButtonText: '确认',
            confirmButtonColor: '#ec6c62'
        },config || {});
        return Rx.Observable.create((observer) => {
            window_copy.swal(defaultConfig, function() {
                observer.next(true);
            });
        }).filter((flag)=>{ return flag});

    }

    public throttle(method, context) {
        clearTimeout(method.tId);
        method.tId = setTimeout(function() {
            method.call(context);
        }, 100);
    }

}

let util = new Utils();
// self['test'] = util;
export default util;
