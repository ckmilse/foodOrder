// import { Component, Input } from '@angular/core';
import {Component, Inject, ViewChild, TemplateRef,Input} from '@angular/core';
import {MdDialog, MdDialogRef, MdDialogConfig, MD_DIALOG_DATA} from '@angular/material';
import util from '../../../services/utils';
import {AppHttp} from '../../../services/appHttp';


@Component({
  selector: 'server-host-detail',
  providers: [
    AppHttp
  ],
   templateUrl: 'serverHostDetail.html',
   styleUrls:['serverHostDetail.scss']
})
export class ServerHostDetailComponent {
  // @Input() title: string;
  // @Input() strapline: string;
  public clusterName = '';
  public theServer: any = {};
  public theRelateService: any = {};
  public theServerShow: any = {};
  public ifEdit = false;
  public ifDataReady = false;
  public actionsAlignment = 'right';
  constructor(
    @Inject(MD_DIALOG_DATA) public data: any,
    public appHttp: AppHttp,
  public dialogRef: MdDialogRef<ServerHostDetailComponent>
  ) {
  }
  ngOnInit() {
    this.theServer = util.deepCopy(this.data.data.theServer);
    this.theServerShow = util.deepCopy(this.theServer);
    this.theRelateService = this.data.data.theRelateService;
    this.clusterName = this.data.data.clusterName;
    this.ifDataReady = true;
  }

  public submitServerChange() {
    let tempObj = {
      cluster:this.clusterName,
      service: this.theRelateService.name,
      ip: this.theServer.host + ':' + this.theServer.port,
      serverConfig: util.objToStr({
        "server.service.level": this.theServer['server.service.level'],
        "version":this.theServer.version
      })
    };
    // cluster=chenke (全匹配，不可模糊)
    //    service=com.xiaomi.swift.helloworld.server.EchoServer (全匹配，不可模糊)
    //    ip=172.20.0.1:12346 (全匹配，不可模糊)
    //    serverConfig=weight=9;port=12346;version=2 (可修改数据的表单)

    this.appHttp.postData('serverChangeApi', tempObj).subscribe(params => {
      if (params.code * 1 != 0) {
        util.alertError(params.description);
        return
      }
      this.ifEdit = false;
      this.dialogRef.close(true);
      //刷新一下列表
      // this.getServiceList();
      // this.ifEdit = false;
    });

  }

  public closeModal(){
    this.ifEdit = false;
    this.dialogRef.close();
  }
  public editServer() {
    this.theServerShow = util.deepCopy(this.theServer);
    this.ifEdit = true;
  }
}


// 'dialogRef.close()
