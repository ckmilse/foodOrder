// import { Component, Input } from '@angular/core';
import {Component, Inject, ViewChild, TemplateRef,Input} from '@angular/core';
import {MdDialog, MdDialogRef, MdDialogConfig, MD_DIALOG_DATA} from '@angular/material';
import util from '../../../services/utils';
import {AppHttp} from '../../../services/appHttp';


@Component({
  selector: 'log-detail',
  providers: [
    AppHttp
  ],
   templateUrl: 'logDetail.component.html',
   styleUrls:['logDetail.component.scss']
})
export class LogDetailComponent {
  // @Input() title: string;
  // @Input() strapline: string;
  public ifDetail = true;
  constructor(
    // @Inject(MD_DIALOG_DATA) public data: any,
    public appHttp: AppHttp,
    public dialogRef: MdDialogRef<LogDetailComponent>

  ) {
  }
  ngOnInit() {

  }
  public showDetail() {
      this.ifDetail = false;
  }

  public backList() {
      this.ifDetail = true;
  }
  public closeModal(){
    // this.ifEdit = false;
    this.dialogRef.close();
  }

}


// 'dialogRef.close()
