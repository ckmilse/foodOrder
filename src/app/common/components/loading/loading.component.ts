// import { Component, Input } from '@angular/core';
import {Component, Inject, ViewChild, TemplateRef, Input} from '@angular/core';
import {MdDialog, MdDialogRef, MdDialogConfig, MD_DIALOG_DATA} from '@angular/material';
import util from '../../../services/utils';
import {AppHttp} from '../../../services/appHttp';


@Component({
    selector: 'xm-loading',
    providers: [
        AppHttp
    ],
    templateUrl: 'loading.component.html',
    styleUrls: ['loading.component.scss']
})
export class loadingComponent {
    // @Input() title: string;
    // @Input() strapline: string;
    constructor(
        // @Inject(MD_DIALOG_DATA) public data: any,
        public appHttp: AppHttp,
        public dialogRef: MdDialogRef<loadingComponent>
    ) {
    }
    ngOnInit() {
        // this.theServer = util.deepCopy(this.data.data.theServer);
        
    }


}


// 'dialogRef.close()
