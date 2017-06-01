// import { Component, Input } from '@angular/core';
import {Component, Inject, ViewChild, TemplateRef, Input} from '@angular/core';
import {MdDialog, MdDialogRef, MdDialogConfig, MD_DIALOG_DATA} from '@angular/material';
import util from '../../../services/utils';
import {AppHttp} from '../../../services/appHttp';
// import { LogDetailComponent } from './../logDetail';

@Component({
    selector: 'pipline-config',
    providers: [
        AppHttp
    ],
    templateUrl: './piplineConfig.component.html',
    styleUrls: ['./piplineConfig.component.scss']
})
export class PiplineConfigComponent {

    public ifDetail = true;
    constructor(
        public appHttp: AppHttp,
        // public dialog: MdDialog,
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
    // public showLogDetail() {
    //     let dialogRef: any;
    //     dialogRef = this.dialog.open(PiplineConfigComponent, {
    //         disableClose: false,
    //         width: '',
    //         height: '',
    //         position: {
    //             top: '5vh',
    //             bottom: '',
    //             left: '',
    //             right: ''
    //         },
    //         data: {
    //             data: {
    //
    //             }
    //         }
    //     });
    //     dialogRef.componentInstance.actionsAlignment = 'end';
    //     dialogRef.afterClosed().subscribe(result => {
    //
    //     });
    // }

}


// 'dialogRef.close()
