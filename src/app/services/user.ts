import {Injectable} from "@angular/core";
import {Http, URLSearchParams} from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class User {
    constructor(private http: Http) {
    }

    getUser() {
        console.log(this);
        // return JSON.parse('{"result":"ok","code":0,"data":{"userName":"陈科","email":"chenke1"},"description":"成功"}');
        return this.makeRequest();
    }

    private makeRequest() {
        let params = new URLSearchParams();

        let url = `/getUser.json`;
        try {
            console.log(url);
            return this.http.get(url, { search: params })
        } catch (e) {
            console.log(e);
        }
        // return this.http.get(url, {search: params})
        // .map(function(item) {
        //   console.log(123);
        //   return JSON.parse('{}');
        // });
        // (res) => res.json());
    }
}
