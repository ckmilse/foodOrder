import {Injectable} from "@angular/core";
import {Http, URLSearchParams, Headers, Response} from "@angular/http";
import "rxjs/add/operator/map";
import severApi from 'serverConfig';
import { Observable } from 'rxjs/Observable';
import util from './utils';
@Injectable()
export class AppHttp {
    constructor(private http: Http) {
    }

    // public getData(apiName, data) {
    //     return this.makeGetRequest(severApi[apiName][ENV], data);
    // }
    public getData(apiName, data) {
        return this.makeGetRequest(severApi[apiName][ENV], data);
    }
    public postData(apiName, data) {
        // severApi[apiName][ENV],
        return this.makePostRequest(severApi[apiName][ENV], data);
    }

    public putData(apiName, data) {
        return this.makePutRequest(severApi[apiName][ENV], data);
    }
    private makeGetRequest(apiRoute, data) {
        let params = new URLSearchParams();
        if (data && typeof data === 'object') {
            for (let key in data) {
                params.set(key, data[key]);
            }
        }
        //  responseType: 'text/json'
        return this.http.get(apiRoute, {
            search: params
        })
            .filter((res) => {
                return this.filterError(res);
            })
            .map((res) => res.json())
            .filter((res) => {
                return this.filterCode(res);
            })
            .catch(this.handleError);
    }

    private makePostRequest(url, data: any) {
        // let params = new URLSearchParams();
        console.log(123);
        let header = new Headers();
        header.append('Content-Type', 'application/json; charset=UTF-8');
        return this.http.post(
            url,
            data || {},
            {
                headers: header
            }
        )
            .filter((res) => {
                return this.filterError(res);
            })
            .map((res) => res.json())
            .filter((res) => {
                return this.filterCode(res);
            });
    }
    private handleError(error: any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.log(error);
        //alert('未知错误');
        console.log('get Error');
        // console.error(errMsg);
        return Observable.throw(errMsg);
    }

    private filterError(res: any) {
        // console.log(res);
        if (res.status * 1 == 0) {
            console.log('网络错误');
            return false;
        }
        if (res.status * 1 >= 302) {
            // if (res.status === 401) {
            //     var preLoginInfo = JSON.stringify({ method: 'GET', url: '/' });
            //     document.cookie = 'restsecurity.pre.login.request=' + preLoginInfo;
            //     self.location.href = '/login.html';
            // } else {
            //     console.log('请求错误');
            // }
            util.alertError('网络错误');
            return false
        }
        return true
    }
    private filterCode(res: any) {
        if (res.code * 1 === -3) {
            console.log('not login');
            console.log(res);
            window.location.href = '/api/login';
            // if(res.data) {
            //     window.location.href = res.data;
            // }
            return false;
        }
        // if (res.code * 1 === -1) {
        //     alert(res.description);
        //     // if(res.data) {
        //     //     window.location.href = res.data;
        //     // }
        //     return false;
        // }
        return true;
        // return res.code * 1 >= 0;
    }

    private makePutRequest(apiRoute, data: any) {
        let header = new Headers();
        header.append('Content-Type', 'application/json; charset=UTF-8');
        return this.http.put(
            apiRoute,
            data || {},
            {
                headers: header
            }
        )
            .filter((res) => {
                return this.filterError(res);
            })
            .map((res) => res.json())
            .filter((res) => {
                return this.filterCode(res);
            });
    }
}
