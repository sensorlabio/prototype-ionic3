import { Component, ViewChild ,ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation'; 
import { SensorsService } from '../../providers/providers';

import { HomePage } from './home/home';
import { GearPage } from './gear/gear';
import { PlacesPage } from './places/places';
import { NotificationsPage } from './notifications/notifications';

declare var google: any;

@Component({
  selector: 'page-core',
  templateUrl: 'core.html'
})
export class CorePage {

  @ViewChild('coreNav') nav: NavController;
  rootPage = HomePage;

  pages = {
    'home': HomePage,
    'gear': GearPage,
    'places': PlacesPage,
    'notifications': NotificationsPage
  };

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CorePage');
  }

  openPage(item) {
    this.nav.setRoot(this.pages[item]);
  }
}
