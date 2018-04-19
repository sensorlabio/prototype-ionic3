import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MessagesPage } from '../messages/messages';
import { Values } from '../../../providers/values';

@Component({
    selector: 'page-notifications',
    templateUrl: 'notifications.html'
})
export class NotificationsPage {
    
    constructor(public navCtrl: NavController, public values: Values) {

    }

    openMessagesPage(index) {
        this.values.notifications[index].checked = true;
        this.navCtrl.push(MessagesPage, {message: this.values.notifications[index]});
    }

}
