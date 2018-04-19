import { Component, ViewChild ,ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PlacesPage } from '../places/places';
import { GearPage } from '../gear/gear';
import { NotificationsPage } from '../notifications/notifications';

@Component({
    selector: 'page-home',
    templateUrl: 'Home.html'
})
export class HomePage {

    constructor(public navCtrl: NavController) {

    }

    gotoGearPage() {
        this.navCtrl.setRoot(GearPage);
    }

    gotoPlacesPage() {
        this.navCtrl.setRoot(PlacesPage);
    }

    gotoNotificationsPage() {
        this.navCtrl.setRoot(NotificationsPage);
    }
}
