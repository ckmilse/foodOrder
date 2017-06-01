import { Component, Input } from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'time',
  // styleUrls: ['footer.scss'],
  template: `<span>{{timeString}}</span>`
})
export class TimeComponent {
    @Input() times: any;
    // public times:any;
    public timeString: any = '';
    constructor(){}
    ngOnInit(){
        try{
            this.timeString = moment(this.times/1000 ).format('YYYY/MM/DD HH:mm');
        }catch(e){
            this.timeString = moment().format('YYYY/MM/DD HH:mm');
        }

        // console.log(this.times);
        // this.timeString = new Date(this.times * 1000).toString();
    }
}
