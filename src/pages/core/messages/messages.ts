import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
    selector: 'page-messages',
    templateUrl: 'messages.html'
})
export class MessagesPage {

    message: any = {
        from: "",
        subject: "",
        time: null
    }

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        if (this.navParams.get('message')) {
            this.message = this.navParams.get('message');
            console.log(this.message);
        }
    }

}
