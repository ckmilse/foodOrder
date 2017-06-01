import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  styleUrls: ['footer.scss'],
  templateUrl: 'footer.html'
})
export class FooterComponent {
    public time:any;
    constructor(){}
    ngOnInit(){
        if ('production' === ENV) {
          // Production
          this.time = TIME;
        } else {

          // Development
          this.time = TIME;

        }
    }
}
