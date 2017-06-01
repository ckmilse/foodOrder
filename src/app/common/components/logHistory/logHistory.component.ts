// import { Component, Input } from '@angular/core';
import {Component, Inject, ViewChild, TemplateRef,Input} from '@angular/core';
import {MdDialog, MdDialogRef, MdDialogConfig, MD_DIALOG_DATA} from '@angular/material';
import util from '../../../services/utils';
import {AppHttp} from '../../../services/appHttp';

import { LogDetailComponent } from './../logDetail';

@Component({
  selector: 'log-history',
  providers: [
    AppHttp
  ],
   templateUrl: 'logHistory.component.html',
   styleUrls:['logHistory.component.scss']
})
export class LogHistoryComponent {
  @Input() project_id: string;
  // @Input() strapline: string;
  public ifDetail = true;
  constructor(
    // @Inject(MD_DIALOG_DATA) public data: any,
    public appHttp: AppHttp,
    public dialog: MdDialog,

  ) {
  }
  ngOnInit() {
      console.log(this.project_id);
  }
  // @Input()
  //   set project_id(projectId: any) {
  //       console.log(projectId);
  //
  //   };
  public showDetail() {
      this.ifDetail = false;
  }

  public backList() {
      this.ifDetail = true;
  }
  public showLogDetail() {
      let dialogRef: any;
      dialogRef = this.dialog.open(LogDetailComponent, {
          disableClose: false,
          width: '',
          height: '',
          position: {
              top: '5vh',
              bottom: '',
              left: '',
              right: ''
          },
          data: {
              data: {

              }
          }
      });
      // let dialogRef = this.dialog.open(ContentElementDialog, this.config);
      dialogRef.componentInstance.actionsAlignment = 'end';
      dialogRef.afterClosed().subscribe(result => {

      });
  }

}


// 'dialogRef.close()
