// const Rx = require('rxjs/Rx');
import {Injectable} from '@angular/core';
import Rx from 'rxjs/Rx';
import {MdDialog, MdDialogRef} from '@angular/material';
import {loadingComponent} from './../common/components';
@Injectable()
export class Loading {
    public dialogRef: any;

    constructor(public dialog: MdDialog) {
    }

    public loadingOpen(): void {
        this.dialogRef = this.dialog.open(loadingComponent, {
            disableClose: true,
            // width: '100%',
            // height: '100%',
            position: {
                top: '40vh',
                bottom: '',
                left: '',
                right: ''
            },
        });
        //先通过这样非angular的方式更改样式
        document.body.setAttribute('class', 'transparent');
    }

    public loadingClose(): void {
        try{
            document.body.removeAttribute('class');
            this.dialogRef && this.dialogRef.close && this.dialogRef.close();
        }catch(e){
            console.log(e);
        }

    }
}

// export default Loading;
